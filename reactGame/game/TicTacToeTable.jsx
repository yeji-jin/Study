import React, { Component } from "react";
import Tr from "./TicTacToeTr"

const TicTacToeTable = ({tableData, dispatch})=>{
  console.log('TABLE','tableData',tableData)
  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          {Array(tableData.length).fill().map((tr,i) =>
            <Tr 
              key={i}
              rowIdx={i}
              dispatch={dispatch}
              rowData={tableData[i]}/>)
          }
        </tbody>
      </table>
    </>
  )
}
export default TicTacToeTable;