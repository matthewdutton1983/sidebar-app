import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Collection } from "./pages/Collection";
import { SmartViewer } from "./pages/SmartViewer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/smartviewer" element={<SmartViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
