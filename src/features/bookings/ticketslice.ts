import {createSlice,PayloadAction} from '@reduxjs/toolkit'
interface TICKET {
    id:string,
    scheduleId:string,
    seatNumber:number,
    passengerName:string,
    passengerPhone:string,
}
interface initialStateType {
    tickets:TICKET[]
}
const initialState:initialStateType = {
    tickets:[]
}
const ticketReducer = createSlice({
    name:'tickets',
    initialState,
    reducers:{
        addBooking:(state,action:PayloadAction<TICKET>)=>{
            state.tickets.push(action.payload)
        }
    }
})
export default ticketReducer.reducer
export const  {addBooking} = ticketReducer.actions