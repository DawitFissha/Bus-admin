import {createSlice} from '@reduxjs/toolkit'
export interface ROLE {
    id:string
    description:string

}
const initialState:ROLE[] = [
    {
        id:'0',
        description:'Admin'
    },
    {
        id:'1',
        description:'Ticketer'
    },
    {
        id:'3',
        description:'Driver'
    },
    {
        id:'4',
        description:'Redat'
    }
]
const rolesReducer = createSlice({
    name:'roles',
    initialState,
    reducers:{
        
    }
})
export default rolesReducer.reducer