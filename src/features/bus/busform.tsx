import React,{useState,useEffect} from 'react';
import {nanoid} from '@reduxjs/toolkit'
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {BUS,addBus} from './busSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box, { BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import { ListItemText } from '@mui/material';
import {AddButton} from '../../Components/addbutton'

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
      errors.NoOfSeat = "Required"
    }
     if(!values.NoOfSeat){
      errors.NoOfSeat = "Required"
    }
    return errors;
  };
const FormWrapper = (props:BoxProps)=>{
    const {sx,...other} = props
    return(
        <Box sx={{p:1,...sx}} {...other}/>
    )
}

export const BusRegistration:React.FunctionComponent = () => {

const timer = React.useRef<number>();
const [open,setOpen] = useState(false)
const [loading, setLoading] = React.useState(false);
const users = useAppSelector(state=>state.users)
const initialDrivers = users.filter(user=>user.role===RoleData.DRIVER) ;
const initialRedats = users.filter(user=>user.role===RoleData.REDAT) ;
const [driver,setDriver] = useState('')
const [redat,setRedat] = useState('')

 const handleDriverAndRedatChange = (e:SelectChangeEvent)=>{
    setDriver(e.target.value)
    }
 const handleRedatChange = (e:SelectChangeEvent)=>{
    setRedat(e.target.value)
 }

const driverId = useAppSelector(state=>state.users.find((user)=>user.firstName===driver))?.id
const redatId = useAppSelector(state=>state.users.find((user)=>user.firstName===redat))?.id
const dispatch = useAppDispatch();
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
      description: "",
      plateNo:"",
      NoOfSeat:0,
    },
    validate,
    onSubmit: (values,{resetForm}) => {
          if(!loading){
            setLoading(true)
            timer.current = window.setTimeout(()=>{
              
              dispatch(addBus({
                id:nanoid(),
                description:values.description,
                plateNo:values.plateNo,
                driverId,
                redatId,
                NoOfSeat:values.NoOfSeat
                
              }))
              setLoading(false)
              resetForm({values:{
                description: "",
                plateNo:"",
                NoOfSeat: 0,
                
              }})
            setDriver('')
            setRedat('')
              setOpen(true)
            },3000)
          }
         
    },
  });

  return (
    <div style ={{
      width:"600px",
      marginTop:'5px',
      marginLeft:'25%',
      height:'auto',
     background:'#FFFF',
     marginBottom:'5px',
    }}>
    <SavingProgress loading={loading}/>
        <Box sx={{
           display:'flex',
           flexDirection:'column',
            marginLeft:'10%'
       }}>
           <FormWrapper>
           <RegistrationHeader description = 'Register New Busses' />
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
        //   value={driverAndRedat.driver}
        value={driver}
          label="driver"
          onChange={handleDriverAndRedatChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
       {
          initialDrivers.map((driver)=>(
            <MenuItem  key = {driver.id} value={driver.firstName}>
                <ListItemText primary = {`${driver.firstName} ${driver.lastName}`}/>
            </MenuItem>
          ))
          }
          <AddButton description = "Driver" />
        </Select>
        
        </FormControl>
          </FormWrapper>
          <FormWrapper>
            <FormControl sx={{minWidth: 460 }}>
            <InputLabel id="driver-select-helper-label">Redats</InputLabel>
        <Select
          labelId="redat-select-helper-label"
          id="redat-select-helper"
          name="redat"
        //   value={driverAndRedat.driver}
        value = {redat}
          label="redat"
          onChange={handleRedatChange}
        >
          <MenuItem value="">
          <em>None</em>
          </MenuItem>
          {
          initialRedats.map((redat)=>(
            <MenuItem  key = {redat.id} value={redat.firstName}>{`${redat.firstName} ${redat.lastName}`}</MenuItem>
          ))
          }
          <AddButton description = "Redat" />
        </Select>
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
        
     
            <FormWrapper>
            <Button  
            type="submit"
            disabled = {loading}
            sx={{marginLeft:"35%"}} color="primary" variant="contained" >
          Save
        </Button>
            </FormWrapper>
            <SaveSuccessfull open={open} handleClose={handleClose} message = 'Bus Successfully Registered' />
            
      </form>
      
      </Box>

    </div>
  );
};


