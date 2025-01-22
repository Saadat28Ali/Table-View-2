// ----------------------------------------------

// IMPORTS

// REACT
import { useState, useEffect, useContext } from "react";

// CONTEXTS
import LoadingStatusContext from "../../contexts/loadingStatus/LoadingStatusContext";

// INTERFACES
import { loadingStatusContextInter } from "../../contexts/loadingStatus/LoadingStatusContext";

// SCRIPTS
// import { sortByColumn } from "../../scripts/tableDataManip";
import { convertToRowFirst, convertToColumnFirst } from "../../scripts/tableDataManip";

// COMPONENTS
import QueryCard from "../QueryCard/QueryCard";
import HollowButton from "../HollowButton/HollowButton";
// import Dropdown from "../Dropdown/Dropdown";
// import Column from "../Column/Column";
import Dropdown from "../Dropdown/Dropdown";

// ----------------------------------------------

enum selectAllEnum {
    "none", 
    "some", 
    "all", 
}

interface queryInter {
    [keys: string]: {
        status: boolean, 
        value: string, 
    }
}

function applyFilter(
    currentQuery: queryInter, 
    tableData: Array<Array<string>>, 
    setLoadingStatus: Function, 
    setLoadingMessage: Function, 

) {

    // console.log("Current query: ", currentQuery);

    setLoadingStatus(true);
    setLoadingMessage("Filtering data...");

    let newFilteredTableData: Array<Array<string>> = [];
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
            newFilteredTableData.push(newColumn);
        
        }
    })

    setLoadingStatus(false);
    setLoadingMessage("Idle");
    return newFilteredTableData;
}

function applySort(
    currentQuery: queryInter, 
    tableData: Array<Array<string>>, 
    setLoadingStatus: Function, 
    setLoadingMessage: Function, 
    selectedSort: string, 
) {

    setLoadingStatus(true);
    setLoadingMessage("Sorting data...");

    let sortByColumn: string = "";
    Object.keys(currentQuery).forEach((column: string) => {
        if (currentQuery[column].status && column === selectedSort) {
            sortByColumn = column;
            return;
        }
    });

    if (sortByColumn === "") {
        // console.log("No sort");
        setLoadingStatus(false);
        setLoadingMessage("Idle");
        return tableData;
    };

    let sortedSortByColumn: Array<string> = [];
    
    let headerRow: Array<string> = [];
    tableData.forEach((column: Array<string>) => {
        headerRow.push(column[0]);
    });

    let sortByColumnIndex: number = 0;

    tableData.forEach((column: Array<string>, columnIndex: number) => {
        if (column[0] === selectedSort) {
            sortByColumnIndex = columnIndex;


            column.forEach((cell: string) => {
                if (cell !== selectedSort) {
                    sortedSortByColumn.push(cell);
                }
            })

            sortedSortByColumn = sortedSortByColumn.sort();
            return;
        }
    });

    // sortedSortByColumn = sortedSortByColumn.slice(1, );
    // console.log(sortedSortByColumn);

    let rowFirstTableData: Array<Array<string>> = convertToRowFirst(tableData);

    let sortedRowFirstTableData: Array<Array<string>> = [headerRow];

    sortedSortByColumn.forEach((column: string) => {
        // console.log(column);

        rowFirstTableData.forEach((row: Array<string>) => {

            if (row[sortByColumnIndex] === column) {
                sortedRowFirstTableData.push(row);
            }
        })
    });

    // console.log(sortedRowFirstTableData);
    // console.log(rowFirstTableData);

    setLoadingStatus(false);
    setLoadingMessage("Idle");

    return convertToColumnFirst(sortedRowFirstTableData);
}

function LeftPane(
    {
        tableData, 
        setQueriedTableData, 
    }:
    {
        tableData: Array<Array<string>>, 
        queriedTableData: Array<Array<string>>, 
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
                value: "*", 
            }
        });

        // console.log(defaultQuery);

        return defaultQuery;
    }
    const [currentQuery, setCurrentQuery] = useState<queryInter>(getDefaultQuery());

    const [selectedSort, setSelectedSort] = useState<string>(tableData[0][0]);

    // useEffect(() => {

    //     console.log(currentQuery);

    //     const sortedTableData: Array<Array<string>> = applySort(
    //         currentQuery, 
    //         queriedTableData, 
    //         loadingStatus.setLoading, 
    //         loadingStatus.setMessage,
    //         selectedSort,          
    //     );
    //     setQueriedTableData(sortedTableData);

    // }, [selectedSort, currentQuery]);

    useEffect(() => {
        let queriedTableData: Array<Array<string>> = applyFilter(
            currentQuery, 
            tableData, 
            loadingStatus.setLoading, 
            loadingStatus.setMessage
        )
        
        queriedTableData = applySort(
            currentQuery, 
            queriedTableData, 
            loadingStatus.setLoading, 
            loadingStatus.setMessage, 
            selectedSort
        );

        setQueriedTableData(queriedTableData);
    
    }, [selectedSort, currentQuery]);


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
    }, []);

    const [sortArray, setSortArray] = useState<Array<string>>([]);

    useEffect(() => {
        let columns: Array<string> = [];
        tableData.forEach((column: Array<string>) => {
            columns.push(column[0]);
        });
        setSortArray(columns);
    }, [tableData])


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

                <Dropdown 
                items={sortArray} 
                selectedItem={selectedSort} 
                setSelectedItem={setSelectedSort} 
                />
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
                }} 
                />
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