import React,{ useEffect, useState }  from 'react';
import TodoBoard from './todo/TodoBoard';
import ToggleTheme from './todo/ToggleTheme';
import CommonModal from './todo/CommonModal';
import { CommonContext } from './todo/context/CommonContext';
import ConfettiGenerator from "confetti-js";
import './App.css';

function App() {

  const [modalState, setModalState] = useState({
    showModal: false,
    modalCont: '',
    type:'alert', 
    callback:null
  });
  const [isDone, setIsDone] = useState(false);

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

  useEffect(() => {
    const confettiSettings = { 
      target: 'my-canvas',
      max: 90, // 최대 갯수
      size: 1.1 , // 크기 범위
      animate: true, // 애니메이션 여부
      props: ['square', 'circle','triangle', 'line'], // 모양과 색상 등의 속성
      clock:90,//속도
      rotate:true,
      duration: 2500,
   };
    const confetti = new ConfettiGenerator(confettiSettings);
    if(isDone){   
      confetti.render();
      setTimeout(()=>{
        setIsDone(false);
        confetti.clear();
      },confettiSettings.duration);
    }
    return () => confetti.clear();
  }, [isDone]) 

  return (
    <div className="App">

      <CommonContext.Provider value={{ ...modalState, setModalState, setIsDone }}>

        {/* ToggleTheme */}
        <ToggleTheme/>

        {/* TodoBoard */}
        <TodoBoard/>
        
        {/* CommonModal */}
        <CommonModal showModal={modalState.showModal} modalCont={modalState.modalCont}/>

        {/* canvas */}
        <canvas id="my-canvas" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}></canvas>

      </CommonContext.Provider>

    </div>
  );
}

export default App;
