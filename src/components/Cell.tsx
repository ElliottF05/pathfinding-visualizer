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

    const {updateGrid, grid} = useContext(gridContext);
    const [cellValue, setCellValue] = useState(grid[y][x]);

    useEffect(() => {
        setCellValue(grid[y][x])
    }, [grid[y][x]]
    );

    function updateCellValue(value: number) {
        grid;
        updateGrid(x, y, value);
    }

    const CellClass = classNames({
        "Cell": true,
        "CellDrawn": cellValue > 0,
        "StartCell": cellValue == -1,
        "EndCell": cellValue == -2,
    });

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
            updateGrid(x, y, 1);
        }
    }

    return <div className={CellClass} onClick={handleClick} onMouseOver={onMouseOver} style={{width: (100.0/gridWidth + "%")}}></div>;
}

export default Cell;