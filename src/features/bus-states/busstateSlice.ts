import {createSlice} from '@reduxjs/toolkit'
export interface BUSSTATE {
    id:string
    description:string

}
const initialState:BUSSTATE[] = [
    {
        id:'Active',
        description:'Active'
    },
    {
        id:'On-Repair',
        description:'On Repair'
    },
    {
        id:'Inactive',
        description:'Inactive'
    },
    {
        id:'Damaged',
        description:'Damaged'
    }
]
const busStateReducer = createSlice({
    name:'bus-states',
    initialState,
    reducers:{
        
    }
})
export default busStateReducer.reducer