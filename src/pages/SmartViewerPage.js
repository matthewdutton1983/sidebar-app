import { leftTools, rightTools } from "../components/Toolbar/ToolsData";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { DocumentWindow } from "../components/Documents/DocumentWindow";

export const SmartViewerPage = () => {
  return (
    <div className="container">
      <Toolbar tools={leftTools} position="left" />
      <DocumentWindow />
      <Toolbar tools={rightTools} position="right" />
    </div>
  );
};
