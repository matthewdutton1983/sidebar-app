import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { StyledListItem } from "../StyledComponents";
import { DeleteRounded } from "../IconImports";

export const CreateTemplate = ({
  newTemplateName,
  newLabelValue,
  newTemplateLabels,
  handleInputChange,
  handleLabelInputChange,
  handleAddNewLabel,
  handleDeleteLabel,
  handleCreateTemplate,
  setSelectedTab,
  labelColors,
  formIncomplete,
  setFormIncomplete,
}) => {
  return (
    <>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography fontWeight={"bold"}>
              Please enter a name for this template
            </Typography>
            <TextField
              placeholder="This is a required field"
              value={newTemplateName}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
          </Box>
        </Grid>
        <Grid container item xs={12} alignItems="flex-start" spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography fontWeight={"bold"}>
                Add a label and press Enter:
              </Typography>
              <TextField
                placeholder="This is a required field"
                value={newLabelValue}
                required
                onChange={handleLabelInputChange}
                margin="normal"
                variant="outlined"
                sx={{ flex: "1", width: "100%" }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleAddNewLabel();
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography fontWeight={"bold"}>
                Label names ({newTemplateLabels.length})
              </Typography>
              <Box sx={{ marginTop: "16px", width: "100%" }}>
                {newTemplateLabels.map((label, index) => (
                  <StyledListItem
                    key={index}
                    color={labelColors[index % labelColors.length]}
                    sx={{
                      flex: 1,
                      minHeight: "48px",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography variant="body1">{label}</Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                      <IconButton
                        onClick={() => handleDeleteLabel(index)}
                        sx={{
                          paddingRight: "16px",
                          bgcolor: "transparent",
                          "&:hover": { bgcolor: "transparent" },
                        }}
                      >
                        <DeleteRounded />
                      </IconButton>
                    </Box>
                  </StyledListItem>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTemplate}
          >
            Create
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedTab(0)}
            style={{ marginRight: "16px" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      {formIncomplete && (
        <Snackbar
          open={formIncomplete}
          autoHideDuration={3000}
          onClose={() => setFormIncomplete(false)}
        >
          <Alert severity="error">Please complete all required fields</Alert>
        </Snackbar>
      )}
    </>
  );
};
