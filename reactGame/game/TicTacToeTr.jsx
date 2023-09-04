import React, { useEffect, useRef } from "react";
import Td from "./TicTacToeTd"

const TicTacToeTr = ({rowData, rowIdx , dispatch})=>{
  console.log('####is trtr','rowData',rowData.length);

  const ref = useRef([]);
  useEffect(()=>{
    console.log('!!!! renderig 유발 요인 찾기',rowData === ref.current[0], rowIdx === ref.current[0] , dispatch === ref.current[0]);
  },[rowData, rowIdx , dispatch]); //renderig 유발 요인 찾기

  return (
    <>
      <tr>
        {Array(rowData.length).fill().map((td,i) => 
          (<Td
            dispatch={dispatch}
            rowIdx={rowIdx}
            cellIdx={i}
            cellData={rowData[i]}
            key={i}
          />))
        }
      </tr>
    </>
  )
}

export default TicTacToeTr;