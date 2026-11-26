import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, isAbsolute } from "node:path";
import { createRequire } from "node:module";

function thirdPartyNotices(): Plugin {
  let root = process.cwd();
  return {
    name: "webett-third-party-notices",
    apply: "build",
    configResolved(config) { root = config.root; },
    generateBundle(_options, bundle) {
      const packages = new Map<string, { name: string; version: string; license?: unknown }>();
      const warnings = new Set<string>();
      function addPackage(id: string) {
        const path = id.replace(/^\0/, "").split("?")[0];
        if (!isAbsolute(path) || !/(^|[\\/])node_modules[\\/]/.test(path)) return;
        let dir = dirname(path);
        while (dir !== dirname(dir)) {
          const manifest = join(dir, "package.json");
          if (existsSync(manifest)) {
            try {
              const pkg = JSON.parse(readFileSync(manifest, "utf8"));
              if (pkg.name && pkg.version) {
                packages.set(dir, { name: pkg.name, version: pkg.version, license: pkg.license });
                return;
              }
            } catch { /* Continue to the package root. */ }
          }
          if (dir === root || /[\\/]node_modules$/.test(dir)) break;
          dir = dirname(dir);
        }
        warnings.add("Could not identify a bundled dependency package.");
      }
      for (const output of Object.values(bundle)) {
        if (output.type === "chunk") {
          for (const [id, info] of Object.entries(output.modules)) {
            if (info.renderedLength > 0) addPackage(id);
          }
        }
      }
      // Vite may add its own runtime helpers via virtual modules.
      try { addPackage(createRequire(join(root, "package.json")).resolve("vite/package.json")); }
      catch { warnings.add("Could not locate the installed Vite license."); }
      const sections: string[] = [];
      for (const [dir, pkg] of [...packages.entries()].sort((a,b) => (a[1].name+"@"+a[1].version).localeCompare(b[1].name+"@"+b[1].version))) {
        const heading = pkg.name + " " + pkg.version + " — " + (typeof pkg.license === "string" ? pkg.license : "see license files");
        const files = readdirSync(dir, { withFileTypes: true }).filter(f => f.isFile() && /^(licen[cs]e|copying|notice)(?:[._-].*)?$/i.test(f.name)).map(f => f.name).sort();
        if (!files.length) warnings.add("No license or notice file found for " + pkg.name + " " + pkg.version);
        sections.push(heading + "\n" + files.map(file => file + "\n" + readFileSync(join(dir, file), "utf8").trimEnd()).join("\n\n"));
      }
      for (const warning of warnings) this.warn(warning);
      const header = "Webett eHealth Academy — Third-party software notices\n\nGenerated from installed packages represented in the JavaScript build, with Vite notices included for generated runtime helpers. These licenses apply to the respective third-party software, not to the Academy's original educational content. Externally hosted services and assets are not covered by this file.\n";
      const review = warnings.size ? "\nItems requiring review:\n" + [...warnings].join("\n") + "\n" : "";
      this.emitFile({ type: "asset", fileName: "THIRD_PARTY_NOTICES.txt", source: header + review + "\n" + sections.join("\n\n--------------------------------------------------\n\n") + "\n" });
    }
  };
}

export default defineConfig({ plugins: [react(), thirdPartyNotices()] });
