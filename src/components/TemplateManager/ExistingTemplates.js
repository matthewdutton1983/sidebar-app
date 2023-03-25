import { Box, IconButton, Typography } from "@mui/material";
import { StyledListItem } from "../StyledComponents";
import { DeleteRounded } from "../IconImports";

export const ExistingTemplates = ({
  existingTemplates,
  handleDeleteTemplate,
}) => {
  return (
    <>
      {existingTemplates.length === 0 ? (
        <Typography variant="body1">
          There are currently no templates.
        </Typography>
      ) : (
        <>
          {existingTemplates.map((template) => (
            <StyledListItem
              key={template.id}
              sx={{ flex: 1, minHeight: "48px", alignItems: "center" }}
            >
              <Typography variant="body1">{template.name}</Typography>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  onClick={() => handleDeleteTemplate(template)}
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
        </>
      )}
    </>
  );
};
