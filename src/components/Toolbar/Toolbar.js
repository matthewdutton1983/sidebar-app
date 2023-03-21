import { useState } from 'react';
import { Annotation } from '../Annotation/Annotation';
import { Comment } from '../Comment/Comment';
import { NoDataMessage } from '../StyledComponents';
import { TextField, Typography } from '@mui/material';
import './Toolbar.styles.css';

export const Toolbar = ({ 
  tools, 
  position, 
  annotations, 
  onDeleteAnnotation,
}) => {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const renderPanelContent = () => {
    if (!activeTool) return null;

    if (activeTool.name === 'Annotate') {
      return (
        <div className='annotations'>
          <Typography variant='h6' gutterBottom>
            Annotate Text
          </Typography>
          {annotations.length === 0 ? (
            <NoDataMessage>
              There are currently no annotations for this document.
            </NoDataMessage>
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
    };
    
    if (activeTool.name ==='Tags') {
      return (
        <div className='tags'>
          <Typography variant='h6' gutterBottom>
            Categorize Document
          </Typography>
          <TextField 
            placeholder='Add a new tag and press Enter'
            fullWidth
            multiline
          />
        </div>
      );
    };

    if (activeTool.name ==='Comments') {
      return <Comment />
    };
   
    return activeTool.panel;
  };

  return (
    <div className={ `toolbar ${position}` }>
      {tools.map((tool) => (
        <div
          key={tool.id}
          className={ `toolbar-item ${ activeTool === tool ? 'active' : '' }` }
          onClick={() => handleToolClick(tool)}
        >
          {tool.icon}
        </div>
      ))}
      <div className={ `panel ${activeTool ? 'expanded' : ''} ${position}` }>
        { renderPanelContent() }
      </div>
    </div>
  );
};