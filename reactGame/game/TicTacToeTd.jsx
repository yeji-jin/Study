import React, { useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

const TicTacToeTd = ({rowIdx ,cellIdx, cellData, dispatch})=>{

  const onClickTd = useCallback(()=>{
    console.log('@@@@@ is td comp','rowIdx',rowIdx,'cellIdx',cellIdx, 'cellData',cellData);
    if(cellData){
      return
    }
    dispatch({ type:CLICK_CELL, row: rowIdx, cell: cellIdx});
  },[cellData]);

  return (
    <>
      <td onClick={onClickTd}>{cellData}</td>
    </>
  )
}
export default TicTacToeTd;