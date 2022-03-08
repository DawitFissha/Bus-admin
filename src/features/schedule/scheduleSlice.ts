import {createSlice, PayloadAction} from '@reduxjs/toolkit'

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
interface initialStateType {
    schedules:SCHEDULE[]
}
const initialState:initialStateType={
    schedules:[]
}
const scheduleSlice = createSlice({
    name:'schedules',
    initialState,
    reducers:{
        addSchedule:(state,action:PayloadAction<SCHEDULE>)=>{
            state.schedules.push(action.payload)
        }
    }
})
export default scheduleSlice.reducer
export const {addSchedule} = scheduleSlice.actions