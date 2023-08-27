import React, { useState, useReducer, useCallback } from "react";
import Table from "./TicTacToeTable"

const initialState = {
  winner:'',
  turn:'O',
  tableDate:[['','',''],['','',''],['','','']],
}
const reducer = (state, action)=>{

}

const TicTacToe = ()=>{

  const [state, dispatch] = useReducer(reducer,initialState);
  const onClickTable = useCallback(()=>{

  },[]);

  return (
    <>
      <Table onClick={onClickTable}/>
      { state.winner && <p>{state.winner}의 승리입니다.</p>}
    </>
  )
}
export default TicTacToe;