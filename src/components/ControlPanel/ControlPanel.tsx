import { handleControlPanelEvents } from "../../data/grid";

export enum ControlPanelEventTypes {
    setStartButtonClicked,
    setEndButtonClicked,
    clearButtonClicked,
    runButtonClicked,
    RestartSimulationButtonClicked,
}

function ControlPanel() {
    return (
        <div>
            <button id="Set-Start-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.setStartButtonClicked)}>Set Start</button>
            <button id="Set-End-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.setEndButtonClicked)}>Set End</button>
            <button id="Clear-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.clearButtonClicked)}>Clear</button>
            <button id="Run-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.runButtonClicked)}>Run</button>
            <button>Pause</button>
            <button id="Restart-Simulation-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.RestartSimulationButtonClicked)}>Restart Simulation</button>
        </div>
    );
}

export default ControlPanel;