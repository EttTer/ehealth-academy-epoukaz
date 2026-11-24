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

  it("explains insurer approval once, only in the initial lifecycle phase",()=>{
    render(<App/>);
    fireEvent.click(screen.getByRole("button",{name:"2. Cesta ePoukazu"}));
    expect(screen.getAllByText("Co když je třeba souhlas pojišťovny?")).toHaveLength(1);
    expect(screen.getByText(/Čeká na podklady z výdejny/)).toBeTruthy();
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
    expect(document.querySelector(".scenario")?.textContent).toContain("bezodkladnou potřebu předpisu");
    fireEvent.click(screen.getByRole("button",{name:/Jiný zákonný důvod papírového poukazu/}));
    expect(document.querySelector(".scenario")?.textContent).toContain("manželovi či partnerovi");
    expect(document.querySelector(".scenario")?.textContent).toContain("vlastním sociálním prostředí");
    expect(document.querySelectorAll(".legalExceptions li")).toHaveLength(3);
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
