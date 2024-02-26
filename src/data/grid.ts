// TYPES, ENUMS, INTERFACES

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

interface Cell {
    type: CellType,
    distance: number,
    status: number
}


// CONSTANTS

const gridWidth: number = 30;
const gridHeight: number = 30;
let status: Status = Status.Idle;
let forceUpdateGridFunction: (value: number) => void;
const startCellPos: number[] = [-1, -1];
const endCellPos: number[] = [-1, -1];

const grid: Cell[][] = [];
resetGrid();


// GRID CONVENIENCE FUNCTIONS

function resetGrid(): void {
    grid.length = 0;
    for (let i = 0; i < gridHeight; i++) {
        const temp: Cell[] = [];
        for (let j = 0; j < gridWidth; j++) {
            temp.push({type: CellType.Empty, distance: 0, status: 0} as Cell)
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
export function getCellData(x: number, y: number) {
    return grid[y][x];
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

export function updateQueued() {
    return true;
}