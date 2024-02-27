import classNames from "classnames";
import "./Cell.css";
import { getCellData, handleCellClick, CellType } from "../../data/grid";

let mouseDown: boolean = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

function Cell({x, y} : {x: number, y: number}) {

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
    }


    return <div className={cellClasses} onClick={handleClick} onMouseOver={() => {if (mouseDown) handleClick()}}>{x}, {y}</div>;
}

export default Cell;