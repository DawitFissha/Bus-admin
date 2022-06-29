import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from  '@mui/material/Tooltip'
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import {updatePassenger} from '../../features/schedule/scheduleSlice'
import {useAppDispatch} from '../../app/hooks'
interface passengerTypes {
    firstName:string;
    lastName:string,
    phoneNumber:string
}
interface editPassengerProps {
    selectedSchedule:string
    passengerId:string
    previousFirstName:string,
    previousLastName:string,
    previousPhoneNumber:string,
    previousSeatNumber:number[],
    closeDialogOnSave:()=>void
}
const validate = (values:passengerTypes) => {
    const errors:Partial<passengerTypes> = {}
    
    if (!values.firstName) {
      errors.firstName = 'First Name of the Passenger is required'
    } 
    if (!values.lastName) {
      errors.lastName = 'Lasst Name of the Passenger is required'
    } 
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number of the Passenger is required'
    } 
    return errors;
  };

export default function EditPassengerInfo(props:editPassengerProps) {
    const {selectedSchedule,passengerId,previousFirstName,previousLastName,previousPhoneNumber,previousSeatNumber,closeDialogOnSave} = props
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues:{
            firstName:previousFirstName,
            lastName:previousLastName,
            phoneNumber:previousPhoneNumber,
        },
        validate,
        onSubmit:(values,{resetForm})=>{
            console.log(values)
            resetForm({values:{
                firstName:'',
                lastName:'',
                phoneNumber:'',
            }})
            dispatch(updatePassenger(
           {
            scheduleId:selectedSchedule,
            passengerId,
            newPassengerDetails:{
              firstName:values.firstName,
              lastName:values.lastName,
              phoneNumber:values.phoneNumber
            }
           }
            ))
            closeDialogOnSave()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}> 
        <Box sx={{dipslay:'flex',flexDirection:"column",m:2}}>
        <Box >
        <TextField 
        id="first-name" name = "firstName" label="First Name" variant="standard" 
        value={formik.values.firstName}
        onChange = {formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        />
        </Box>
        <Box sx={{marginTop:'11px'}}>
        <TextField
                 id="last-name" name = "lastName" label="Last Name" variant="standard" 
                value={formik.values.lastName}
                onChange = {formik.handleChange}  
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}      
        />
        </Box>
        <Box sx={{marginTop:'11px'}}>
        <TextField
         id="phone-number" name="phoneNumber" label="Phone Number" variant="standard" 
         value={formik.values.phoneNumber}
         onChange = {formik.handleChange}
         error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
         helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        </Box>
        <Box  sx={{marginTop:'15px',display:'flex',alignItems:'center'}}>
            <Box sx={{marginTop:'3px'}}>
            <Typography variant="h6" gutterBottom component="div">
            Seat Number: {previousSeatNumber}
      </Typography>
            </Box>
            
          <Box>
          <IconButton sx={{marginLeft:'17px'}}>
                <Tooltip title="Change Seat">
                <SwapHorizontalCircleIcon fontSize='large' />
                </Tooltip>
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{marginTop:'20px',marginLeft:'150px'}}>
        <Button type="submit">Save</Button>
        </Box>
        </Box>
        </form>
    )
}