import * as React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Divider from '@mui/material/Divider';
import Select,{SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import {format} from 'date-fns'
import {ROUTE} from '../route/routeSlice'
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl, InputLabel, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/lab';
import { useFormik } from 'formik';
type FormTypes = {firstName:string,lastName:string,phoneNumber:string,seatNumber?:number}
const validate = (values:FormTypes) => {
    const errors:Partial<FormTypes> = {}

    if (!values.firstName) {
      errors.firstName = 'Please Enter First Name of the Passenger'
    } 
    else   if (!values.lastName) {
      errors.lastName = 'Please Enter Lasst Name of the Passenger'
    } 
    else   if (!values.phoneNumber) {
      errors.phoneNumber = 'Please Enter First Name of the Passenger'
    } 
    return errors;
  };
const TextFieldForBooking = styled(TextField)({
    maxWidth:'200px',
    minWidth:'150px'
})
const initialFormValues = {
  seatNumber:1,
  firstName:'',
  lastName:'',
  phoneNumber:'',
}
export function Booking(){
const [formValues,setFormValues] = React.useState(initialFormValues)
const [schedule,setSchedule] = React.useState('')
const [depaturePlace,setDeparturePlace] = React.useState('')
const [bookingDate,setBookingDate] = React.useState<Date|null>(new Date())
const routeId = useAppSelector(state=>state.schedules.schedules.find(sch=>sch.id===schedule))?.Route
const routeInfo = useAppSelector(state=>state.routes.find(r=>r.id===routeId)) as ROUTE 
const scheduleInfo = useAppSelector(state=>state.schedules.schedules.find(sch=>sch.id===schedule))
const handleScheduleChange = (e:SelectChangeEvent)=>{
    setSchedule(e.target.value)
  }
  const handleDeparturePlaceChange = (e:SelectChangeEvent)=>{
    setDeparturePlace(e.target.value)
  }
const schedules = useAppSelector(state=>state.schedules.schedules)
const departuerPlaces = scheduleInfo?.departurePlaces
const handleFormValuesChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const {name,value} = e.target
  setFormValues({
    ...formValues,
    [name]:value
  })
}
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div
        style = {{
             width:"850px",
            marginTop:'2px',
            marginLeft:'auto',
            marginRight:'auto',
            height:'auto',
            background:'#FFFF',
            marginBottom:'5px',
        }}
        >
           <Box sx ={{
             paddingTop:"5px"
            //  display:'table-cell',
            //  verticalAlign:"middle"
           }}>
           <h2 style= {{
                textAlign:"center",
            }}>Book A Ticket</h2>
           </Box>
            <Divider/>
         <Box sx={{display:'flex',m:1,paddingBottom:'6px'}}>

         <Box sx={{flexGrow:1}}>
           
           <FormControl sx={{marginLeft:'6px',maxWidth:'250px',minWidth:'180px',}}>
           <InputLabel id="schedule-select-helper-label">Schedule</InputLabel>
           
           <Select
            
             labelId="schedule-select-helper-label"
             id="role-select-helper"
             value={schedule}
             label="Schedule"
             onChange={handleScheduleChange}
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
             {
             schedules.map((schedule)=>(
               <MenuItem  key = {schedule.id} value={schedule.id}>{schedule.description}</MenuItem>
             ))
             }
           </Select>
           </FormControl>
           </Box>
           <Box>
           <DatePicker
            label="Booking Date"
            value={bookingDate}
            onChange={(newValue) => {
            setBookingDate(newValue);
        }}
        renderInput={(params) => <TextFieldForBooking {...params} />}
      />
           </Box>
         </Box>
         <Divider/>
         <Box sx={{m:1}}>
         <h3>Route information</h3>
         </Box>
                  <Box sx={
               {
                 display:'flex',
                 m:1,
                 justifyContent:'space-around',
                 }
               }>
                <Box >
                    {/* source text field goes here  */}
                    <TextFieldForBooking
                    disabled
                    id="source-city"
                    name="Source city"
                    label="Source City"
                    value ={routeInfo?routeInfo.source:''}
                        />
                </Box>
                <Box>
                    {/* destination text field goes here  */}
                    <TextFieldForBooking
                    disabled
                    id="destination-city"
                    name="Destination"
                    label="Destination City"
                    value ={routeInfo?routeInfo.destination:''}
                        />
                </Box>
                <Box>
                    {/* departure date text field goes here  */}
                    <TextFieldForBooking
                    disabled
                    id="departure-date"
                    name="Departure Date"
                    label="Departure Date"
                    value ={scheduleInfo?format(scheduleInfo.departureDate as Date,'MM/dd/yyyy'):''}
                        />
                </Box>
                <Box>
                    {/* departure time text field goes here  */}
                    <TextFieldForBooking
                    disabled
                    id="departure-time"
                    name="Departure Time"
                    label="Departure Time"
                    value ={scheduleInfo?format(scheduleInfo.departureTime as Date,"h:mm a"):''}
                        />
                </Box>
             </Box>
             <Box sx={{display:'flex',m:1,paddingTop:'10px'}}>
             <Box sx={{marginLeft:'6px'}}>
                    {/* departure place select goes here  */}
                    <FormControl sx={{maxWidth:'250px',minWidth:'200px',}}>
           <InputLabel id="departure-place-select-helper-label">Departure Place</InputLabel>
           
           <Select
            
             labelId="departure-place-select-helper-label"
             id="departure-place-select-helper"
             value={depaturePlace}
             label="Departure Place"
             onChange={handleDeparturePlaceChange}
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
             {
               // not a great code departure place slice needs some reconstruction

            departuerPlaces?departuerPlaces?.map((dep)=>(
               <MenuItem  value={dep}>{dep}</MenuItem>
             )):null
             }
           </Select>
           </FormControl>
                </Box>
                <Box sx={{marginLeft:"7px"}}>
                    {/* departure time text field goes here  */}
                    <TextFieldForBooking
                    id="seat-number"
                    name="seatNumber"
                    label="Seat Number"
                    value ={formValues.seatNumber}
                    type='number'
                    onChange = {handleFormValuesChange}
                        />
                </Box>
                <Box sx={{alignSelf:'center',marginLeft:'16px'}}>
                  <Typography color = "primary" variant="button" display="block" gutterBottom>
                Choose a seat
              </Typography>
                </Box>  
                </Box>
                <Divider/>
                <Box sx={{m:1}}>
         <h3>Passenger information</h3>
         </Box>
         <Box sx={
               {
                 display:'flex',
                 m:1,
                 }
               }>
                 <Box sx={{marginLeft:'6px'}}>
                    
                    <TextFieldForBooking
                    id="first-name"
                    name="firstName"
                    label="First Name"
                    value ={formValues.firstName}
                    onChange = {handleFormValuesChange}
                        />
                </Box>
                <Box sx={{marginLeft:'7px'}}>
            
                    <TextFieldForBooking
                    id="last-name"
                    name="lastName"
                    label="Last Name"
                    value ={formValues.lastName}
                    onChange = {handleFormValuesChange}
                        />
                </Box>
                <Box sx={{marginLeft:'7px'}}>
                    <TextFieldForBooking
                    id="phone-number"
                    name="phoneNumber"
                    label="Phone Number"
                    value ={formValues.phoneNumber}
                    onChange = {handleFormValuesChange}
                        />
                </Box>
                 </Box>
                 <Divider/>
              <Box sx={{p:2}}>
              <Button sx={{
                   display:'block',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   width:"150px"
                 }}> Book Now </Button>
              </Box>
        </div>
        </LocalizationProvider>
    )
}