import Cell from "./Cell.tsx";

import "./CellContainer.css";

function CellContainer({gridWidth, gridHeight} : {gridWidth: number, gridHeight: number}) {

    const cellArr = [];

    for (let i = 0; i < gridHeight; i++) {
        const cellRow = [];
        for (let j = 0; j < gridWidth; j++) {
            cellRow.push(<Cell key={i*5 + j} x={j} y={i} gridWidth={gridWidth}></Cell>)
        }
        cellArr.push(<div className="CellRow" style={{height: 100.0/gridHeight + "%"}}>{cellRow}</div>);
    }

    return <div className="CellContainer">{cellArr}</div>;
}

export default CellContainer;