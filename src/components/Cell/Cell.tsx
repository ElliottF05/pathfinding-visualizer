import classNames from "classnames";
import "./Cell.css";
import { getCellData, handleCellClick, updateQueued, CellType } from "../../data/grid";
import { useState } from "react";

function Cell({x, y} : {x: number, y: number}) {

    const [update, setUpdate] = useState(0);

    const currentCell = getCellData(x, y);
    
    const cellClasses = classNames({
        "cell": true,
        "wall": currentCell.type === CellType.Wall,
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