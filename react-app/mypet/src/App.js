import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './home/Main';
import Sub1 from "./home/Sub1";
import Sub2 from "./home/Sub2";
import Sub3 from "./home/Sub3";
import AttendanceCheck from "./category/AttendanceCheck";
import Mission from "./category/Mission";
import Locker from "./category/Locker";
import Notice from "./category/Notice";
import FooterNav from './footer/FooterNav';
import 'reset-css'; 
import './App.css';

function App() {

  const [introPlay, setIntroPlay] = useState(true);

  useEffect(()=>{
    const currentPath = window.location.pathname;
    if(currentPath !== '/'){
      setIntroPlay(false);
    }
    console.log('useEffect');
  },[])

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* intro */}
          <Route exact path="/" element={ 
            <>
              <div className="app-intro">
              <h1 className="title">
                키워봐요<br/>
                동물의숲
              </h1>
              <Link to="/main" className="btn-start" onClick={()=> setIntroPlay(false)}>START</Link>
            </div>
            {/* bg-image */}
            <div className="intro-bg__image">
              <img src="../image/img_blue_circle.png" alt="" />
              <img src="../image/img_blue_full_heart.png" alt=""/>
              <img src="../image/img_gradient_star.png" alt=""/>
              <img src="../image/img_pink_circle.png" alt=""/>
              <img src="../image/img_pink_full_heart.png" alt=""/>
            </div>
            </>
          }>
          </Route>
          
          {/* main */}
          <Route path="/main" element={<Main />}></Route>
          <Route path="/sub1" element={<Sub1 />}></Route>
          <Route path="/sub2" element={<Sub2 />}></Route>
          <Route path="/sub3" element={<Sub3 />}></Route>
          <Route path="/attendance" element={<AttendanceCheck />}></Route>
          <Route path="/mission" element={<Mission />}></Route>
          <Route path="/locker" element={<Locker />}></Route>
          <Route path="/notice" element={<Notice />}></Route>

          {/* not found */}
          <Route path="*" element={
            <>
              <p>not found</p>
            </>
          }>
          </Route>

        </Routes>
        
        {/* footer */}
        {
          !introPlay && <FooterNav />
        }
        
      </div>
    </Router>
  );
}

export default App;
