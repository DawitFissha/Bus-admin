import React,{useState,useEffect} from 'react';
import {nanoid} from '@reduxjs/toolkit'
import { useFormik } from 'formik';
import {UserRegistration} from '../user/userform'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {BUS,addBus,updateBus} from './busSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box, { BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import { FormHelperText, ListItemText } from '@mui/material';
import {AddButton} from '../../Components/addbutton'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// not a DRY code should be checked later

const RoleData = {
    DRIVER:'3',
    REDAT:'4',
}

type VALUES_TYPE  = Pick<BUS,'description'|'plateNo'|'NoOfSeat'>
type ERROR_TYPE  = {
  [Property in keyof VALUES_TYPE]+?:string
}

const validate = (values:VALUES_TYPE) => {
    const errors:ERROR_TYPE = {}
    if (!values.description) {
      errors.description="Required"
    } 
     if(!values.plateNo) {
      errors.plateNo = "Plate Number is Required"
    }
     if(!values.NoOfSeat){
      errors.NoOfSeat = "Nuumber of Seat is Required"
    }
    else if(values.NoOfSeat<=0){
      errors.NoOfSeat = "This value can not be 0 or negative"
    }
    return errors;
  };
const FormWrapper = (props:BoxProps)=>{
    const {sx,...other} = props
    return(
        <Box sx={{p:1,...sx}} {...other}/>
    )
}

export const BusRegistration = (
  {
    providedId,
    providedDescription,
    providedPlateNumber,
    providedRedat,
    providedDriver,
    providedNumberOfSeat,
    providedState,
    CloseDialog,
  }:{
    providedId?:string,
    providedDescription?:string,
    providedPlateNumber?:string,
    providedRedat?:string,
    providedDriver?:string,
    providedNumberOfSeat?:number,
    providedState?:string
    CloseDialog?:()=>void
  }
) => {
const [redatButton,setRedatButton] = useState(false)
const [driverButton,setDriverButton]  =useState(false)
const [opendDialog,setOpenDialog] = useState(false)
const handleRedatDialogOpen = () => {
  setOpenDialog(true)
  setRedatButton(true)
}
const handleDriverDialogOpen = () => {
  setOpenDialog(true)
  setDriverButton(true)
}
const DialogClose = () => {
  setOpenDialog(false)
  setDriverButton(false)
  setRedatButton(false)
}
const isEdit = Boolean(providedDescription)||Boolean(providedNumberOfSeat)||Boolean(providedPlateNumber)||Boolean(providedRedat)||Boolean(providedDriver)
const timer = React.useRef<number>();
const [open,setOpen] = useState(false)
const [loading, setLoading] = React.useState(false);
const users = useAppSelector(state=>state.users)
const initialDrivers = users.filter(user=>user.role===RoleData.DRIVER) ;
const initialRedats = users.filter(user=>user.role===RoleData.REDAT) ;
// for the default select value  will be checked later
const providedDriverFirstName = useAppSelector(state=>state.users.find(driver=>driver.id===providedDriver))?.firstName
const providedDRedatFirstName = useAppSelector(state=>state.users.find(redat=>redat.id===providedRedat))?.firstName
const providedBusStateDescription = useAppSelector(state=>state.busStates.find(bstate=>bstate.id===providedState))?.description
const [driver,setDriver] = useState(providedDriver?providedDriverFirstName:'')
const [redat,setRedat] = useState(providedRedat?providedDRedatFirstName:'')
const [Bstate,setBState] = useState(providedState?providedBusStateDescription:'')
const [driverRequired,setDriverRequired] = useState('')
const [redatRequired,setRedatRequired] = useState('')
 const handleDriverChange = (e:SelectChangeEvent)=>{
    setDriver(e.target.value)
    setDriverRequired('')
    }
 const handleRedatChange = (e:SelectChangeEvent)=>{
    setRedat(e.target.value)
    setRedatRequired('')
 }
 const handleBusStateChange = (e:SelectChangeEvent)=>{
  setBState(e.target.value)
}
const busStateId = useAppSelector(state=>state.busStates.find((bstate)=>bstate.description===Bstate))?.id
const driverId = useAppSelector(state=>state.users.find((user)=>user.firstName===driver))?.id
const redatId = useAppSelector(state=>state.users.find((user)=>user.firstName===redat))?.id
const dispatch = useAppDispatch();
const busState  = useAppSelector(state=>state.busStates)
const canSave = Boolean(redat)&&Boolean(driver)
const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

useEffect(()=>{
    document.title+=` - Bus Registration`
    return ()=>{
      clearTimeout(timer.current)
    }
    
},[])
  const formik = useFormik({
    initialValues: {
      description: providedDescription?providedDescription:"",
      plateNo:providedPlateNumber?providedPlateNumber:"",
      NoOfSeat:providedNumberOfSeat?providedNumberOfSeat:0,
    },
    validate,
    onSubmit: (values,{resetForm}) => {
      if(!canSave){
        setDriverRequired('Driver is Required')
        setRedatRequired('Redat is Required')
        return
      }
          if(!loading){
            setLoading(true)
            timer.current = window.setTimeout(()=>{
              
              if(isEdit){
                dispatch(updateBus({
                  id:providedId as string,
                  description:values.description,
                  plateNo:values.plateNo,
                  driverId,
                  redatId,
                  NoOfSeat:values.NoOfSeat,
                  state:busStateId?busStateId as string:'0',
                }))
                // if(CloseDialog){
                //   CloseDialog()
                // }
              }
              
             else {
              dispatch(addBus({
                id:nanoid(),
                description:values.description,
                plateNo:values.plateNo,
                driverId,
                redatId,
                NoOfSeat:values.NoOfSeat,
                state:'0',
                
              }))

             }
              setLoading(false)
              resetForm({values:{
                description: "",
                plateNo:"",
                NoOfSeat: 0,
                
              }})
            
            setDriver('')
            setRedat('')
            setBState('')
            setDriverRequired('')
            setRedatRequired('')
              setOpen(true)
            },3000)
          }
         
    },
  });

  return (
    <div style ={{
      width:isEdit?"500px":'600px',
      marginTop:'5px',
      marginLeft:isEdit?'5px':'25%',
      height:'auto',
     background:'#FFFF',
     marginBottom:'5px',
    }}>
    <SavingProgress loading={loading}/>
        <Box sx={{
           display:'flex',
           flexDirection:'column',
           marginLeft:isEdit?'0%':'10%'
       }}>
           <FormWrapper>
           <RegistrationHeader description = {isEdit?'Edit Bus Information':'Register New Busses'} />
           </FormWrapper>
      <form onSubmit={formik.handleSubmit}>
     <FormWrapper>
            <TextField
        
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
            </FormWrapper>
            <FormWrapper>
            <TextField
        
        id="plateNo"
        name="plateNo"
        label="Plate Number"
        
        value={formik.values.plateNo}
        onChange={formik.handleChange}
        error={formik.touched.plateNo && Boolean(formik.errors.plateNo)}
        helperText={formik.touched.plateNo && formik.errors.plateNo}
      />
            </FormWrapper>
            <FormWrapper>
            <FormControl sx={{minWidth: 460 }}>
            <InputLabel id="driver-select-label">Drivers</InputLabel>
        <Select
          labelId="driver-select-label"
          id="driver-select-helper"
          name="driver"
          value={driver}
          label="driver"
          onChange={handleDriverChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
       {
          initialDrivers.map((driver)=>(
            <MenuItem divider = {true} key = {driver.id} value={driver.firstName}>
                <ListItemText primary = {`${driver.firstName} ${driver.lastName}`}/>
            </MenuItem>
          ))
          }
          <AddButton description = "Driver" handleClick = {handleDriverDialogOpen}/>
        </Select>
        <FormHelperText sx={{color:'red'}}>{driverRequired}</FormHelperText>
        </FormControl>
          </FormWrapper>
          <FormWrapper>
            <FormControl sx={{minWidth: 460 }}>
            <InputLabel id="redat-select-helper-label">Redats</InputLabel>
        <Select
          labelId="redat-select-helper-label"
          id="redat-select"
          name="redat"
          label="redat"
          value = {redat}
          onChange={handleRedatChange}
        >
          <MenuItem value="">
          <em>None</em>
          </MenuItem>
          {
          initialRedats.map((redat)=>(
            <MenuItem divider = {true} key = {redat.id} value={redat.firstName}>{`${redat.firstName} ${redat.lastName}`}</MenuItem>
          ))
          }
          <AddButton description = "Redat" handleClick = {handleRedatDialogOpen}/>
        </Select>
        <FormHelperText sx={{color:'red'}}>{redatRequired}</FormHelperText>
        </FormControl>
          </FormWrapper>
            <FormWrapper>
            <TextField  
        id="NoOfSeat"
        name="NoOfSeat"
        label="Number of Seat"
        type='number'
        value={formik.values.NoOfSeat}
        onChange={formik.handleChange}
        error={formik.touched.NoOfSeat && Boolean(formik.errors.NoOfSeat)}
        helperText={formik.touched.NoOfSeat && formik.errors.NoOfSeat}
      />
            </FormWrapper>
        
            {
              isEdit&&(
                <FormWrapper>
            <FormControl sx={{minWidth: 460 }}>
            <InputLabel id="state-select-label">State</InputLabel>
        <Select
          labelId="state-select-label"
          id="state-select-helper"
          name="state"
          label="state"
          value = {Bstate}
          onChange={handleBusStateChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
       {
          busState.map((busstate)=>(
            <MenuItem divider = {true} key = {busstate.id} value={busstate.description}>
                <ListItemText primary = {busstate.description}/>
            </MenuItem>
          ))
          }
        </Select>
        
       </FormControl>
          </FormWrapper>
              )
            }
            <FormWrapper>
            <Button  
            // onClick = {()=>(alert('bus'))}
            type="submit"
            disabled = {loading}
            sx={{marginLeft:"35%"}} color="primary" variant="contained" >
            {isEdit?'Update':'Save'}
        </Button>
            </FormWrapper>
            <SaveSuccessfull open={open} handleClose={handleClose} message = {isEdit? 'Bus Information Updated Successfully':'Bus Successfully Registered'} />
            <Dialog open = {opendDialog} onClose = {DialogClose}>
              <DialogContent>
                {driverButton&&<UserRegistration providedRole = {RoleData.DRIVER} DialogClose = {DialogClose} />}
                {redatButton&&<UserRegistration providedRole = {RoleData.REDAT} DialogClose = {DialogClose} />}
              </DialogContent>
            </Dialog>
            
      </form>
      
      </Box>

    </div>
  );
};


