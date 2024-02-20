import { useState } from "react";
import "./ControlPanel.css";

const enum Algorithms {
    Dijkstras,
    AStar,
}

type ControlPanelPropTypes = {
    setStatus: (newStatus: number) => void, 
    resetGrid: () => void,
    setAppSpeed: (value: number) => void,
    setAlgorithm: (algorithm: Algorithms) => void,
}

let dijkstraChecked = true;

function ControlPanel({setStatus, resetGrid, setAppSpeed, setAlgorithm} : ControlPanelPropTypes) {

    const [speed, setSpeed] = useState(1);

    function sliderOnChange(event) {
        const newSpeed = Math.round((Math.pow(1.1, parseInt(event.target.value))) * 100) / 100;
        setSpeed(newSpeed);
        setAppSpeed(newSpeed);
    }

    function selectAlgorithmForm(event): void {
        if (event.target.value === "1") {
            console.log("dijkstra's selected");
            dijkstraChecked = true;
            setAlgorithm(Algorithms["dijkstra's"]);

        } else {
            console.log("A* selected");
            dijkstraChecked = false;
            setAlgorithm(Algorithms["A*"]);
        }
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

    function endButton() {
        console.log("end button");
        setStatus(0);
    }

    function restartSearchButton() {
        console.log("restart search");
        setStatus(4);
    }

    return (
        <div id="control-panel">
            <h2>Control Panel</h2>
            <button id="clear-button" onClick={clearButton}>Clear</button>
            <button id="choose-start" onClick={chooseStartButton}>Choose Start</button>
            <button id="choose-end" onClick={chooseEndButton}>Choose End</button>
            <button id="start-button" onClick={startButton}>Start</button>
            <button id="stop-button" onClick={endButton}>End</button>
            <button id="restart-search" onClick={restartSearchButton}>Restart Search</button>
            <p>Select Algorithm:</p>
            <form id="select-algorithm-form">
                <div>
                    <input type="radio" name="algorithm-options" id="algorithms-option-1" value="1" checked={dijkstraChecked} onClick={selectAlgorithmForm}></input>
                    <label htmlFor="algorithms-option-1">Dijkstra's</label>
                </div>
                <div>
                    <input type="radio" name="algorithm-options" id="algorithms-option-2" value="2" onClick={selectAlgorithmForm}></input>
                    <label htmlFor="algorithms-option-2">A*</label>
                </div>
            </form>
            <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue={speed} 
                id="speed-slider"
                onChange={sliderOnChange}
                ></input>
            <span>speed: {speed - 1}</span>
        </div>
    )
}

export default ControlPanel;