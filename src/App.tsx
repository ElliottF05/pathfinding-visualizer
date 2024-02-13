import { useState } from "react";
import { createContext } from "react";

import CellContainer from "./components/CellContainer";
import "./App.css";

type gridContextType = {
    grid: number[][]; // Adjust this to be the actual type of your grid data
    setGrid: (grid: number[][]) => void;
};

export const gridContext = createContext<gridContextType>({
    grid: [],
    setGrid: () => {},
});

const starterGrid: number[][] = [];
for (let y = 0; y < 5; y++) {
    const starterRow: number[] = [];
    for (let x = 0; x < 5; x++) {
        starterRow.push(0);
    }
    starterGrid.push(starterRow); 
}

function App() {

    const [grid, setGrid] = useState<number[][]>(starterGrid);

    return (
        <gridContext.Provider value={{grid, setGrid}}>
            <CellContainer></CellContainer>
        </gridContext.Provider>

    );
}

export default App;