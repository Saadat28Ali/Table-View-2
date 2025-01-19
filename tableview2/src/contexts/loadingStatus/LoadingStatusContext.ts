// ----------------------------------------------

// IMPORTS

// REACT
import { createContext } from "react";

// ----------------------------------------------

interface loadingStatusContextInter {
    loading: boolean, 
    message: string, 
    setLoading: Function, 
    setMessage: Function
}

const LoadingStatusContext = createContext<loadingStatusContextInter>(
    {
        loading: false, 
        message: "", 
        setLoading: () => {}, 
        setMessage: () => {}
    }
);

export default LoadingStatusContext;
export type { loadingStatusContextInter };