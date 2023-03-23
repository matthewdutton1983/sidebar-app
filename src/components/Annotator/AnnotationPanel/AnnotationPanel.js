import { IconButton, Grid, TextField, Typography, Button, Drawer, Box, Tabs, Tab } from '@mui/material';
import { Annotation } from '../AnnotationEntity/AnnotationEntity';
import { NoDataMessage, StyledListItem } from '../../StyledComponents';
import { labelColors } from '../labelColors';
import { useAnnotationPanel } from './useAnnotationPanel';
import { DeleteRounded } from '../../IconImports';
import { isEmpty } from 'lodash';
import '../Annotation.styles.css';

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
    handleTabChange
  } = useAnnotationPanel();

  return (
    <div className='annotations'>
      <Typography variant='h6' gutterBottom>
        Annotate Text
      </Typography>
      <Button variant='contained' onClick={handleOpenDrawer} style={{ marginBottom: '15px' }}>
        Manage Templates
      </Button>
      {isEmpty(annotations) ? (
        <NoDataMessage>
          There are currently no annotations for this document.
        </NoDataMessage>
      ) : (
        annotations.map((annotation, index) => (
          <Annotation
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
        anchor='right' 
        open={isDrawerOpen} 
        onClose={handleCloseDrawer} 
        PaperProps={{ sx: {width: '50%' } }}
       >
        <Box sx={{ p: 4 }}>
          <Typography variant='h6' gutterBottom sx={{ textAlign: 'center'}}>
            Manage Templates
          </Typography>
          <br/>
          <Tabs value={selectedTab} onChange={handleTabChange} style={{ borderBottom: '1px solid #e8e8e8' }}>
            <Tab label='Select Existing Template' />
            <Tab label='Create New Template' />
          </Tabs>
          <br/>
          {selectedTab === 0 && (
            <Box mt={2}>
              <Typography variant='body1'>TODO: Existing Templates</Typography>
            </Box>
          )}
          {selectedTab === 1 && (
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
                      value={newTemplateName}
                      onChange={handleInputChange}
                      fullWidth
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
                        value={newLabelValue}
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
                      <Box sx={{ marginTop: "16px", width: '100%' }}>
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
            </>
        )}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Button variant='contained' color='primary' onClick={handleCreateTemplate}>
                Create
              </Button>
              <Button variant='contained' onClick={handleCloseDrawer} style={{ marginRight: '16px' }}>
                Cancel
              </Button>
            </Box>           
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};