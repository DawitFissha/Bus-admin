import * as React from 'react'
import SeatInfo from './seatInfo'
import SeatStausBox from './seatStatusBox'
interface InfoBoxProps {
    total:number
    availabel:number
    plateNo:string
  }
export default function InfoBox(props:InfoBoxProps) {
    const {total,availabel,plateNo} = props
    return (
        <div
        style={{
            display:'flex',
            flexDirection:'column',
            width:'100%',
            border:'1px solid',
            backgroundColor:'#2E86C1',
            color:'white'
        }}
        >
         <SeatInfo total={total} available={availabel} plateNo={plateNo}/>
        
            <div
            style={{display:'flex',columnGap:'30px',marginLeft:'15px'}}
            >
                <SeatStausBox status="Occupied"/>
                <SeatStausBox status="Free"/>           
            </div>
        </div>
    )
    }