import { Annotation } from '../Annotation/Annotation';
import { NoAnnotationsMessage } from '../StyledComponents';
import { Typography } from '@mui/material';
import './Toolbar.css';

export const Toolbar = ({ 
    tools, 
    position, 
    activeTool, 
    setActiveTool, 
    annotations, 
    onDeleteAnnotation,
}) => {
    const handleToolClick = (tool) => {
        setActiveTool(activeTool === tool ? null : tool);
    };

    const renderPanelContent = () => {
        if (!activeTool) return null;

        if (activeTool.name === "Annotate") {
            return (
                <div className="annotations">
                    <Typography variant="h6" gutterBottom>
                        Annotations
                    </Typography>
                    {annotations.length === 0 ? (
                    <NoAnnotationsMessage>
                        There are currently no annotations for this document.
                    </NoAnnotationsMessage>
                    ) : (
                        annotations.map((annotation, index) => (
                        <Annotation
                            key={index}
                            text={annotation.text}
                            timestamp={annotation.timestamp}
                            start={annotation.start}
                            end={annotation.end}
                            onDelete={() => onDeleteAnnotation(index)}
                        />   
                        ))
                    )}
                </div>
            );
        }

        return activeTool.panel;
    };

    return (
        <div className={`toolbar ${position}`}>
        {tools.map((tool) => (
            <div
            key={tool.id}
            className={`toolbar-item ${
                activeTool === tool ? 'active' : ''
            }`}
            onClick={() => handleToolClick(tool)}
            >
            {tool.icon}
            </div>
        ))}
        <div className={`panel ${activeTool ? 'expanded' : ''} ${position}`}>
            {renderPanelContent()}
        </div>
        </div>
    );
};