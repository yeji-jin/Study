import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoBoard from './todo/TodoBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <TodoBoard/>
    </div>
  );
}

export default App;
