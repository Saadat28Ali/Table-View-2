// ----------------------------------------------

// IMPORTS

// REACT
import { useState } from "react";

// COMPONENTS
import StatusBar from "./components/StatusBar/StatusBar";

import Table from "./components/Table/Table";

import LeftPane from "./components/LeftPane/LeftPane";

// ----------------------------------------------

// function getDummyData() {
//   // Generate dummy data
//   const numColumns = 30; // Number of columns
//   const numRows = 50;    // Number of rows

//   // Function to generate a random string
//   const getRandomString = (length = 5) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
//   };

//   // Create the table data
//   const tableData = Array.from({ length: numRows }, (_, rowIndex) => 
//     Array.from({ length: numColumns }, (_, colIndex) => `Row${rowIndex + 1}-Col${colIndex + 1}: ${getRandomString()}`)
//   );

//   // Log the data for verification
//   return tableData;
// }

function getDummyData() {
  return [
    ["Name", "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack"], // Column 1
    ["Age", "25", "30", "28", "35", "22", "40", "29", "33", "26", "31"],                         // Column 2
    ["Profession", "Engineer", "Designer", "Developer", "Manager", "Intern", "Director", "Consultant", "Analyst", "HR", "Accountant"], // Column 3
    ["Location", "New York", "Los Angeles", "Chicago", "San Francisco", "Seattle", "Austin", "Denver", "Boston", "Miami", "Dallas"],  // Column 4
    ["IsActive", "true", "false", "true", "false", "true", "true", "false", "true", "false", "true"], // Column 5
    ["BloodType", "A+", "B", "O-", "AB+", "A", "B-", "O+", "A-", "AB-", "O+"],                      // Column 6
    ["Salary", "50000", "60000", "70000", "90000", "30000", "150000", "80000", "65000", "55000", "72000"], // Column 7
    ["JoinDate", "2023-01-15", "2022-07-10", "2021-11-05", "2020-03-12", "2023-06-01", "2019-12-25", "2021-04-18", "2022-09-09", "2023-02-20", "2021-07-13"], // Column 8
    ["Position", "Team Lead", "Senior Designer", "Software Engineer", "Project Manager", "Intern", "Director", "Consultant", "Business Analyst", "HR Specialist", "Financial Analyst"], // Column 9
    ["FavoriteColor", "Blue", "Green", "Red", "Yellow", "Pink", "Black", "Orange", "Purple", "Teal", "Brown"] // Column 10
  ];
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
          queriedTableData={queriedTableData}
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