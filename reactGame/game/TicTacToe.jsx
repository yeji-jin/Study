import React, { useState, useEffect, useReducer, useCallback } from "react";
import Table from "./TicTacToeTable"

const initialState = {
  winner:'',
  turn:'O',
  tableData:[
    ['','',''],
    ['','',''],
    ['','',''],
  ],
  recentCell:[-1,-1]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action)=>{
  switch(action.type){
    case SET_WINNER : {
      return{
        ...state,
        winner:action.winner,
      }
    }
    case CLICK_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return{
        ...state,
        tableData,
        recentCell : [action.row, action.cell]
      }
    }
    case CHANGE_TURN : {
      return{
        ...state,
        turn : state.turn === 'O' ? 'X' : 'O',
      }
    }

    case RESET_GAME : {
      return{
        ...state,
        turn:'O',
        tableData:[
          ['','',''],
          ['','',''],
          ['','',''],
        ],
        recentCell:[-1,-1]
      }
    }

    default : return state;
  }
}

const TicTacToe = ()=>{

  const [state, dispatch] = useReducer(reducer,initialState);
  const {tableData, turn, winner, recentCell} = state;
  const onClickTable = useCallback(()=>{
    dispatch({ type:SET_WINNER, winner:'O'});
  },[]);

  useEffect(()=>{
    const [row, cell] = recentCell;
    if(row < 0) return;
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {//클릭 가로검사
      win = true;
    }else{
      console.log('검사')
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {// 클릭 세로검사
      win = true;
    }else{
      console.log('검사')
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {//대각선 검사
      win = true;
    }else{
      console.log('검사')
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {//대각선 검사
      win = true;
    }else{
      console.log('검사')
    }

    if(win){ //승리
      dispatch({ type:SET_WINNER, winner: turn });
      dispatch({ type:RESET_GAME });
    }else{ 
      //무승부 검사
      let all = true; //칸이 모두 차있음(무승부)
      tableData.forEach(row =>{
        row.forEach(cell=>{
          if(!cell){ //칸이 하나라도 차있지 않음
            all = false;
          }
        })
      })

      if(all){ //무승부 
        dispatch({ type:RESET_GAME });
      }else{//승리하지 않았을 시 턴 체인지
        dispatch({ type: CHANGE_TURN }); 
      }

    }

  },[recentCell]);

  return (
    <>
      <Table 
        tableData={tableData}
        dispatch={dispatch}/>
      { winner && <p>{winner}의 승리입니다.</p>}
    </>
  )
}
export default TicTacToe;