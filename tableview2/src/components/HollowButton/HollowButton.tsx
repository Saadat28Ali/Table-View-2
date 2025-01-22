// ----------------------------------------------

// IMPORTS

// REACT
import { useState } from "react";

// ----------------------------------------------

function HollowButton(
    {
        text, 
        callback
    }:
    {   
        text: string, 
        callback: Function
    }
) {

    const [hover, setHover] = useState<boolean>(false);
    const [click, setClick] = useState<boolean>(false);

    return(
        <button
        className="HollowButton"
        onMouseEnter={() => {setHover(true)}}
        onMouseLeave={() => {setHover(false)}}
        onMouseDown={() => {setClick(true)}}
        onMouseUp={() => {
            setClick(false);
            callback();
        }}
        style={{
            ...{
                border: "2px solid rgb(0, 128, 255)", 
                borderRadius: "1em", 
                padding: "1em", 
                marginBottom: "1em", 
                width: "100%", 
                minWidth: "100%", 

                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                fontSize: "1em", 
            }, 
            ...((click && hover) ? {
                backgroundColor: "rgb(0, 128, 255)", 
                color: "white", 

            } : (hover ? {
                scale: "1.02", 

                backgroundColor: "rgba(0,0,0,0)", 
                
                color: "rgb(0, 128, 255)", 
            } : {
                backgroundColor: "rgba(0,0,0,0)", 
                
                color: "rgb(0, 128, 255)", 
            }))

            
        }}
        >
            {text}
        </button>
    );
}

export default HollowButton;