const React = require('react');
const ReactDom = require('react-dom');

//반응속도 체크 
const ResponseCheck = require('./ResponseCheck');
ReactDom.render(<ResponseCheck/>, document.querySelector('#root'));