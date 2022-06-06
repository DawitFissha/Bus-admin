import * as React from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'
const user = localStorage.getItem('user')
export function PublicPage(){
const navigate =useNavigate()
 return (
     <div
     style={{
         width:'100%',
         backgroundColor:"blue",
         height:'100vh',
         margin:'10px',
         color:'white'
     }}
     >
       <div style = {{
           marginLeft:'100px',
           paddingTop:'80px'
       }}>
       <h1
       style = {{width:'400px',fontSize:'45px'}}
       >
             Make your Booking easy Organised and fast
         </h1>
         <h3
         style = {{width:'500px',fontSize:'22px'}}
         >
            A software that organises your busses,schedules and routes 
            manages your booking transactions to higher customer satisfaction and effcient work
         </h3>
         <Button
         style={{
             backgroundColor:'white',
             color:'#1a73e8',
            //  font:'500 14px/16px "Roboto",sans-serif',
            fontSize:"16px",
            fontFamily:'Roboto",sans-serif',
             minWidth:'200px',
             maxWidth:'255px',
             borderRadius:"8px",
             height:'50px',
             letterSpacing:'.15px',
             textAlign:'center'
         }}
         onClick = {()=>{navigate('/home')}}
         >{
             !user?`Get Started`:`Continue`
         }</Button>
       </div>
     </div>
 )       
    //    return !user?<NotLoggedin/>:<Loggedin/>
}
function Loggedin(){
    return (
        <div>
             {"Welcome Continue to your "}  <Link to="/home">Work</Link>
        </div>
    )
}
function NotLoggedin(){
    return (
        <div>
             {"You are not Loogedin"} | <Link to="/orgCode">Login</Link>
        </div>
    )
}