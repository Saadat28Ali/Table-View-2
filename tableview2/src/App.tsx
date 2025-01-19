// ----------------------------------------------

// IMPORTS

// REACT
import { useState } from "react";

// COMPONENTS
import StatusBar from "./components/StatusBar/StatusBar";

import Table from "./components/Table/Table";

import LeftPane from "./components/LeftPane/LeftPane";

// ----------------------------------------------

function getDummyData() {
  // Generate dummy data
  const numColumns = 30; // Number of columns
  const numRows = 50;    // Number of rows

  // Function to generate a random string
  const getRandomString = (length = 5) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  };

  // Create the table data
  const tableData = Array.from({ length: numRows }, (_, rowIndex) => 
    Array.from({ length: numColumns }, (_, colIndex) => `Row${rowIndex + 1}-Col${colIndex + 1}: ${getRandomString()}`)
  );

  // Log the data for verification
  return tableData;
}

function App() {

  // const [tableData, setTableData] = useState<Array<Array<string>>>([
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return item.toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 10).toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 20).toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 30).toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 40).toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 50).toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 60).toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 70).toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 80).toString()}), 
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {return (item + 90).toString()}), 
  // ]);
  const [tableData, _] = useState<Array<Array<string>>>(getDummyData());
  const [queriedTableData, setQueriedTableData] = useState<Array<any>>(tableData);

  // console.log("Queried table data: ", queriedTableData);

  return(
    <div
    className="App"
    style={{
      position: "relative", 
      minWidth: "100vw",
      width: "100vw", 
      height: "100vh", 
      minHeight: "100vh", 

      backgroundColor: "rgb(47, 47, 47)", 
      justifyContent: "end", 
      alignItems: "start", 

      color: "white", 

    }}
    >

      <div 
      className="ContentRow"
      style={{
        width: "100%", 
        height: "100%", 
        flexDirection: "row", 
        justifyContent: "start", 
        alignItems: "start", 
      }}
      >
        <div 
        className="LeftPane"
        style={{
          width: "30%", 
          minWidth: "30%",
          height: "100%", 
          minHeight: "100%", 

          backgroundColor: "skyblue", 
          justifyContent: "start", 
          alignItems: "start", 
        }}
        >

          <LeftPane 
          tableData={tableData} 
          setQueriedTableData={setQueriedTableData}
          />

        </div>

        <div
        className="MainContent"
        style={{
          // width: "100%", 
          // minWidth: "100%", 
          height: "100%", 
          minHeight: "100%", 

          flexGrow: "2", 
        }}
        >
          <Table data={queriedTableData} />
        </div>
      
      </div>

      <StatusBar />
    </div>
  );
}

export default App;