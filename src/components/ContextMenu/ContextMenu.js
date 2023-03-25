import { Popover, ListItemIcon, ListItemText } from "@mui/material";
import { StyledMenuItem, ContextMenuWrapper } from "../StyledComponents";
import { EditRounded, SearchRounded } from "../IconImports";
import "./ContextMenu.styles.css";

export const ContextMenu = ({ active, position, onAnnotate, onSearch }) => {
  return (
    <Popover
      open={active}
      anchorReference="anchorPosition"
      anchorPosition={{ top: position.y + 16, left: position.x }}
      onClose={() => {}}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
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
