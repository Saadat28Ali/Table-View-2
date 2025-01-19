// ----------------------------------------------

// IMPORTS

// REACT
import { useState } from "react";

// ----------------------------------------------

function DropdownItem(
    {
        text, 
        noBottomBorder
    }:
    {
        text: string, 
        noBottomBorder: boolean
    }
) {

    interface mouseStatesInter {
        hover: boolean, 
        click: boolean
    }
    const [mouseStates, setMouseStates] = useState<mouseStatesInter>({hover: false, click: false});

    return(
        <div
        className="DropdownItem"
        style={{
            ...{
                minHeight: "2em", 
                height: "2em", 
                minWidth: "100%", 
                width: "100%", 
                borderBottom: (!noBottomBorder) ? "2px solid rgb(204, 204, 204)" : "", 
            }, 
            ...(mouseStates.click && mouseStates.hover ? {
                
            } : (mouseStates.hover) ? {
                backgroundColor: "rgb(204, 204, 204)", 
            } : {

            })
            

        }}
        onMouseEnter={(event: any) => {
            event.preventDefault(); 
            setMouseStates((oldMouseState: mouseStatesInter) => {
                const newMouseState: mouseStatesInter = {...oldMouseState};
                newMouseState.hover = true;
                return newMouseState;
            });
        }}
        onMouseLeave={(event: any) => {
            event.preventDefault(); 
            setMouseStates((oldMouseState: mouseStatesInter) => {
                const newMouseState: mouseStatesInter = {...oldMouseState};
                newMouseState.hover = false;
                return newMouseState;
            });
        }}
        >
            {text}
        </div>
    );
}

export default DropdownItem;