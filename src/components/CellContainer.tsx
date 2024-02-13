import Cell from "./Cell.tsx";

import "./CellContainer.css";

function CellContainer() {

    const cellArr = [];

    for (let i = 0; i < 5; i++) {
        const cellRow = [];
        for (let j = 0; j < 5; j++) {
            cellRow.push(<Cell key={i*5 + j} x={j} y={i}></Cell>)
        }
        cellArr.push(<div className="CellRow">{cellRow}</div>);
    }

    return <div className="CellContainer">{cellArr}</div>;
}

export default CellContainer;