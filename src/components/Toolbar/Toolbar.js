import { useState } from 'react';
import { AnnotationPanel } from '../Annotation/Annotation';
import { Comment } from '../Comments/Comments';
import { TextField, Typography } from '@mui/material';
import './Toolbar.styles.css';

export const Toolbar = ({ 
  tools, 
  position, 
  annotations, 
  onDeleteAnnotation,
  comments,
}) => {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const renderPanelContent = () => {
    if (!activeTool) return null;

    if (activeTool.name === 'Annotate') {
      return <AnnotationPanel annotations={annotations} onDeleteAnnotation={onDeleteAnnotation}/>
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
      return <Comment comments={comments}/>
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