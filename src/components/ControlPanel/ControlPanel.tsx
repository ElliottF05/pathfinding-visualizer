import { handleSetStartCellClick, handleSetEndCellClick, handleClearButtonClick, handleRunButtonClick, handleRestartSimulationButtonClick } from "../../data/grid";

function ControlPanel() {
    return (
        <div>
            <button id="Set-Start-Button" onClick={setStartButton}>Set Start</button>
            <button id="Set-End-Button" onClick={setEndButton}>Set End</button>
            <button id="Clear-Button" onClick={clearButton}>Clear</button>
            <button id="Run-Button" onClick={handleRunButton}>Run</button>
            <button>Pause</button>
            <button id="Restart-Simulation-Button" onClick={handleRestartSimulationButton}>Restart Simulation</button>
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

function handleRestartSimulationButton() {
    handleRestartSimulationButtonClick();
}

export default ControlPanel;