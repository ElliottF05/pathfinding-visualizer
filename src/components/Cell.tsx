import "./Cell.css";
import { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import { gridContext } from "../App";

let mouseDown = false;
document.onmousedown = () => {
    mouseDown = true;
}
document.onmouseup = () => {
    mouseDown = false;
}

function Cell({x, y, gridWidth} : {x: number, y: number, gridWidth: number}) {

    const {updateGrid, grid, nodeMapGrid, nodeStatusGrid} = useContext(gridContext);
    const [cellValue, setCellValue] = useState(grid[y][x]);
    const [nodeDistance, setNodeDistance] = useState(0);
    const [nodeStatus, setNodeStatus] = useState(0);

    useEffect(() => {
        setCellValue(grid[y][x])
    }, [grid[y][x]]
    );
    useEffect(() => {
        setNodeDistance(nodeMapGrid[y][x])
    }, [nodeMapGrid[y][x]]
    )
    useEffect(() => {
        setNodeStatus(nodeStatusGrid[y][x])
    }, [nodeStatusGrid[y][x]]
    )

    function updateCellValue(value: number) {
        grid;
        nodeDistance;
        updateGrid(x, y, value);
    }

    const CellClass = classNames({
        "Cell": true,
        "CellDrawn": cellValue > 1,
        "StartCell": cellValue == -1,
        "EndCell": cellValue == -2,
        "Wall": cellValue == 0,
    });

    function getNodeStatusColor(): string {
        if (nodeStatus == 0 || grid[y][x] <= 0) {
            return "rgba(0,0,0,0)";
        } else if (nodeStatus == -1) {
            return "rgba(0,200,0,1)";
        }
        const status_color = 0.8 * Math.pow(1.02, -nodeStatus);
        return `rgba(0,0,30,${status_color})`;
    }

    function handleClick() {
        if (cellValue == 0) {
            updateCellValue(1);
        }
        else if (cellValue != 0) {
            updateCellValue(0);
        }
    }

    function onMouseOver() {
        if (mouseDown) {
            updateGrid(x, y, 0);
        }
    }

    return (
        <div
            className={CellClass} 
            onClick={handleClick} 
            onMouseOver={onMouseOver}
            style={{width: (100.0/gridWidth + "%")}}>

                <div className="NodeStatusColor"
                    style={{backgroundColor: getNodeStatusColor()}}>
                </div>
            
        </div>
    );
}

/**
 * <div
        className={CellClass} 
        onClick={handleClick} 
        onMouseOver={onMouseOver} 
        style={{width: (100.0/gridWidth + "%")}}>
            {nodeDistance}
    </div>
 */

export default Cell;