import { TextField, InputAdornment } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

export const SearchBar = ({ onChange }) => {
  return (
    <TextField
      id="searchBar"
      variant="outlined"
      placeholder="Search ..."
      size="small"
      style={{ width: "350px" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
};
