import { useState } from "react";
import { createContext } from "react";

import CellContainer from "./components/CellContainer";
import "./App.css";
import { getData, step } from "./components/dijkstra"
import ControlPanel from "./components/ControlPanel";



// CONFIG
let gridWidth = 20;
let gridHeight = 20;



// LOGIC VALUES
let status = 1;
let startCell = [0,0];
let endCell = [0,0];


// GET STARTED GRID()
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

    // RUN SIMULATION
    async function runSimulation() {

        let counter = 0

        while (counter < 10) {
            const newGrid = [...grid];
            const data: number[] = await step()
            console.log(data);
            newGrid[data[1] + counter][data[0]] = 1;
            setGrid(newGrid);
            console.log(newGrid.toString());
            counter++;
        }
    }

    // SET STATUS
    function setStatus(newStatus: number) {
        status = newStatus;

        if (newStatus == 1) { // set start
            const newGrid = [...grid];
            newGrid[startCell[1]][startCell[0]] = 0;
            setGrid(newGrid);
        }
        else if (newStatus == 2) { // set end
            const newGrid = [...grid];
            newGrid[endCell[1]][endCell[0]] = 0;
            setGrid(newGrid);
        }

        else if (newStatus == 3) { // start simulation

            getData(startCell, endCell);

            runSimulation();
        }

    }


    // MAIN UPDATE GRID FUNCTION (based on input)
    function updateGrid(x: number, y: number, value: number): void {

        console.log("updateGrid()");

        if (grid[y][x] < 0) {
            return;
        }

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