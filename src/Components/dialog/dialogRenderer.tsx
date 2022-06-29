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

    return(
        <Dialog  PaperComponent = {PaperComponent} open = {open} onClose = {handleClose}  aria-labelledby="draggable-dialog-title">
                <BootstrapDialogTitle id="draggable-dialog-title" onClose={handleClose}>
                {title}
        </BootstrapDialogTitle>
              <DialogContent /*sx = {{backgroundColor:'#706C6C'}} */ dividers>
                  {children}
              </DialogContent>
            </Dialog>
    )
}