import React, { useState, useRef , useEffect } from "react";
import useInterval from "./useInterval";

const rspCoords = {
    rock: '0',
    scissor: '-142px',
    paper: '-284px',
};
const scores = {
    scissor: 1,
    rock: 0,
    paper: -1,
};
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
      return v[1] === imgCoord;
    })[0];
};

const RSP = ()=>{
  let [result, setResult] = useState('');
  let [imgCoord, setImgCoord] = useState(rspCoords.rock);
  let [score, setScore] = useState(0);
  // let interval = useRef();

  // useEffect(()=>{ //componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
  //   interval.current = setInterval(changeHand, 10000);
  //   console.log('실행');
  //   return ()=>{ //componentWillUnmount 역할
  //     clearInterval(interval.current);
  //     console.log('종료');
  //   }
  // }, [imgCoord]); //imgCoord가 바뀔때마다 실행됨 / []면, 한번실행

  const [isRunning, setIsRunning] = useState(false);

  const changeHand = () => {

    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }   

  }

  useInterval(changeHand, isRunning ? 100 : null);
  console.log(isRunning)

  const onClickBtn = (choice) => (e) => {
    e.preventDefault();
    // clearInterval(interval.current);

    if(isRunning){ //멈췄을때 클릭 막기
      setIsRunning(false);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult('비겼습니다');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다!');
        setScore((preveScore)=> preveScore + 1);
      } else {
        setResult('졌습니다!');
        setScore((preveScore)=> preveScore -1);
      }
      setTimeout(() => {  
        // interval.current = setInterval(changeHand, 100);
        setIsRunning(true);
      }, 2000);
    }
  
  }

  return (
    <>
      <div id="computer" style={{ width: '140px', height:'200px', background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
          <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
          <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
          <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
}

export default RSP;