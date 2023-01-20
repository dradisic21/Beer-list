import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import ListBeer from "./components/ListBeer";
import RenderBeer from "./components/RenderBeer";

import "./App.css";
import "./ui/button.css";
import "./ui/input.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/listbeer" element={<ListBeer />} />
          <Route path="/renderbeer" element={<RenderBeer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
