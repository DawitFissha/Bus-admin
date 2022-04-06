import * as React from 'react'
import {FormWrapper} from './formWrapper'
import Box from '@mui/material/Box'
import { RegistrationHeader } from './registrationHeader'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import BusinessIcon from '@mui/icons-material/Business';
import LoadingButton from '@mui/lab/LoadingButton'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useFormik } from 'formik'
import {useNavigate} from 'react-router-dom'

const orgRegEx = new RegExp('^[0-9]+$')
const validate = (values:{OrganizationCode:string})=>{
    const errors:{OrganizationCode?:string} = {}
    if(!values.OrganizationCode){
        errors.OrganizationCode = "This field can't be empty"
    }
    else if(!orgRegEx.test(values.OrganizationCode)){
        errors.OrganizationCode = "Only Numbers are allowed"
    }
    else if(values.OrganizationCode.length>10){
        errors.OrganizationCode = "Can't Excede 10 digits"
    }
    return errors
}
export const OrganizationCode = ()=>{
const [loading,setLoading] = React.useState(false);
const navigate = useNavigate()
const formik = useFormik({
    validate,
    initialValues:{
        OrganizationCode:""
    },
    onSubmit:(values,{resetForm})=>{
        if(!loading){
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                localStorage.setItem("orgCode", values.OrganizationCode);
                console.log(localStorage.getItem('orgCode'))
                resetForm({
                    values:{
                        OrganizationCode:""
                    }
                })
                navigate('/login')
            }, 3000);
        }
    },
})
React.useEffect(() => {
    if(!localStorage.getItem('orgCode')){localStorage.setItem('orgCode','')}
  
}, [formik.values.OrganizationCode])
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
           <RegistrationHeader description = 'Enter Organization Code' />
           </FormWrapper>

        <form onSubmit = {formik.handleSubmit}>
                        <FormWrapper customPadding={2}>

                  <TextField

                id="OrganizationCode"
                name="OrganizationCode"
                label="Organization Code"
                value={formik.values.OrganizationCode}
                onChange={formik.handleChange}
                InputProps = {{
                    startAdornment:(
                    <InputAdornment position="start">
                        <BusinessIcon fontSize="large" color="primary"/>
                    </InputAdornment>
                    )
                }}
                error={formik.touched.OrganizationCode && Boolean(formik.errors.OrganizationCode)}
                helperText={formik.touched.OrganizationCode && formik.errors.OrganizationCode}
                />
                </FormWrapper>
                <FormWrapper>
                        <LoadingButton  
                                type="submit"
                                loading={loading}
                                sx={{marginLeft:"32%",borderRadius:'14px',width:150}} color="primary" variant="outlined" 
                                startIcon={<DoubleArrowIcon/>}
                                >
                                Continue
                            </LoadingButton>
                        </FormWrapper>
        </form>
            </Box>
        </div>
    )
}