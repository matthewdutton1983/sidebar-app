import { styled } from '@mui/system';
import { MenuItem, ListItem, ListItemIcon, Typography } from '@mui/material';

export const StyledMenuItem = styled(MenuItem)`
  min-width: 140px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: flex-start;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
}
`

export const StyledListItem = styled(ListItem)(({ theme, color }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: 0,
  borderLeft: `6px solid ${color}`,
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));


export const ListItemIconWrapper = styled(ListItemIcon)`
  min-width: 32px;
  justify-content: flex-end;
`

export const AnnotationText = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.875rem;
`;

export const NoDataMessage = styled(Typography)`
  text-align: left;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
`;

export const ContextMenuWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;