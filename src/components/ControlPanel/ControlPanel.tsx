import { handleSetStartCellClick, handleSetEndCellClick, handleClearButtonClick } from "../../data/grid";

function ControlPanel() {
    return (
        <div>
            <button id="Set-Start-Button" onClick={setStartButton}>Set Start</button>
            <button id="Set-End-Button" onClick={setEndButton}>Set End</button>
            <button id="Clear-Button" onClick={clearButton}>Clear</button>
            <button>Run</button>
            <button>Pause</button>
            <button>Restart Simulation</button>
        </div>
    );
}

function setStartButton() {
    handleSetStartCellClick();
}

function setEndButton() {
    handleSetEndCellClick();
}

function clearButton() {
    handleClearButtonClick();
}

export default ControlPanel;