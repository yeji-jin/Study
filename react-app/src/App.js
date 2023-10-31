import React,{ useEffect, useState }  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoBoard from './todo/TodoBoard';
import ToggleTheme from './todo/ToggleTheme';
import CommonModal from './todo/CommonModal';
import { CommonContext } from './todo/context/CommonContext';
import './App.css';

function App() {

  const [modalState, setModalState] = useState({
    showModal: false,
    modalCont: '',
    type:'alert', 
    callback:null
  });

  useEffect(() => {
    if (modalState.showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style = '';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalState.showModal]);


  return (
    <div className="App">

      <CommonContext.Provider value={{ ...modalState, setModalState }}>

        {/* ToggleTheme */}
        <ToggleTheme/>

        {/* TodoBoard */}
        <TodoBoard/>
        
        {/* CommonModal */}
        <CommonModal showModal={modalState.showModal} modalCont={modalState.modalCont}/>

      </CommonContext.Provider>

    </div>
  );
}

export default App;
