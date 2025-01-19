// ----------------------------------------------

// IMPORTS

// INTERFACES
import { queryInter } from "../LeftPane/LeftPane";

// COMPONENTS
import QuerySelectionProjectionPair from "./QuerySelectionProjectionPair/QuerySelectionProjectionPair";

// ----------------------------------------------

function QueryCard(
    {
        data, 
        setStatus, 
        setValue, 
    }:
    {
        data: queryInter, 
        setStatus: Function, 
        setValue: Function, 
    }
) {

    return(
        <div
        className="QueryCard"
        style={{
            width: "100%", 
            minWidth: "100%", 
            // height: "10em", 
            // minHeight: "10em", 
            flexGrow: "2", 
            borderRadius: "0.5em", 
            boxShadow: "0px 0px 20px 2px rgba(0,0,0,0.25)", 
            boxSizing: "border-box", 
            padding: "0.5em", 
            marginTop: "1em", 

            backgroundColor: "white", 
            justifyContent: "start", 
        }}
        >
            {/* Columns: {columns.toString()}
            Rows: {Object.keys(rows).toString()} */}
            
            {/* {columns.map((column: string, index: number) => {
                return(
                    <QuerySelectionProjectionPair 
                    column={column}
                    setQueriedColumns={setQueriedColumns}
                    setQueriedRows={setQueriedRows} 
                    />
                );
            })} */}
            {
                Object.keys(data).map((column: string, columnIndex: number) => {
                    return(
                        <QuerySelectionProjectionPair 
                        key={columnIndex}
                        checked={data[column].status}
                        column={column}
                        value={data[column].value}
                        setColumnStatus={(newStatus: boolean) => {
                            // data[column].status = newStatus;
                            setStatus(column, newStatus);
                        }}
                        setColumnValue={(newValue: string) => {
                            // data[column].value = newValue;
                            console.log(newValue);
                            setValue(column, newValue);
                        }}
                        />
                    );
                })
            }

        </div>
    );
}

export default QueryCard;