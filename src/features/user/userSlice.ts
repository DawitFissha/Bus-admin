import { Password } from '@mui/icons-material'
import {createSlice,PayloadAction} from '@reduxjs/toolkit'
export interface USER {
id:string
firstName:string
lastName:string
gender:string
phoneNumber:string
role:string
password:string
}
const initialState:USER[] = [
{
id:'0',
firstName:'Dawit',
lastName:'Fissha',
gender:'Male',
phoneNumber:"+251927784322",
role:'3',
password:'12345',
},
{
    id:'1',
    firstName:'Melaku',
    lastName:'Ayu',
    gender:'Male',
    phoneNumber:"+251927784322",
    role:'3',
    password:'12345',
    },
    {
        id:'2',
        firstName:'Maruf',
        lastName:'Belete',
        gender:'Male',
        phoneNumber:"+251927784322",
        role:'4',
        password:'12345',
        },
        {
            id:'3',
            firstName:'Mercy',
            lastName:'Teshome',
            gender:'Female',
            phoneNumber:"+251927784322",
            role:'4',
            password:'12345',
            }
]
const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUser:(state,action:PayloadAction<USER>)=>{
            state.push(action.payload)
        }
    }
})
export const {addUser} = usersSlice.actions
export default usersSlice.reducer
