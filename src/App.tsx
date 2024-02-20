import { useState } from "react";
import { createContext } from "react";

import CellContainer from "./components/CellContainer";
import "./App.css";
import { setData, step, setConfig, getSuccessfulPath, setDelay } from "./components/dijkstra"
import ControlPanel from "./components/ControlPanel";



// CONFIG
const gridWidth = 40;
const gridHeight = 40;
setConfig(gridWidth, gridHeight);



// LOGIC VALUES
let status = 1;
let startCell = [-1,-1];
let endCell = [-1,-1];
let speed = 1;


// GET STARTER GRID()
function getStarterGrid(defaultVal: number): number[][] {
    const starterGrid: number[][] = [];
    for (let y = 0; y < gridHeight; y++) {
        const starterRow: number[] = [];
        for (let x = 0; x < gridWidth; x++) {
            starterRow.push(defaultVal);
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
    nodeMapGrid: [] as number[][],
    nodeStatusGrid: [] as number[][],
});


// MAIN COMPONENT
function App() {

    // USE STATE FOR GRID
    const [grid, setGrid] = useState<number[][]>(getStarterGrid(1)); // for drawing (setting start/end points and walls)
    const [nodeMapGrid, setNodeMapGrid] = useState<number[][]>(getStarterGrid(0)); // distance from start
    const [nodeStatusGrid, setNodeStatusGrid] = useState<number[][]>(getStarterGrid(0)); // node status in terms of how recently it was checked

    
    // RESET GRID
    function resetGrid() {
        console.log("reset grid");
        const newGrid = getStarterGrid(1);
        setGrid(newGrid);
    }

    // RUN SIMULATION
    async function runSimulation() {

        let counter = 0

        while (counter < 10000) {

            if (status == 0) {
                break;
            }

            const newGrid = [...grid];
            const newNodeMapGrid = [...nodeMapGrid];

            const [dijkstraX, dijkstraY, newDistance] = await step()

            if (newDistance == -1) { // path can't be found
                status = 0;
                break;
            }

            updateNodeStatusGrid();
            nodeStatusGrid[dijkstraY][dijkstraX] = 1;

            newNodeMapGrid[dijkstraY][dijkstraX] = newDistance;

            setGrid(newGrid);
            setNodeMapGrid(newNodeMapGrid);

            if (dijkstraX == endCell[0] && dijkstraY == endCell[1]) {
                "found end";
                const foundPathNodes: number[][] = getSuccessfulPath(); 
                const newNodeStatusGrid = [...nodeStatusGrid];
                console.log(foundPathNodes[0]);
                for (let i = 0; i < foundPathNodes.length; i++) {
                    const x = foundPathNodes[i][0];
                    const y = foundPathNodes[i][1];
                    console.log(x + ", " + y);
                    newNodeStatusGrid[y][x] = -1
                }
                setNodeStatusGrid(newNodeStatusGrid);
                break;
            }
            
            counter++;
        }
    }

    // UPDATE NODESTATUS GRID
    function updateNodeStatusGrid(): void {
        const newNodeStatusGrid = [...nodeStatusGrid];
        for (let i = 0; i < gridHeight; i++) {
            for (let j = 0; j < gridWidth; j++) {
                if (newNodeStatusGrid[i][j] > 0) {
                    newNodeStatusGrid[i][j] += 1;
                }
            }
        }
        setNodeStatusGrid(newNodeStatusGrid);
    }

    // SET STATUS
    function setStatus(newStatus: number) {
        status = newStatus;

        if (newStatus == 1) { // set start
            const newGrid = [...grid];
            newGrid[startCell[1]][startCell[0]] = 1;
            setGrid(newGrid);
        }
        else if (newStatus == 2) { // set end
            const newGrid = [...grid];
            newGrid[endCell[1]][endCell[0]] = 1;
            setGrid(newGrid);
        }
        else if (newStatus == 3) { // start simulation
            setData(startCell, endCell, grid);
            runSimulation();
        }
        else if (newStatus == 4) {
            setNodeMapGrid(getStarterGrid(0));
            setNodeStatusGrid(getStarterGrid(0));
            status = 0;
        }
    }

    function setAppSpeed(value: number) {
        speed = value;
        setDelay(1000 / speed);
    }


    // MAIN UPDATE GRID FUNCTION FOR DRAWING (based on input)
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
        <gridContext.Provider value={{updateGrid, grid, nodeMapGrid, nodeStatusGrid}}>
            <div id="main-container">
                <ControlPanel setStatus={setStatus} resetGrid={resetGrid} setAppSpeed={setAppSpeed}></ControlPanel>
                <CellContainer gridWidth={gridWidth} gridHeight={gridHeight}></CellContainer>
            </div>
        </gridContext.Provider>
    );
}

export default App;