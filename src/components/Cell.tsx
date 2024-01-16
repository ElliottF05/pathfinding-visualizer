import "./Cell.css";
import { useState } from "react";
import classNames from "classnames";

function Cell({x, y} : {x: number, y: number}) {

    const [cellState, setCellState] = useState("unchecked");

    const CellClass = classNames({
        "Cell": true,
        "CellChecked": cellState == "checked",
    });

    function handleClick() {
        if (cellState == "unchecked") {
            setCellState("checked");
        }
    }

    return <div className={CellClass} onClick={handleClick}><span>Hello, x={x}, y={y}</span></div>;
}

export default Cell;