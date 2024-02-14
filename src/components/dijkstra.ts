const currentNodes = [];

let startCell: number[];
let endCell: number[];


export function getData(inputStartCell: number[], inputEndCell: number[]) {
    startCell = inputStartCell;
    endCell = inputEndCell;
    currentNodes.push([startCell[0], startCell[1], 0])
}

function sleep(delay: number): Promise<null> {
    return new Promise((resolve) => setTimeout(resolve, delay))
}

export async function step(): Promise<number[]> {
    await sleep(500);
    return [startCell[0] + 1, startCell[1]];
}