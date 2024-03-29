// TYPES, ENUMS, INTERFACES

import { clearPriorityQueue, setupSimulation, step, sleep, getTopOfPriorityQueue } from "./algorithms";
import { ControlPanelEventTypes } from "../components/ControlPanel/ControlPanel";

export enum CellType {
    Start,
    End,
    Wall,
    Empty
}

enum Status {
    Idle,
    Paused, 
    SelectingStart,
    SelectingEnd,
    Running,
}

export enum Algorithms {
    Dijkstras,
    Astar,
}

export interface Cell {
    x: number,
    y: number,
    type: CellType,
    distance: number,
    status: number // 0 = default, -1 = path of shortest path, positive values = checked recently, -2 = current best path
    priority: number;
    previousX: number;
    previousY: number;
}


// CONSTANTS & VARIABLES

export let gridWidth: number = 80;
export let gridHeight: number = 80;
let status: Status = Status.Idle;
export let algorithm: Algorithms = Algorithms.Dijkstras;
export let stepsPerFrame: number = 1;
let forceUpdateGridFunction: (value: number) => void;
export const startCellPos: number[] = [-1, -1];
export const endCellPos: number[] = [-1, -1];

export const grid: Cell[][] = [];
resetGrid();


// GRID CONVENIENCE FUNCTIONS

function resetGrid(): void {
    grid.length = 0;
    for (let i = 0; i < gridHeight; i++) {
        const temp: Cell[] = [];
        for (let j = 0; j < gridWidth; j++) {
            temp.push({
                x: j, 
                y: i, 
                type: CellType.Empty, 
                distance: gridWidth*gridHeight, 
                status: 0, 
                priority: 0, 
                previousX: -1, 
                previousY: -1} as Cell)
        }
        grid.push(temp);
    }
    clearEndCell();
    clearStartCell();
    resetPathfindingData();
}

function resetPathfindingData() { // resets distances and priorities
    for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
            grid[i][j].distance = gridWidth*gridHeight;
            grid[i][j].status = 0;
            grid[i][j].previousX = -1;
            grid[i][j].previousY = -1;
            grid[i][j].priority = 0;
        }
    }
    clearPriorityQueue();
}

function forceUpdateGrid() {
    console.log("force grid update");
    forceUpdateGridFunction(Math.random());
}

function clearStartCell() {
    console.log("clear start cell");
    if (startCellPos[0] != -1) { // must reset start pos
        console.log("clear start cell 2 ");
        grid[startCellPos[1]][startCellPos[0]].type = CellType.Empty;
        forceUpdateGrid();
    }
}

function clearEndCell() {
    if (endCellPos[0] != -1) { // must reset end pos
        grid[endCellPos[1]][endCellPos[0]].type = CellType.Empty;
        forceUpdateGrid();
    }
}

function randomizeGrid() {
    const probability = 0.2 + 0.1 * Math.random();
    for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
            const currentCell = grid[i][j];
            if (currentCell.type == CellType.Empty || currentCell.type == CellType.Wall) {
                if (Math.random() < probability) {
                    currentCell.type = CellType.Wall;
                } else {
                    currentCell.type = CellType.Empty;
                }
            }
        }
    }
}


// EXPORTING DATA
export function getCellData(x: number, y: number): Cell {
    return grid[y][x];
}

export function setCellData(x: number, y: number, newCellData: Cell): void {
    grid[y][x] = newCellData;
}

// IMPORTING DATA
export function setForceUpdateGridFunction(func: (value: number) => void) {
    forceUpdateGridFunction = func;
}


// HANDLING INPUT

export function handleCellClick(x: number, y: number, beginClick: boolean) {
    console.log("click at " + x + " " + y);
    
    if (status == Status.Idle) {
        if (grid[y][x].type == CellType.Empty) {
            grid[y][x].type = CellType.Wall;
        } else if (beginClick && grid[y][x].type == CellType.Wall) {
            grid[y][x].type = CellType.Empty;
        }

    } else if (status == Status.SelectingStart) {
        resetPathfindingData();
        clearStartCell();
        startCellPos[0] = x;
        startCellPos[1] = y;
        grid[y][x].type = CellType.Start;
        status = Status.Idle;

    } else if (status == Status.SelectingEnd) {
        resetPathfindingData();
        clearEndCell();
        endCellPos[0] = x;
        endCellPos[1] = y;
        grid[y][x].type = CellType.End;
        status = Status.Idle;

    }

    //forceUpdateGrid();
}

export async function handleControlPanelEvents(controlPanelEvent: ControlPanelEventTypes) {

    if (controlPanelEvent == ControlPanelEventTypes.setStartButtonClicked) {
        status = Status.SelectingStart;

    } else if (controlPanelEvent == ControlPanelEventTypes.setEndButtonClicked) {
        status = Status.SelectingEnd;

    } else if (controlPanelEvent == ControlPanelEventTypes.clearButtonClicked) {
        handleClearButtonClick();

    } else if (controlPanelEvent == ControlPanelEventTypes.runButtonClicked) {
        handleRunButtonClick();

    } else if (controlPanelEvent == ControlPanelEventTypes.pauseButtonClicked) {
        if (status == Status.Running) {
            status = Status.Paused;
        }

    } else if (controlPanelEvent == ControlPanelEventTypes.restartSimulationButtonClicked) {
        handleRestartSimulationButtonClick();

    } else if (controlPanelEvent == ControlPanelEventTypes.dijkstrasSelected) {
        handleAlgorithmSelection(Algorithms.Dijkstras);

    } else if (controlPanelEvent == ControlPanelEventTypes.astarSelected) {
        handleAlgorithmSelection(Algorithms.Astar);

    } else if (controlPanelEvent == ControlPanelEventTypes.increaseWidthClicked) {
        handleWidthChanges(true);

    } else if (controlPanelEvent == ControlPanelEventTypes.decreaseWidthClicked) {
        handleWidthChanges(false);
        
    } else if (controlPanelEvent == ControlPanelEventTypes.increaseHeightClicked) {
        handleHeightChanges(true);
        
    } else if (controlPanelEvent == ControlPanelEventTypes.decreaseHeightClicked) {
        handleHeightChanges(false);
        
    } else if (controlPanelEvent == ControlPanelEventTypes.randomizeGridClicked) {
        if (status != Status.Running) {
            resetPathfindingData();
            randomizeGrid();
            forceUpdateGrid();
        }
        status = Status.Idle;

    }
}

function handleClearButtonClick() {
    resetGrid();
    forceUpdateGrid();
    startCellPos[0] = 0;
    startCellPos[1] = 0;
    endCellPos[0] = 0;
    endCellPos[1] = 0;
    status = Status.Idle;
}

function handleRunButtonClick() {
    console.log("run button clicked");

    if (startCellPos[0] != -1 && endCellPos[0] != -1) {
        handleSimulation();
    } else {
        console.log("run button failed");
    }
}

function handleRestartSimulationButtonClick() {
    if (status != Status.Running) {
        resetPathfindingData();
        clearPriorityQueue();
        forceUpdateGrid();
        status = Status.Idle;
    } else {
        console.log("restart simulation failed");
    }
}

function handleAlgorithmSelection(selectedAlgorithm: Algorithms) {
    if (status == Status.Running) {
        console.log("failed algorithm selection (can't be running)");
    } else {
        console.log("changing algorithm to: " + ((selectedAlgorithm === Algorithms.Dijkstras) ? "dijkstra's" : "Astar"));
        resetPathfindingData();
        algorithm = selectedAlgorithm;
    }
}

function handleWidthChanges(increase: boolean) {

    if (status == Status.Running) {
        return;
    }

    if (increase) {
        if (gridWidth < 150) {
            gridWidth += 5;
        } 
    } else {
        if (gridWidth > 5) {
            gridWidth -= 5;
        }
    }
    resetGrid();
    forceUpdateGrid();

    status = Status.Idle;
}

function handleHeightChanges(increase: boolean) {

    if (status == Status.Running) {
        return;
    }

    if (increase) {
        if (gridHeight < 150) {
            gridHeight += 5;
        } 
    } else {
        if (gridHeight > 5) {
            gridHeight -= 5;
        }
    }
    resetGrid();
    forceUpdateGrid();

    status = Status.Idle;
}

export function handleSpeedSliderChange(event: React.FormEvent<HTMLInputElement>) {
    if (parseInt(event.currentTarget.value) == 0) {
        stepsPerFrame = 0;
    } else {
        stepsPerFrame = Math.round(Math.pow(1.06411778, parseInt(event.currentTarget.value)));
    }
}

export function updateQueued() {
    return true;
}


// SIMULATION FUNCTIONS

function clearPreviousBestPath() {
    for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
            if (grid[i][j].status == -2) {
                grid[i][j].status = 1;
            }
        }
    }
}

function traceBestPath() {
    // first, clear existing best path
    clearPreviousBestPath();

    let x = getTopOfPriorityQueue().previousX;
    let y = getTopOfPriorityQueue().previousY;
    while (x != startCellPos[0] || y != startCellPos[1]) {
        const currentCell = grid[y][x];
        currentCell.status = -2;
        x = currentCell.previousX;
        y = currentCell.previousY;
    }
}

async function handleSimulation() {

    if (status == Status.Idle) {
        setupSimulation();
    }

    status = Status.Running;

    let counter: number = 0;
    while (counter < 1000) {
        counter++;

        let numberOfSteps: number = 0;
        while (numberOfSteps < stepsPerFrame) {
            numberOfSteps++;
            const stepResult: boolean = step();
            if (stepResult == false) { // pathfinding algorithm reached end
                status = Status.Idle; 
                break;
            }
    
        }

        if (status != Status.Running) {
            clearPreviousBestPath();
            console.log("quitting simulation (no longer running)");
            break;
        }

        traceBestPath();

        await sleep(50);
        forceUpdateGrid();
    }

    forceUpdateGrid();
    status = Status.Paused;

    console.log("running concluded");
}


/*
 * if (!waitingForRender) {
            waitingForRender = true;
            sleep(50).then(() => {
                forceUpdateGrid();
                waitingForRender = false;
            });
        }
 */