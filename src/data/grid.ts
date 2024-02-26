export enum CellType {
    Start,
    End,
    Wall,
    Empty
}

interface Cell {
    type: CellType,
    distance: number,
    status: number
}

const gridWidth: number = 30;
const gridHeight: number = 30;

const grid: Cell[][] = [];
resetGrid();

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

export function getCellData(x: number, y: number) {
    return grid[y][x];
}

export function handleCellClick(x: number, y: number) {
    grid[y][x].type = CellType.Wall;
    console.log("click at " + x + " " + y);
}

export function updateQueued() {
    return true;
}