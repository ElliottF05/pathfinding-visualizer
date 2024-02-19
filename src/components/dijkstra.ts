import { MinPriorityQueue } from "@datastructures-js/priority-queue";

// LOCAL VARIABLES
const priorityQueue = new MinPriorityQueue<number[]>((arr: number[]) => arr[2]);
const nodeMap: number[][] = [];

let startCell: number[];
let endCell: number[] = [-1, -1];
let grid: number[][];

let gridWidth: number;
let gridHeight: number;


// ACQUIRING DATA FROM APP
export function setData(inputStartCell: number[], inputEndCell: number[], inputGrid: number[][]) {
    startCell = inputStartCell;
    endCell = inputEndCell;
    grid = inputGrid;
    priorityQueue.enqueue([startCell[0], startCell[1], 0])
}

export function setConfig(inputGridWidth: number, inputGridHeight: number) {
    gridWidth = inputGridWidth;
    gridHeight = inputGridHeight;
    for (let j = 0; j < gridHeight; j++) {
        const temp: number[] = [];
        for (let i = 0; i < gridWidth; i++) {
            temp.push(-1);
        }
        nodeMap.push(temp);
    }
}


// SLEEP FUNCTION
function sleep(delay: number): Promise<null> {
    return new Promise((resolve) => setTimeout(resolve, delay))
}


// MAIN DIJKSTRAS LOOP
export async function step(): Promise<number[]> {
    console.log("\n NEW Step");
    await sleep(100);

    // find node with lowest distance
    if (priorityQueue.isEmpty()) {
        console.log("EMPTY!");
    }

    const [x, y, distance] = priorityQueue.dequeue();
    const newDistance = grid[y][x] < 0 ? 0 : distance + grid[y][x];
    console.log("newDistance: " + newDistance);

    // END CONDITION
    if (x == endCell[0] && y == endCell[1]) {
        console.log("end condition");
        return [x, y, newDistance];
    }

    function traverseDirections(x: number, y: number) {
        if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight // in bounds
            && grid[y][x] != 0 // not a wall
            && (nodeMap[y][x] < 0 || nodeMap[y][x] > newDistance)) // new or more efficient path found
            {
            console.log("traverse successful");
            nodeMap[y][x] = newDistance;
            priorityQueue.enqueue([x, y, newDistance]);
        }
    }

    traverseDirections(x - 1, y);
    traverseDirections(x + 1, y);
    traverseDirections(x, y - 1);
    traverseDirections(x, y + 1);

    return [x, y, newDistance];
}