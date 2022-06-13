
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import UserService from '../../services/user.service'
import AuthService from "../../services/auth.service";

export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules',async ()=>{
    return await (await UserService.getSchedules()).data
    })
    
export const addSchedule = createAsyncThunk('schedules/addNewSchedule',async (schedule: any) => {
    return await  ( await AuthService.addSchedule(schedule)).data
    }
)

export interface SCHEDULE {
    id:string
    description:string
    creationDate:string
    departureDate:Date|null
    departureTime:Date|null
    Route:string
    departurePlaces?:string[],
    busId:string
}
type initialStateType = {
    schedules:any[],
    status:'idle' | 'loading' | 'succeeded' | 'failed'
    error:string|undefined
}
const initialState:initialStateType = {
    schedules:[],
    status:'idle',
    error:""
    } as initialStateType

const scheduleSlice = createSlice({
    name:'schedules',
    initialState,
    reducers:{
        resetSchedule:(state)=> {
            state.schedules = initialState.schedules
        }
     },
     extraReducers(builder){
        builder
        .addCase(addSchedule.fulfilled,(state,action)=>{
            state.schedules.push(action.payload)
        })
        .addCase(fetchSchedules.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchSchedules.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.schedules = state.schedules.concat(action.payload)
          })
          .addCase(fetchSchedules.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
     }
})
export default scheduleSlice.reducer
export const {resetSchedule} = scheduleSlice.actions
