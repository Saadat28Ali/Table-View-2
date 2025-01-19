// ----------------------------------------------

// IMPORTS

// CONTEXTS
import LoadingStatusContext from "./LoadingStatusContext";

// REACT
import { useState } from "react";

// ----------------------------------------------

function LoadingStatusContextProvider( 
    {children}:
    {children: Array<any>}
 ) {
    const [loadingStatus, setLoadingStatus] = useState<{loading: boolean, message: string}>({loading: false, message: "Idle"});

    return (
        <LoadingStatusContext.Provider value={{
            loading: loadingStatus.loading, 
            message: loadingStatus.message, 
            setLoading: (newLoadingStatus: boolean) => {
                setLoadingStatus({loading: newLoadingStatus, message: loadingStatus.message});
            }, 
            setMessage: (newMessage: string) => {setLoadingStatus({loading: loadingStatus.loading, message: newMessage})}
        }}>
            {children}
        </LoadingStatusContext.Provider>
    );
}

export default LoadingStatusContextProvider;