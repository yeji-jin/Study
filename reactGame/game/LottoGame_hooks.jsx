import React, { useRef, useState, useEffect , useMemo , useCallback } from "react";
import LottoBall from "./LottoBall";

function getNumbers(){
  console.log('getNumbers');
  const candidate = Array(45).fill().map((v , i)=> i + 1);
  const shuffle = [];

  while(candidate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
  }

  const bonusNum = shuffle[shuffle.length -1];
  const winNum = shuffle.splice(0,6).sort((p,c)=> p - c); 
  return [...winNum,bonusNum];

}

const LottoGame = ()=>{
  //useMemo useEffect useCallback 두번째 인자가 있음. 두번째 인자가 바뀌지 않는다면 실행되지 않음(값을 유지하다가 인자가 바뀌면 바뀜).
  //useMemo > 복잡한 함수값을 기억
  //useRef > 일반값을 기억

  //useMemo > 값을 기억 , useCallback > 함수를 기억 (@두번째 인자가 바뀌기 전까지)
  const lottoNumbers = useMemo(()=> getNumbers(),[]);
  const [winBalls,setWinBalls] = useState([]);
  const [winNumbers,setWinNumbers] = useState(lottoNumbers);
  const [bonus,setBonus] = useState(null);
  const [redo,setRedo] = useState(false);
  const timeouts = useRef([]);

  const onClickRedo = useCallback(()=>{
    //함수컴포넌트가 재실행되어도, 함수를 기억해둬서 onClickRedo가 새로 생성되지 않음.
    //자식컴포넌트에 props로 함수를 넘길때 useCallback 필수 (안하면 매범 새로 생성되는 함수 전달이 되어 렌더링이 됨.)

    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getNumbers());
    setWinBalls([]);
    setBonus(null)
    setRedo(false);
    timeouts.current = []; //timeouts.current 바뀌는 시점
  },[winNumbers])
  

  useEffect(()=>{ //n개 가능 > state별로 구분 가능(mount , update ... 구분가능)
    console.log('useEffect');
    //당첨공
    for(let i=0; i < winNumbers.length - 1; i++){
      timeouts.current[i] = setTimeout(()=>{ //timeouts.current 요소로 넣어준것
        setWinBalls((prevBalls)=>[...prevBalls,winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    //보너스공
    timeouts.current[6] = setTimeout(()=>{
      setBonus(winNumbers[6]),
      setRedo(true);
    },7000);

    return ()=>{ //componentWillUnMount
      console.log('componentDidMount');
      // this.runTimeouts()
      timeouts.current.forEach((v)=>{
        clearTimeout(v);
      });
    }

  },[timeouts.current]);
  //useEffect > []이라면, componentDidMount와 같음.
  //[]안에 요소가 있다면, componentDidMount와 componentDidUpdate 둘 다 수행.
  //[]안의 요소가 바뀌는 시점마다 useEffect실행


  // componentDidUpdate 만 하고싶을때 , componentDidMount X
  //useEffect가 componentDidMount에서 실행되는것은 어쩔수 없으니 처음 실행될때 아무것도 하지 않으면 됨.
  const mounted = useRef(false);
  useEffect(() => {
      if (!mounted.current) {
          mounted.current = true;
          console.log('실행은 되지만 아무것도 하지 않음.')
      } else {
          // componentDidUpdate (Mount 말고) 때에만 실행할 함수
          console.log('updated')
      }
  },[mounted.current]);//[바뀌는값]

  return(
    <>
        <div>당첨숫자</div>
        <div id="result_screen">
          {
            winBalls.map((v)=> (
              <LottoBall
                key={v}
                number={v}
              />
            ))
          }
        </div>

        <div>보너스</div>
        { bonus && <LottoBall number={bonus}/> }
        <br/><br/>
        { redo &&  <button onClick={onClickRedo}>한번 더!</button> }
      </>
  )

}

export default LottoGame;