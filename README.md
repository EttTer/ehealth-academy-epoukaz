# Webett eHealth Akademie · EHA-02 ePoukaz v ordinaci

Interaktivní vzdělávací modul pro ambulantní lékaře. Projekt vychází z metodiky **Webett eHealth Akademie v1.1 (19. 10. 2026)** a obsahového návrhu EHA-02 v1.2.

## Aktuální stav

**Obsah schválen odborným referentem 19. 10. 2026.** Klinický případ zůstává ilustrativní a neobsahuje neověřený kód prostředku ani výši úhrady.

## Spuštění

Projekt je React + Vite aplikace. Spuštění: `npm install` a `npm run dev`. Produkční sestavení: `npm run build` (výstup `dist/`). Nasazení na Netlify používá soubor `netlify.toml`.

## Obsah aplikace

1. Aktuální stav ePoukazu, vzdělávací cíle a životní cyklus.
2. Srozumitelný průchod vystavením ePoukazu ve 4 výukových krocích.
3. Komplikace – schválení pojišťovnou, uplatnění a pozdější výdej, technický výpadek.
4. Závěrečný test – 5 scénářových otázek s vysvětlením.

## Metodické zásady

- Primární role: ambulantní lékař.
- Rozlišovat klinickou indikaci, preskripční omezení a úhradové podmínky.
- Rozlišovat vystavení, předání identifikátoru, uplatnění a výdej.
- Jeden samostatný kód na jeden ePoukaz.
- Výjimky pro listinný předpis pouze v zákonném režimu.
- Obecný koncept, nikoliv návod k ovládání konkrétního AIS.
- Žádné reálné osobní či zdravotní údaje, žádná databáze a analytické sledování.

## Zdroje

Primární odkazy na SÚKL, ePreskripci a NZIP jsou umístěny přímo v aplikaci. Poslední obsahová aktualizace: 19. 10. 2026. Doporučená další kontrola: nejpozději 19. 1. 2027.

## Před vydáním

Záznam odborného obsahového schválení: [docs/ODBORNÁ-RECENZE.md](docs/ODBORN%C3%81-RECENZE.md). Technický build a vizuální kontrola jsou samostatné kroky nasazení.
