import { useState } from 'react';
import { IconButton, Menu, Popover, ListItemText, ListItemIcon, Typography, Modal, Button, Box, TextField, Chip } from '@mui/material';
import { StyledListItem, ListItemIconWrapper, NoDataMessage, AnnotationText, StyledMenuItem } from '../StyledComponents';
import { InfoRounded, MoreVertRounded, DeleteRounded } from '../IconImports';
import './Annotation.styles.css';
import { AddRounded } from '@mui/icons-material';

export const AnnotationPanel = ({ annotations, onDeleteAnnotation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateLabels, setNewTemplateLabels] = useState([]);
  const [newLabelValue, setNewLabelValue] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal =() => {
    setIsModalOpen(false);
    setNewTemplateName('');
  };

  const handleInputChange = (event) => {
    setNewTemplateName(event.target.value);
  };

  const handleLabelInputChange = (event) => {
    setNewLabelValue(event.target.value);
  };

  const handleAddNewLabel = () => {
    if (newLabelValue.trim() !== '') {
      setNewTemplateLabels([...newTemplateLabels, newLabelValue.trim()]);
      setNewLabelValue('');
    }
  };

  const handleDeleteLabel = (index) => {
    const newLabels = [...newTemplateLabels];
    newLabels.splice(index, 1);
    setNewTemplateLabels(newLabels);
  };

  const handleCreateTemplate = () => {
    console.log(`Creating new template: ${newTemplateName}`)
  }

  return (
    <div className='annotations'>
      <Typography variant='h6' gutterBottom>
        Annotate Text
      </Typography>
      <Button variant='contained' onClick={handleOpenModal} style={{ marginBottom: '15px' }}>
        Create New Template
      </Button>
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
      <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div className='modal'>
            <Typography variant='h6' gutterBottom>
              Create New Template
            </Typography>
            <TextField 
              placeholder='Please enter a name for this Annotation Template'
              value={newTemplateName}
              onChange={handleInputChange}
              fullWidth
              margin='normal'
            />
            <Box display='flex' alignItems='center'>
              <TextField
                placeholder='Add a new label and press Enter'
                value={newLabelValue}
                onChange={handleLabelInputChange}
                margin='normal'
                sx={{ flex: '1' }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleAddNewLabel();
                  }
                }}
              />
            </Box>
            <Box>
              {newTemplateLabels.map((label, index) => (
                <Chip key={index} label={label} onDelete={() => handleDeleteLabel(index)} style={{ margin: '4px' }} />
              ))}
            </Box>
            <Box display='flex' justifyContent='flex-end' mt={2}>
              <Button variant='contained' onClick={handleCloseModal} style={{ marginRight: '16px' }}>
                Cancel
              </Button>
              <Button variant='contained' color='primary' onClick={handleCreateTemplate}>
                Create
              </Button>
            </Box>
          </div>
      </Modal>
    </div>
  );
};

export const Annotation = ({ text, timestamp, start, end, onDelete }) => { 
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleInfoClick = (event) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setInfoAnchorEl(null);
    setMenuAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  const jumpToAnnotation = () => {
    const highlightedSpans = document.querySelectorAll('span');
    for (const span of highlightedSpans) {
      const spanStartOffset = parseInt(span.dataset.startOffset, 10);
      const spanEndOffset = parseInt(span.dataset.endOffset, 10);
      if (spanStartOffset === start && spanEndOffset === end) {
        span.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  };

  const infoOpen = Boolean(infoAnchorEl);
  const menuOpen = Boolean(menuAnchorEl);
  const infoId = infoOpen ? 'info-popover' : undefined;
  const menuId = menuOpen ? 'menu-popover' : undefined;

  return (
    <StyledListItem onClick={jumpToAnnotation}>
      <ListItemText primary={<AnnotationText>{text}</AnnotationText>} />
      <ListItemIconWrapper>
        <IconButton onClick={handleMenuClick}>
          <MoreVertRounded />
        </IconButton>
        <Menu
          id={menuId}
          open={menuOpen}
          anchorEl={menuAnchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            style: {
              minWidth: 120,
            },
          }}
        >
          <StyledMenuItem onClick={handleInfoClick}>
            <ListItemIcon>
              <InfoRounded />
            </ListItemIcon>
            <ListItemText primary='Info' />
          </StyledMenuItem>
          <StyledMenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteRounded />
            </ListItemIcon>
            <ListItemText primary='Delete' />
          </StyledMenuItem>
        </Menu>
        <Popover
          id={infoId}
          open={infoOpen}
          anchorEl={infoAnchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <b>Offsets:</b> {start} - {end}
            <br />
            <b>Created:</b> {timestamp.toLocaleString()}
          </Typography>
        </Popover>
      </ListItemIconWrapper>
    </StyledListItem>
  );
};