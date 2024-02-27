import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { grid, gridWidth, gridHeight, startCellPos, endCellPos, algorithm, getCellData, setCellData, Algorithms, Cell} from "./grid";


// CONSTANTS AND VARIABLES
const priorityQueue = new MinPriorityQueue<Cell>((currentCell: Cell) => currentCell.priority);

// API FUNCTIONS
export function step(): boolean {
    if (algorithm == Algorithms.Dijkstras) {
        console.log("in dijkstras")
        return dijkstraStep();
    } else if (algorithm == Algorithms.Astar) {
        return astarStep();
    }
    return false;
}

export function startSimulation() {
    grid[startCellPos[1]][startCellPos[0]].distance = 0;
    priorityQueue.enqueue(grid[startCellPos[1]][startCellPos[0]]);
}

export function highlightPath() {
    let pathX = endCellPos[0];
    let pathY = endCellPos[1];
    while (pathX != startCellPos[0] || pathY != startCellPos[1]) {
        const currentCell: Cell = grid[pathY][pathX];
        currentCell.status = -1; // status -1 = part of shortest path
        pathX = currentCell.previousX;
        pathY = currentCell.previousY;
    }
}

// SLEEP FUNCTION
function sleep(delay: number) {
    new Promise((resolve) => setTimeout(resolve, delay));
}


// DIJKSTRA (wraps a star)
function dijkstraStep(): boolean {
    return astarStep(true);
}


// A STAR
function astarStep(useDijkstra?: boolean): boolean {
    if (useDijkstra == undefined) {
        useDijkstra = false;
    }

    if (priorityQueue.isEmpty()) {
        console.log("returning, priority queue empty")
        return false;
    }

    const currentCell: Cell = priorityQueue.dequeue();
    console.log("priority: " + currentCell.priority);
    currentCell.status = 1;
    
    const newDistance: number = currentCell.distance + 1;
    const x: number = currentCell.x;
    const y: number = currentCell.y;

    if (x == endCellPos[0] && y == endCellPos[1]) { // FOUND END CELL
        highlightPath();
        return false;
    }
    
    function traverseDirection(newx: number, newy: number) {
        if (newx < 0 || newx >= gridWidth) { // x out of bounds
            return;
        }
        if (newy < 0 || newy >= gridHeight) { // y out of bounds
            return;
        }
        if (grid[newy][newx].distance <= newDistance) { // better path already found
            return;
        }

        let newPriority = 0;
        if (useDijkstra) {
            newPriority = newDistance;
        } else { // A STAR
            newPriority = newDistance + Math.abs(endCellPos[0] - newx) + Math.abs(endCellPos[1] - newy);
        }
        grid[newy][newx].priority = newPriority;
        grid[newy][newx].previousX = x;
        grid[newy][newx].previousY = y;
        grid[newy][newx].distance = newDistance;
        priorityQueue.enqueue(grid[newy][newx]);
    }

    traverseDirection(x + 1, y);
    traverseDirection(x - 1, y);
    traverseDirection(x, y + 1);
    traverseDirection(x, y - 1);

    return true;
}

