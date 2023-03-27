import { leftTools, rightTools } from "../data/ToolsData";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Document } from "../components/Document/Document";

export const SmartViewerPage = () => {
  return (
    <div className="container">
      <Toolbar tools={leftTools} position="left" />
      <Document />
      <Toolbar tools={rightTools} position="right" />
    </div>
  );
};
