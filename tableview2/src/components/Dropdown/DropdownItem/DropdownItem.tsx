// ----------------------------------------------

// IMPORTS

// REACT
import { useState } from "react";

// ----------------------------------------------


function DropdownItem(
    {
        text, 
        setValue, 
    }:
    {
        text: string, 
        setValue: Function
    }
) {

    const [hover, setHover] = useState<boolean>(false);
    const [click, setClick] = useState<boolean>(false);
    
    return(
        <div
        className="ExpandedMenuItem"
        onClick={() => {
            setValue(text);
        }}
        onMouseEnter={() => {setHover(true)}}
        onMouseLeave={() => {setHover(false)}}
        onMouseDown={() => {setClick(true)}}
        onMouseUp={() => {setClick(true)}}
        style={{
            ...{
                padding: "1em",
                minWidth: "100%", 
                width: "100%", 
                boxSizing: "border-box", 
    
                userSelect: "none", 
                transitionDuration: "25ms", 
            }, 
            ...((click || hover) ? {
                backgroundColor: "rgba(0,0,0,0.25)", 
            } : {
                backgroundColor: "white", 
            })

        }}
        >
            {text}
        </div>
    );
}

export default DropdownItem;