// ----------------------------------------------

// IMPORTS

// REACT
import { useState } from "react";

// ----------------------------------------------

function DropdownItem(
    {
        text, 
        setValue, 
        align="center", 
    }:
    {
        text: string, 
        setValue: Function, 
        align?: string, 
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
                zIndex: "10", 
    
                userSelect: "none", 
                transitionDuration: "25ms", 
            }, 
            ...((click || hover) ? {
                backgroundColor: "rgb(190, 190, 190)", 
            } : {
                backgroundColor: "white", 
            })

        }}
        >
            <p
            style={{
                width: "100%", 

                textAlign: align as CanvasTextAlign, 
            }}
            >
                {text}
            </p>

        </div>
    );
}

export default DropdownItem;