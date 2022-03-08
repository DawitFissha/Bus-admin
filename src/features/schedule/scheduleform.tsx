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
import Box, { BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import { Checkbox, FormHelperText, ListItemText, OutlinedInput } from '@mui/material';
import { TimePicker } from '@mui/lab';
import { useFormik } from 'formik';
const validate = (values:{description:string}) => {
    const errors:{description?:string} = {}
    if (!values.description) {
      errors.description = 'Please Enter Some Description About the schedule'
    } 
    return errors;
  };
// not a DRY code should be checked later
const FormWrapper = (props:BoxProps)=>{
    const {sx,...other} = props
    return(
        <Box sx={{p:1,...sx}} {...other}/>
    )
}

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
const routes = useAppSelector(state=>state.routes)
const [route,setRoute] = useState('')
const routeId = routes.find((r)=>r.source===route)?.id as string // routes with same source city may happen so need to be checked later
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
        renderInput={(params) => <TextField {...params} />}
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
        renderInput={(params) => <TextField {...params} />}
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
        >
          {
          departurePlaces?
          departurePlaces!.map((departurePlace,index) => (
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


