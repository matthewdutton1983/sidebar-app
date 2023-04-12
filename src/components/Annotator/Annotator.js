import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { TemplateManager } from "./TemplateManager";
import { Logger } from "../../Logger";
import "./Annotator.styles.css";

export const Annotator = () => {
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState(false);

  const handleOpenTemplateManager = () => {
    Logger("TemplateManager opened.");
    setIsTemplateManagerOpen(true);
  };

  const handleCloseTemplateManager = () => {
    Logger("TemplateManager closed.");
    setIsTemplateManagerOpen(false);
  };

  return (
    <div className="annotations">
      <Typography variant="h6" gutterBottom>
        Annotator
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpenTemplateManager}
        className="manage-templates-button"
      >
        Manage Templates
      </Button>
      <br />
      {isTemplateManagerOpen && (
        <TemplateManager
          onClose={() => {
            Logger("TemplateManager onClose event triggered.");
            handleCloseTemplateManager();
          }}
        />
      )}
    </div>
  );
};
