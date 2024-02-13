import "./Cell.css";
import { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import { gridContext } from "../App";

function Cell({x, y, gridWidth} : {x: number, y: number, gridWidth: number}) {

    const {updateGrid, grid} = useContext(gridContext);
    const [cellValue, setCellValue] = useState(grid[y][x]);

    useEffect(() => {
        setCellValue(grid[y][x])
    }, [grid[y][x]]
    );

    function updateCellValue(value: number) {
        setCellValue(value);
        grid;
        updateGrid(x, y, value);
    }

    const CellClass = classNames({
        "Cell": true,
        "CellChecked": cellValue != 0,
    });

    function handleClick() {
        if (cellValue == 0) {
            updateCellValue(1);
        }
        else if (cellValue != 0) {
            updateCellValue(0);
        }
    }

    return <div className={CellClass} onClick={handleClick} style={{width: (100.0/gridWidth + "%")}}></div>;
}

export default Cell;