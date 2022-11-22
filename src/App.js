import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Survey from "./components/Survey";
import Submit from "./components/Submit"

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Survey />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </div>
  );
}

export default App;