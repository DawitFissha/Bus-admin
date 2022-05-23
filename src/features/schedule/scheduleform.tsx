import React,{useState,useEffect} from 'react';
import {nanoid} from '@reduxjs/toolkit'
import {format} from 'date-fns'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import {addSchedule} from './scheduleSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import { Checkbox, FormHelperText, InputAdornment, ListItemText, OutlinedInput } from '@mui/material';
import { TimePicker } from '@mui/lab';
import { useFormik } from 'formik';
import {FormWrapper} from '../../Components/formWrapper'
import DescriptionIcon from '@mui/icons-material/Description';
import RouteIcon from '@mui/icons-material/Route';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import SvgIcon from '@mui/material/SvgIcon';
const validate = (values:{description:string}) => {
    const errors:{description?:string} = {}
    if (!values.description) {
      errors.description = 'Please Enter Some Description About the schedule'
    } 
    return errors;
  };
export const Schedule:React.FunctionComponent = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
const dispatch = useAppDispatch()
const timer = React.useRef<number>();
const [open,setOpen] = useState(false)
const [loading, setLoading] = React.useState(false);
const routes = useAppSelector(state=>state.routes.routes)
const [route,setRoute] = useState('')
const routeId = routes.find((r)=>r.source===route)?._id as string // routes with same source city may happen so need to be checked later
const price = routes.find((r)=>r.source===route)?.price
const departurePlaces = routes.find((r)=>r.source===route)?.departurePlace
const [depPlace, setDepPlace] = React.useState<string[]>([]);
const [departureDate,setDepartureDate] = useState<Date|null>(null)
const [departureTime,setDepartureTime] = useState<Date|null>(null)
const canSave = Boolean(routeId)&&Boolean(departureDate)&&Boolean(departureTime)
// better if its handled using refs ...
const [required,setRequired] = useState('')
const handleDepPlaceChange = (event: SelectChangeEvent<typeof depPlace>) => {
  const {
    target: { value },
  } = event;
  setDepPlace(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};
const handleRouteChagne = (e:SelectChangeEvent)=>{
    setRoute(e.target.value)
}

const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

useEffect(()=>{
    document.title+=` - Create Schedule`
    return ()=>{
      clearTimeout(timer.current)
    }
    
},[])

const formik = useFormik({
    initialValues: {
      description: "",
    },
    validate,
    onSubmit: (values,{resetForm}) => {
       if(!canSave){
        setRequired('required')
        return

       }
        if(!loading){
            setLoading(true)
            timer.current = window.setTimeout(()=>{
              
              dispatch(addSchedule({
                id:nanoid(),
                description:values.description,
                creationDate:format(new Date(),'MM/dd/yyyy'),
                departureDate,
                departureTime,
                Route:routeId,
                departurePlaces:depPlace?depPlace:undefined,
                busId:'dummy0Bus',
              }))
              setLoading(false)
              resetForm({values:{
                description: ""
              }})
              setDepartureDate(null)
              setDepartureTime(null)
              setDepPlace([])
              setRoute('')
              setOpen(true)
              setRequired('')
            },3000)
          }
       
    },
  });
  
  return (
   <LocalizationProvider dateAdapter={AdapterDateFns}>
     
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
           <RegistrationHeader description = 'Create A Schedule' />
           </FormWrapper>
           <Box sx={{marginLeft:'60%'}}>
           <InputLabel >Date</InputLabel>
               <TextField 
               sx={{maxWidth:'200px',minWidth:'150px'}}
               size = 'small'
               value={format(new Date(),'MM/dd/yyyy')}
               />
               <h4 style = {{marginTop:'10px'}}>Price - {price?`${price} Birr`:''}</h4>
           </Box>
      <form onSubmit={formik.handleSubmit}>
      <FormWrapper>
            <TextField
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        InputProps = {{
          startAdornment:(
          <InputAdornment position="start">
              <DescriptionIcon sx={{fontSize:"35px"}} color="primary"/>
          </InputAdornment>
          )
      }}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
            </FormWrapper>
            <FormWrapper>
            <FormControl sx={{minWidth: 460 }}>
            <InputLabel id="route-select-label">Route</InputLabel>
        <Select
          labelId="route-select-label"
          id="route-select-helper"
          name="route"
          value={route}
          label="route"
          onChange={handleRouteChagne}
          startAdornment = {
            <InputAdornment position="start">
            <RouteIcon color="primary" sx={{fontSize:"35px"}}/>
            </InputAdornment>
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
       {
          routes.map((route)=>(
            <MenuItem  key = {route.id} value={route.source}>
                <ListItemText primary = {`${route.source} to ${route.destination}`}/>
            </MenuItem>
          ))
          }
        </Select>
        
        </FormControl>
        </FormWrapper>
        <FormWrapper>
            <DatePicker
            label="Departure Date"
            value={departureDate}
            onChange={(newValue) => {
            setDepartureDate(newValue);
        }}
        renderInput={(params) =>{
          if(params.InputProps!==undefined){
            params.InputProps.startAdornment = (
              <InputAdornment position="start">
              <DepartureBoardIcon color="primary" sx={{fontSize:"35px"}}/>
              </InputAdornment>
            )
          }
          return(
            <TextField {...params} />
          )
        }}
        
      />
      <FormHelperText sx={{color:'red'}}>{required}</FormHelperText>
            </FormWrapper>
        <FormWrapper>
        <TimePicker
        label="Departure Time"
        value={departureTime}
        onChange={(newValue) => {
          setDepartureTime(newValue);
        }}
        renderInput={(params) =>{
          if(params.InputProps!==undefined){
            params.InputProps.startAdornment = (
              <InputAdornment position="start">
              <DepartureBoardIcon color="primary" sx={{fontSize:"35px"}}/>
              </InputAdornment>
            )
          }
          return(
            <TextField {...params} />
          )
        }}
      />
      <FormHelperText sx={{color:'red'}}>{required}</FormHelperText>
        </FormWrapper>
        <FormWrapper>
          <FormControl sx={{width: 460 }}>
        <InputLabel id="departure-place">Departure Place</InputLabel>
        <Select
          labelId="departure-place"
          id="departure-places"
          multiple
          value={depPlace}
          onChange={handleDepPlaceChange}
          input={<OutlinedInput id="select-multiple" label="Departure Place" />}
          renderValue={(selected)=>selected.join(', ')}
          MenuProps={MenuProps}
          startAdornment = {
            <InputAdornment position="start">
              <SvgIcon color="primary" sx={{fontSize:"35px"}}>
                    <path fill="currentColor" d="M22 7V16C22 16.71 21.62 17.36 21 17.72V19.25C21 19.66 20.66 20 20.25 20H19.75C19.34 20 19 19.66 19 19.25V18H12V19.25C12 19.66 11.66 20 11.25 20H10.75C10.34 20 10 19.66 10 19.25V17.72C9.39 17.36 9 16.71 9 16V7C9 4 12 4 15.5 4S22 4 22 7M13 15C13 14.45 12.55 14 12 14S11 14.45 11 15 11.45 16 12 16 13 15.55 13 15M20 15C20 14.45 19.55 14 19 14S18 14.45 18 15 18.45 16 19 16 20 15.55 20 15M20 7H11V11H20V7M7 9.5C6.97 8.12 5.83 7 4.45 7.05C3.07 7.08 1.97 8.22 2 9.6C2.03 10.77 2.86 11.77 4 12V20H5V12C6.18 11.76 7 10.71 7 9.5Z" />
              </SvgIcon>
            </InputAdornment>
            }
        >
          {
          departurePlaces?
          departurePlaces!.map((departurePlace:string,index:number) => (
            <MenuItem
              key={index}
              value={departurePlace}
            >
              <Checkbox checked={depPlace.indexOf(departurePlace) > -1} />
              <ListItemText primary={departurePlace} />
            </MenuItem>
          )):null
          }
        </Select>
      </FormControl>
          </FormWrapper>

            <FormWrapper>
            <Button  
            type="submit"
            disabled = {loading}
            sx={{marginLeft:"35%"}} color="primary" variant="contained" >
          Save
        </Button>
            </FormWrapper>
            <SaveSuccessfull open={open} handleClose={handleClose} message = 'Schedule Successfully Created' />
            
      </form>
      
      </Box>
    </div>
    
   </LocalizationProvider>
  );
};


