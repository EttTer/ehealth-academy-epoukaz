# Webett eHealth Akademie · EHA-02 ePoukaz v ordinaci

Interaktivní vzdělávací modul pro ambulantní lékaře. Projekt vychází z metodiky **Webett eHealth Akademie v1.1 (19. 10. 2026)** a obsahového návrhu EHA-02 v1.2.

## Aktuální stav

**Edukační prototyp – NEPUBLIKOVAT jako odborně revidovaný modul.** Odborná recenze a ověření konkrétní ortézy dosud neproběhly. Fiktivní scénář neobsahuje kód konkrétní pomůcky ani úhradu.

## Spuštění

Projekt je statická aplikace bez build procesu a bez serveru. Otevřete `index.html` v prohlížeči. Pro lokální vývoj můžete využít libovolný statický webový server (např. `python -m http.server 8000`).

## Obsah aplikace

1. Aktuální stav ePoukazu, vzdělávací cíle a životní cyklus.
2. Modelová preskripce ortézy – 4 rozhodovací kroky.
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

Viz [docs/ODBORNÁ-RECENZE.md](docs/ODBORN%C3%81-RECENZE.md).

Propojení s hlavní Akademií a nasazení na veřejnou doménu až po schválení odborným garantem a dokončení kontroly.
