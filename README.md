# Webett eHealth Akademie – EHA-02 ePoukaz

**Web:** https://epoukaz.edu.webett.cz/  
**Účel:** Vystavení ePoukazu, předání identifikátoru, uplatnění, výdej a komplikace v ordinaci. Není to návod pro konkrétní AIS ani systém pro práci s pacientskými daty.

## Provoz a analytika
React + TypeScript + Vite, Netlify z `main`; `npm install`, `npm run typecheck`, `npm run build` (publikace `dist`). Závěrečný test je součástí `src/App.tsx`. Při souhlasu Clarity `z0kv6j7evr` s `module_id=EHA-02`: `module_started`, `section_viewed`, `quiz_completed`, `quiz_result_viewed`, dobrovolné `module_feedback_yes/partial/no`. Skóre je štítek relace, nikoli jednoznačný záznam každého testového pokusu.

## Evidence revize
| Položka | Stav |
| --- | --- |
| Verze aplikace | **1.0.1** (`package.json`); obsahový návrh **1.2** |
| Poslední doložená obsahová kontrola | **19. 10. 2026** |
| Klinická garance | Odborný referent projektu Webett, rozsah schválení dle [záznamu odborné kontroly](docs/ODBORN%C3%81-RECENZE.md) |
| Rozsah kontroly | Proces vystavení, návaznost výdeje, scénářové komplikace, test a související odkazy |
| Externí recenze | V dostupné evidenci **není doložena nezávislá externí recenze** |
| Uživatelské testování | Formální uživatelská studie nedoložena |
| Další pravidelná kontrola | **Nejpozději 19. 1. 2027**, při změnách pravidel dříve |
| Otevřené body | Průběžné ověřování pravidel ePoukazu a zveřejněných příkladů, mobilní a přístupnostní kontrola |

## Primární zdroje
- [SÚKL – pravidla předepisování a výdeje ZP od roku 2026](https://sukl.gov.cz/zdravotnicke-prostredky/otazky-a-odpovedi-zp/pravidla-pro-predepisovani-a-vydej-zdravotnickych-prostredku-od-1-1-2026/)
- [ePreskripce – informace a časté otázky](https://epreskripce.gov.cz/)

Technické změny Clarity v listopadu 2026 **nepředstavují novou obsahovou revizi**.
