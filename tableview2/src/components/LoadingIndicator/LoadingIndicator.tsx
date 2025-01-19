// ----------------------------------------------

// IMPORTS

// REACT
import { useState, useEffect } from "react";


// ----------------------------------------------

function LoadingIndicator(
    {
        status
    }:
    {
        status: boolean
    }
) {

    const [rotation, setRotation] = useState<number>(0);

    useEffect(() => {
        const rotationFunction: Function = () => {
            setRotation((oldRotation: number) => {
                return oldRotation + 5;
            });
        };

        if (status) {
            const rotationTimeout = setTimeout(rotationFunction, 1);
            return () => {
                clearTimeout(rotationTimeout);
            }
        }
    }, [rotation]);

    console.log("loading indicator reload");

    return(
        <div
        className="LoadingIndicator"
        style={{
            ...{
                minWidth: "1em", 
                width: "1em", 
                minHeight: "1em", 
                height: "1em", 
                boxSizing: "border-box", 
                borderRadius: "20px", 
                marginLeft: "1em", 
            }, 
            ...(status ? {
                borderTop: "3px solid rgb(0, 128, 255)", 
                borderLeft: "3px solid white", 
                borderRight: "3px solid white", 

                rotate: (rotation.toString() + "deg"), 
            } : {
                border: "3px solid rgb(53,53,53)", 
                rotate: "0deg", 
            })
        }}>
        </div>
    );
}

export default LoadingIndicator;