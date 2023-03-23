import { Typography, Button, Drawer } from "@mui/material";
import { AnnotationEntity } from "../AnnotationEntity/AnnotationEntity";
import { NoDataMessage } from "../../StyledComponents";
import { useAnnotationPanel } from "./useAnnotationPanel";
import { isEmpty } from "lodash";
import { ManageTemplates } from "../ManageTemplates/ManageTemplates";
import "../AnnotationEntity/AnnotationEntity.styles.css";

export const AnnotationPanel = ({ annotations, onDeleteAnnotation }) => {
  const {
    isDrawerOpen,
    newTemplateName,
    newTemplateLabels,
    newLabelValue,
    selectedTab,
    handleOpenDrawer,
    handleCloseDrawer,
    handleInputChange,
    handleLabelInputChange,
    handleAddNewLabel,
    handleDeleteLabel,
    handleCreateTemplate,
    handleTabChange,
  } = useAnnotationPanel();

  return (
    <div className="annotations">
      <Typography variant="h6" gutterBottom>
        Annotate Text
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpenDrawer}
        style={{ marginBottom: "15px" }}
      >
        Manage Templates
      </Button>
      {isEmpty(annotations) ? (
        <NoDataMessage>
          There are currently no annotations for this document.
        </NoDataMessage>
      ) : (
        annotations.map((annotation, index) => (
          <AnnotationEntity
            key={index}
            text={annotation.text}
            timestamp={annotation.timestamp}
            start={annotation.start}
            end={annotation.end}
            onDelete={() => onDeleteAnnotation(index)}
          />
        ))
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{ sx: { width: "50%" } }}
      >
        <ManageTemplates
          isDrawerOpen={isDrawerOpen}
          selectedTab={selectedTab}
          newTemplateName={newTemplateName}
          newTemplateLabels={newTemplateLabels}
          newLabelValue={newLabelValue}
          handleOpenDrawer={handleOpenDrawer}
          handleCloseDrawer={handleCloseDrawer}
          handleInputChange={handleInputChange}
          handleLabelInputChange={handleLabelInputChange}
          handleAddNewLabel={handleAddNewLabel}
          handleDeleteLabel={handleDeleteLabel}
          handleCreateTemplate={handleCreateTemplate}
          handleTabChange={handleTabChange}
        />
      </Drawer>
    </div>
  );
};
