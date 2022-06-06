import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle style={{cursor:'move'}} sx={{ m: 0, p: 2,backgroundColor:'#E74C3C'}} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'black',
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  export default BootstrapDialogTitle