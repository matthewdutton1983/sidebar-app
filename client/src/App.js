import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { SmartViewerPage } from "./pages/SmartViewerPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection/:collectionId" element={<CollectionPage />} />
        <Route path="/smartviewer" element={<SmartViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
