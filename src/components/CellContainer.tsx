import Cell from "./Cell.tsx";

import "./CellContainer.css";

function CellContainer() {

    const CellArr = [];

    for (let i = 0; i < 5; i++) {
        const CellRow = [];
        for (let j = 0; j < 5; j++) {
            CellRow.push(<Cell key={i*5 + j} x={j} y={i}></Cell>)
        }
        CellArr.push(<div className="CellRow">{CellRow}</div>);
    }

    return <div className="CellContainer">{CellArr}</div>;
}

export default CellContainer;