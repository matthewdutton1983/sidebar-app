import { useState } from 'react';
import { Annotation } from '../Annotation/Annotation';
import { CommentCard } from '../Comment/Comment';
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
  const [comments, setComments] = useState([]);

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
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
      return (
        <div className='comments'>
          <Typography variant='h6' gutterBottom>
            Comments
          </Typography>
          <TextField 
            placeholder='Penny for your thoughts ...'
            fullWidth
            multiline
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim() !== '') {
                handleAddComment(e.target.value.trim());
                e.target.value = '';
                e.preventDefault();
              }
            }}
          />
          {comments.map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          ))}
        </div>
      );
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