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

    return (
        <div id="control-panel">
            <h2>Control Panel</h2>
            <button id="clear-button" onClick={clearButton}>Clear</button>
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