// ----------------------------------------------

// IMPORTS

// REACT
import { useState, useEffect, useContext } from "react";

// CONTEXTS
import LoadingStatusContext from "../../contexts/loadingStatus/LoadingStatusContext";

// INTERFACES
import { loadingStatusContextInter } from "../../contexts/loadingStatus/LoadingStatusContext";

// COMPONENTS
import QueryCard from "../QueryCard/QueryCard";
import HollowButton from "../HollowButton/HollowButton";

// ----------------------------------------------

enum selectAllEnum {
    "none", 
    "some", 
    "all", 
}

interface queryInter {
    [keys: string]: {
        status: boolean, 
        value: string
    }
}

function applyQuery(
    currentQuery: queryInter, 
    tableData: Array<Array<string>>, 
    setQueriedTableData: Function, 
    setLoadingStatus: Function, 
    setLoadingMessage: Function, 
) {

    // console.log("Current query: ", currentQuery);

    setLoadingStatus(true);
    setLoadingMessage("Applying query...");

    let newQueriedTableData: Array<Array<string>> = [];
    let removedRowIndices: Array<number> = [];

    tableData.forEach((column: Array<string>) => {

            column.forEach((cell: string, rowIndex: number) => {
                if (rowIndex === 0) {
                    // header row, to be displayed in all
                    // cases
                }
                else if (((currentQuery[column[0]]).value === "*") || (currentQuery[column[0]].value === cell)) {
                    // current cell has value that matches the 
                    // required value in the query

                } else {

                    // current cell does not match the set of
                    // required values
                    removedRowIndices.push(rowIndex);
                }
            });
    });

    tableData.forEach((column: Array<string> ) => {

        if ((currentQuery[column[0]]).status) {
            // current column is turned on in the query

            let newColumn: Array<string> = [];
            column.forEach((cell: string, rowIndex: number) => {
                if (removedRowIndices.includes(rowIndex)) {
                    // the current row is to be skipped
                } else {
                    newColumn.push(cell);
                }
            });
            newQueriedTableData.push(newColumn);
        
        }
    })

    // console.log("new queried table data: ", newQueriedTableData);

    setQueriedTableData(newQueriedTableData);

    setLoadingStatus(false);
    setLoadingMessage("Idle");
}

function LeftPane(
    {
        tableData, 
        setQueriedTableData, 
    }:
    {
        tableData: Array<Array<string>>, 
        setQueriedTableData: Function, 
    }
) {

    const [selectAll, setSelectAll] = useState<selectAllEnum>(selectAllEnum.all);

    const loadingStatus: loadingStatusContextInter = useContext(LoadingStatusContext);

    const getDefaultQuery = () => {
        let defaultQuery: queryInter = {};
        tableData.forEach((column: Array<string>) => {
            defaultQuery[column[0]] = {
                status: true, 
                value: "*"
            }
        });
        return defaultQuery;
    }
    const [currentQuery, setCurrentQuery] = useState<queryInter>(getDefaultQuery());

    useEffect(() => {
        applyQuery(
            currentQuery, 
            tableData, 
            setQueriedTableData, 
            loadingStatus.setLoading, 
            loadingStatus.setMessage
        )}, [currentQuery]);

    useEffect(() => {
        let allTrue: boolean = true;
        let allFalse: boolean = true;
        Object.keys(currentQuery).forEach((column: string) => {
            if ((currentQuery[column]).status === false) {
                allTrue = false;
            } else {
                allFalse = false;
            }
        });
        if (allTrue) setSelectAll(selectAllEnum.all);
        else if (allFalse) setSelectAll(selectAllEnum.none);
        else setSelectAll(selectAllEnum.some);
    });

    return(
        <div
        className="LeftPane"
        style={{
            // height: "100vh", 
            // minHeight: "100vh", 
            // height: "100%", 
            // minHeight: "100%", 
            maxHeight: "100vh", 
            width: "100%", 
            minWidth: "100%", 
            boxSizing: "border-box", 
            boxShadow: "0px 0px 20px 2px rgba(0,0,0,0.25)",
            flexGrow: "2", 

            background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgb(219, 219, 219) 100%)",
            color: "rgb(47,47,47)",
            justifyContent: "start", 

        }}
        >
            <div
            className="TopCard"
            style={{                
                width: "100%", 
                minWidth: "100%", 
                boxShadow: "0px 0px 20px 2px rgba(0,0,0,0.25)",
                boxSizing: "border-box", 
                padding: "2.5em", 
                paddingTop: "2em",

                backgroundColor: "white", 
                alignItems: "start", 

            }}
            >
                <h2
                style={{
                    marginTop: "1em", 
                    marginBottom: "1em", 
                    
                    fontSize: "2em", 

                }}
                >
                    Data Query
                </h2>

                <HollowButton text={
                    (selectAll === selectAllEnum.all) ? "Select None" : "Select All"
                } callback={
                    () => {
                        if (selectAll === selectAllEnum.all) {
                            setCurrentQuery((oldCurrentQuery: queryInter) => {
                                let newCurrentQuery: queryInter = {...oldCurrentQuery};
                                Object.keys(newCurrentQuery).forEach((column: string) => {
                                    newCurrentQuery[column].status = false;
                                });
                                return newCurrentQuery;
                            });
                        } else {
                            setCurrentQuery((oldCurrentQuery: queryInter) => {
                                let newCurrentQuery: queryInter = {...oldCurrentQuery};
                                Object.keys(newCurrentQuery).forEach((column: string) => {
                                    newCurrentQuery[column].status = true;
                                });
                                return newCurrentQuery;
                            });
                        }
                    }
                } />
            </div>
            
            <div className="Mid" style={{
                width: "100%", 
                minWidth: "100%", 
                padding: "0.5em", 
                boxSizing: "border-box", 
                flexGrow: "2", 
                
                justifyContent: "start", 

                overflowY: "scroll", 
            }}>
                <QueryCard 
                data={currentQuery} 
                setStatus={
                    (column: string, newStatus: boolean) => {
                        setCurrentQuery((currentQuery: queryInter) => {
                            let newCurrentQuery: queryInter = {...currentQuery};
                            newCurrentQuery[column].status = newStatus;
                            return newCurrentQuery;
                        });
                    }}
                setValue={(column: string, newValue: string) => {
                    setCurrentQuery((currentQuery: queryInter) => {
                        // console.log("new current query value: ", newValue);
                        let newCurrentQuery: queryInter = {...currentQuery};
                        newCurrentQuery[column].value = newValue;
                        return newCurrentQuery;
                    })
                }} />
            </div>

            <div
            className="BottomCard"
            style={{
                width: "100%", 
                minWidth: "100%", 
                height: "20%", 
                minHeight: "20%", 
                boxSizing: "border-box", 
                padding: "2.5em", 
                
                backgroundColor: "white", 
            }}
            >
                {/* <AddQueryButton callback={() => {}} /> */}
                <HollowButton text={"Reset Query"} callback={() => {
                    setCurrentQuery(getDefaultQuery());
                }} />
            </div>
        </div>
    );
}

export default LeftPane;
export type { queryInter };