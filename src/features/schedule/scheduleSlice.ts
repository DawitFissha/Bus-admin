import {createSlice, PayloadAction} from '@reduxjs/toolkit'
export interface SCHEDULE {
    id:string
    description:string
    creationDate:string
    departureDate:Date|null
    departureTime:Date|null
    Route:string
    departurePlaces?:string[]
}
const initialState:SCHEDULE[] = []
const scheduleSlice = createSlice({
    name:'schedules',
    initialState,
    reducers:{
        addSchedule:(state,action:PayloadAction<SCHEDULE>)=>{
            state.push(action.payload)
        }
    }
})
export default scheduleSlice.reducer
export const {addSchedule} = scheduleSlice.actions