import { useState } from "react";
import { handleControlPanelEvents, Algorithms } from "../../data/grid";
import "./ControlPanel.css";

export enum ControlPanelEventTypes {
    setStartButtonClicked,
    setEndButtonClicked,
    clearButtonClicked,
    runButtonClicked,
    RestartSimulationButtonClicked,
    DijkstrasSelected,
    AstarSelected,
}

function ControlPanel() {

    const [algorithmSelected, setAlgorithmSelected] = useState(Algorithms.Dijkstras);

    return (
        <div>
            <button id="Set-Start-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.setStartButtonClicked)}>Set Start</button>
            <button id="Set-End-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.setEndButtonClicked)}>Set End</button>
            <button id="Clear-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.clearButtonClicked)}>Clear</button>
            <button id="Run-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.runButtonClicked)}>Run</button>
            <button>Pause</button>
            <button id="Restart-Simulation-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.RestartSimulationButtonClicked)}>Restart Simulation</button>
    
            <form id="Select-Algorithm-Form">
                <div>
                    <input 
                        type="radio" 
                        name="Select-Algorithm-Form"
                        id="Select-Algorithm-Dijkstra"
                        defaultChecked={algorithmSelected == Algorithms.Dijkstras}
                        onClick={() => {
                            handleControlPanelEvents(ControlPanelEventTypes.DijkstrasSelected);
                            setAlgorithmSelected(Algorithms.Dijkstras);
                        }}
                        ></input>
                    <label htmlFor="Select-Algorithm-Dijkstra">Dijkstra's</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="Select-Algorithm-Form"
                        id="Select-Algorithm-Astar"
                        defaultChecked={algorithmSelected == Algorithms.Astar}
                        onClick={() => {
                            handleControlPanelEvents(ControlPanelEventTypes.AstarSelected);
                            setAlgorithmSelected(Algorithms.Astar);
                        }}
                        ></input>
                    <label htmlFor="Select-Algorithm-Astar">A*</label>
                </div>
            </form>
        </div>
    );
}

export default ControlPanel;