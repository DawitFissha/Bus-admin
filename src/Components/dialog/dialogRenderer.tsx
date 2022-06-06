import * as React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import BootstrapDialogTitle from './dialogTitle'
import PaperComponent from './paperComponent'
interface DialogProps {
open:boolean
title:string
handleClose:()=>void
children: React.ReactNode
}
export default function DialogRenderer(props:DialogProps) {
const {open,handleClose,title,children} = props
//seems like a good idea to make the code DRY will be implemented later

    return(
        <Dialog PaperComponent = {PaperComponent} open = {open} onClose = {handleClose}  aria-labelledby="draggable-dialog-title">
                <BootstrapDialogTitle id="draggable-dialog-title" onClose={handleClose}>
                {title}
        </BootstrapDialogTitle>
              <DialogContent sx = {{backgroundColor:'#F2BDF4'}} dividers>
                  {children}
              </DialogContent>
            </Dialog>
    )
}