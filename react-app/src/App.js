import React,{ useEffect, useState }  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoBoard from './todo/TodoBoard';
import ToggleTheme from './todo/ToggleTheme';
import './App.css';

function App() {

  return (
    <div className="App">

      {/* ToggleTheme */}
      <ToggleTheme/>

      {/* TodoBoard */}
      <TodoBoard/>
      
    </div>
  );
}

export default App;
