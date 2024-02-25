import { MinPriorityQueue } from "@datastructures-js/priority-queue";

const enum Algorithms {
    Dijkstras,
    AStar,
}

// LOCAL VARIABLES
const priorityQueue = new MinPriorityQueue<number[]>((arr: number[]) => arr[3]);
const nodeMap: number[][] = [];
const nodeReachedFrom: number[][][] = []

let startCell: number[];
let endCell: number[] = [-1, -1];
let grid: number[][];
let delay = 1000;

let gridWidth: number;
let gridHeight: number;
let algorithm: Algorithms = Algorithms.Dijkstras;


// SETTING INITIAL CONFIG FROM APP
export function setConfig(inputGridWidth: number, inputGridHeight: number) {
    gridWidth = inputGridWidth;
    gridHeight = inputGridHeight;
}


// ACQUIRING DATA FROM APP
export function setData(inputStartCell: number[], inputEndCell: number[], inputGrid: number[][], inputAlgorithm: Algorithms) {
    console.log("set data")
    startCell = inputStartCell;
    endCell = inputEndCell;
    grid = inputGrid;
    algorithm = inputAlgorithm;

    // resetting nodeMap
    nodeMap.length = 0;
    for (let j = 0; j < gridHeight; j++) {
        const temp: number[] = [];
        for (let i = 0; i < gridWidth; i++) {
            temp.push(-1);
        }
        nodeMap.push(temp);
    }

    // resetting nodeReachedFrom
    nodeReachedFrom.length = 0;
    for (let j = 0; j < gridHeight; j++) {
        const temp: number[][] = [];
        for (let i = 0; i < gridWidth; i++) {
            temp.push([-1, -1]);
        }
        nodeReachedFrom.push(temp);
    }

    // resetting priority queue
    priorityQueue.clear();
    priorityQueue.enqueue([startCell[0], startCell[1], 0, 0])
}

export function setDelay(value: number) {
    delay = value;
    console.log("set delay: " + delay);
}


// SLEEP FUNCTION
function sleep(delay: number): Promise<null> {
    return new Promise((resolve) => setTimeout(resolve, delay))
}


// MAIN DIJKSTRAS LOOP
export async function step(): Promise<number[]> {
    console.log("\n NEW Step");
    await sleep(delay);

    // find node with lowest distance
    if (priorityQueue.isEmpty()) {
        console.log("EMPTY!");
        return [-1, -1, -1];
    }

    const [x, y, distance] = priorityQueue.dequeue();
    const newDistance = grid[y][x] < 0 ? 0 : distance + grid[y][x];

    // END CONDITION
    if (x == endCell[0] && y == endCell[1]) {
        console.log("end condition");
        return [x, y, newDistance];
    }

    function calculatePriority() {
        if (algorithm == Algorithms.Dijkstras) {
            return newDistance;
        } else {
            return newDistance + Math.abs(x - endCell[0]) + Math.abs(y - endCell[1]);
        }
    }

    function traverseDirections(x: number, y: number, x0: number, y0: number) {
        if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight // in bounds
            && grid[y][x] != 0 // not a wall
            && (nodeMap[y][x] < 0 || nodeMap[y][x] > newDistance)) // new or more efficient path found
            {
            nodeMap[y][x] = newDistance;
            nodeReachedFrom[y][x] = [x0, y0];
            priorityQueue.enqueue([x, y, newDistance, calculatePriority()]);
        }
    }

    traverseDirections(x - 1, y, x, y);
    traverseDirections(x + 1, y, x, y);
    traverseDirections(x, y - 1, x, y);
    traverseDirections(x, y + 1, x, y);

    return [x, y, newDistance];
}


export function getSuccessfulPath(): number[][] {
    const pathNodes: number[][] = []
    let x = endCell[0];
    let y = endCell[1];

    while (x != startCell[0] || y != startCell[1]) {
        //console.log(x + ", " + y);
        pathNodes.push([x, y]);
        const newx = nodeReachedFrom[y][x][0];
        const newy = nodeReachedFrom[y][x][1];
        x = newx;
        y = newy;
    }

    return pathNodes;
}