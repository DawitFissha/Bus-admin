import {createSlice,PayloadAction} from '@reduxjs/toolkit'
export interface CITY {
id:string
name:string,
departurePlaces?:string[]
}
const initialState:CITY[] = [
{id:'0',name:'Addis Ababa',
departurePlaces:['Meskel Square','Lam Berete','Haile Garment','Mexico']
},
{id:'0',name:'Jimma'},
{id:'0',name:'Dessie',
departurePlaces:['Menharya','Melaku','Piaza']
},
{id:'0',name:'Fitche'},
{id:'0',name:'Weliso'},
{id:'0',name:'Dire Dawa'},
{id:'0',name:'Gonder'},
{id:'0',name:'Adama'},
{id:'0',name:'Debre Markos'},
{id:'0',name:'Debre Zeit'},
{id:'0',name:'Kombolcha'},
{id:'0',name:'Moyale'},
]
const citySlice = createSlice({
    name:'cities',
    initialState,
    reducers:{
    }
})
export default citySlice.reducer
