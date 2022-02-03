import React,{useState} from 'react';
import {nanoid} from '@reduxjs/toolkit'
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {ROUTE,addRoute} from './routeSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box, { BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import {SameCity} from './samecity'
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
// not a DRY code should be checked later
type VALUES_TYPE  = Required<Pick<ROUTE,'price'|'distance'|'estimatedHour'>>
interface ERROR_TYPE {
    price?:string
    distance?:string
    estimatedHour?:string
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
const FormWrapper = (props:BoxProps)=>{
    const {sx,...other} = props
    return(
        <Box sx={{p:1,...sx}} {...other}/>
    )
}
const sourceDest = {
    source:'',
    destination:'',
}

export const RouteRegistration:React.FunctionComponent = () => {
const [depPlace, setDepPlace] = React.useState<string[]>([]);
const handleDepPlaceChange = (event: SelectChangeEvent<typeof depPlace>) => {
  const {
    target: { value },
  } = event;
  setDepPlace(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};
const timer = React.useRef<number>();
const [open,setOpen] = useState(false)
const [samecity,setSameCity] = useState(false)
const [loading, setLoading] = React.useState(false);
const [sourceDestValues,setSourceDestValues] = useState(sourceDest)
const cities = useAppSelector(state=>state.cities)
const cityNames =  cities.map((city)=>city['name'])
 const [sourceValue, setSourceValue] = React.useState('');
 const [destinationValue, setDestinationValue] = React.useState('');
 const [source, setSource] = React.useState<string>(cityNames[0]);
 const depPlaces = useAppSelector(state=>state.cities.find((city)=>(city.name===source))).departurePlaces
 const [destination, setDestination] = React.useState<string>(cityNames[0]);
// const roleId = useAppSelector(state=>state.roles.find((role)=>role.description===roleItem)) as ROLE
interface CHIPDATA {
  key:string
  label:string
}
const [chipData,setChipData] = useState<string[]>([])
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
const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const handleCityChange = 
(e:SelectChangeEvent)=>{
  const {name,value} = e.target
  setSourceDestValues({
      ...sourceDestValues,
      [name]:value,
  })
}
React.useEffect(()=>{
    document.title+=` - Route Registration`
    return ()=>{
      clearTimeout(timer.current)
    }
},[])
  const formik = useFormik({
    initialValues: {
      price: 0,
      distance:0,
      estimatedHour:0,
      
    },
    validate,
    onSubmit: (values,{resetForm}) => {
        if(source===destination){
            setSameCity(true)
        }
         else {
          if(!loading){
            setLoading(true)
            timer.current = window.setTimeout(()=>{
              
              dispatch(addRoute({
                id:nanoid(),
                source,
                destination,
                price:values.price,
                distance:values.distance>0?values.distance:null,
                estimatedHour:values.estimatedHour>0?values.estimatedHour:null,
              }))
              setLoading(false)
              resetForm({values:{
                price: 0,
                distance:0,
                estimatedHour: 0,
              }})
              setSourceDestValues({source:'',destination:''})
              setOpen(true)
            },3000)
          }
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
           <RegistrationHeader description = 'Add New Routes' />
           </FormWrapper>
      <form onSubmit={formik.handleSubmit}>
        <FormWrapper>
        <Autocomplete
        value={source}
        onChange={(event: any, newValue: string | null) => {
          setSource(newValue as string);
        }}
        id="controllable-states-demo"
        inputValue={sourceValue}
        onInputChange={(event, newInputValue) => {
          setSourceValue(newInputValue);
        }}
        options={cityNames}
        // getOptionLabel = {(option)=>option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Source" />}
      />
        </FormWrapper>
   
           <FormWrapper>

           <FormControl sx={{minWidth: 460 }}>
           <Autocomplete
        value={destination}
        onChange={(event: any, newValue: string | null) => {
          setDestination(newValue as string);
        }}
        id="controllable-states-demo"
        inputValue={destinationValue}
        onInputChange={(event, newInputValue) => {
          setDestinationValue(newInputValue);
        }}
        options={cityNames}
        // getOptionLabel = {(option)=>option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Destination" />}
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
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />
            </FormWrapper>
          <FormWrapper>
          <FormControl sx={{width: 460 }}>
        <InputLabel id="demo-multiple-chip-label">Departure Place</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          // label="Departure Place"
          multiple
          value={depPlace}
          onChange={handleDepPlaceChange}
          input={<OutlinedInput id="select-multiple-chip" label="Departure Place" />}
          renderValue={(selected) => {
            setChipData(selected)
            // console.log(chipData)
           return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {
                chipData.map((cd,index)=>(
                  <Chip key={index} label={cd} 
                  onDelete = {()=>{
                    setChipData((chips)=>chips.splice(index,1))
                  }}
                  />
                ))
              }
          </Box>
           )
          }}
          MenuProps={MenuProps}
        >
          {
          depPlaces?
          depPlaces!.map((depPlace) => (
            <MenuItem
              
              value={depPlace}
            >
              {depPlace}
            </MenuItem>
          )):<MenuItem>no departure</MenuItem>
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
            <SaveSuccessfull open={open} handleClose={handleClose} message = 'Route Successfully Added' />
            <SameCity open = {samecity} handleClose = {handleSameCityClose}/>
      </form>
      </Box>
    </div>
  );
};


