import React,{useState,useEffect} from 'react';
import { useFormik } from 'formik';
import {UserRegistration} from '../user/userform'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {addBusses} from './busSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import {InputAdornment, ListItemText } from '@mui/material';
import {AddButton} from '../../Components/addbutton'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {FormWrapper} from '../../Components/formWrapper'
import DescriptionIcon from '@mui/icons-material/Description';
import AbcIcon from '@mui/icons-material/Abc';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import NumbersIcon from '@mui/icons-material/Numbers';
import {fetchDrivers} from '../user/driverSlice'
import {fetchRedats} from '../user/redatSlice'
import CircularProgress from '@mui/material/CircularProgress';
const RoleData = {
    DRIVER:'driver',
    REDAT:'redat',
}

// type VALUES_TYPE  = Pick<BUS,'sideNo'|'plateNo'|'NoOfSeat'>
// type ERROR_TYPE  = {
//   [Property in keyof VALUES_TYPE]+?:string
// }

const validate = (values:any) => {
    const errors:any = {}
    if (!values.serviceYear) {
      errors.serviceYear="Required"
    }
    if (!values.sideNo) {
      errors.sideNo="Required"
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
export const BusRegistration = (
  {
    providedId,
    providedsideNo,
    providedPlateNumber,
    providedRedat,
    providedDriver,
    providedNumberOfSeat,
    providedState,
    CloseDialog,
  }:{
    providedId?:string,
    providedsideNo?:string,
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
const isEdit = Boolean(providedsideNo)||Boolean(providedNumberOfSeat)||Boolean(providedPlateNumber)||Boolean(providedRedat)||Boolean(providedDriver)

const [open,setOpen] = useState(false)
const [loading, setLoading] = React.useState(false);

const driverStatus = useAppSelector(state=>state.drivers.status)
const redatStatus = useAppSelector(state=>state.redats.status)
const initialDrivers = useAppSelector(state=>state.drivers.drivers)
const initialRedats =  useAppSelector(state=>state.redats.redats)
// for the default select value  will be checked later
const providedDriverFirstName = useAppSelector(state=>state.users.users.find(driver=>driver.id===providedDriver))?.firstName
const providedDRedatFirstName = useAppSelector(state=>state.users.users.find(redat=>redat.id===providedRedat))?.firstName
const providedBusStatesideNo = useAppSelector(state=>state.busStates.find(bstate=>bstate.id===providedState))?.description
const [driver,setDriver] = useState(providedDriver?providedDriverFirstName:'')
const [redat,setRedat] = useState(providedRedat?providedDRedatFirstName:'')
const [Bstate,setBState] = useState(providedState?providedBusStatesideNo:'')
// const [driverRequired,setDriverRequired] = useState('')
// const [redatRequired,setRedatRequired] = useState('')
 const handleDriverChange = (e:SelectChangeEvent)=>{
    setDriver(e.target.value)
    // setDriverRequired('')
    }
 const handleRedatChange = (e:SelectChangeEvent)=>{
    setRedat(e.target.value)
    // setRedatRequired('')
 }
 const handleBusStateChange = (e:SelectChangeEvent)=>{
  setBState(e.target.value)
}


const dispatch = useAppDispatch();
const busState  = useAppSelector(state=>state.busStates)
// const canSave = Boolean(redat)&&Boolean(driver)
const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

useEffect(()=>{
    document.title+=` - Bus Registration`
    if(driverStatus === 'idle'){
      dispatch(fetchDrivers())
    }
    if(redatStatus === 'idle'){
      dispatch(fetchRedats())
    }
  },[redatStatus,driverStatus,dispatch])


  const formik = useFormik({
    initialValues: {
      serviceYear:0,
      sideNo: providedsideNo?providedsideNo:"",
      plateNo:providedPlateNumber?providedPlateNumber:"",
      NoOfSeat:providedNumberOfSeat?providedNumberOfSeat:0,
    },
    validate,
    onSubmit: async (values,{resetForm}) => {

      
          if(!loading){
            
            setLoading(true)
            
              
            try {
              await dispatch(addBusses(
                {
                  bussideno:values.sideNo,
                busplateno:values.plateNo,
                bus_state:"Active",
                redatid:driver,
                driverid:redat,

                totalsit:values.NoOfSeat,
                serviceyear:values.serviceYear,
                }
              )).unwrap()

              

              resetForm({values:{
                sideNo: '',
                plateNo: '',
                NoOfSeat:0,
                serviceYear:0,
                
              }})
             setDriver('')
             setRedat('')
              setOpen(true)
            if(DialogClose){
                DialogClose()
              }
          
            }
            catch (err:any) {
              console.log(err.message)
              const resMessage =
              (err.response &&
                err.response.data &&
                err.response.data.message) ||
                err.message ||
                err.toString();

            }
            finally {
              setLoading(false)
            }
          }
         
        
    },
  });

  return (
  redatStatus === 'loading' || driverStatus === 'loading' ?
  <Box>
    <CircularProgress />
  </Box> :
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
      type="number"
      id="serviceYear"
      name="serviceYear"
      label="Service Year"
      value={formik.values.serviceYear}
      onChange={formik.handleChange}
      InputProps = {{
        startAdornment:(
        <InputAdornment position="start">
            <DescriptionIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
        )
    }}
      error={formik.touched.sideNo && Boolean(formik.errors.sideNo)}
      helperText={formik.touched.sideNo && formik.errors.sideNo}
    />
          </FormWrapper>
          <FormWrapper>
          <TextField
      
      id="plateNo"
      name="plateNo"
      label="Plate Number"
      
      value={formik.values.plateNo}
      onChange={formik.handleChange}
      InputProps = {{
        startAdornment:(
        <InputAdornment position="start">
            <AbcIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
        )
    }}
      error={formik.touched.plateNo && Boolean(formik.errors.plateNo)}
      helperText={formik.touched.plateNo && formik.errors.plateNo}
    />
          </FormWrapper>
          <FormWrapper>
          <TextField
      
      id="sideNo"
      name="sideNo"
      label="sideNo"
      value={formik.values.sideNo}
      onChange={formik.handleChange}
      InputProps = {{
        startAdornment:(
        <InputAdornment position="start">
            <DescriptionIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
        )
    }}
      error={formik.touched.sideNo && Boolean(formik.errors.sideNo)}
      helperText={formik.touched.sideNo && formik.errors.sideNo}
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
        startAdornment={<AirlineSeatReclineNormalIcon sx={{fontSize:"35px"}} color="primary"/>}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
     {  
        initialDrivers?
        initialDrivers.map((driver:any)=>(
          <MenuItem divider = {true} key = {driver._id} value={driver._id}>
              <ListItemText primary = {`${driver.firstName} ${driver.lastName}`}/>
          </MenuItem>
        ))
        :null
        }
        <AddButton description = "Driver" handleClick = {handleDriverDialogOpen}/>
      </Select>
      {/* <FormHelperText sx={{color:'red'}}>{driverRequired}</FormHelperText> */}
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
        startAdornment={<EmojiPeopleIcon sx={{fontSize:"35px"}} color="primary"/>}
      >
        <MenuItem value="">
        <em>None</em>
        </MenuItem>
        {
        initialRedats?
        initialRedats.map((redat:any)=>(
          <MenuItem divider = {true} key = {redat._id} value={redat._id}>
            <ListItemText primary = {`${redat.firstName} ${redat.lastName}`}/>
          </MenuItem>
        ))
        :null
        }
        <AddButton description = "Redat" handleClick = {handleRedatDialogOpen}/>
      </Select>
      {/* <FormHelperText sx={{color:'red'}}>{redatRequired}</FormHelperText> */}
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
      InputProps = {{
        startAdornment:(
        <InputAdornment position="start">
            <NumbersIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
        )
    }}
      
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


