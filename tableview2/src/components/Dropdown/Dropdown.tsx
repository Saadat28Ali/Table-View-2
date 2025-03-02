// ----------------------------------------------

// IMPORTS

// REACT
import { useState, } from "react";
import DropdownItem from "../DropdownItem/DropdownItem";

// ----------------------------------------------

function Dropdown(
    {
        items, 
        selectedItem, 
        setSelectedItem, 
    }:
    {
        items: Array<string>,
        selectedItem: string, 
        setSelectedItem: Function, 
    }
) {

    const [expanded, setExpanded] = useState<boolean>(false);

    return(
        <div
        className="Dropdown"
        onClick={() => {
            setExpanded(!expanded);
        }}
        style={{
            ...{
                position: "relative", 
                border: "2px solid rgb(190, 190, 190)", 
                borderRadius: "1em", 
                padding: "1em", 
                width: "100%", 
                boxSizing: "border-box", 
                marginBottom: "1em", 
                
                transitionDuration: "0ms", 
                // minWidth: "100%", 

    
                userSelect: "none", 
            }, 
            ...((expanded) ? {
                borderBottomLeftRadius: "0", 
                borderBottomRightRadius: "0", 
                borderBottom: "0px", 
                padding: "1em", 
                border: "3px solid rgb(0, 128, 255)"
            }: {
                borderBottomLeftRadius: "1em", 
                borderBottomRightRadius: "1em", 
                borderBottom: "2px solid rgb(190, 190, 190)", 
                padding: "1em", 
                borderWidth: "2px", 
            })

        }}
        >
            Sort by: {selectedItem} {(!expanded) ? <>&#x2BC6;</> : <>&#x2BC5;</>}

            {
                (expanded) ? 
                <div
                className="ExpandedMenu"
                style={{
    
                    ...{
                        position: "absolute", 
                        top: "3.2em", 
                        width: "100%", 
                        maxHeight: "10em", 
                        // boxSizing: "border-box", 
                        border: "3px solid rgb(0, 128, 255)", 
                        borderRadius: "1em", 
                        zIndex: "10", 
        
                        backgroundColor: "white", 
                        justifyContent: "start", 
    
                        userSelect: "none", 
                        overflowX: "clip", 
                        overflowY: "auto", 
                    }, 
                    ...((expanded) ? {
                        borderTopLeftRadius: "0", 
                        borderTopRightRadius: "0", 
                        borderTop: "1px solid rgb(190, 190, 190)", 
                        borderWidth: "3px", 
                    } : {
                        borderTopLeftRadius: "1em", 
                        borderTopRightRadius: "1em", 
                        borderTop: "2px solid rgb(190, 190, 190)", 
                        borderWidth: "2px", 
                    })
    
    
                }}
                >
                    {
                        items.map((item: string) => {
                            return (
                                <DropdownItem text={item} setValue={(newValue: string) => {
                                    setSelectedItem(newValue);
                                }} />
                            );
                        })
                    }
    
                </div>
                : 
                <></>
            }

        </div>
    );
}

export default Dropdown;