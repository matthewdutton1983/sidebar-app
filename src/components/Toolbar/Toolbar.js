import { useState } from "react";
import { Annotator } from "../Annotator/Annotator";
import { Classifier } from "../Classifier/Classifier";
import { Comments } from "../Comments/Comments";
import { logger } from "../../logger";
import "./Toolbar.styles.css";

export const Toolbar = ({ tools, position }) => {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (tool) => {
    logger(`Toolbar: ${tool.name} clicked`);
    setActiveTool(activeTool === tool ? null : tool);
  };

  const renderPanelContent = () => {
    if (!activeTool) return null;

    if (activeTool.name === "Annotate") {
      return <Annotator />;
    }

    if (activeTool.name === "Tags") {
      return <Classifier />;
    }

    if (activeTool.name === "Comments") {
      return <Comments />;
    }

    return activeTool.panel;
  };

  logger(`Toolbar: rendered with position ${position}`);

  return (
    <div className={`toolbar ${position}`}>
      {tools.map((tool) => (
        <div
          key={tool.id}
          className={`toolbar-item ${activeTool === tool ? "active" : ""}`}
          onClick={() => handleToolClick(tool)}
        >
          {tool.icon}
        </div>
      ))}
      <div className={`panel ${activeTool ? "expanded" : ""} ${position}`}>
        {renderPanelContent()}
      </div>
    </div>
  );
};
