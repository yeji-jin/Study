import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import AttendanceCheck from "../category/AttendanceCheck";
import Mission from "../category/Mission";
import Locker from "../category/Locker";
import Notice from "../category/Notice";
import Lottie from 'react-lottie-player';
import lottieJson from '../lottie/cat.json';

function Main() {
  
  const [isPlaying, setPlayState] = useState(true);
  const [actionEat , setActionEat] = useState(false);
  const [actionPlay , setActionPlay] = useState(false);

  const menuList = [
    {
      icon:'../../image/img_pink_full_heart.png',
      description:'출석체크',
      category:'attendance'
    },
    {
      icon:'../../image/img_pink_full_heart.png',
      description:'매일미션',
      category:'mission'
    },
    {
      icon:'../../image/img_pink_full_heart.png',
      description:'보관함',
      category:'locker'
    },
    {
      icon:'../../image/img_pink_full_heart.png',
      description:'안내사항',
      category:'notice'
    },
  ]

  const actionAnimation = (action) => {
    console.log('action',action);
    if(action === 'meal') {
      setActionEat(true);
      setTimeout(()=>{
        setActionEat(false);
      },3000);
    }else if(action === 'play'){
      setActionPlay(true);
      setTimeout(()=>{
        setActionPlay(false);
      },3000);
    }

  }

  return (
    <>
      <div className="lottie-container">
        {/* nav */}
        <ul className="pet-menu-list">
          {
            menuList.map((item, i) =>{
              return (
                <li key={item.category}>
                  <Link to={`/main/${item.category}`}>
                    <img src={item.icon} alt=""/>
                    <span>{item.description}</span>
                  </Link>
                </li>
              )
            })
          }
        </ul>

        {/* lottie */}
          <Lottie
            className={`lottie ${actionEat ? 'active' : ''}`}
            loop
            animationData={lottieJson}
            play={isPlaying}/>


          <div className={`heart-moving ${actionPlay ? 'active' : ''}`}> 
            <img src="../../image/heart_5.png" alt=""/>
            <img src="../../image/heart_4.png" alt=""/>
            <img src="../../image/heart_3.png" alt=""/>
            <img src="../../image/heart_2.png" alt=""/>
            <img src="../../image/heart_1.png" alt=""/>
          </div>

          <div className="pet-info">
            <div className="pet-name">
              <p>이름이름</p>
              <button type="button">
                <span>이름 수정하기</span>
              </button>
            </div>
            <div>
              에너지 200 &middot; 경험치 3배
            </div>
          </div>

          <div className="action-btns">
            <button type="button" onClick={()=> actionAnimation('meal')}>밥먹기</button>
            <button type="button" onClick={()=> actionAnimation('play')}>놀아주기</button>
            {/* <button type="button" onClick={() => setPlayState(true)}>시작</button>
            <button type="button" onClick={() => setPlayState(false)}>멈춰</button> */}
          </div>
      </div>
      
      <Routes>
        <Route path="/attendance" element={<AttendanceCheck />}></Route>
        <Route path="/mission" element={<Mission />}></Route>
        <Route path="/locker" element={<Locker />}></Route>
        <Route path="/notice" element={<Notice />}></Route>
      </Routes>
    </>
  );
}

export default Main;
