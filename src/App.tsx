import GlossaryText from "./GlossaryText";
import GlossaryTerm from "./GlossaryTerm";
declare global { interface Window { academyTrack?: (event: string, parameters?: Record<string, string | number>) => void; academyAnalyticsReady?: boolean; } }
import { useState, useEffect, useRef } from "react";
type Q={q:string;a:string[];correct:number;why:string};
const tabs=["1. Vystavení","2. Cesta ePoukazu","3. Řešení problémů","4. Znalostní test"];
const sources=[
 ["Pravidla ePoukazu od 1. 1. 2026","https://sukl.gov.cz/zdravotnicke-prostredky/otazky-a-odpovedi-zp/pravidla-pro-predepisovani-a-vydej-zdravotnickych-prostredku-od-1-1-2026/"],
 ["SÚKL – odborná prezentace","https://sukl.gov.cz/wp-content/uploads/2026/01/Prezentace_1_Pracovni-skupina-pro-farmacii_20251216.pdf"],
 ["Předání identifikátoru","https://epreskripce.gov.cz/faq/4-jakym-zpusobem-je-mozne-predat-identifikator-pacientovi/"],
 ["Schvalování prostředků pojišťovnou","https://epreskripce.gov.cz/wp-content/uploads/2025/11/ZP_vyzadujici_schvaleni_pojistovnou.pdf"],
 ["Platnost a prodloužení","https://epreskripce.gov.cz/faq/30-jakou-je-mozne-nastavit-platnost-epoukazu-a-kdo-ji-muze-prodlouzit/"],
 ["SÚKL – změna rozhraní od prosince 2026","https://epreskripce.gov.cz/upozorneni-2/"],
 ["SÚKL – jak začít s ePoukazem","https://epreskripce.gov.cz/jak-pouzivat-epoukaz/"],
 ["SÚKL – seznam hrazených zdravotnických prostředků","https://sukl.gov.cz/prumysl/zdravotnicke-prostredky/kategorizace-a-uhradova-regulace/seznamy-zdravotnickych-prostredku/"],
 ["VZP – úhradový katalog a metodika","https://www.vzp.cz/poskytovatele/ciselniky/zdravotnicke-prostredky"],
 ["Zákon č. 375/2022 Sb., § 28a","https://www.zakonyprolidi.cz/cs/2022-375#p28a"],
 ["SÚKL – schvalování ePoukazů pojišťovnou","https://epreskripce.gov.cz/jak-predepisovat-epoukaz-na-zdravotnicke-prostredky-ktere-schvaluje-zdravotni-pojistovna/"],
 ["SÚKL – aplikace eRecept pro profesionály","https://epreskripce.gov.cz/aplikace-erecept/mobilni-a-webove-aplikace/"],
 ["SÚKL – výjimky pro listinné poukazy","https://sukl.gov.cz/faq/jaka-jsou-pravidla-pro-predepisovani-a-vydej-zdravotnickych-prostredku-od-1-1-2026/"]];
const issues=[
 {title:"Pojišťovna vyžaduje doplnění",category:"Schvalování",situation:"Zdravotní pojišťovna vrátila poukaz s požadavkem na další informace.",action:"Načtěte poukaz, doplňte požadované údaje a znovu jej předejte ke schválení. Při zamítnutí vysvětlete pacientovi další postup; zamítnutí neumožňuje výdej na úhradu pojišťovny.",patient:"Poukaz ještě nebyl schválen. Doplním požadované údaje a budu vás informovat o dalším postupu.",caution:"Průvodku lze předat i před schválením. Pokud je pro úhradu nutné předchozí schválení, nelze bez něj prostředek vydat na úhradu pojišťovny; nezaměňujte tento postup s běžným prodejem.",source:3},
 {title:"Prostředek není skladem",category:"Výdej",situation:"Pacient ePoukaz včas uplatnil, ale výdejna očekává dodávku až po datu platnosti.",action:"Ověřte stav poukazu a uplatnění u výdejce. Datum platnosti se vztahuje k uplatnění; vlastní výdej může proběhnout později. Nevystavujte automaticky duplicitní poukaz.",patient:"Pokud výdejna poukaz včas uplatnila, nemusí datum jeho platnosti znamenat konec možnosti vydání.",caution:"Pokud poukaz nebyl včas uplatněn, jde o jiný případ. Záměna a částečný výdej mají vlastní pravidla.",source:1},
 {title:"Závažný technický výpadek",category:"Bezpečnost",situation:"Závažná porucha neumožňuje elektronický poukaz vystavit.",action:"Ověřte § 28a odst. 1 písm. c) zákona č. 375/2022 Sb.: musí jít současně o závažnou technickou překážku vystavení ePoukazu a o bezodkladnou potřebu předpisu vzhledem ke zdravotnímu stavu pacienta. Pokud obě podmínky platí, vystavte listinný poukaz a uveďte na něm konkrétní důvod. Jinak využijte dostupnou elektronickou cestu nebo vyčkejte na její obnovení podle klinické naléhavosti.",patient:"Elektronický systém nefunguje. Ověřím, zda je vzhledem k vašemu zdravotnímu stavu možné vystavit poukaz výjimečně na papíře.",caution:"Samotný výpadek, nepohodlí ani zastaralý AIS automaticky neopravňují vystavit listinný poukaz. Při akutní potřebě postupujte podle zákonných podmínek.",source:9},
 {title:"Jiný zákonný důvod papírového poukazu",category:"Výjimky",situation:"Pacient se ptá, zda si může běžně vyžádat papírový poukaz.",action:"Ověřte, zda je splněna některá ze zákonných výjimek podle § 28a zákona č. 375/2022 Sb. Pokud ano, vždy na listinném poukazu uveďte konkrétní důvod jeho vystavení.",patient:"Standardně se vystavuje ePoukaz. Samotná preference papíru není zákonnou výjimkou.",caution:"Rodinná výjimka platí jen pro zákonem uvedené osoby a režim úhrady; návštěvní služba ani výpadek samy o sobě bezodkladnost nenahrazují. Přesný text je v § 28a zákona č. 375/2022 Sb.",source:9}
];
const test:Q[]=[
 {q:"Pacient nemá mobil ani e-mail. Jak mu předat ePoukaz?",a:["Vytištěnou průvodkou.","Není to možné.","Pouze přes aplikaci."],correct:0,why:"Průvodka s identifikátorem je přípustný způsob předání."},
 {q:"Lze na jeden ePoukaz uvést dva různé kódy zdravotnických prostředků?",a:["Ano, jsou-li související.","Ne; jedna samostatně kódovaná položka na jeden ePoukaz.","Ano, při stejné diagnóze."],correct:1,why:"Pro každý samostatný kód je potřeba odpovídající poukaz."},
 {q:"Co znamená dožádání informací od pojišťovny?",a:["Poukaz je schválen.","Poukaz se automaticky mění na listinný.","Předepisující doplní informace a poukaz znovu předá."],correct:2,why:"Dožádání není schválení."},
 {q:"Pacient včas uplatnil poukaz, ale prostředek bude vydán později. Co platí?",a:["Výdej může podle pravidel nastat i po datu platnosti.","Vždy musíte vystavit nový.","Poukaz nelze nikdy použít."],correct:0,why:"Datum platnosti označuje dobu pro uplatnění, nikoli nutně konec výdeje."},
 {q:"Kdy lze vystavit listinný poukaz?",a:["Kdykoliv podle přání pacienta.","Jen při zákonné výjimce a s uvedením důvodu.","Vždy při pomalém AIS."],correct:1,why:"Výjimky mají konkrétní zákonné podmínky."}
];

type ModuleRating="yes"|"partial"|"no";
const ratingKey="webett_eha02_module_rating_v1";
function ModuleRatingPanel(){
 const [rating,setRating]=useState<ModuleRating|null>(()=>{
  try{
   const saved=sessionStorage.getItem(ratingKey);
   return saved==="yes"||saved==="partial"||saved==="no"?saved:null;
  }catch{return null;}
 });
 function rateModule(value:ModuleRating){
  if(rating!==null)return;
  setRating(value);
  try{sessionStorage.setItem(ratingKey,value);}catch{}
  // Respect the existing Clarity consent bridge; no analytics without opt-in.
  window.academyTrack?.("module_feedback_"+value,{module_id:"EHA-02"});
 }
 return (
<section className="moduleRating" id="hodnoceni-modulu" aria-labelledby="moduleRatingHeading">
  <div className="moduleRatingText">
   <span className="eyebrow">Pomozte nám zlepšovat Akademii</span>
   <h2 id="moduleRatingHeading">Byl pro vás tento modul užitečný?</h2>
   <p>Stačí jedno kliknutí. Hodnotit můžete i bez absolvování závěrečného testu.</p>
  </div>
  {rating===null?
   <div className="moduleRatingActions" role="group" aria-label="Hodnocení užitečnosti modulu">
    <button type="button" className="moduleRatingButton" onClick={()=>rateModule("yes")}><span className="moduleRatingSymbol" aria-hidden="true">✓</span><span>Ano</span></button>
    <button type="button" className="moduleRatingButton" onClick={()=>rateModule("partial")}><span className="moduleRatingSymbol" aria-hidden="true">≈</span><span>Částečně</span></button>
    <button type="button" className="moduleRatingButton" onClick={()=>rateModule("no")}><span className="moduleRatingSymbol" aria-hidden="true">×</span><span>Ne</span></button>
   </div>:
   <div className="moduleRatingThanks" role="status"><span aria-hidden="true">✓</span><div><strong>Děkujeme za zpětnou vazbu.</strong><p>Do souhrnných statistik se odpověď zařadí pouze při povolené analytice.</p></div></div>
  }
 </section>
 );
}

export default function App(){
 const [tab,setTab]=useState(0),[step,setStep]=useState(0),[phase,setPhase]=useState(0),[issue,setIssue]=useState(0),[qi,setQi]=useState(0),[testAnswers,setTestAnswers]=useState<Record<number,number>>({}),[done,setDone]=useState(false);
 const score=test.filter((q,i)=>testAnswers[i]===q.correct).length;
 const analyticsPreviousTab = useRef<string | number | null>(null);
 const analyticsReportedQuiz = useRef(false);
 const analyticsReportedResult = useRef(false);

 // Keep the beginning of each newly rendered teaching step visible (including on mobile).
 const hasMountedForScroll=useRef(false);
 useEffect(()=>{
  if(!hasMountedForScroll.current){hasMountedForScroll.current=true;return;}
  const frame=window.requestAnimationFrame(()=>{
   const section=document.querySelector<HTMLElement>(".content");
   if(!section)return;
   const masthead=document.querySelector<HTMLElement>(".wa-masthead");
   const offset=masthead&&window.getComputedStyle(masthead).position==="sticky"?masthead.getBoundingClientRect().height+12:16;
   window.scrollTo({top:Math.max(0,window.scrollY+section.getBoundingClientRect().top-offset),behavior:"auto"});
  });
  return()=>window.cancelAnimationFrame(frame);
 },[tab,step,phase,issue,qi]);
 useEffect(() => {
   if (done && !analyticsReportedResult.current) {
     window.academyTrack?.("quiz_result_viewed", {score_percent: Math.round(100 * score / test.length)});
     analyticsReportedResult.current = true;
   }
   if (!done) analyticsReportedResult.current = false;
 }, [done, score]);
 useEffect(() => {
   const current = String(tab);
   if (window.academyAnalyticsReady && analyticsPreviousTab.current !== current) {
     window.academyTrack?.("section_viewed", {section_id: current});
     analyticsPreviousTab.current = current;
   }
 }, [tab]);
 useEffect(() => {
   const onReady = () => {
     const current = String(tab);
     if (analyticsPreviousTab.current !== current) {
       window.academyTrack?.("section_viewed", {section_id: current});
       analyticsPreviousTab.current = current;
     }
   };
   window.addEventListener("academy:analytics-ready", onReady);
   return () => window.removeEventListener("academy:analytics-ready", onReady);
 }, [tab]);


 const sourceLink=(i:number)=><a href={sources[i][1]} target="_blank" rel="noreferrer">{sources[i][0]}</a>;
 const options=(q:Q,selected:number|undefined,onPick:(i:number)=>void)=><><div className="answers">{q.a.map((text,i)=><button key={i} disabled={selected!==undefined} onClick={()=>onPick(i)} className={selected!==undefined&&i===q.correct?"correct":selected===i?"incorrect":""}><span>{String.fromCharCode(65+i)}</span>{text}</button>)}</div>{selected!==undefined&&<div className="inset" role="status"><strong>{selected===q.correct?"✓ Správně":"Doporučený postup"}</strong><p><GlossaryText text={q.why}/></p></div>}</>;
 return <>
 <nav className="wa-masthead" aria-label="Navigace Webett eHealth Akademie">
  <div className="wa-inner">
    <a className="wa-brand" href="https://edu.webett.cz/" aria-label="Webett eHealth Akademie – úvod">
      <img className="wa-logo" src="https://edu.webett.cz/assets/webett-logo.svg" width="140" height="70" alt=""/>
      <span className="wa-subtitle">eHealth<br/>Academy</span>
    </a>
    <div className="wa-links">
      <details className="wa-dropdown">
        <summary>Výukové moduly</summary>
        <div className="wa-options">
            <a href="https://ezadanka.edu.webett.cz/">eŽádanka</a>
            <a href="https://epoukaz.edu.webett.cz/" aria-current="page">ePoukaz</a>
            <a href="https://erecept.edu.webett.cz/">eRecept</a>
            <a href="https://ezkarta.edu.webett.cz/">EZKarta a NPEZ</a>
            <a href="https://ai.edu.webett.cz/">Bezpečná AI</a>
        </div>
      </details>
        <a className="wa-map" href="https://mapa.edu.webett.cz/">Mapa souvislostí</a>
        <a className="wa-link" href="https://slovnik.edu.webett.cz/">Slovníček</a>
        <a className="wa-guide" href="https://pruvodce.edu.webett.cz/">Průvodce eHealth</a>
    </div>
  </div>
</nav>
 <main className="shell"><header className="hero"><div><h1>ePoukaz v ordinaci</h1><p><GlossaryText text={"Od správné preskripce po předání identifikátoru, uplatnění a výdej pomůcky. Praktický průvodce, nikoliv rozhraní konkrétního AIS."}/></p></div><div className="heroVisual" aria-hidden="true"><div className="heroFlow"><span>Lékař</span><i>→</i><span>ePoukaz</span><i>→</i><span>Výdejce</span></div><div className="heroFlowSub">Pacient · předpis · návaznost péče</div></div></header>
 <nav className="tabs" aria-label="Části modulu">{tabs.map((name,i)=><button key={name} className={tab===i?"active":""} aria-current={tab===i?"page":undefined} onClick={()=>setTab(i)}>{name}</button>)}</nav>
 <section className="content">
 {tab===0&&<div className="stack">
 {step===0&&<><div className="notice"><strong>Aktuální stav ePoukazu · ověřeno k 24. 11. 2026</strong><p>Od 1. ledna 2026 se zdravotnické prostředky předepisované na poukaz standardně předepisují elektronicky. Listinná forma je přípustná pouze při zákonných výjimkách, které vysvětlíme v části Řešení problémů.</p><p className="sourceSmall">Zdroj: {sourceLink(0)}.</p></div><div className="inset"><strong>Co se naučíte</strong><ul><li>Pochopit účel ePoukazu a jeho rozdíl oproti eReceptu.</li><li>Zorientovat se v základních krocích předpisu zdravotnického prostředku.</li><li>Vysvětlit pacientovi předání identifikátoru a uplatnění poukazu.</li><li>Rozpoznat situace, kdy je třeba schválení pojišťovnou nebo řešení komplikace.</li></ul></div></>}
 <div className="barrow"><h2>Pochopte vystavení ePoukazu</h2><small>Krok {step+1} ze 4</small></div><div className="progress">{[0,1,2,3].map(i=><i key={i} className={i<=step?"on":""}/>)}</div>
 {step===0&&<><h3>Co je ePoukaz a proč ho používáme?</h3><p><GlossaryText text={"ePoukaz je elektronický předpis zdravotnického prostředku vydávaného na poukaz, například některých ortéz nebo dalších kompenzačních pomůcek. Nejde o eRecept na lék ani o rezervaci konkrétní pomůcky ve výdejně."}/></p><div className="takeawayGrid"><div className="inset"><span className="eyebrow">CO UMOŽŇUJE</span><p>Vystavit a evidovat poukaz elektronicky a předat pacientovi identifikátor potřebný k jeho uplatnění.</p></div><div className="inset"><span className="eyebrow">CO SÁM NEZAJISTÍ</span><p>Automatickou úhradu pojišťovnou, dostupnost výrobku skladem ani okamžité vydání pacientovi.</p></div></div><div className="inset"><strong>Platnost v praxi</strong><p>Předepisující určuje platnost ePoukazu v rozmezí 30 dnů až jednoho roku. U prostředků vyžadujících schválení pojišťovnou zvažte delší platnost. Prodloužit lze pouze dosud platný ePoukaz ve stavu Předepsaný nebo vrácený pojišťovnou k doplnění informací; po uplatnění ve výdejně se datum platnosti již nevztahuje na termín fyzického výdeje.</p><p className="sourceSmall">Zdroj: {sourceLink(4)}.</p></div><div className="inset"><strong>Kde ePoukaz vystavím?</strong>
<p>Ve svém ambulantním informačním systému (AIS), pokud podporuje ePoukaz, nebo v bezplatné <a href={sources[11][1]} target="_blank" rel="noreferrer">aplikaci eRecept Profesionál ↗</a>. Přístup je součástí IS eRecept.</p>
<p><strong>Co potřebuji předem?</strong> Pokud již máte aktivní přístup k IS eRecept, obvykle o další přístup pro ePoukaz nežádáte. Noví uživatelé si jej zřizují podle <a href={sources[6][1]} target="_blank" rel="noreferrer">návodu SÚKL ↗</a>; při žádosti se ověřuje zápis poskytovatele v NRPZS nebo smlouva se zdravotní pojišťovnou. Žádost lze vyřídit pomocí Identity občana nebo kvalifikovaného certifikátu podle zvoleného způsobu.</p>
<p className="sourceSmall">Podrobný postup vyplnění se liší podle použité aplikace. Veřejný <a href={sources[6][1]} target="_blank" rel="noreferrer">návod k přístupu a ePoukazu</a> popisuje také správu rolí.</p>
</div></>}
 {step===1&&<><h3>Co se řeší před odesláním?</h3><p>Představte si pacienta ve věku 52 let po distorzi hlezna. Po vyšetření zvažujete stabilizační ortézu. Než vystavíte poukaz, postupujete ve třech rovinách:</p><div className="journey"><div><b>1. Klinická indikace</b><p>Je konkrétní typ pomůcky pro pacienta skutečně vhodný?</p></div><div><b>2. Oprávnění předepsat a úhradová pravidla</b><p>Ověřte, zda můžete daný prostředek předepsat k úhradě, jaké jsou indikační, množstevní a další podmínky a zda je třeba schválení pojišťovnou. Samotná nabídka položky v <GlossaryTerm label="AIS" slug="ais" definition="Ambulantní informační systém – software pro zdravotnickou dokumentaci a provoz ordinace." /> není potvrzením preskripčního oprávnění.</p><p className="sourceSmall"><strong>Kde ověřit:</strong> <a href={sources[7][1]} target="_blank" rel="noreferrer">aktuální Seznam ZP SÚKL ↗</a> (podmínky úhrady) a <a href={sources[8][1]} target="_blank" rel="noreferrer">úhradový katalog a metodika VZP ↗</a> (preskripční a úhradová omezení jednotlivých skupin). Rozhodující je aktuální znění podmínek pro konkrétní prostředek.</p></div><div><b>3. Údaje poukazu</b><p>V AIS nebo aplikaci Profesionál zvolte odpovídající typ poukazu (např. léčebná a ortopedická, optická či foniatrická pomůcka), ztotožněte pacienta a vyberte konkrétní prostředek z číselníku. Zkontrolujte jeho kód, množství a případné zdůvodnění. Jeden ePoukaz obsahuje standardně jednu samostatně kódovanou položku.</p></div></div><div className="notice"><strong>Rychlé rozhodnutí před vystavením</strong><p>Je pomůcka klinicky vhodná? → Mám preskripční oprávnění a splňuji úhradové podmínky? → Vyžaduje úhrada schválení pojišťovnou? → Teprve potom dokončím a odešlu předpis.</p></div></>}
 {step===2&&<><h3>Co se stane po vystavení?</h3><div className="journey"><div><b>1. Elektronický poukaz je vystaven</b><p>Po kontrole údajů předpis elektronicky potvrďte nebo podepište podle používaného softwaru. ePoukaz se uloží do Centrálního úložiště elektronických poukazů (součást IS eRecept) a získá jedinečný devítimístný identifikátor.</p></div><div><b>2. Pacient získá průvodku nebo identifikátor</b><p>Identifikátor předejte bezplatně způsobem zvoleným pacientem: vytištěnou průvodkou, SMS, e-mailem nebo přes pacientskou aplikaci eRecept. Chytrý telefon není nutný; průvodka není listinný poukaz. Vyžaduje-li pomůcka schválení pojišťovnou, vysvětlete, že identifikátor sám ještě neznamená povolený výdej.</p></div><div><b>3. Pacient ePoukaz uplatní</b><p>S identifikátorem nebo po ověření totožnosti se obrátí na oprávněného výdejce (lékárnu či výdejnu). Uplatnění není totéž co samotné vydání pomůcky a předchozí schválení úhrady, pokud je vyžadováno, zůstává nutné.</p></div><div><b>4. Výdej a další postup</b><p>Výdejce řeší dostupnost prostředku a výdej. Fyzické vydání může proběhnout později než uplatnění.</p></div></div><div className="patientExplainer"><strong>Jak to vysvětlím pacientovi?</strong><p>„Vystavil/a jsem vám elektronický poukaz na zdravotnickou pomůcku. Tady je jeho identifikátor nebo vytištěná průvodka. S tím se obrátíte na výdejce. Nemusíte mít aplikaci v telefonu.“</p><p className="muted">Modelová formulace pro běžný ePoukaz bez čekání na schválení.</p></div><p className="sourceSmall">Zdroj: {sourceLink(2)}.</p></>}
 {step===3&&<><h3>Co si odnést do praxe?</h3><div className="takeawayGrid"><div className="inset"><span className="eyebrow">PŘED VYSTAVENÍM</span><p>Ověřit klinickou vhodnost pomůcky, preskripční omezení a případné podmínky úhrady.</p></div><div className="inset"><span className="eyebrow">PŘI VYSTAVENÍ</span><p>Správně identifikovat pacienta a prostředek. Jeden ePoukaz obsahuje jeden kód.</p></div><div className="inset"><span className="eyebrow">PO VYSTAVENÍ</span><p>Předat srozumitelné pokyny a identifikátor. Průvodka neznamená listinný poukaz.</p></div><div className="inset"><span className="eyebrow">KDY TO NENÍ TAK JEDNODUCHÉ</span><p>Některé prostředky vyžadují schválení pojišťovnou. Uplatnění, schválení a výdej jsou odlišné procesy.</p></div></div><div className="notice"><strong>Důležité pro ordinace a jejich AIS · změna od 1. 12. 2026</strong><p><GlossaryText text={"Podle oznámení SÚKL bude od 1. prosince 2026 podporováno pouze rozhraní ePoukazu 202605A, které obsahuje validace preskripčních omezení. Starší verze mají být ukončeny 30. listopadu 2026. Pokud váš AIS ePoukaz používá, ověřte u dodavatele jeho připravenost; technickou verzi nemusí lékař sám nastavovat."}/></p><p className="sourceSmall">Zdroj: {sourceLink(5)}.</p></div><div className="notice"><strong>Teď už znáte základní postup.</strong><p>V následující části si prohlédnete jednotlivé fáze ePoukazu. Praktické komplikace a otázky najdete až v dalších dvou záložkách.</p></div></>}
 <div className="actions"><button className="secondary" disabled={step===0} onClick={()=>setStep(s=>s-1)}>← Zpět</button><button onClick={()=>step===3?(setTab(1),setPhase(0)):setStep(s=>s+1)}>{step===3?"Pokračovat do části 2: Cesta ePoukazu →":step===2?"Shrnout hlavní pravidla →":"Pokračovat →"}</button></div>
 </div>}
 {tab===1&&<div className="stack"><h2>Co se děje po vystavení?</h2><p className="muted">Klikněte na jednotlivé fáze. U prostředků vyžadujících schválení může proces obsahovat další kroky.</p><div className="journeySteps">{["Vystavený","Uplatněný","Vydaný"].map((x,i)=><button key={x} onClick={()=>setPhase(i)} className={phase===i?"selected":""} aria-pressed={phase===i}><span>{i+1}</span>{x}</button>)}</div><div className="inset"><span className="eyebrow">BĚŽNÝ PRŮBĚH · FÁZE {phase+1} / 3</span><h3>{["Vystavený","Uplatněný","Vydaný"][phase]}</h3><p>{["Lékař odešle ePoukaz do centrálního systému a předá pacientovi identifikátor. Identifikátor není důkazem výdeje.","Pacient poukaz uplatní u oprávněného výdejce během platnosti. U individuálně zhotovovaných pomůcek mohou být procesy odlišné.","Výdejce zdravotnický prostředek vydá a eviduje výdej. Fyzické vydání může nastat později než uplatnění."][phase]}</p></div>{phase===0&&<div className="notice"><strong>Co když je třeba souhlas pojišťovny?</strong>
<p><strong>1. Vystavení ke schválení.</strong> U pomůcky vyžadující předchozí souhlas nastavíte v ePoukazu stav schválení „Ke schválení“, uvedete pojišťovnu, specifikaci a zdůvodnění. ePoukaz odešlete do centrálního úložiště; pojišťovna jej elektronicky převezme.</p>
<p><strong>2. Rozhodnutí pojišťovny.</strong> Může schválit, zamítnout nebo požádat o doplnění. Při dožádání doplňte údaje či přílohy a znovu předejte ke schválení. Stav ověřte v používané aplikaci; oznámení pacientovi závisí na nastavení notifikací.</p>
<p><strong>3. Když se čeká na podklady z výdejny.</strong> U některých individuálně zhotovovaných pomůcek se ePoukaz označí „Čeká na podklady z výdejny“. Pacient může dostat průvodku již před schválením, aby výdejna připravila například měření či cenovou kalkulaci. Takový ePoukaz může být uplatněn ještě před rozhodnutím pojišťovny.</p>
<p><strong>4. Výdej až po schválení.</strong> Předání identifikátoru, uplatnění, souhlas pojišťovny a fyzické vydání jsou různé kroky. Bez potřebného souhlasu nelze pomůcku vydat na úhradu zdravotní pojišťovny. U schvalovaných ePoukazů SÚKL doporučuje nastavit platnost alespoň 90 dní.</p>
<p className="sourceSmall">Zdroje: {sourceLink(10)} · {sourceLink(3)}.</p>
</div>}
<div className="actions"><button onClick={()=>setTab(2)}>Pokračovat do části 3: Řešení problémů →</button></div></div>}
 {tab===2&&<div className="stack"><h2>Co když nastane problém?</h2><p className="muted">Zvolte situaci a podívejte se na doporučený další krok.</p><div className="problemGrid">{issues.map((x,i)=><button key={x.title} onClick={()=>setIssue(i)} className={issue===i?"selected":""} aria-pressed={issue===i}><span className="smallTag">{x.category}</span><span>{x.title}</span></button>)}</div><div className="scenario" aria-live="polite"><span className="eyebrow">PRAKTICKÁ SITUACE · {issues[issue].category.toUpperCase()}</span><h3>{issues[issue].title}</h3><div className="scenarioPart"><h4>Co se stalo?</h4><p><GlossaryText text={issues[issue].situation}/></p></div><div className="scenarioPart"><h4>Co udělám jako lékař?</h4><p><GlossaryText text={issues[issue].action}/></p>{issues[issue].category==="Výjimky"&&<ul className="legalExceptions">
<li><strong>Výjimka pro smluvního lékaře:</strong> poukaz na prostředky hrazené ve zvláštním režimu podle § 17 odst. 7 písm. a) zákona č. 48/1997 Sb., vystavený sobě, manželovi či partnerovi, rodičům, prarodičům, dětem, vnukům nebo sourozencům.</li>
<li><strong>Péče u pacienta doma:</strong> zdravotní péče ve vlastním sociálním prostředí pacienta a současně bezodkladná potřeba předepsání vzhledem k jeho zdravotnímu stavu.</li>
<li><strong>Závažná technická překážka:</strong> ePoukaz nelze vystavit například kvůli výpadku elektřiny, internetu, AIS nebo webového rozhraní systému eRecept a současně je předepsání bezodkladně nutné.</li>
</ul>}</div><div className="scenarioPart"><h4>Jak to vysvětlím pacientovi?</h4><p><em>„{issues[issue].patient}“</em></p></div><div className="scenarioCaution"><strong>Na co si dát pozor</strong><p><GlossaryText text={issues[issue].caution}/></p></div><p className="sourceSmall">Podklad: {sourceLink(issues[issue].source)}{issues[issue].source===9?" · ":""}{issues[issue].source===9&&sourceLink(12)}.</p></div><button onClick={()=>{setTab(3);setDone(false);analyticsReportedQuiz.current=false;analyticsReportedResult.current=false;setQi(0);setTestAnswers({})}}>Pokračovat do části 4: Znalostní test →</button></div>}
 {tab===3&&!done&&<div className="stack"><div className="barrow"><div><span className="eyebrow">KRÁTKÝ PRAKTICKÝ TEST</span><h2>Co už víte?</h2></div><small>{qi+1} / {test.length}</small></div><div className="progress">{test.map((_,i)=><i key={i} className={i<=qi?"on":""}/>)}</div><div className="inset"><span className="eyebrow">SITUACE Z ORDINACE</span><h3>{test[qi].q}</h3></div>{options(test[qi],testAnswers[qi],i=>setTestAnswers(a=>({...a,[qi]:i})))}<div className="actions"><button className="secondary" disabled={qi===0} onClick={()=>setQi(i=>i-1)}>← Zpět</button><button disabled={testAnswers[qi]===undefined} onClick={()=>{if(qi===test.length-1){if(!analyticsReportedQuiz.current){window.academyTrack?.("quiz_completed",{score,total_questions:test.length,score_percent:Math.round(100*score/test.length)});analyticsReportedQuiz.current=true;} setDone(true);}else setQi(i=>i+1);}}>{qi===test.length-1?"Zobrazit výsledky →":"Další otázka →"}</button></div></div>}
 {tab===3&&done&&<div className="stack"><div className="success" role="status"><div className="bigIcon">{score===test.length?"★":"✓"}</div><span className="eyebrow">VÝSLEDEK ZNALOSTNÍHO TESTU</span><h2>{score} / {test.length}</h2><p>{score===test.length?"Výborně. Orientujete se v základních procesech.":"Projděte si vysvětlení a podle potřeby si test zopakujte."}</p><p className="muted">Výsledek není odbornou certifikací.</p></div><h3>Vysvětlení odpovědí</h3>{test.map((q,i)=><div className="inset" key={i}><strong>{testAnswers[i]===q.correct?"✓":"✕"} {i+1}. {q.q}</strong><p><GlossaryText text={q.why}/></p></div>)}<button onClick={()=>{setQi(0);setDone(false);analyticsReportedQuiz.current=false;analyticsReportedResult.current=false;setTestAnswers({})}}>Opakovat test →</button></div>}
 </section>
 <ModuleRatingPanel/><footer><strong>Webett eHealth Academy</strong><p><strong>Klinické testování:</strong> Všechny aktuálně zveřejněné moduly prošly testováním s klinickými lékaři a jejich připomínky byly zapracovány do výukového obsahu.</p><p>Interaktivní výukový průvodce principy ePoukazu, nikoliv kopie skutečného rozhraní ePreskripce či informačního systému ordinace. Není propojen se skutečným eHealth systémem. Nezadávejte osobní nebo zdravotní údaje skutečných pacientů.</p><p>Odborné zdroje: {sources.map((item,i)=><span key={item[1]}>{i>0?" · ":""}{sourceLink(i)}</span>)}</p><div className="releaseMeta"><div><span>Verze aplikace</span><strong>1.0.4</strong></div><div><span>Poslední vydání</span><strong>24. 11. 2026</strong></div><div><span>Odborné ověření</span><strong>19. 10. 2026 – původní odborné ověření; nové úpravy čekají na klinickou revizi</strong></div></div><p><a href="https://edu.webett.cz/#nastaveni-analytiky">Nastavení analytiky</a></p></footer></main></>;
}