import { useState } from 'react';
import { styled } from '@mui/system';
import { CommentRounded, DeleteRounded, EditRounded, FormatListBulletedRounded, InfoRounded, LocationOnRounded, 
  MapRounded, MoreVertRounded, SearchRounded, SellRounded, ZoomInRounded 
} from '@mui/icons-material';
import { 
  Card, CardContent, Chip, IconButton, InputAdornment, ListItem, ListItemIcon, ListItemText,
  Menu, MenuItem, Popover, TextField, Typography } from '@mui/material';
import './App.css';

const StyledMenuItem = styled(MenuItem)`
  min-width: 140px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: flex-start;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
}
`
const StyledListItem = styled(ListItem)`
  padding-left: 0;
  padding-right: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const ListItemIconWrapper = styled(ListItemIcon)`
  min-width: 32px;
  justify-content: flex-end;
`

const AnnotationText = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.875rem;
`;

const NoDataMessage = styled(Typography)`
  text-align: left;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
`;

const ContextMenuWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const leftTools = [
  { id: 1, name: 'Sections', icon: <FormatListBulletedRounded /> },
  { id: 2, name: 'Entities', icon: <LocationOnRounded /> },
  { id: 3, name: 'Minimap', icon: <MapRounded /> },
];

const rightTools = [
  { id: 1, name: 'Annotate', icon: <EditRounded /> },
  { id: 2, name: 'Tags', icon: <SellRounded /> },
  { id: 3, name: 'Comments', icon: <CommentRounded /> },
  { id: 4, name: 'Fill', icon: <ZoomInRounded /> },
];

const Toolbar = ({ 
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
            Annotations
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
            Classify Document
          </Typography>
          <TextField 
            placeholder='Add a new tag and press Enter'
            variant='standard'
            size='small'
            fullWidth
            multiline
          />
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

const Document = ({ onAnnotate }) => {
  const [selectedText, setSelectedText] = useState('');
  const [contextMenuActive, setContextMenuActive] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setContextMenuPosition({
        x: rect.left,
        y: rect.top -40,
      });

      setSelectedText(selectedText);
      setContextMenuActive(true);
    } else {
      setContextMenuActive(false);
    }
  };

  const handleAnnotateText = () => {
    const selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return;
  }

  const range = selection.getRangeAt(0);
  const selectedText = range.toString().trim();

  if (selectedText.length === 0) {
    return;
  }

  const startOffset = range.startOffset;
  const endOffset = range.endOffset;

  const span = document.createElement("span");
  span.style.backgroundColor = "yellow";
  span.dataset.startOffset = startOffset;
  span.dataset.endOffset = endOffset;
  range.surroundContents(span);

  const annotation = {
    text: selectedText,
    start: startOffset,
    end: endOffset,
    timestamp: new Date(),
  };
  onAnnotate(annotation);
};

  const handleSearch = () => {
    alert(`Searching for: "${selectedText}"`)
  };

  return (
    <div 
      className='document'
      onMouseUp={handleMouseUp}
    >
      <Card>
        <CardContent>
          <h2 className='document-header'>Lorem Ipsum</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel ante sed nisl lacinia semper sit amet ut tortor. Ut porta dictum quam in blandit. Donec feugiat efficitur odio, in fringilla eros auctor sit amet. Proin sed nisi tristique turpis semper aliquet eu non mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat neque in rhoncus faucibus. In placerat faucibus libero eget pharetra. Vivamus egestas nibh nec sem rutrum maximus. Cras vel dui mattis, condimentum nulla id, rutrum massa. Cras pellentesque nisl eu tempor dignissim. Integer cursus suscipit molestie. Proin lacinia leo massa, et faucibus sem hendrerit a. Morbi varius erat aliquet felis fringilla pellentesque. Sed in ligula eu mi pellentesque iaculis in sed turpis.</p>
          <p>Sed ut finibus ex, ac feugiat libero. In feugiat quam consequat dignissim laoreet. Donec varius porttitor tempus. Aenean nisi quam, accumsan sit amet ultricies viverra, mollis ultricies nisi. Nulla tincidunt, felis vel accumsan maximus, libero nisl tempor felis, ut blandit tortor massa feugiat ante. In vulputate quam eget nulla mollis pretium et ut dolor. Ut enim erat, ultricies ac semper sed, ullamcorper in quam. Praesent tortor lorem, euismod ac metus non, pellentesque porta leo. Suspendisse non molestie arcu. Ut consectetur pharetra elit, quis venenatis sem pellentesque vitae. Curabitur luctus ipsum in ipsum pretium, ut sagittis nisi sodales. Morbi bibendum vel dui dignissim hendrerit. Nullam odio felis, rutrum vitae pretium suscipit, accumsan ac neque.</p>
          <p>Nunc tincidunt tortor libero, ac vehicula ante vulputate et. Nulla dolor neque, semper eu pretium id, maximus vel est. Mauris arcu ante, gravida ut feugiat ac, gravida mattis nunc. Fusce vehicula rutrum arcu, facilisis commodo nisl egestas sit amet. Vivamus mauris leo, semper vel auctor at, efficitur vel tellus. Duis vitae euismod velit. Vestibulum eros massa, pharetra ac commodo et, convallis eget felis. Sed vel nisi ante. Nulla viverra purus ut aliquet viverra. Nulla a elit nunc. Suspendisse urna lacus, aliquam nec maximus non, vulputate a justo. Maecenas in dolor eget arcu gravida ullamcorper vel in purus. In accumsan quam et auctor rhoncus.</p>
          <p>Nullam gravida diam accumsan rutrum tincidunt. Mauris ligula ipsum, porta vel tincidunt vel, aliquam sed purus. Cras dictum quam nisi, non sodales sem dignissim ac. Fusce laoreet elit odio, sollicitudin egestas urna scelerisque quis. Aliquam vitae erat felis. Nunc eu enim tempus, gravida metus sed, convallis metus. Fusce a tortor tortor. Suspendisse potenti. Ut non eros id eros fringilla lacinia nec ac leo. Praesent consectetur urna et erat aliquam semper. Pellentesque laoreet, sapien a tincidunt egestas, sapien dui laoreet metus, non congue purus purus sed quam. Mauris laoreet nulla quis vehicula eleifend.</p>
          <p>Morbi rutrum enim quis viverra rhoncus. Nunc et urna suscipit, ornare sapien ut, convallis tortor. Nulla condimentum arcu eu facilisis porta. Nulla elit nibh, malesuada quis dolor vel, lobortis fermentum elit. Phasellus fermentum iaculis eros, nec ullamcorper massa hendrerit in. Cras nisl diam, accumsan quis ullamcorper a, commodo lacinia lacus. In sed dolor molestie, ornare metus sed, maximus risus. Nunc vitae justo eget nisi porttitor imperdiet in et turpis. Duis nec turpis at lorem consequat sollicitudin sit amet sed diam. Aliquam a ex iaculis, consectetur ligula sit amet, dictum nunc. Aenean sit amet faucibus arcu. Pellentesque hendrerit felis magna, eget facilisis mauris pretium nec. Aenean egestas ornare luctus. Quisque sodales quis felis ac suscipit. Cras in elit eget lorem consequat elementum sagittis sed urna. Donec ut enim congue, hendrerit felis convallis, tempus nulla.</p>
        </CardContent>
      </Card>
      <ContextMenu 
        active={contextMenuActive}
        position={contextMenuPosition}
        onAnnotate={handleAnnotateText}
        onSearch={handleSearch}
      />
    </div>
  );
};

const ContextMenu = ({ active, position, onAnnotate, onSearch }) => {
  return(
    <Popover
      open={active}
      anchorReference="anchorPosition"
      anchorPosition={{ top: position.y + 16, left: position.x }}
      onClose={() => {}}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <ContextMenuWrapper>
        <StyledMenuItem onClick={onAnnotate}>
          <ListItemIcon>
            <EditRounded />
          </ListItemIcon>
          <ListItemText>Annotate selected text</ListItemText>
        </StyledMenuItem>
        <StyledMenuItem onClick={onSearch}>
          <ListItemIcon>
            <SearchRounded />
          </ListItemIcon>
          <ListItemText>Find similar language</ListItemText>
        </StyledMenuItem>
      </ContextMenuWrapper>
    </Popover>
  );
};

const Annotation = ({ text, timestamp, start, end, onDelete }) => {
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
            <b>Start:</b> {start}
            <br />
            <b>End:</b> {end}
            <br />
            <b>Created:</b> {timestamp.toLocaleString()}
          </Typography>
        </Popover>
      </ListItemIconWrapper>
    </StyledListItem>
  );
};

const App = () => {
  const [annotations, setAnnotations] = useState([]);
  
  const handleAddAnnotation = (annotation) => {
    setAnnotations((prevAnnotations) => [...prevAnnotations, annotation]);
  };

  const handleDeleteAnnotation = (index) => {
    const annotationToDelete = annotations[index];
    const spanElements = document.getElementsByTagName("span");
    
    for (let span of spanElements) {
      const startOffset = parseInt(span.dataset.startOffset, 10);
      const endOffset = parseInt(span.dataset.endOffset, 10);
      
      if (
        startOffset === annotationToDelete.start &&
        endOffset === annotationToDelete.end
      ) {
        const parent = span.parentNode;
        const textNode = document.createTextNode(span.textContent);
        parent.replaceChild(textNode, span);
        break;
      }
    }
    
    setAnnotations((prevAnnotations) => prevAnnotations.filter((_, i) => i !== index)
    );
  };

  return (
    <div className='container'>
      <Toolbar 
        tools={leftTools} 
        position='left' 
      />
      <Document onAnnotate={handleAddAnnotation} />
      <Toolbar 
        tools={rightTools} 
        position='right'
        annotations={annotations} 
        onDeleteAnnotation={handleDeleteAnnotation} 
      />
    </div>
  );
};

export default App;
