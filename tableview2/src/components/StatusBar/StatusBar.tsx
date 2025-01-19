// ----------------------------------------------

// IMPORTS

// REACT
import { useContext } from "react";

// CONTEXTS
import LoadingStatusContext from "../../contexts/loadingStatus/LoadingStatusContext";

// INTERFACES
import { loadingStatusContextInter } from "../../contexts/loadingStatus/LoadingStatusContext";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

// ----------------------------------------------

function StatusBar(
    {}:
    {}
) {

    const loadingStatus: loadingStatusContextInter = useContext(LoadingStatusContext);

    return(
        <div
        className="StatusBar"
        style={
        {
        width: "100%", 
        minWidth: "100%",
        minHeight: "4%",
        // height: "200px", 
        boxSizing: "border-box", 
        padding: "0.5em", 

        background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgb(219, 219, 219) 100%)",
        color: (loadingStatus.loading) ? "rgb(0, 128, 255)" : "rgb(53, 53, 53)", 
        flexDirection: "row", 
        justifyContent: "flex-end",
        }}
        >
            {loadingStatus.message.toString()}
            <LoadingIndicator status={loadingStatus.loading} />
        </div>
    )
}

export default StatusBar;