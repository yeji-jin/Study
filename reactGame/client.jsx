//require.ver
// const React = require('react');
// const ReactDom = require('react-dom');

//반응속도 체크 
// const ResponseCheck = require('./game/ResponseCheck');
// ReactDom.render(<ResponseCheck/>, document.querySelector('#root'));

//가위바위보 (import.ver)
// import React from "react";
// import ReactDom from "react-dom";
// import ReactDom from "react-dom/client"; //18.ver

// import RSP from "./game/RSP"; --class
// import RSP from "./game/RSP_hooks"; //--hooks
// 
// ReactDom.render(<RSP/>, document.querySelector('#root'));
// ReactDom.createRoot(document.querySelector('#root')).render(<RSP/>) //18.ver

// lottoGame
import React from "react";
import ReactDom from "react-dom/client"; //18.ver

// import LottoGame from "./game/LottoGame_class"; 
// import LottoGame from "./game/LottoGame_hooks"; 
// ReactDom.createRoot(document.querySelector('#root')).render(<LottoGame/>) 

//틱택토
import TicTacToe from "./game/TicTacToe"; 
ReactDom.createRoot(document.querySelector('#root')).render(<TicTacToe/>) 