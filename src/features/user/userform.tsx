import React,{useState} from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {USER} from './userSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {ROLE} from '../../utils/Constants/roles'
import {roles} from '../../utils/Constants/roles'
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import {FormWrapper} from '../../Components/formWrapper'
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PasswordIcon from '@mui/icons-material/Password';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import {ValidatePhoneNumber} from '../../utils/regex-validators'
import {addUsers,fetchUsers} from './userSlice'
import Alert from '@mui/material/Alert'
type ERROR_TYPE = Partial<USER> & {confirmPassword?:string}
// not a DRY code should be checked later
interface VALUES_TYPE {
  firstName:string
  lastName:string,
  phoneNumber:string,
  password:string,
  confirmPassword:string,
}
const validate = (values:VALUES_TYPE) => {
    const errors:ERROR_TYPE = {};
    if (!values.firstName) {
      errors.firstname = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstname = 'Must be 15 characters or less';
    }
  
    if (!values.lastName) {
      errors.lastname = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastname = 'Must be 20 characters or less';
    }
  
    if (!values.phoneNumber) {
      errors.phonenumber = 'Required';
    }
     else if (values.phoneNumber.length>10) {
      errors.phonenumber = "Phone Number Can't Excede 10 digits";
    }
    else if(!ValidatePhoneNumber(values.phoneNumber)) {
      errors.phonenumber = "Invalid Phone Number";
    }
    if(!values.password){
        errors.password = 'Required';
    }
    if(!values.confirmPassword){
        errors.confirmPassword = 'Required'
    }
    else if(values.confirmPassword !== values.password){
        errors.confirmPassword = 'Password do not match'
    }
  
    return errors;
  };

export const UserRegistration = ({providedRole,DialogClose}:{providedRole?:string,DialogClose?:()=>void}) => {
const timer = React.useRef<number>();
const [open,setOpen] = useState(false)
const [gender,setGender] = useState('')
const providedRoleDescription  = roles.find((role)=>role.id===providedRole)?.description 
const [roleItem,setRoleItem] = useState(providedRole?providedRoleDescription:'')
const roleId = roles.find((role)=>role.description===roleItem)?.id as string 
const [genderError,setGenderError] = useState('')
 
const [loading, setLoading] = React.useState(false);
const [adduserError,setAddUserError] = useState('')
const dispatch = useAppDispatch();
const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
const handleGenderChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setGender((e.target as HTMLInputElement).value)
}
const handleRoleChange = (e:SelectChangeEvent)=>{
  setRoleItem(e.target.value)
}
React.useEffect(()=>{
    document.title +=` - User Registration`
    // if(userStatus==='idle'){
    //   dispatch(fetchUsers())
      
    // }
    // return ()=>{
    //   clearTimeout(timer.current)
    // }
},[/*userStatus,dispatch*/])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber:'',
      password:'',
      confirmPassword:''
    },
    validate,
    onSubmit: async (values,{resetForm}) => {
      // if(gender===''){
      //   setGender('select Gender Please')
      //   console.log(genderError)
      // }
        // else {
      
          if(!loading){
            
            setLoading(true)
            // timer.current = window.setTimeout(()=>{
              
            try {
              await dispatch(addUsers(
                {
                  firstname:values.firstName,
                  lastname:values.lastName,
                  gender,
                  phonenumber:values.phoneNumber,
                  userrole:providedRole?providedRole:roleId,  
                  password:values.password,
                  confirmpassword:values.confirmPassword,
                }
              )).unwrap()

              

              resetForm({values:{
                firstName: '',
                lastName: '',
                phoneNumber:'',
                password:'',
                confirmPassword:''
              }})
             
              setGender('')
              setRoleItem('')
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
                setAddUserError(resMessage)
            }
            finally {
              setLoading(false)
            }
          }
         
        
    },
  });

  return (
    <div style ={{
      width:providedRole?'500px':"600px",
      marginTop:'2px',
      marginLeft:providedRole?'5px':'25%',
      height:'auto',
     background:'#FFFF',
     marginBottom:'5px',
    }}>
    <SavingProgress loading={loading}/>
        <Box sx={{
           display:'flex',
           flexDirection:'column',
            marginLeft:providedRole?'0%':'10%'
       }}>
           <FormWrapper>
           <RegistrationHeader description = 'Register Users' />
           </FormWrapper>
      <form onSubmit={formik.handleSubmit}>
   
           <FormWrapper>

           <TextField
        
          id="firstName"
          name="firstName"
          label="first Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <PersonIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
           </FormWrapper>
        
            <FormWrapper>
            <TextField
            
          
          id="lastName"
          name="lastName"
          label="last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <PersonIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
            </FormWrapper>
            <FormWrapper>
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
                value ={gender}
                onChange = {handleGenderChange}
                 row
                 aria-labelledby="gender-radio-buttons-group-label"
                 name="gender-radio-buttons-group"
      >
        <FormControlLabel value="male" control={<Radio />} label="Female" />
        <FormControlLabel value="female" control={<Radio />} label="Male" />
        
        
      </RadioGroup>
            </FormWrapper>
        
            <FormWrapper>
            <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <LocalPhoneIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
            </FormWrapper>
            <FormWrapper>
            <FormControl sx={{minWidth: 460 }}>
            <InputLabel id="role-select-helper-label">Role</InputLabel>
        <Select
          disabled = {Boolean(providedRole)}
          labelId="role-select-helper-label"
          id="role-select-helper"
          value={roleItem}
          label="Role"
          onChange={handleRoleChange}
          startAdornment = {<WorkspacesIcon color="primary" fontSize="large"/>}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */
          roles.map((role)=>(
            <MenuItem  key = {role.id} value={role.description}>{role.description}</MenuItem>
          ))
          }
        </Select>
        <FormHelperText sx={{color:'red'}}>{genderError}</FormHelperText>
        </FormControl>
            </FormWrapper>
        
        <FormWrapper>
        <TextField
          id="password"
          name="password"
          label="password"
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <PasswordIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        </FormWrapper>
       
        <FormWrapper>
        <TextField
         sx={{marginTop:'10px'}}
          
          type='password'
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <PasswordIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
            <SaveSuccessfull open={open} handleClose={handleClose} message = 'User Successfully Registered' />
      </form>
      {adduserError&&(<FormWrapper>
            <Alert sx ={{width:'450px',fontSize:"medium"}} severity="error">
            <strong>{adduserError}</strong> , Please try again
            </Alert>
            </FormWrapper>)}
      </Box>
    </div>
  );
};


