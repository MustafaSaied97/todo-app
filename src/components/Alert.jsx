import React from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAlertContext } from 'src/context/alertContext';
import Snackbar from '@mui/material/Snackbar';
export default function Alert() {
  const { isOpen, duration, message, onClose } = useAlertContext();
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
    open={isOpen}
    autoHideDuration={duration}
    onClose={onClose}
    message={message}
    action={action}
  />
  )
}
