import { useState } from "react";
import Cell from "../Cell/Cell.tsx";
import "./App.css";
import ControlPanel from "../ControlPanel/ControlPanel.tsx";
import { setForceUpdateGridFunction, gridWidth, gridHeight } from "../../data/grid.ts";


function App() {
    const [update, setUpdate] = useState(0);
    setForceUpdateGridFunction(setUpdate);
    update;
    

    return (
        <div id="Main-Container">
            <div id="Control-Panel-Wrapper">
                <ControlPanel></ControlPanel>
            </div>
            <div>{createCellGrid()}</div>
        </div>
    );
}

function createCellGrid() {

    function createCellRow(rowNumber: number) {
        const cellRow = [];
        for (let i = 0; i < gridWidth; i++) {
            cellRow.push(<Cell key={rowNumber*gridWidth + i} x={i} y={rowNumber}></Cell>);
        }
        return <div className="cell-row">{cellRow}</div>
    }

    const cellGrid = [];
    for (let i = 0; i < gridHeight; i++) {
        cellGrid.push(<div key={i}>{createCellRow(i)}</div>);
    }

    return <div id="Cell-Grid">{cellGrid}</div>

}

export default App;