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
import { FormControl, InputAdornment, InputLabel, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/lab';
import { useFormik } from 'formik';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SvgIcon from '@mui/material/SvgIcon';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

type FormTypes = {firstName:string,lastName:string,phoneNumber:string,seatNumber?:number}
const validate = (values:FormTypes) => {
    const errors:Partial<FormTypes> = {}

    if (!values.firstName) {
      errors.firstName = 'Please Enter First Name of the Passenger'
    } 
    if (!values.lastName) {
      errors.lastName = 'Please Enter Lasst Name of the Passenger'
    } 
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Please Enter Phone Number of the Passenger'
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
const timer = React.useRef<number>();
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
const [loading, setLoading] = React.useState(false);
const schedules = useAppSelector(state=>state.schedules.schedules)
const departuerPlaces = scheduleInfo?.departurePlaces
const handleFormValuesChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const {name,value} = e.target
  setFormValues({
    ...formValues,
    [name]:value
  })
}
React.useEffect(()=>{
  document.title+=` - Book A Ticket`
  return ()=>{
    clearTimeout(timer.current)
  }
  
},[])
const formik = useFormik({
  initialValues: {
  seatNumber:1,
  firstName:'',
  lastName:'',
  phoneNumber:'',
  },
  validate,
  onSubmit: (values,{resetForm}) => {
    //  if(!canSave){
    //   setRequired('required')
    //   return

    //  }
      if(!loading){
          setLoading(true)
          timer.current = window.setTimeout(()=>{
            
            // dispatch(addSchedule({
            //   id:nanoid(),
            //   description:values.description,
            //   creationDate:format(new Date(),'MM/dd/yyyy'),
            //   departureDate,
            //   departureTime,
            //   Route:routeId,
            //   departurePlaces:depPlace?depPlace:undefined,
            //   busId:'dummy0Bus',
            // }))
            setLoading(false)
            resetForm({values:{
              seatNumber:1,
              firstName:'',
              lastName:'',
              phoneNumber:'',
            }})
            
            setSchedule('')
            // setOpen(true)
            // setRequired('')
          },3000)
        }
     
  },
});

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={formik.handleSubmit}>
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
             startAdornment={
             <InputAdornment position="start">
             <ScheduleIcon color="primary"/>
           </InputAdornment>
           }
           >
             <MenuItem value="">
               {/* <em>None</em> */}
               {`Schedule one`}
                <div style={{display:'block'}}>
                {`from x to y, departuring at 11:30`}   
                  </div>            

              
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
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <PlaceIcon/>
                        </InputAdornment>
                      )
                    }}
                        />
                </Box>
                <Box>
                    {/* destination text field goes here  */}
                    <TextFieldForBooking
                    disabled
                    id="destination-city"
                    name="Destination"
                    label="Destination City"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <PlaceIcon/>
                        </InputAdornment>
                      )
                    }}
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
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <EventIcon/>
                        </InputAdornment>
                      )
                    }}
                      
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
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <AccessTimeIcon/>
                        </InputAdornment>
                      )
                    }}
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
             startAdornment = {
              <InputAdornment position="start">
                <SvgIcon color="primary" fontSize="large">
                      <path fill="currentColor" d="M22 7V16C22 16.71 21.62 17.36 21 17.72V19.25C21 19.66 20.66 20 20.25 20H19.75C19.34 20 19 19.66 19 19.25V18H12V19.25C12 19.66 11.66 20 11.25 20H10.75C10.34 20 10 19.66 10 19.25V17.72C9.39 17.36 9 16.71 9 16V7C9 4 12 4 15.5 4S22 4 22 7M13 15C13 14.45 12.55 14 12 14S11 14.45 11 15 11.45 16 12 16 13 15.55 13 15M20 15C20 14.45 19.55 14 19 14S18 14.45 18 15 18.45 16 19 16 20 15.55 20 15M20 7H11V11H20V7M7 9.5C6.97 8.12 5.83 7 4.45 7.05C3.07 7.08 1.97 8.22 2 9.6C2.03 10.77 2.86 11.77 4 12V20H5V12C6.18 11.76 7 10.71 7 9.5Z" />
                </SvgIcon>
              </InputAdornment>
              }
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
                    type="number"
                    value={formik.values.seatNumber}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color="primary" fontSize="large">
                        <path fill="currentColor" d="M9 19H15V21H9C6.24 21 4 18.76 4 16V7H6V16C6 17.66 7.34 19 9 19M10.42 5.41C11.2 4.63 11.2 3.36 10.42 2.58C9.64 1.8 8.37 1.8 7.59 2.58C6.81 3.36 6.81 4.63 7.59 5.41C8.37 6.2 9.63 6.2 10.42 5.41M11.5 9C11.5 7.9 10.6 7 9.5 7H9C7.9 7 7 7.9 7 9V15C7 16.66 8.34 18 10 18H15.07L18.57 21.5L20 20.07L14.93 15H11.5L11.5 9Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.seatNumber && Boolean(formik.errors.seatNumber)}
                    helperText={formik.touched.seatNumber && formik.errors.seatNumber}
            
          
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
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color="primary" >
                        <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                </Box>
                <Box sx={{marginLeft:'7px'}}>
            
                    <TextFieldForBooking
                    id="last-name"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color="primary">
                        <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                </Box>
                <Box sx={{marginLeft:'7px'}}>
                    <TextFieldForBooking
                    id="phone-number"
                    name="phoneNumber"
                    label="Phone Number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <LocalPhoneIcon color="primary" />
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                </Box>
                 </Box>
                 <Divider/>
              <Box sx={{p:2}}>
              <Button 
              type="submit"
              sx={{
                   display:'block',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   width:"150px"
                 }}> Book Now </Button>
              </Box>
              
        </div>
        </form>
        </LocalizationProvider>
    )
}