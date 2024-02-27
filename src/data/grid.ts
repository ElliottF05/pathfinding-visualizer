// TYPES, ENUMS, INTERFACES

import { startSimulation, step } from "./algorithms";

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
    status: number // 0 = default, -1 = path of shortest path, positive values = checked recently
    priority: number;
    previousX: number;
    previousY: number;
}


// CONSTANTS & VARIABLES

export const gridWidth: number = 30;
export const gridHeight: number = 30;
let status: Status = Status.Idle;
export let algorithm: Algorithms = Algorithms.Dijkstras;
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
}

function forceUpdateGrid() {
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

export function handleCellClick(x: number, y: number) {
    console.log("click at " + x + " " + y);
    
    if (status == Status.Idle) {
        if (grid[y][x].type == CellType.Wall) {
            grid[y][x].type = CellType.Empty;
        } else {
            grid[y][x].type = CellType.Wall;
        }

    } else if (status == Status.SelectingStart) {
        clearStartCell();
        startCellPos[0] = x;
        startCellPos[1] = y;
        grid[y][x].type = CellType.Start;
        status = Status.Idle;

    } else if (status == Status.SelectingEnd) {
        clearEndCell();
        endCellPos[0] = x;
        endCellPos[1] = y;
        grid[y][x].type = CellType.End;
        status = Status.Idle;

    }
}

export function handleSetStartCellClick() {
    status = Status.SelectingStart;
}

export function handleSetEndCellClick() {
    status = Status.SelectingEnd;
}

export function handleClearButtonClick() {
    resetGrid();
    forceUpdateGrid();
    startCellPos[0] = 0;
    startCellPos[1] = 0;
    endCellPos[0] = 0;
    endCellPos[1] = 0;
    status = Status.Idle;
}

export function handleRunButtonClick() {
    console.log("run button clicked");

    if ((status == Status.Idle || status == Status.Paused)
    && (startCellPos[0] != -1 && endCellPos[0] != -1)) {
        startSimulation();
        let counter = 0;
        while (counter < 100) {
            counter++;
            if (step() == false) {
                break;
            }
        }
        forceUpdateGrid();
        console.log("running concluded");
    } else {
        console.log("run button failed");
    }
}

export function updateQueued() {
    return true;
}


// PATHFINDING SIMULATION
