// ----------------------------------------------

// IMPORTS

// REACT
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

// ----------------------------------------------

function DropDownButton(
    {}:
    {}
) {
    interface mouseStatesInter {
        hover: boolean, 
        click: boolean
    }
    const [mouseStates, setMouseStates] = useState<mouseStatesInter>({hover: false, click: false});
    const [active, setActive] = useState<boolean>(false);

    return(
        <button
        style={{
            ...{
                border: "1px solid rgba(0,0,0,0)", 
                padding: "0.1em", 
                borderRadius: "0.2em", 
                boxSizing: "border-box", 
                position: "relative", 
    
                backgroundColor: "white", 
            }, 
            ...(mouseStates.click && mouseStates.hover ? {
                backgroundColor: "rgb(204, 204, 204)",  
                border: "1px solid rgb(0, 102, 204)", 

            } : (mouseStates.hover ? {
                backgroundColor: "rgb(204, 204, 204)", 
            } : {

            })

            )

            

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
        onMouseDown={(event: any) => {
            event.preventDefault();
            setMouseStates((oldMouseState: mouseStatesInter) => {
                const newMouseState: mouseStatesInter = {...oldMouseState};
                newMouseState.click = true;
                return newMouseState;
            })
            setActive(!active);
        }}
        onMouseUp={(event: any) => {
            event.preventDefault();
            setMouseStates((oldMouseState: mouseStatesInter) => {
                const newMouseState: mouseStatesInter = {...oldMouseState};
                newMouseState.click = false;
                return newMouseState;
            })
        }}
        >
            &#11206;

            {(active) ? <Dropdown items={["abc", "def", "ghi"]} /> : <></>}
        </button>
    );
}

export default DropDownButton;