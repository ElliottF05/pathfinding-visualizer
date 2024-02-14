import { useState } from "react";
import { createContext } from "react";

import CellContainer from "./components/CellContainer";
import "./App.css";
import ControlPanel from "./components/ControlPanel";



// CONFIG
let gridWidth = 20;
let gridHeight = 20;



// LOGIC VALUES
let status = 1;
let startCell = [0,0];
let endCell = [0,0];



// LOGIC FUNCTIONS
function setStatus(newStatus: number) {
    status = newStatus;
}

function getStarterGrid(): number[][] {
    const starterGrid: number[][] = [];
    for (let y = 0; y < gridHeight; y++) {
        const starterRow: number[] = [];
        for (let x = 0; x < gridWidth; x++) {
            starterRow.push(0);
        }
        starterGrid.push(starterRow); 
    }
    return starterGrid;
}

// CREATE GRID CONTEXT
export const gridContext = createContext({
    updateGrid: (x: number, y: number, value: number) => {
        x + y + value;
    },
    grid: [] as number[][],
});


// MAIN COMPONENT
function App() {

    // USE STATE FOR GRID
    const [grid, setGrid] = useState<number[][]>(getStarterGrid());

    
    // RESET GRID
    function resetGrid() {
        console.log("reset grid");
        const newGrid = getStarterGrid();
        setGrid(newGrid);
    }


    // MAIN UPDATE GRID FUNCTION (based on input)
    function updateGrid(x: number, y: number, value: number): void {
        console.log("updateGrid()");

        const newGrid = [...grid];

        newGrid[y][x] = value;
        
        if (status == 1) { // select start
            grid[y][x] = -1; // start point
            startCell = [x,y];
            status = 0; // neutral status
        }
        else if (status == 2) { // select end
            grid[y][x] = -2 // end point
            endCell = [x,y]
            status = 0;
        }

        setGrid(newGrid);

    }

    // COMPONENT HTML
    return (
        <gridContext.Provider value={{updateGrid, grid}}>
            <div id="main-container">
                <ControlPanel setStatus={setStatus} resetGrid={resetGrid}></ControlPanel>
                <CellContainer gridWidth={gridWidth} gridHeight={gridHeight}></CellContainer>
            </div>
        </gridContext.Provider>

    );
}

export default App;