import { useLocation } from "react-router-dom";
import { leftTools, rightTools } from "../components/Toolbar/ToolsData";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { DocumentWindow } from "../components/Documents/DocumentWindow";

export const SmartViewerPage = () => {
  const location = useLocation();
  const fetchedDocument = location.state?.fetchedDocument;

  console.log("fetchedDocument:", fetchedDocument);

  return (
    <div className="container">
      <Toolbar tools={leftTools} position="left" />
      <DocumentWindow document={fetchedDocument} />
      <Toolbar tools={rightTools} position="right" />
    </div>
  );
};
