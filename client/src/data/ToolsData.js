import {
  EditRounded,
  FormatListBulletedRounded,
  CommentRounded,
  LocationOnRounded,
  MapRounded,
  SearchRounded,
  SellRounded,
} from "@mui/icons-material";

export const leftTools = [
  { id: 1, name: "Sections", icon: <FormatListBulletedRounded /> },
  { id: 2, name: "Entities", icon: <LocationOnRounded /> },
  { id: 3, name: "Minimap", icon: <MapRounded /> },
];

export const rightTools = [
  { id: 1, name: "Annotate", icon: <EditRounded /> },
  { id: 2, name: "Tags", icon: <SellRounded /> },
  { id: 3, name: "Comments", icon: <CommentRounded /> },
  { id: 4, name: "Search", icon: <SearchRounded /> },
];
