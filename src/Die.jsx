import React from "react";

const Die =(props)=>{
    return(
       
            <button 
            style={{backgroundColor: props.isHeld ? "#59E391": "white"}}
            onClick={()=>props.hold(props.id)}
            >{props.value}</button>
       
    )
}

export default Die;