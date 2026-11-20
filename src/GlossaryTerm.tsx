import {useEffect,useId,useState} from "react";

/** Inline explanation with a direct anchor to the Academy glossary.
 * The definition remains readable by keyboard, mouse and touch users.
 */
type GlossaryTermProps={label:string;slug:string;definition:string};
export default function GlossaryTerm({label,slug,definition}:GlossaryTermProps){
 const [open,setOpen]=useState(false);
 const panelId=useId();
 useEffect(()=>{
  if(!open)return;
  const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};
  document.addEventListener("keydown",onKey);
  return()=>document.removeEventListener("keydown",onKey);
 },[open]);
 return <span className="wa-term">
  <button type="button" className="wa-term-toggle" aria-expanded={open} aria-controls={panelId}
   title={definition} onClick={()=>setOpen(value=>!value)}>{label}</button>
  {open&&<span id={panelId} className="wa-term-popup" role="note">
   <span>{definition}</span>
   <a href={"https://slovnik.edu.webett.cz/#"+slug} target="_blank" rel="noopener noreferrer">Otevřít heslo ve Slovníčku ↗</a>
   <button type="button" className="wa-term-popup-close" onClick={()=>setOpen(false)}>Zavřít</button>
  </span>}
 </span>;
}
