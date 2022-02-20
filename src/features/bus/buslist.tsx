import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../app/hooks'
import {useAppDispatch} from '../../app/hooks'
import{styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import {deleteBus} from './busSlice'
import { Dialog, DialogContent } from '@mui/material';
import { BusRegistration } from './busform';
export function BusList(){

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'green',
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const busses = useAppSelector(state=>state.busses)
const users = useAppSelector(state=>state.users)
const BusState = useAppSelector(state=>state.busStates)
const dispatch = useAppDispatch();
const [busId,setBusId] = React.useState<string|null>(null)
const handleBusDelete = (id:string)=>{
    dispatch(deleteBus(id))
    // console.log('deleted ?')
}
  const [opendDialog,setOpenDialog] = React.useState(false)
  const DialogClose = () => {
    setOpenDialog(false)
  }
  const OpenEditBusForm = (id:string)=>{
    setOpenDialog(true)
    setBusId(id)
  }
  const oldBusData = useAppSelector(state=>state.busses.find(bus=>bus.id===busId))
return (
  <>
      <TableContainer sx={{maxWidth:1000}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="right">Plate Number</StyledTableCell>
            <StyledTableCell align="right">Driver</StyledTableCell>
            <StyledTableCell align="right">Redat</StyledTableCell>
            <StyledTableCell align="right">Number of Seat</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">Activities</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {busses.map((bus) => (
            <StyledTableRow
              key={bus.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {bus.description}
              </StyledTableCell>
              <StyledTableCell align="right">{bus.plateNo}</StyledTableCell>
              <StyledTableCell align="right">{`${users.find((user)=>user.id===bus.driverId)?.firstName} ${users.find((user)=>user.id===bus.driverId)?.lastName}`}</StyledTableCell>
              <StyledTableCell align="right">{`${users.find((user)=>user.id===bus.redatId)?.firstName} ${users.find((user)=>user.id===bus.redatId)?.lastName}`}</StyledTableCell>
              <StyledTableCell align="right">{bus.NoOfSeat}</StyledTableCell>
              <StyledTableCell align="right">{BusState.find((bs)=>bs.id===bus.state)?.description}</StyledTableCell>
               <StyledTableCell> 
                        <Tooltip title={`Delete ${bus.description}`}>
                        <IconButton color="primary" onClick = {()=>handleBusDelete(bus.id)}>
                       <DeleteIcon/>
                   </IconButton>

                        </Tooltip>
                   <Tooltip title = {`Edit ${bus.description}`}>
                   <IconButton 
                   onClick = {()=>{OpenEditBusForm(bus.id)}}
                   sx = {{marginLeft:'15px'}} color="primary">
                       <EditIcon/>
                   </IconButton>
                   </Tooltip>

                   </StyledTableCell>     
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open = {opendDialog} onClose = {DialogClose}>
              <DialogContent>
              <BusRegistration
              CloseDialog = {DialogClose}
              providedId = {oldBusData?.id}
              providedDescription={oldBusData?.description}
              providedDriver = {oldBusData?.driverId}
              providedRedat = {oldBusData?.redatId}
              providedNumberOfSeat = {oldBusData?.NoOfSeat}
              providedPlateNumber = {oldBusData?.plateNo}
              providedState = {oldBusData?.state}
              />
              </DialogContent>
            </Dialog>
  </>
  );
}