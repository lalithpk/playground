import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Timer from "./component/Timer/Timer";
import ResponsiveAppBar from "./component/AppBar/AppBar";
import CustomerTimer from "./component/Timer/CustomTimer";
import SudoKu from "./Pages/SudoKu/SudoKu";
import WordCounter from "./Pages/WordCounter/WordCounter";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Timer" element={<Timer />} />
        <Route path="/CustomTimer" element={<CustomerTimer />} />
        <Route path="/Sudoku" element={<SudoKu />} />
        <Route path="/WordCount" element={<WordCounter />} />
      </Routes>
    </div>
  );
}

export default App;
