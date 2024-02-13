import { useState } from "react";
import { createContext } from "react";

import CellContainer from "./components/CellContainer";
import "./App.css";

export const gridContext = createContext({
    updateGrid: (x: number, y: number, value: number) => {
        x + y + value;
    },
    grid: [] as number[][],
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

    function updateGrid(x: number, y: number, value: number): void {
        console.log("updateGrid()");
        const newGrid = [...grid]; // Create a new copy of grid
        newGrid[y][x] = value;

        if (y > 0) {
            newGrid[y - 1][x] = newGrid[y - 1][x] == 0 ? 1 : 0;
        } 
        if (y < 4) {
            newGrid[y + 1][x] = newGrid[y + 1][x] == 0 ? 1 : 0;
        }
        if (x > 0) {
            newGrid[y][x - 1] = newGrid[y][x - 1] == 0 ? 1 : 0;
        } 
        if (x < 4) {
            newGrid[y][x + 1] = newGrid[y][x + 1] == 0 ? 1 : 0;
        }

        setGrid(newGrid); // Update grid with the new copy
    }

    return (
        <gridContext.Provider value={{updateGrid, grid}}>
            <CellContainer></CellContainer>
        </gridContext.Provider>

    );
}

export default App;