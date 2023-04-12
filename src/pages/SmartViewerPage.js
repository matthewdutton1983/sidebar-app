import { leftTools, rightTools } from "../components/Toolbar/ToolsData";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Document } from "../components/Documents/Document";

export const SmartViewerPage = () => {
  return (
    <div className="container">
      <Toolbar tools={leftTools} position="left" />
      <Document />
      <Toolbar tools={rightTools} position="right" />
    </div>
  );
};
