import classNames from "classnames";
import "./Cell.css";
import { getCellData, handleCellClick, CellType, gridHeight } from "../../data/grid";

let mouseDown: boolean = false;
document.body.onmousedown = () => {
    mouseDown = true;
    //handleCellClick(x, y);
};
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


    return <div 
        className={cellClasses} 
        onMouseDown={() => {
            event?.preventDefault();
            handleClick();
        }}
        onMouseOver={() => {if (mouseDown) handleClick()}}
        draggable="false"
        style={{width: (90.0 / gridHeight) + "vh", height: (90.0 / gridHeight) + "vh"}}>
        </div>;
}

export default Cell;