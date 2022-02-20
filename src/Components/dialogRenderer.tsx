import * as React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
export function DialogRenderer(props:React.ReactNode) {
const [opendDialog,setOpenDialog] = React.useState(false)
//seems like a good idea to make the code DRY will be implemented later
const DialogClose = () => {
    setOpenDialog(false)
  }
  const DialogOpen = () =>{
      setOpenDialog(true)
  }
    return(
        <Dialog open = {opendDialog} onClose = {DialogClose}>
              <DialogContent>
                  {/* {props.component} */}
              </DialogContent>
            </Dialog>
    )
}