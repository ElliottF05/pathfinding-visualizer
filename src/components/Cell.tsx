import "./Cell.css";
import { useContext } from "react";
import { useState } from "react";
import classNames from "classnames";
import { gridContext } from "../App";

function Cell({x, y} : {x: number, y: number}) {

    const {grid, setGrid} = useContext(gridContext);
    const [cellValue, setCellValue] = useState(0);

    function updateCellValue(value: number) {
        grid[y][x] = value;
        setCellValue(value);
        setGrid(grid);
    }

    const CellClass = classNames({
        "Cell": true,
        "CellChecked": cellValue != 0,
    });

    function handleClick() {
        console.log(cellValue);
        console.log(CellClass);
        if (cellValue == 0) {
            updateCellValue(1);
        }
        else if (cellValue != 0) {
            updateCellValue(0);
        }
    }

    return <div className={CellClass} onClick={handleClick}><span>Hello, x={x}, y={y}</span></div>;
}

export default Cell;