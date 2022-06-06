import * as React from 'react'
export default function SeatStausBox({status}:{status:"Occupied"|"Free"}) {
    return (
        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
        <div style={{width:'30px',height:'30px',backgroundColor:status==="Occupied"?'red':'green'}}/>
        <p>{status}</p>

        </div>
    )
}