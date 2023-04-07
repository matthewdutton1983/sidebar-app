import { Alert, Snackbar } from "@mui/material";

export const CustomSnackbar = ({
  message,
  severity,
  open,
  autoHideDuration,
  onClose,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert severity={severity} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
