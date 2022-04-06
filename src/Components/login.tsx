import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as React from 'react'
import {FormWrapper} from './formWrapper'
import { RegistrationHeader } from './registrationHeader'
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import PasswordIcon from '@mui/icons-material/Password';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Avatar from '@mui/material/Avatar'
import AuthService from "../services/auth.service";
import Alert from '@mui/material/Alert'
import {useNavigate} from 'react-router-dom'
interface LOGIN_VALUES {
    phoneNumber:string
    password:string
}
const validate = (values:LOGIN_VALUES)=>{
    const errors:Partial<LOGIN_VALUES> = {}
    if(!values.phoneNumber){
        errors.phoneNumber = "Phone number is Required"
    }
    if(!values.password){
        errors.password = "Password is Required"
    }
    return errors
}
export const Login = ()=>{
const navigate = useNavigate()
const [loginState,setLoginState] = React.useState({
  organizationCode: localStorage.getItem('orgCode')? localStorage.getItem('orgCode')?.replace(/"/g, '') : "",
  loading:false,
  error:"",
})
const [showPassword,setShowPassword] = React.useState<boolean>(false)
const handleClickShowPassword = ()=>{
    setShowPassword(!showPassword)
}
    const formik = useFormik({
        validate,
        initialValues:{
            phoneNumber:"",
            password:"",
        },
        onSubmit:(values)=>{

            if(!loginState.loading){
                setLoginState({...loginState,loading:true})
                AuthService.login(values.phoneNumber,loginState.organizationCode,values.password).then(
                    ()=>{
                        console.log('login successfull')
                        setLoginState({...loginState,loading:false})
                        navigate('/')
                    },
                    (error:any)=>{
                        const resMessage =
                        (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                        error.message ||
                        error.toString();
                        setLoginState({...loginState,loading:false,error:resMessage})
                    }
                )
            }
        }
    })
    return(
        <div 
        style ={{
            width:"600px",
            marginLeft:'30%',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            height:'auto',
            background:'#FFFF',
            
          }}
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                     marginLeft:'10%',
                     paddingTop:'30px',
                     paddingBottom:'30px'
                }}
            >
                <FormWrapper>
           <RegistrationHeader description = 'Login to X-bus' />
           </FormWrapper>
           <FormWrapper sx={{marginLeft:'30%'}} >
           <Avatar sx={{width:120,height:120}} src="/broken-image.jpg" />
           </FormWrapper>
            <form onSubmit={formik.handleSubmit}>
            <FormWrapper customPadding={2}>

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

                    <FormWrapper customPadding={2}>

                        <TextField
                        type={showPassword?"text":"password"}
                        id="password"
                        name="password"
                        label="Password"
                        InputProps = {{
                            startAdornment:(
                            <InputAdornment position="start">
                                <PasswordIcon fontSize="large" color="primary"/>
                            </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    >
                                    {showPassword?<VisibilityOff/>:<Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        />
                        </FormWrapper>
                        <FormWrapper>
                            <LoadingButton  
                                    type="submit"
                                    loading={loginState.loading}
                                    sx={{marginLeft:"32%",borderRadius:'14px',width:150}} color="primary" variant="outlined" 
                                    startIcon={<LoginIcon/>}
                                    >
                                     Login
                                </LoadingButton>
                            </FormWrapper>
            </form>
            {loginState.error&&(<FormWrapper>
            <Alert sx ={{width:'450px',fontSize:"medium"}} severity="error">
            <strong>{loginState.error}</strong> , Please try again
            </Alert>
            </FormWrapper>)}
            </Box>
        </div>
    )
}



