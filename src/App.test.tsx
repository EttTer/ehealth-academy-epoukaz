// @vitest-environment jsdom
import {afterEach,describe,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("EHA-02 regression: teaching interactions and question structure",()=>{
  it("links NRPZS to its exact glossary entry and explains the abbreviation",()=>{
    render(<App/>);
    const nrpzs=screen.getByRole("button",{name:"NRPZS"});
    fireEvent.click(nrpzs);
    const popup=screen.getByRole("note");
    expect(popup.textContent).toContain("Národní registr poskytovatelů zdravotních služeb");
    expect(popup.querySelector("a")?.getAttribute("href")).toBe("https://slovnik.edu.webett.cz/#nrpzs");
    fireEvent.click(screen.getByRole("button",{name:"Zavřít"}));
    expect(screen.queryByRole("note")).toBeNull();
  });

  it("opens the lifecycle and the practical problem scenarios",()=>{
    render(<App/>);
    expect(screen.getByRole("heading",{name:"ePoukaz v ordinaci"})).toBeTruthy();
    fireEvent.click(screen.getByRole("button",{name:"2. Cesta ePoukazu"}));
    fireEvent.click(screen.getByRole("button",{name:/Uplatněný/}));
    expect(screen.getByText(/Pacient poukaz uplatní u oprávněného výdejce/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button",{name:"3. Řešení problémů"}));
    const scenarios=document.querySelectorAll(".problemGrid button");
    expect(scenarios).toHaveLength(4);
    fireEvent.click(screen.getByRole("button",{name:/Prostředek není skladem/}));
    expect(screen.getByText(/Datum platnosti se vztahuje k uplatnění/)).toBeTruthy();
  });


  it("shows access, authoritative reimbursement lists and a clear prescribing workflow",()=>{
    render(<App/>);
    expect(screen.getByText("Kde ePoukaz vystavím?")).toBeTruthy();
    expect(screen.getByRole("link",{name:/aplikaci eRecept Profesionál/}).getAttribute("href")).toContain("mobilni-a-webove-aplikace");
    expect(screen.getByRole("link",{name:/návodu SÚKL/}).getAttribute("href")).toContain("jak-pouzivat-epoukaz");
    fireEvent.click(screen.getByRole("button",{name:"Pokračovat →"}));
    expect(screen.getByRole("link",{name:/aktuální Seznam ZP SÚKL/}).getAttribute("href")).toContain("seznamy-zdravotnickych-prostredku");
    expect(screen.getByRole("link",{name:/úhradový katalog a metodika VZP/}).getAttribute("href")).toContain("zdravotnicke-prostredky");
  });

  it("documents current SÚKL cutoff and required paired-organ field while keeping VZP link",()=>{
    render(<App/>);
    expect(screen.getByRole("link",{name:/Pravidla ePoukazu od 1\\. 1\\. 2026/}).getAttribute("href")).toBe("https://sukl.gov.cz/faq/jaka-jsou-pravidla-pro-predepisovani-a-vydej-zdravotnickych-prostredku-od-1-1-2026/");
    fireEvent.click(screen.getByRole("button",{name:"Pokračovat →"}));
    expect(screen.getByRole("link",{name:/Párový orgán/}).getAttribute("href")).toContain("pri-vytvareni-nebo-uprave-epoukazu");
    expect(screen.getByText(/levá, pravá nebo obě strany/)).toBeTruthy();
    expect(screen.getByRole("link",{name:/úhradový katalog a metodika VZP/}).getAttribute("href")).toBe("https://www.vzp.cz/poskytovatele/ciselniky/zdravotnicke-prostredky");
    fireEvent.click(screen.getByRole("button",{name:"Pokračovat →"}));
    fireEvent.click(screen.getByRole("button",{name:"Pokračovat →"}));
    expect(screen.getByText(/změna k 31\\. 12\\. 2026/)).toBeTruthy();
    expect(screen.getByText(/vypnuta starší rozhraní ePoukazu/)).toBeTruthy();
    expect(screen.queryByText(/30\\. listopadu 2026/)).toBeNull();
  });

  it("explains insurer approval once, only in the initial lifecycle phase",()=>{
    render(<App/>);
    fireEvent.click(screen.getByRole("button",{name:"2. Cesta ePoukazu"}));
    expect(screen.getAllByText("Co když je třeba souhlas pojišťovny?")).toHaveLength(1);
    expect(document.querySelectorAll(".approvalStep")).toHaveLength(4);
    expect(screen.getByText("Vystavím ePoukaz ke schválení")).toBeTruthy();
    expect(screen.getByText("Pojišťovna rozhodne")).toBeTruthy();
    expect(Array.from(document.querySelectorAll(".approvalStep strong")).map(x=>x.textContent)).toEqual(["Vystavím ePoukaz ke schválení","Případně se doplní podklady z výdejny","Pojišťovna rozhodne","Výdej až po schválení"]);
    expect(screen.getByText(/teprve po dodání podkladů jde ePoukaz k posouzení pojišťovnou/)).toBeTruthy();
    expect(screen.getByText("Výdej až po schválení")).toBeTruthy();
    expect(screen.getByText(/platnost alespoň 90 dní/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button",{name:/Uplatněný/}));
    expect(screen.queryByText("Co když je třeba souhlas pojišťovny?")).toBeNull();
    fireEvent.click(screen.getByRole("button",{name:/Vydaný/}));
    expect(screen.queryByText("Co když je třeba souhlas pojišťovny?")).toBeNull();
    fireEvent.click(screen.getByRole("button",{name:/Vystavený/}));
    expect(screen.getAllByText("Co když je třeba souhlas pojišťovny?")).toHaveLength(1);
  });

  it("distinguishes §28a paper exceptions and the urgency condition",()=>{
    render(<App/>);
    fireEvent.click(screen.getByRole("button",{name:"3. Řešení problémů"}));
    fireEvent.click(screen.getByRole("button",{name:/Závažný technický výpadek/}));
    expect(document.querySelectorAll(".exceptionChecklist li")).toHaveLength(2);
    expect(document.querySelector(".scenario")?.textContent).toContain("Pacient pomůcku potřebuje bezodkladně");
    expect(document.querySelector(".scenarioPart")?.textContent).not.toContain("§ 28a");
    fireEvent.click(screen.getByRole("button",{name:/Jiný zákonný důvod papírového poukazu/}));
    expect(document.querySelector(".scenario")?.textContent).toContain("Zvláštní poukaz pro sebe nebo blízkou osobu");
    expect(document.querySelector(".scenario")?.textContent).toContain("Péče u pacienta doma");
    expect(document.querySelectorAll(".legalExceptions li")).toHaveLength(3);
    expect(document.querySelector(".scenarioPart")?.textContent).not.toContain("§ 28a");
    expect(document.querySelector(".scenario")?.textContent).toContain("Papírovou variantu lze použít jen ve výjimečných případech");
    expect(screen.getAllByRole("link",{name:/Zákon č. 375\/2022/}).some(a=>a.getAttribute("href")?.includes("#p28a"))).toBe(true);
  });

  it("checks all five 3-option questions, correct scoring and repeat",()=>{
    render(<App/>);
    fireEvent.click(screen.getByRole("button",{name:"4. Znalostní test"}));
    const correctIndices=[0,1,2,0,1] as const;
    const seen=new Set<string>();
    for(let i=0;i<correctIndices.length;i++){
      const prompt=screen.getByRole("heading",{level:3}).textContent||"";
      expect(prompt.length).toBeGreaterThan(15);
      seen.add(prompt);
      const options=Array.from(document.querySelectorAll<HTMLButtonElement>(".answers button"));
      expect(options).toHaveLength(3);
      expect(new Set(options.map(b=>b.textContent))).toHaveProperty("size",3);
      fireEvent.click(options[correctIndices[i]]);
      expect(screen.getByText(/Správně/)).toBeTruthy();
      fireEvent.click(screen.getByRole("button",{name:i===4?/Zobrazit výsledky/:/Další otázka/}));
    }
    expect(seen.size).toBe(5);
    expect(screen.getByRole("heading",{name:"5 / 5"})).toBeTruthy();
    fireEvent.click(screen.getByRole("button",{name:/Opakovat test/}));
    expect(screen.getByRole("heading",{name:"Co už víte?"})).toBeTruthy();
  });
});
