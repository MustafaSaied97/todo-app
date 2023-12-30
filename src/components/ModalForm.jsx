import  React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ModalForm({open,mode,handleClose,data={},actions}) {
  const [formData, setFormData] = useState({})
  const [isTouched, setIsTouched] = useState(false)
 
  useEffect(()=>{
    setIsTouched(false)
    setFormData({...data})
  },[data])
  useEffect(()=>{
  },[formData])

  const handleChange = (event) => {
    let cloneFormData={...formData};
    cloneFormData={
      ...cloneFormData,
      [event.target.id]:event.target.value
    }
    setFormData(cloneFormData)
  };
  const handleSubmit = () => {
    setIsTouched(true)
    if(formData.title===''|| formData.description==='') return
    mode=='add'?actions.onAddItem(formData):actions.onEditItem(formData)
    setIsTouched(false)

    handleClose()
  };

  
  return (
    <>{open&&
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {mode=='add'?
          'Add new Task':
          `Task: ${data.title}`
          }
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>

          <TextField 
          sx={{ mb: 2 }}  
          id="title" 
          label="title" 
          variant="filled" 
          multiline
          rows={1}
          fullWidth 
          defaultValue={formData?.title}
          onChange={handleChange}
          error={isTouched&&formData?.title === ""} 
          helperText={isTouched&&formData?.title === "" ? 'Empty!' : ' '}
          />
          <TextField
          
          sx={{ mb: 2 }} 
          id="description"
          multiline
          rows={4}
          variant="filled"
          fullWidth
          label="description"
          defaultValue={formData?.description}
          onChange={handleChange}
          error={isTouched&&formData?.description === ""} 
          helperText={isTouched&&formData?.description === "" ? 'Empty!' : ' '}
        />
        <TextField 
          sx={{ mb: 2,display: mode=='add'?'none':'' }}  
          multiline
          rows={1}
          id="created_at" 
          disabled
          variant="filled" 
          fullWidth  
          label="created at" 
          defaultValue={formData?.created_at}
          onChange={handleChange}
          />
        <TextField 
          sx={{ mb: 2,display: mode=='add'?'none':''  }}  
          multiline
          rows={1}
          id="finished_at" 
          disabled
          variant="filled" 
          fullWidth  
          label="finished at" 
          defaultValue={formData?.finished_at}
          onChange={handleChange}
          />
        <TextField 
          sx={{ mb: 2,display: mode=='add'?'none':''  }} 
          multiline
          rows={1} 
          id="archive_at" 
          disabled
          variant="filled" 
          fullWidth
          label="archive at" 
          defaultValue={formData?.archive_at}
          onChange={handleChange}  
          />
    
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            {mode=='add'?
          'Submit':
          ' Save changes'

          }
          </Button>
        </DialogActions>
      </BootstrapDialog>
      }
    </>
  );
}