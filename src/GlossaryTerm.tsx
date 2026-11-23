import {useEffect,useId,useLayoutEffect,useRef,useState} from "react";

/** Contextual glossary definition. Position the popup inside the viewport,
 * including when the term sits near the left/right edge or inside a clipped card.
 */
type GlossaryTermProps={label:string;slug:string;definition:string};
export default function GlossaryTerm({label,slug,definition}:GlossaryTermProps){
 const [open,setOpen]=useState(false);
 const panelId=useId();
 const wrapper=useRef<HTMLSpanElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const panel=useRef<HTMLSpanElement>(null);

 useEffect(()=>{
  if(!open)return;
  const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};
  const onOutside=(event:PointerEvent)=>{if(!wrapper.current?.contains(event.target as Node))setOpen(false)};
  document.addEventListener("keydown",onKey);
  document.addEventListener("pointerdown",onOutside);
  return()=>{document.removeEventListener("keydown",onKey);document.removeEventListener("pointerdown",onOutside)};
 },[open]);

 useLayoutEffect(()=>{
  if(!open)return;
  const positionPopup=()=>{
   const button=trigger.current;
   const popup=panel.current;
   if(!button||!popup)return;
   const pad=16,gap=8;
   const viewportWidth=window.innerWidth,viewportHeight=window.innerHeight;
   popup.style.position="fixed";
   popup.style.transform="none";
   popup.style.right="auto";
   popup.style.bottom="auto";
   popup.style.width=String(Math.max(1,Math.min(320,viewportWidth-2*pad)))+"px";
   popup.style.maxHeight=String(Math.max(1,viewportHeight-2*pad))+"px";
   popup.style.overflowY="auto";
   popup.style.zIndex="1100";
   const rect=button.getBoundingClientRect();
   const popupRect=popup.getBoundingClientRect();
   const left=Math.max(pad,Math.min(rect.left+rect.width/2-popupRect.width/2,viewportWidth-popupRect.width-pad));
   const availableBelow=viewportHeight-rect.bottom-gap-pad;
   const availableAbove=rect.top-gap-pad;
   const below=availableBelow>=popupRect.height||availableBelow>=availableAbove;
   const top=below
    ? Math.max(pad,Math.min(rect.bottom+gap,viewportHeight-popupRect.height-pad))
    : Math.max(pad,rect.top-gap-popupRect.height);
   popup.style.left=String(Math.round(left))+"px";
   popup.style.top=String(Math.round(top))+"px";
  };
  positionPopup();
  window.addEventListener("resize",positionPopup);
  window.addEventListener("scroll",positionPopup,true);
  return()=>{window.removeEventListener("resize",positionPopup);window.removeEventListener("scroll",positionPopup,true)};
 },[open]);

 return <span ref={wrapper} className="wa-term">
  <button ref={trigger} type="button" className="wa-term-toggle" aria-expanded={open} aria-controls={panelId}
   title={definition} onClick={()=>setOpen(value=>!value)}>{label}</button>
  {open&&<span ref={panel} id={panelId} className="wa-term-popup" role="note">
   <span>{definition}</span>
   <a href={"https://slovnik.edu.webett.cz/#"+slug} target="_blank" rel="noopener noreferrer">Otevřít heslo ve Slovníčku ↗</a>
   <button type="button" className="wa-term-popup-close" onClick={()=>setOpen(false)}>Zavřít</button>
  </span>}
 </span>;
}
