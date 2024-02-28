import { useState } from "react";
import { handleControlPanelEvents, Algorithms, gridWidth, gridHeight } from "../../data/grid";
import "./ControlPanel.css";

export enum ControlPanelEventTypes {
    setStartButtonClicked,
    setEndButtonClicked,
    clearButtonClicked,
    runButtonClicked,
    pauseButtonClicked,
    restartSimulationButtonClicked,
    dijkstrasSelected,
    astarSelected,
    increaseWidthClicked,
    decreaseWidthClicked,
    increaseHeightClicked,
    decreaseHeightClicked,
    randomizeGridClicked,
}

function ControlPanel() {

    const [algorithmSelected, setAlgorithmSelected] = useState(Algorithms.Dijkstras);

    return (
        <div id="Control-Panel-Wrapper">
            <button id="Set-Start-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.setStartButtonClicked)}>Set Start</button>
            <button id="Set-End-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.setEndButtonClicked)}>Set End</button>
            <button id="Clear-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.clearButtonClicked)}>Clear</button>
            <button id="Run-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.runButtonClicked)}>Run</button>
            <button id="Pause-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.pauseButtonClicked)}>Pause</button>
            <button id="Restart-Simulation-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.restartSimulationButtonClicked)}>Restart Simulation</button>
    
            <form id="Select-Algorithm-Form">
                <div>
                    <input 
                        type="radio" 
                        name="Select-Algorithm-Form"
                        id="Select-Algorithm-Dijkstra"
                        defaultChecked={algorithmSelected == Algorithms.Dijkstras}
                        onClick={() => {
                            handleControlPanelEvents(ControlPanelEventTypes.dijkstrasSelected);
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
                            handleControlPanelEvents(ControlPanelEventTypes.astarSelected);
                            setAlgorithmSelected(Algorithms.Astar);
                        }}
                        ></input>
                    <label htmlFor="Select-Algorithm-Astar">A*</label>
                </div>
            </form>

            <div className="dimension-wrapper" id="Grid-Width-Wrapper">
                <div style={{width: "120px"}}>Grid Width: {gridWidth}</div>
                <button className="dimension-button" 
                    onClick={() => handleControlPanelEvents(ControlPanelEventTypes.decreaseWidthClicked)}>–</button>
                <button className="dimension-button" 
                    onClick={() => handleControlPanelEvents(ControlPanelEventTypes.increaseWidthClicked)}>+</button>
            </div>
            <div className="dimension-wrapper" id="Grid-Height-Wrapper">
                <div style={{width: "120px"}}>Grid Height: {gridHeight}</div>
                <button className="dimension-button" 
                    onClick={() => handleControlPanelEvents(ControlPanelEventTypes.decreaseHeightClicked)}>–</button>
                <button className="dimension-button"
                    onClick={() => handleControlPanelEvents(ControlPanelEventTypes.increaseHeightClicked)}>+</button>
            </div>

            <button id="Randomize-Grid-Button" onClick={() => handleControlPanelEvents(ControlPanelEventTypes.randomizeGridClicked)}>Randomize Grid</button>

        </div>
    );
}

export default ControlPanel;