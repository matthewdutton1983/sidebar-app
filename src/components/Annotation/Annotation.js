import { useState } from 'react';
import { 
  IconButton, Menu, Popover, ListItemText, ListItemIcon, Drawer, 
  Typography, Button, Box, TextField, Chip, Tabs, Tab 
} from '@mui/material';
import { 
  StyledListItem, ListItemIconWrapper, NoDataMessage, 
  AnnotationText, StyledMenuItem 
} from '../StyledComponents';
import { InfoRounded, MoreVertRounded, DeleteRounded } from '../IconImports';
import { isEmpty } from 'lodash';
import './Annotation.styles.css';

export const AnnotationPanel = ({ annotations, onDeleteAnnotation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateLabels, setNewTemplateLabels] = useState([]);
  const [newLabelValue, setNewLabelValue] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer =() => {
    setIsDrawerOpen(false);
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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className='annotations'>
      <Typography variant='h6' gutterBottom>
        Annotate Text
      </Typography>
      <Button variant='contained' onClick={handleOpenDrawer} style={{ marginBottom: '15px' }}>
        Manage Templates
      </Button>
      {isEmpty(annotations) ? (
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
       <Drawer
        anchor='right' 
        open={isDrawerOpen} 
        onClose={handleCloseDrawer} 
        PaperProps={{ sx: {width: '50%' } }}
       >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
          <Box sx={{ width: '100%', overflow: 'auto', flex: 1 }}>
            <Typography variant='h6' gutterBottom sx={{ textAlign: 'center'}}>
              Manage Templates
            </Typography>
            <Tabs value={selectedTab} onChange={handleTabChange} style={{ borderBottom: '1px solid #e8e8e8' }}>
              <Tab label='Select Existing Template' />
              <Tab label='Create New Template' />
            </Tabs>
            {selectedTab === 0 && (
              <Box mt={2}>
                <Typography variant='body1'>TODO: Existing Templates</Typography>
              </Box>
            )}
            {selectedTab === 1 && (
              <>
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
              </>
            )}
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button variant='contained' color='primary' onClick={handleCreateTemplate}>
                  Create
                </Button>
                <Button variant='contained' onClick={handleCloseDrawer} style={{ marginRight: '16px' }}>
                  Cancel
                </Button>
              </Box>           
            </Box>
          </Box>
        </Box>
      </Drawer>
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