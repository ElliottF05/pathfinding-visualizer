import classNames from "classnames";
import "./Cell.css";
import { getCellData, handleCellClick, updateQueued, CellType } from "../../data/grid";
import { useState } from "react";

function Cell({x, y} : {x: number, y: number}) {

    const [update, setUpdate] = useState(0);

    const currentCell = getCellData(x, y);
    
    const cellClasses = classNames({
        "cell": true,
        "wall": currentCell.type == CellType.Wall,
        "start-cell": currentCell.type == CellType.Start,
        "end-cell": currentCell.type == CellType.End,
        "cell-checked": currentCell.status > 0,
        "shortest-path-cell": currentCell.status == -1,
    });

    function handleClick() {
        handleCellClick(x, y);
        if (updateQueued()) {
            setUpdate(update + 1);
        }
    }


    return <div className={cellClasses} onClick={handleClick}>{x}, {y}</div>;
}

export default Cell;