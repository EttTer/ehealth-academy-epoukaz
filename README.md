# Webett eHealth Akademie – EHA-02 ePoukaz

**Web:** https://epoukaz.edu.webett.cz/  
**Účel:** Vystavení ePoukazu, předání identifikátoru, uplatnění, výdej a komplikace v ordinaci. Není to návod pro konkrétní AIS ani systém pro práci s pacientskými daty.

## Provoz a analytika
React + TypeScript + Vite, Netlify z `main`; `npm install`, `npm run typecheck`, `npm run build` (publikace `dist`). Závěrečný test je součástí `src/App.tsx`. Při souhlasu Clarity `z0kv6j7evr` s `module_id=EHA-02`: `module_started`, `section_viewed`, `quiz_completed`, `quiz_result_viewed`, dobrovolné `module_feedback_yes/partial/no`. Skóre je štítek relace, nikoli jednoznačný záznam každého testového pokusu.

## Evidence revize
| Položka | Stav |
| --- | --- |
| Verze aplikace | **1.0.7** (`package.json`); obsahový návrh **1.2** |
| Poslední doložená obsahová kontrola | **19. 10. 2026** – původní písemný záznam; následné klinické iterace viz níže |
| Klinická garance | Odborný referent projektu Webett, rozsah schválení dle [záznamu odborné kontroly](docs/ODBORN%C3%81-RECENZE.md) |
| Rozsah kontroly | Proces vystavení, návaznost výdeje, scénářové komplikace, test a související odkazy |
| Externí recenze | V dostupné evidenci **není doložena nezávislá externí recenze** |
| Uživatelské testování | Formální uživatelská studie nedoložena |
| Další pravidelná kontrola | **Nejpozději 19. 1. 2027**, při změnách pravidel dříve |
| Klinické iterace | Zadavatelka 24. 11. 2026 potvrdila dokončení třetí klinické kontroly; individuální externí recenzní protokol není v repozitáři doložen. |\n| Iterace 24. 11. 2026 | Doplněn postup vystavení, preskripční omezení, schvalování a listinné výjimky; následně opravena aktuálnost rozhraní a posloupnost schvalování. |\n| Otevřené body | Průběžné ověřování pravidel ePoukazu a zveřejněných příkladů, mobilní a přístupnostní kontrola |

## Primární zdroje
- [SÚKL – konkrétní FAQ k pravidlům od roku 2026](https://sukl.gov.cz/faq/jaka-jsou-pravidla-pro-predepisovani-a-vydej-zdravotnickych-prostredku-od-1-1-2026/)
- [ePreskripce – informace a časté otázky](https://epreskripce.gov.cz/)

Technické změny Clarity v listopadu 2026 **nepředstavují novou obsahovou revizi**.

## Kontextové propojení se Slovníčkem (20. 11. 2026)

Vysvětlující pasáže a některé modelové situace umožňují po kliknutí na odborný termín přečíst stručnou definici a otevřít odpovídající heslo na `https://slovnik.edu.webett.cz/#...`. `src/GlossaryText.tsx` je kopie 85 hesel a jejich definic se zvolenými českými tvary. Po obsahové aktualizaci Slovníčku je nutná synchronizace definic. V rámci této změny nebyly upravovány klinické scénáře, správné odpovědi ani původní datum odborného ověření. Doporučené ověření: `npm run typecheck`, `npm test`, `npm run build` a manuální vyzkoušení na mobilu.

## Doplnění Slovníčku 24. 11. 2026

Zkratka NRPZS v části „Kde ePoukaz vystavím?“ je nyní klikací a vysvětluje Národní registr poskytovatelů zdravotních služeb s přímým odkazem na `https://slovnik.edu.webett.cz/#nrpzs`. Jde o edukační a navigační změnu; testové otázky zůstaly beze změny.

## Iterace 24. 11. 2026 – srozumitelnost v1.0.6

Čtyři kroky schvalování pojišťovnou jsou zobrazeny odděleně se stručným textem, včetně upozornění na platnost a původní zdroje. Praktické situace listinného poukazu používají jednoduché podmínky a příklady; podrobné odkazy na § 28a a SÚKL zůstávají ve zdrojích pod scénářem. Stávající klinická logika, testové otázky a analytika se nemění. Nové znění je určeno k navazující klinické revizi.

## Iterace 24. 11. 2026 – aktuálnost v1.0.7

- Podle [SÚKL, upozornění aktualizované 18. 11. 2026](https://epreskripce.gov.cz/upozorneni-2/) jsou starší rozhraní ePoukazu ukončována ke dni **31. 12. 2026**; požadováno rozhraní 202605A.
- Při schvalování se nyní případné podklady z výdejny uvádějí **před rozhodnutím pojišťovny**, přičemž tato větev není povinná u všech prostředků.
- Při vystavení doplněna jedna věta k povinnému údaji **Párový orgán** u vybraných prostředků, s [oficiálním zdrojem](https://epreskripce.gov.cz/pri-vytvareni-nebo-uprave-epoukazu-lze-vyplnit-udaj-parovy-organ-kterym-se-urcuje-zda-je-zdravotnicky-prostredek-predepsan-pro-levou-stranu-pravou-stranu-nebo-obe-strany-tela/).
- Primární odkaz na obecnou stránku pravidel nahrazen přímým FAQ SÚKL, obecná stránka číselníků VZP ponechána kvůli aktualizacím.
- Beze změny: pět testových otázek, konfigurace analytiky, hlavní grafika a struktura.
