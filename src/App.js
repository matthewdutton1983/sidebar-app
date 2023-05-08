import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { SmartViewerPage } from "./pages/SmartViewerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection/:collectionId" element={<CollectionPage />} />
        <Route
          path="/collection/:collectionId/documents/:documentId"
          element={<SmartViewerPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
