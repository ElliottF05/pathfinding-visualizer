import { useState } from "react";
import "./ControlPanel.css";

type ControlPanelPropTypes = {
    setStatus: (newStatus: number) => void, 
    resetGrid: () => void,
}

function ControlPanel({setStatus, resetGrid} : ControlPanelPropTypes) {

    const [speed, setSpeed] = useState(1);

    function sliderOnChange(event) {
        const newSpeed = parseInt(event.target.value);
        setSpeed(newSpeed);
    }

    function clearButton() {
        console.log("clear button");
        setStatus(0);
        resetGrid();
    }

    function chooseStartButton() {
        console.log("start button");
        setStatus(1);
    }

    function chooseEndButton() {
        console.log("end button");
        setStatus(2);
    }

    function startButton() {
        console.log("start button");
        setStatus(3);
    }

    return (
        <div id="control-panel">
            <h2>Control Panel</h2>
            <button id="clear-button" onClick={clearButton}>Clear</button>
            <button id="choose-start" onClick={chooseStartButton}>Choose Start</button>
            <button id="choose-end" onClick={chooseEndButton}>Choose End</button>
            <button id="start-button" onClick={startButton}>Start</button>
            <input 
                type="range" 
                min="1" 
                max="100" 
                defaultValue={speed} 
                id="speed-slider"
                onChange={sliderOnChange}
                ></input>
            <span>speed: {speed}</span>
        </div>
    )
}

export default ControlPanel;