// @vitest-environment jsdom
import {afterEach,describe,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("EHA-02 regression: teaching interactions and question structure",()=>{
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
