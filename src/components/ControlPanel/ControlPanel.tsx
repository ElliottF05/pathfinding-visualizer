import { handleSetStartCellClick, handleSetEndCellClick, handleClearButtonClick, handleRunButtonClick } from "../../data/grid";

function ControlPanel() {
    return (
        <div>
            <button id="Set-Start-Button" onClick={setStartButton}>Set Start</button>
            <button id="Set-End-Button" onClick={setEndButton}>Set End</button>
            <button id="Clear-Button" onClick={clearButton}>Clear</button>
            <button id="Run-Button" onClick={handleRunButton}>Run</button>
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

function handleRunButton() {
    handleRunButtonClick();
}

export default ControlPanel;