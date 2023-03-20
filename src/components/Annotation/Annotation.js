import { useState } from 'react';
import { IconButton, Menu, Popover, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { StyledListItem, ListItemIconWrapper, AnnotationText, StyledMenuItem } from '../StyledComponents';
import { InfoRounded, MoreVertRounded, DeleteRounded } from '../IconImports';
import './Annotation.styles.css';

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