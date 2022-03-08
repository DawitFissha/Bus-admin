import {createSlice} from '@reduxjs/toolkit'
export interface BUSSTATE {
    id:string
    description:string

}
const initialState:BUSSTATE[] = [
    {
        id:'0',
        description:'Active'
    },
    {
        id:'1',
        description:'On Repair'
    },
    {
        id:'2',
        description:'Inactive'
    },
    {
        id:'4',
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