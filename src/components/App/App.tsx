import Cell from "../Cell/Cell.tsx";
import "./App.css";

// TODO: export to config file or grid.ts?
const gridWidth = 30;
const gridHeight = 30;

function App() {
    return <div>{createCellGrid()}</div>;
}

function createCellGrid() {

    function createCellRow(rowNumber: number) {
        const cellRow = [];
        for (let i = 0; i < gridWidth; i++) {
            cellRow.push(<Cell key={rowNumber*gridWidth + i}></Cell>);
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