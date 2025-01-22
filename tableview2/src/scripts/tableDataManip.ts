function convertToRowFirst(tableData: Array<Array<string>>) {
    
    let newTableData: Array<Array<string>> = [];

    const rowCount: number = tableData[0].length;
    const colCount: number = tableData.length;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        let currentRow: Array<string> = [];
        for (let colIndex = 0; colIndex < colCount; colIndex++) currentRow.push("");
        newTableData.push(currentRow);
    }

    for (let colIndex = 0; colIndex < colCount; colIndex++) {
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            newTableData[rowIndex][colIndex] = tableData[colIndex][rowIndex];
        }
    }

    return newTableData;
}

function convertToColumnFirst(tableData: Array<Array<string>>) {
    
    let newTableData: Array<Array<string>> = [];

    const rowCount: number = tableData.length;
    const colCount: number = tableData[0].length;

    for (let colIndex = 0; colIndex < colCount; colIndex++) {
        let currentCol: Array<string> = [];
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) currentCol.push("");
        newTableData.push(currentCol);
    }

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let colIndex = 0; colIndex < colCount; colIndex++) {
            newTableData[colIndex][rowIndex] = tableData[rowIndex][colIndex];
        }
    }

    return newTableData;
}

function sortByColumn(tableData: Array<Array<string>>, sortByColumnIndex: number) {
    // Table is assumed to be column first

    // let sortByColumnIndex: number = 0;
    // tableData.forEach((column: Array<string>, columnIndex: number) => {
    //     if (column[0] === sortByColumn) {
    //         sortByColumnIndex = columnIndex;
    //         return;
    //     }
    // });

    console.log("Given Table Data: ", tableData);
    console.log("Sortby Column Index: ", sortByColumnIndex);

    let sortedSortByColumn: Array<string> = [tableData[sortByColumnIndex][0], ...tableData[sortByColumnIndex].slice(1, ).sort()];
    // console.log(sortedSortByColumn);

    let rowFirstTableData: Array<Array<string>> = convertToRowFirst(tableData);
    let newRowFirstTableData: Array<Array<string>> = [];

    rowFirstTableData.forEach((row: Array<string>) => {
        let sortedTableDataRowIndex: number = sortedSortByColumn.indexOf(row[sortByColumnIndex]);
        newRowFirstTableData[sortedTableDataRowIndex] = [...row];
    });

    // console.log("Row first: ", newRowFirstTableData);

    return convertToColumnFirst(newRowFirstTableData);


}



export {convertToColumnFirst, convertToRowFirst, sortByColumn}