import { useState } from "react";
// import { AnnotationPanel } from "../Annotator/AnnotationPanel/AnnotationPanel";
import { Classification } from "../Classifier/Classification";
import { Comment } from "../Comments/Comments";
import "./Toolbar.styles.css";

export const Toolbar = ({
  tools,
  position,
  // annotations,
  // onDeleteAnnotation,
  comments,
}) => {
  const [activeTool, setActiveTool] = useState(null);
  const [tags, setTags] = useState([]);

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const renderPanelContent = () => {
    if (!activeTool) return null;

    // if (activeTool.name === 'Annotate') {
    //   return (<AnnotationPanel annotations={annotations} onDeleteAnnotation={onDeleteAnnotation}/>);
    // };

    if (activeTool.name === "Tags") {
      return (
        <Classification
          tags={tags}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
        />
      );
    }

    if (activeTool.name === "Comments") {
      return <Comment comments={comments} />;
    }

    return activeTool.panel;
  };

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
