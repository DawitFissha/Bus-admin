import React,{useState} from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {ROUTE,addRoutes} from './routeSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import {SameCity} from './samecity'
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import { InputAdornment, ListItemText } from '@mui/material';
import {FormWrapper} from '../../Components/formWrapper'
import PlaceIcon from '@mui/icons-material/Place';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import SvgIcon from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import {ActiveBusses} from '../../App'
type VALUES_TYPE  = Required<Pick<ROUTE,'price'|'distance'|'estimatedHour'>>
type ERROR_TYPE  = {
  [Property in keyof VALUES_TYPE]+?:string
}

const validate = (values:VALUES_TYPE) => {
    const errors:ERROR_TYPE = {}
    if (!values.price) {
      errors.price = 'Price Must be Greater Than Zero';
    } 
    else if(values.price<0) {
      errors.price = "Price Can't be Negative"
    }
     if(values.distance!<0){
      errors.distance = "Distance Can not be Negative"
    }
    if(values.estimatedHour!<0){
      errors.estimatedHour = "Estimated Hour Can not be Negative"
    }
    
   
    return errors;
  };

export const RouteRegistration:React.FunctionComponent = () => {

const [depPlace, setDepPlace] = React.useState<string[]>([]);
const [assignedBus, setAssignedBus] = React.useState<string[]>([]);
const handleDepPlaceChange = (event: SelectChangeEvent<typeof depPlace>) => {
  const {
    target: { value },  
  } = event;
  setDepPlace(
    typeof value === 'string' ? value.split(',') : value,
  );
};

const handleAssignedBusChange = (event: SelectChangeEvent<typeof assignedBus>) => {
  const {
    target: { value },
  } = event;
  setAssignedBus(
    
    typeof value === 'string' ? value.split(',') : value,
  );
};

const [saveStatus,setSaveStatus] = useState(false)
const [samecity,setSameCity] = useState(false)
const [loading, setLoading] = React.useState(false);
const cities = useAppSelector(state=>state.cities)
const cityNames =  cities.map((city)=>city['name'])
 const [sourceValue, setSourceValue] = React.useState('');
 const [destinationValue, setDestinationValue] = React.useState('');
 const [source, setSource] = React.useState<string>(cityNames[0]);
 const depPlaces = useAppSelector(state=>state.cities.find((city)=>(city.name===source)))?.departurePlaces
 const [destination, setDestination] = React.useState<string>(cityNames[0]);
 const busStatus = useAppSelector(state=>state.busses.status)

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
const handleSameCityClose = () => {
  setSameCity(false);
};
const dispatch = useAppDispatch();
const handleSaveStatusClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setSaveStatus(false);
};

React.useEffect(()=>{
    document.title+=` - Route Registration`
    },[])
  const formik = useFormik({
    initialValues: {
      price: 0,
      distance:0,
      estimatedHour:0,
    },
    validate,
    onSubmit: async (values,{resetForm}) => {
        if(source===destination){
            setSameCity(true)
        }
         else {
          if(!loading){
            setLoading(true)

            try {
              await dispatch(addRoutes({
                source,
                destination,
                tarif:values.price,
                departureplace:depPlace?depPlace:undefined,
                // departureplcae:'X',
                distance:values.distance>0?values.distance:null,
                estimatedhour:values.estimatedHour>0?values.estimatedHour:null,
                bus:assignedBus,
              })).unwrap()
              
              resetForm({values:{
                price: 0,
                distance:0,
                estimatedHour: 0,
              }})
              setSource('')
              setDestination('')
              setDepPlace([])
              setSaveStatus(true)
            }
            catch(err) {
              console.log(err)
            }
            finally {
              setLoading(false)
            }
              
            
          }
         }
    },
  });

console.log(busStatus)
// console.log(depPlace)
  return (
     busStatus==='loading'? 
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
     :
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
           <RegistrationHeader description = 'Add New Routes' />
           </FormWrapper>
      <form onSubmit={formik.handleSubmit}>
        <FormWrapper>
        <Autocomplete
        value={source}
        onChange={(event: any, newValue: string | null) => {
          setSource(newValue as string);
        }}
        id="source-city"
        inputValue={sourceValue}
        onInputChange={(event, newInputValue) => {
          setSourceValue(newInputValue);
        }}
        options={cityNames}
        sx={{ width: 300 }}
        renderInput={(params) => {
          params.InputProps.startAdornment = (
            <InputAdornment position="start">
            <PlaceIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
          )
          return(
            <TextField  {...params}  label="Source"/>
          )
        }}
      />
        </FormWrapper>
   
           <FormWrapper>

           <FormControl sx={{minWidth: 460 }}>
           <Autocomplete
        value={destination}
        onChange={(event: any, newValue: string | null) => {
          setDestination(newValue as string);
        }}
        id="destination-city"
        inputValue={destinationValue}
        onInputChange={(event, newInputValue) => {
          setDestinationValue(newInputValue);
        }}
        options={cityNames}
        sx={{ width: 300 }}
        renderInput={(params) => {
          params.InputProps.startAdornment = (
            <InputAdornment position="start">
            <PlaceIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
          )
          return(
            <TextField  {...params}  label="Destination"/>
          )
        }}
      />
        </FormControl>

           </FormWrapper>
            <FormWrapper>
            <TextField
        
        id="price"
        name="price"
        label="Price"
        type='number'
        value={formik.values.price}
        onChange={formik.handleChange}
        InputProps = {{
          startAdornment:(
            <InputAdornment position="start">
              <PriceChangeIcon sx={{fontSize:"35px"}} color="primary"/>
            </InputAdornment>
          )
        }}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />
            </FormWrapper>
            <FormWrapper>
            
            <FormControl sx={{width: 460 }}>
        <InputLabel id="assign-bus">Assign Bus</InputLabel>
        <Select
          labelId="assign-bus"
          id="Bus-Assign"
          multiple
          value={assignedBus}
          onChange={handleAssignedBusChange}
          input={<OutlinedInput id="assignBus-multiple-chip" label="Assign Bus" />}
          renderValue={(selected)=>{
            return selected.map(sel=>(
              ActiveBusses?.find(ab=>ab._id===sel)?.busPlateNo
            )).join(',')
          }}
          MenuProps={MenuProps}
          startAdornment = {
          <InputAdornment position="start">
          <DirectionsBusIcon color="primary" fontSize='large'/>
          </InputAdornment>
          }
        >
          {
          ActiveBusses?
          ActiveBusses.map((activeBus) => (
            <MenuItem
              key={activeBus._id}
              value = {activeBus._id}
              >
                
              <Checkbox checked={assignedBus.indexOf(activeBus._id) > -1} />
              <ListItemText primary={activeBus.busPlateNo} />
            </MenuItem>
          )):null
          }
        </Select>
      </FormControl>

            </FormWrapper>
          <FormWrapper>
          <FormControl sx={{width: 460 }}>
        <InputLabel id="departure-place">Departure Place</InputLabel>
        <Select
          labelId="departure-place"
          id="demo-multiple-chip"
          multiple
          value={depPlace}
          onChange={handleDepPlaceChange}
          input={<OutlinedInput id="select-multiple-chip" label="Departure Place" />}
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
          depPlaces?
          depPlaces!.map((departurePlace,index) => (
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
            <TextField  
        id="distance"
        name="distance"
        label="Distance"
        type='number'
        value={formik.values.distance}
        onChange={formik.handleChange}
        InputProps = {{
          startAdornment:(
            <InputAdornment position="start">
                <SvgIcon color="primary" sx={{fontSize:"35px"}}>
                <path fill="currentColor" d="M6.5,8.11C5.61,8.11 4.89,7.39 4.89,6.5A1.61,1.61 0 0,1 6.5,4.89C7.39,4.89 8.11,5.61 8.11,6.5V6.5A1.61,1.61 0 0,1 6.5,8.11M6.5,2C4,2 2,4 2,6.5C2,9.87 6.5,14.86 6.5,14.86C6.5,14.86 11,9.87 11,6.5C11,4 9,2 6.5,2M17.5,8.11A1.61,1.61 0 0,1 15.89,6.5C15.89,5.61 16.61,4.89 17.5,4.89C18.39,4.89 19.11,5.61 19.11,6.5A1.61,1.61 0 0,1 17.5,8.11M17.5,2C15,2 13,4 13,6.5C13,9.87 17.5,14.86 17.5,14.86C17.5,14.86 22,9.87 22,6.5C22,4 20,2 17.5,2M17.5,16C16.23,16 15.1,16.8 14.68,18H9.32C8.77,16.44 7.05,15.62 5.5,16.17C3.93,16.72 3.11,18.44 3.66,20C4.22,21.56 5.93,22.38 7.5,21.83C8.35,21.53 9,20.85 9.32,20H14.69C15.24,21.56 16.96,22.38 18.5,21.83C20.08,21.28 20.9,19.56 20.35,18C19.92,16.8 18.78,16 17.5,16V16M17.5,20.5A1.5,1.5 0 0,1 16,19A1.5,1.5 0 0,1 17.5,17.5A1.5,1.5 0 0,1 19,19A1.5,1.5 0 0,1 17.5,20.5Z" />
              </SvgIcon>
            </InputAdornment>
          )
        }}
        error={formik.touched.distance && Boolean(formik.errors.distance)}
        helperText={formik.touched.distance && formik.errors.distance}
      />
            </FormWrapper>
        
        <FormWrapper>
        <TextField
        
        id="estimatedHour"
        name="estimatedHour"
        label="Estimated Hour"
        type='number'
        value={formik.values.estimatedHour}
        onChange={formik.handleChange}
        InputProps = {{
          startAdornment:(
            <InputAdornment position="start">
                    <SvgIcon color="primary" sx={{fontSize:"35px"}}>
               <path fill="currentColor" d="M15,12H16.5V16.25L19.36,17.94L18.61,19.16L15,17V12M16,9C16.69,9 17.37,9.1 18,9.29V4.7L15,5.86V9.07C15.33,9 15.66,9 16,9M23,16A7,7 0 0,1 16,23C13,23 10.4,21.08 9.42,18.4L8,17.9L2.66,19.97L2.5,20A0.5,0.5 0 0,1 2,19.5V4.38C2,4.15 2.15,3.97 2.36,3.9L8,2L14,4.1L19.34,2.03L19.5,2A0.5,0.5 0 0,1 20,2.5V10.25C21.81,11.5 23,13.62 23,16M9,16C9,13.21 10.63,10.8 13,9.67V5.87L9,4.47V16.13H9C9,16.09 9,16.04 9,16M16,11A5,5 0 0,0 11,16A5,5 0 0,0 16,21A5,5 0 0,0 21,16A5,5 0 0,0 16,11M4,5.46V17.31L7,16.15V4.45L4,5.46Z" />
            </SvgIcon>
            </InputAdornment>
          )
        }}
        error={formik.touched.estimatedHour && Boolean(formik.errors.estimatedHour)}
        helperText={formik.touched.estimatedHour && formik.errors.estimatedHour}

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
            <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Route Successfully Added' />
            <SameCity open = {samecity} handleClose = {handleSameCityClose}/>
      </form>
      </Box>
    </div>
   
  );
};


