import {createSlice, PayloadAction} from '@reduxjs/toolkit'
export interface BUS {
    id:string
    description:string
    plateNo:string
    driverId:string|undefined
    redatId:string|undefined
    NoOfSeat:number
}
const initialState:BUS[] = []
const busSlice = createSlice({
    name:'busses',
    initialState,
    reducers:{
        addBus:(state,action:PayloadAction<BUS>)=>{
            state.push(action.payload)
        }
    }
})
export default busSlice.reducer
export const {addBus} = busSlice.actions