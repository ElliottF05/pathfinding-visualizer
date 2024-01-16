import Message from "./components/Message";
import "./App.css";

function App() {

    const arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(<Message count={i+1} key={i}></Message>)
    }

    return <div className="MessageContainer">{arr}</div>;
}

export default App;