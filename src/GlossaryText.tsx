import type {ReactNode} from "react";
import GlossaryTerm from "./GlossaryTerm";

/** Dictionary snapshot from the Academy glossary, with carefully selected Czech inflections.
 * Links are generated only in explicitly marked educational prose, never in links or answers.
 * Regenerate when glossary definitions change; source: slovnik.edu.webett.cz.
 */
type Entry={slug:string;definition:string;forms:readonly string[]};
const entries:Entry[]=[
  {
    "slug": "ai-act",
    "definition": "Evropské nařízení, které stanoví pravidla pro vývoj a používání AI. Požadavky se liší podle rizika systému a role organizace.",
    "forms": [
      "AI Act",
      "EU AI Act"
    ]
  },
  {
    "slug": "ai-scribe",
    "definition": "AI nástroj, který připraví návrh zdravotnického zápisu, často na základě rozhovoru lékaře s pacientem.",
    "forms": [
      "AI scribe (ambientní AI scribe)",
      "AI scribe",
      "ambientní AI scribe"
    ]
  },
  {
    "slug": "ais",
    "definition": "Program, ve kterém ordinace vede dokumentaci, předpisy a další část své každodenní práce.",
    "forms": [
      "AIS",
      "ambulantní informační systém",
      "ambulantním informačním systému"
    ]
  },
  {
    "slug": "anonymizace",
    "definition": "Úprava údajů tak, aby podle dostupných možností již nešlo zjistit, komu patří.",
    "forms": [
      "Anonymizace",
      "anonymizace",
      "anonymizaci",
      "anonymizací"
    ]
  },
  {
    "slug": "api",
    "definition": "Způsob, jakým spolu dva počítačové systémy bezpečně předávají požadavky a informace.",
    "forms": [
      "API"
    ]
  },
  {
    "slug": "atc",
    "definition": "Systém, který řadí léčivé látky do skupin podle toho, na co se používají.",
    "forms": [
      "ATC klasifikace léčiv"
    ]
  },
  {
    "slug": "auditni-zaznam",
    "definition": "Záznam, podle kterého lze zpětně zjistit, kdo kdy přistoupil do systému nebo něco změnil.",
    "forms": [
      "Auditní záznam",
      "auditní záznam",
      "auditního záznamu",
      "auditní záznamy"
    ]
  },
  {
    "slug": "automation-bias",
    "definition": "Sklon příliš důvěřovat automatickému doporučení, i když jiné informace ukazují něco jiného.",
    "forms": [
      "Automation bias (přehnaná důvěra v automatizaci)",
      "automation bias"
    ]
  },
  {
    "slug": "bias-ai",
    "definition": "Systematické zkreslení výsledků AI. Například může fungovat hůře u pacientů, kteří byli málo zastoupeni v datech.",
    "forms": [
      "Bias (zkreslení) u AI"
    ]
  },
  {
    "slug": "cds",
    "definition": "Nástroj, který lékaře upozorňuje na možné problémy nebo mu nabízí informace pro rozhodování.",
    "forms": [
      "CDS",
      "CDSS"
    ]
  },
  {
    "slug": "cloud",
    "definition": "Používání softwaru nebo ukládání údajů na vzdálených serverech místo pouze na počítači v ordinaci.",
    "forms": [
      "Cloud"
    ]
  },
  {
    "slug": "digitalizace",
    "definition": "Převod papírových informací a pracovních postupů do elektronické podoby.",
    "forms": [
      "Digitalizace"
    ]
  },
  {
    "slug": "digitalni-transformace",
    "definition": "Změna způsobu práce díky digitálním nástrojům. Nejde jen o nahrazení papíru obrazovkou.",
    "forms": [
      "Digitální transformace"
    ]
  },
  {
    "slug": "dpia",
    "definition": "Posouzení, jaká rizika pro soukromí pacientů může přinášet plánované používání systému nebo služby.",
    "forms": [
      "DPIA (posouzení vlivu na ochranu osobních údajů)"
    ]
  },
  {
    "slug": "eehrxf",
    "definition": "Společný evropský formát, díky kterému si systémy mají snadněji předávat vybrané zdravotní údaje.",
    "forms": [
      "EEHRxF"
    ]
  },
  {
    "slug": "ehds",
    "definition": "Evropská pravidla pro bezpečnější dostupnost a sdílení zdravotních údajů při péči a pro jejich zákonem povolené další využití, například ve výzkumu.",
    "forms": [
      "EHDS"
    ]
  },
  {
    "slug": "ehealth",
    "definition": "Využití digitálních technologií a informačních systémů při poskytování a organizaci zdravotní péče.",
    "forms": [
      "eHealth"
    ]
  },
  {
    "slug": "ehr",
    "definition": "Elektronický soubor zdravotních údajů o pacientovi, například diagnóz, výsledků vyšetření a léků.",
    "forms": [
      "EHR"
    ]
  },
  {
    "slug": "elektronicka-identifikace",
    "definition": "Způsob, jak bezpečně prokázat totožnost při přihlašování k online službám. Použít lze například bankovní identitu nebo NIA ID.",
    "forms": [
      "Elektronická identifikace (NIA, bankovní identita)",
      "elektronická identifikace",
      "elektronické identifikace",
      "bankovní identitu",
      "bankovní identita",
      "Identitu občana",
      "Identita občana"
    ]
  },
  {
    "slug": "elektronicka-zdravotnicka-dokumentace",
    "definition": "Zdravotnická dokumentace vedená v elektronické podobě místo na papíře. Musí splňovat zákonná pravidla.",
    "forms": [
      "Elektronická zdravotnická dokumentace",
      "elektronická zdravotnická dokumentace",
      "elektronické zdravotnické dokumentace"
    ]
  },
  {
    "slug": "elektronicky-podpis",
    "definition": "Způsob elektronického podepsání dokumentu. Různé druhy podpisu mají různé právní účinky.",
    "forms": [
      "Elektronický podpis"
    ]
  },
  {
    "slug": "emergentni-zdravotni-zaznam",
    "definition": "Část sdíleného záznamu s údaji důležitými při akutní péči, například alergiemi, krevní skupinou nebo léky.",
    "forms": [
      "Emergentní zdravotní záznam"
    ]
  },
  {
    "slug": "epoukaz",
    "definition": "Elektronický předpis na zdravotnický prostředek, například pomůcku pro pacienta.",
    "forms": [
      "ePoukaz",
      "ePoukazu",
      "ePoukazem",
      "ePoukazy"
    ]
  },
  {
    "slug": "erecept",
    "definition": "Elektronický recept, který lékař vystaví a lékárna podle něj může vydat lék.",
    "forms": [
      "eRecept",
      "eReceptu",
      "eRecepty",
      "eReceptem"
    ]
  },
  {
    "slug": "ezadanka",
    "definition": "Elektronická žádanka na další zdravotní službu nebo vyšetření, kterou lze předat a sledovat v systému.",
    "forms": [
      "eŽádanka",
      "eŽádanky",
      "eŽádanku",
      "eŽádance",
      "eŽádankou"
    ]
  },
  {
    "slug": "ezkarta",
    "definition": "Mobilní aplikace, ve které si pacient může prohlédnout vybrané zdravotní údaje a služby.",
    "forms": [
      "EZKarta (Elektronická zdravotní karta)",
      "EZKarta",
      "EZKarty",
      "EZKartu",
      "EZKartě"
    ]
  },
  {
    "slug": "gdpr",
    "definition": "Evropská pravidla, jak se mají chránit osobní údaje, včetně zdravotních informací pacientů.",
    "forms": [
      "GDPR"
    ]
  },
  {
    "slug": "generativni-ai",
    "definition": "AI, která podle zadání vytváří text, obrázky nebo jiné výstupy.",
    "forms": [
      "Generativní AI",
      "generativní AI",
      "generativní umělá inteligence"
    ]
  },
  {
    "slug": "halucinace-ai",
    "definition": "Chybná nebo vymyšlená informace, kterou AI podá přesvědčivě jako správnou.",
    "forms": [
      "Halucinace AI (konfabulace)",
      "halucinace AI",
      "halucinaci AI",
      "halucinacím AI"
    ]
  },
  {
    "slug": "hdab",
    "definition": "Instituce, která podle EHDS rozhoduje o přístupu ke zdravotním údajům pro povolené další využití, například výzkum.",
    "forms": [
      "HDAB – subjekt pro přístup ke zdravotním údajům"
    ]
  },
  {
    "slug": "healthdata-eu",
    "definition": "Evropská infrastruktura, která umožní za stanovených pravidel využívat zdravotní údaje například pro výzkum nebo plánování zdravotní péče.",
    "forms": [
      "HealthData@EU"
    ]
  },
  {
    "slug": "hl7-fhir",
    "definition": "Standard, díky kterému si různé zdravotnické systémy mohou předávat informace ve společně popsané podobě.",
    "forms": [
      "HL7 FHIR",
      "FHIR"
    ]
  },
  {
    "slug": "identifikator-elektronickeho-predpisu",
    "definition": "Jedinečný kód, podle kterého lze v oprávněném systému vyhledat konkrétní eRecept nebo ePoukaz.",
    "forms": [
      "Identifikátor elektronického předpisu",
      "identifikátor elektronického předpisu",
      "identifikátor eReceptu",
      "identifikátor ePoukazu"
    ]
  },
  {
    "slug": "integrace",
    "definition": "Propojení dvou systémů tak, aby si předávaly informace nebo na sebe navazovaly jejich funkce.",
    "forms": [
      "Integrace",
      "integrace systémů",
      "systémová integrace"
    ]
  },
  {
    "slug": "interoperabilita",
    "definition": "Schopnost různých systémů předat si informaci tak, aby jí druhý systém také správně rozuměl.",
    "forms": [
      "Interoperabilita",
      "interoperabilita",
      "interoperability",
      "interoperabilitu",
      "interoperabilní"
    ]
  },
  {
    "slug": "klinicka-terminologie",
    "definition": "Společný slovník názvů a kódů, díky kterému různé systémy stejně označují klinické pojmy.",
    "forms": [
      "Klinická terminologie"
    ]
  },
  {
    "slug": "klinicke-workflow",
    "definition": "Jednotlivé kroky péče – od požadavku lékaře až po výsledek a navazující rozhodnutí.",
    "forms": [
      "Klinické workflow",
      "klinické workflow",
      "klinického workflow"
    ]
  },
  {
    "slug": "kmenove-registry",
    "definition": "Základní evidence, které pomáhají jednoznačně identifikovat pacienty, zdravotníky a poskytovatele.",
    "forms": [
      "Kmenové zdravotnické registry",
      "kmenové zdravotnické registry",
      "kmenových zdravotnických registrů",
      "kmenové registry"
    ]
  },
  {
    "slug": "kyberneticky-incident",
    "definition": "Událost, při které může být ohroženo fungování systému nebo bezpečnost uložených údajů.",
    "forms": [
      "Kybernetický incident",
      "kybernetický incident",
      "kybernetického incidentu"
    ]
  },
  {
    "slug": "lekovy-zaznam",
    "definition": "Přehled elektronicky předepsaných a vydaných léků, do kterého mohou oprávněné osoby nahlížet podle pravidel.",
    "forms": [
      "Lékový záznam",
      "lékový záznam",
      "lékového záznamu",
      "lékovém záznamu",
      "lékovým záznamem"
    ]
  },
  {
    "slug": "lidsky-dohled",
    "definition": "Možnost, aby člověk výstup AI skutečně zkontroloval a v případě potřeby jej opravil nebo odmítl.",
    "forms": [
      "Lidský dohled",
      "lidský dohled",
      "lidského dohledu"
    ]
  },
  {
    "slug": "llm",
    "definition": "Typ AI modelu, který umí pracovat s textem, rozumět zadání a vytvářet odpovědi.",
    "forms": [
      "LLM"
    ]
  },
  {
    "slug": "loinc",
    "definition": "Mezinárodní systém kódů pro jednotné označování laboratorních vyšetření a dalších měření.",
    "forms": [
      "LOINC"
    ]
  },
  {
    "slug": "mdr",
    "definition": "Evropská pravidla pro zdravotnické prostředky. Mohou se vztahovat i na určitý zdravotnický software.",
    "forms": [
      "MDR"
    ]
  },
  {
    "slug": "metadata",
    "definition": "Doplňující údaje o záznamu – například kdo ho vytvořil, kdy a odkud pochází.",
    "forms": [
      "Metadata"
    ]
  },
  {
    "slug": "mkn-10",
    "definition": "Desátá revize klasifikace nemocí, která se používá ke kódování diagnóz.",
    "forms": [
      "MKN-10"
    ]
  },
  {
    "slug": "mkn-11",
    "definition": "Novější, jedenáctá revize mezinárodní klasifikace nemocí vydávaná WHO.",
    "forms": [
      "MKN-11"
    ]
  },
  {
    "slug": "monitorovani-ai",
    "definition": "Průběžná kontrola, zda AI po zavedení do praxe funguje bezpečně a nedělá nové chyby.",
    "forms": [
      "Monitorování AI po nasazení"
    ]
  },
  {
    "slug": "myhealth-eu",
    "definition": "Evropská síť pro bezpečnou výměnu vybraných zdravotních informací při péči v jiné zemi EU.",
    "forms": [
      "MyHealth@EU"
    ]
  },
  {
    "slug": "nclp",
    "definition": "Český seznam standardních názvů a kódů laboratorních vyšetření pro elektronickou výměnu.",
    "forms": [
      "NČLP (Národní číselník laboratorních položek)"
    ]
  },
  {
    "slug": "nis",
    "definition": "Program, který nemocnici pomáhá vést klinické a provozní informace.",
    "forms": [
      "NIS",
      "nemocniční informační systém"
    ]
  },
  {
    "slug": "nis2",
    "definition": "Evropská pravidla kybernetické bezpečnosti a jejich české provedení pro vymezené organizace a služby.",
    "forms": [
      "NIS2 a český zákon o kybernetické bezpečnosti"
    ]
  },
  {
    "slug": "nrpzs",
    "definition": "Národní registr poskytovatelů zdravotních služeb – celostátní evidence poskytovatelů zdravotních služeb v ČR, včetně míst a oborů poskytované péče.",
    "forms": [
      "NRPZS",
      "Národní registr poskytovatelů zdravotních služeb"
    ]
  },
  {
    "slug": "npez",
    "definition": "Portál eZdraví, který slouží jako rozcestník a bezpečný vstup do vybraných českých digitálních zdravotních služeb.",
    "forms": [
      "NPEZ / portál eZdraví",
      "NPEZ",
      "portál eZdraví",
      "portálu eZdraví"
    ]
  },
  {
    "slug": "pacientsky-souhrn",
    "definition": "Stručný přehled nejdůležitějších údajů o pacientovi, například alergií, diagnóz a léků.",
    "forms": [
      "Pacientský souhrn",
      "pacientský souhrn",
      "pacientského souhrnu"
    ]
  },
  {
    "slug": "poruseni-zabezpeceni-osobnich-udaju",
    "definition": "Situace, kdy se osobní údaje ztratí, uniknou, změní nebo se k nim dostane někdo neoprávněný.",
    "forms": [
      "Porušení zabezpečení osobních údajů"
    ]
  },
  {
    "slug": "poskytovatel-ai-act",
    "definition": "Člověk nebo organizace, která AI systém vyvíjí nebo jej nechá vyvinout a uvádí ho na trh či do provozu pod svým jménem.",
    "forms": [
      "Poskytovatel systému AI (AI Act)"
    ]
  },
  {
    "slug": "primarni-pouziti-zdravotnich-dat",
    "definition": "Využití zdravotních údajů přímo při péči o pacienta, například při léčbě, vyšetření nebo předepisování léků.",
    "forms": [
      "Primární využití zdravotních údajů"
    ]
  },
  {
    "slug": "prompt",
    "definition": "Zadání nebo otázka, kterou člověk napíše AI.",
    "forms": [
      "Prompt"
    ]
  },
  {
    "slug": "provozovatel-ai-act",
    "definition": "Člověk nebo organizace, která při své pracovní činnosti používá AI systém. Může jít například o nemocnici nebo ambulanci.",
    "forms": [
      "Zavádějící subjekt (AI Act)"
    ]
  },
  {
    "slug": "pseudonymizace",
    "definition": "Nahrazení údajů, podle nichž lze člověka poznat, například kódem. Klíč k přiřazení osoby se uchovává odděleně.",
    "forms": [
      "Pseudonymizace",
      "pseudonymizace",
      "pseudonymizaci",
      "pseudonymizované údaje"
    ]
  },
  {
    "slug": "registr-opravneni",
    "definition": "Služba, která eviduje, kdo má oprávnění přistupovat k určitým zdravotním službám a údajům.",
    "forms": [
      "Registr oprávnění",
      "registru oprávnění"
    ]
  },
  {
    "slug": "rizeni-pristupovych-opravneni",
    "definition": "Nastavení, kdo smí vidět nebo upravovat které údaje podle své pracovní role.",
    "forms": [
      "Řízení přístupových oprávnění"
    ]
  },
  {
    "slug": "sdileny-zdravotni-zaznam",
    "definition": "Vybrané zdravotní údaje pacienta, které mohou být podle pravidel dostupné také dalším oprávněným zdravotníkům.",
    "forms": [
      "Sdílený zdravotní záznam",
      "sdílený zdravotní záznam",
      "sdíleného zdravotního záznamu",
      "sdíleném zdravotním záznamu"
    ]
  },
  {
    "slug": "sekundarni-pouziti-zdravotnich-dat",
    "definition": "Využití zdravotních údajů pro jiný zákonem povolený účel než péči o konkrétního pacienta, například pro výzkum.",
    "forms": [
      "Sekundární využití zdravotních údajů"
    ]
  },
  {
    "slug": "sifrovani",
    "definition": "Ochrana dat tak, aby je bez správného klíče nemohl přečíst někdo nepovolaný.",
    "forms": [
      "Šifrování",
      "šifrování",
      "šifrovaná data"
    ]
  },
  {
    "slug": "smlouva-o-zpracovani",
    "definition": "Smlouva, která stanoví, jak smí dodavatel pracovat s osobními údaji jménem ordinace nebo jiného správce.",
    "forms": [
      "Smlouva o zpracování osobních údajů"
    ]
  },
  {
    "slug": "snomed-ct",
    "definition": "Mezinárodní systém pojmů a kódů pro jednotné zaznamenávání klinických informací.",
    "forms": [
      "SNOMED CT"
    ]
  },
  {
    "slug": "spravce-a-zpracovatel",
    "definition": "Správce rozhoduje, proč a jak se budou osobní údaje používat. Zpracovatel s nimi pracuje podle jeho pokynů.",
    "forms": [
      "Správce × zpracovatel (GDPR)"
    ]
  },
  {
    "slug": "strojove-uceni-ml",
    "definition": "Způsob vytváření AI, při kterém se systém učí rozpoznávat vzorce z příkladů a dat.",
    "forms": [
      "Strojové učení (ML)"
    ]
  },
  {
    "slug": "strukturovana-data",
    "definition": "Údaje zapsané do jasně určených polí, se kterými mohou počítačové systémy dále pracovat.",
    "forms": [
      "Strukturovaná data"
    ]
  },
  {
    "slug": "synteticka-data",
    "definition": "Uměle vytvořená data, která připomínají skutečná, ale nemusí pocházet od reálných pacientů.",
    "forms": [
      "Syntetická data",
      "syntetická data",
      "syntetických dat",
      "syntetické scénáře"
    ]
  },
  {
    "slug": "system-ehr-ehds",
    "definition": "Software pro práci s vybranými zdravotními údaji, například pacientským souhrnem či eRecepty, určený výrobcem pro péči o pacienta nebo přístup pacienta k údajům.",
    "forms": [
      "Systém EHR (podle EHDS)"
    ]
  },
  {
    "slug": "telemedicina",
    "definition": "Poskytování zdravotní péče na dálku pomocí telefonu, videa nebo jiných digitálních prostředků.",
    "forms": [
      "Telemedicína",
      "telemedicína",
      "telemedicínu",
      "telemedicíny"
    ]
  },
  {
    "slug": "udaje-o-zdravotnim-stavu",
    "definition": "Informace o tělesném nebo duševním zdraví člověka, které podléhají zvláštní ochraně.",
    "forms": [
      "Údaje o zdravotním stavu"
    ]
  },
  {
    "slug": "umela-inteligence-ai",
    "definition": "Označení pro počítačové systémy, které umí například rozpoznávat vzorce, odhadovat vývoj nebo vytvářet text.",
    "forms": [
      "Umělá inteligence (AI)"
    ]
  },
  {
    "slug": "validace-ai",
    "definition": "Ověření, že AI nástroj pracuje dostatečně přesně a bezpečně pro účel, ke kterému ho chceme používat.",
    "forms": [
      "Validace AI",
      "validace AI",
      "klinická validace AI"
    ]
  },
  {
    "slug": "vicefaktorove-overeni-mfa",
    "definition": "Přihlášení, při kterém je potřeba více než jeden typ ověření, například heslo a kód v telefonu.",
    "forms": [
      "Vícefaktorové ověření (MFA)"
    ]
  },
  {
    "slug": "zalohovani",
    "definition": "Vytváření kopií důležitých údajů, aby je bylo možné obnovit po poruše nebo útoku.",
    "forms": [
      "Zálohování"
    ]
  },
  {
    "slug": "ai-gramotnost",
    "definition": "Schopnost rozumně a bezpečně používat AI: vědět, co umí, kde může chybovat a kdy je nutná kontrola člověkem.",
    "forms": [
      "AI gramotnost",
      "AI gramotnosti"
    ]
  },
  {
    "slug": "eneschopenka",
    "definition": "Elektronický systém, ve kterém lékař vystavuje a spravuje pracovní neschopnost pacienta.",
    "forms": [
      "eNeschopenka (ePN)"
    ]
  },
  {
    "slug": "eockovani",
    "definition": "Elektronická evidence očkování. Lékař zapisuje očkování do ISIN a pacient může dostupné záznamy najít také v eReceptu nebo EZKartě.",
    "forms": [
      "eOčkování a elektronický očkovací průkaz",
      "eOčkování"
    ]
  },
  {
    "slug": "dicom",
    "definition": "Mezinárodní standard, který umožňuje ukládat, přenášet a zobrazovat například rentgenové, CT nebo MR snímky.",
    "forms": [
      "DICOM"
    ]
  },
  {
    "slug": "pacs",
    "definition": "Systém pro ukládání a prohlížení snímků z rentgenu, CT, MR a dalších zobrazovacích vyšetření.",
    "forms": [
      "PACS"
    ]
  },
  {
    "slug": "samd",
    "definition": "Software, který je sám zdravotnickým prostředkem, protože je určen k určitému zdravotnickému účelu a splňuje příslušnou právní definici.",
    "forms": [
      "Zdravotnický software (SaMD)"
    ]
  }
];

const aliases=entries.flatMap(entry=>entry.forms.map(form=>({form,entry}))).sort((a,b)=>b.form.length-a.form.length);
const lookup=new Map(aliases.map(a=>[a.form.toLocaleLowerCase("cs"),a.entry]));
const escapeRegExp=(value:string)=>Array.from(value).map(c=>".*+?^$()[]{}|\\".includes(c)?"\\"+c:c).join("");
const matcher=new RegExp("(^|[^\\p{L}\\p{N}])("+aliases.map(a=>escapeRegExp(a.form)).join("|")+")(?![\\p{L}\\p{N}])","giu");

/** Highlight at most two distinct terms per passage. Keep all original text intact. */
export default function GlossaryText({text,limit=2}:{text:string;limit?:number}){
 if(!text)return null;
 const parts:ReactNode[]=[];
 const used=new Set<string>();
 let cursor=0;
 for(const match of text.matchAll(matcher)){
  if(used.size>=limit)break;
  const term=match[2];
  const entry=lookup.get(term.toLocaleLowerCase("cs"));
  if(!entry||used.has(entry.slug))continue;
  const start=(match.index??0)+match[1].length;
  parts.push(text.slice(cursor,start));
  parts.push(<GlossaryTerm key={start} label={term} slug={entry.slug} definition={entry.definition}/>);
  used.add(entry.slug);
  cursor=start+term.length;
 }
 if(!parts.length)return <>{text}</>;
 parts.push(text.slice(cursor));
 return <>{parts}</>;
}
