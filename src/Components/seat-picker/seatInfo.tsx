import * as React from 'react'

export default function SeatInfo({total,available,plateNo}:{total?:number,available?:number,plateNo?:string}){
    return(
        <div style={{display:'flex',gap:'50px',marginLeft:'15px'}}>
        <h4>Total Seats - <strong>{total}</strong></h4>
         <h4>Available Seats - <strong>{available}</strong></h4>
         <h4>PlateNo - <strong>{plateNo}</strong></h4>
        </div>
    )
}