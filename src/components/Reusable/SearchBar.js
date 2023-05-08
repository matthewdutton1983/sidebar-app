import { TextField, InputAdornment } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

export const SearchBar = () => {
  return (
    <TextField
      id="searchBar"
      variant="outlined"
      placeholder="Search documents..."
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
      }}
    />
  );
};
