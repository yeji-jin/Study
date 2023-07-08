import React, { Component } from "react";
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

class LottoGame extends Component {
  
  state={
    winNumbers:getNumbers(), //당첨숫자
    winBalls:[],
    bonus:null, //보너스공
    redo: false,
  }

  timeouts = [];
  runTimeouts = ()=>{
    console.log('runTimeouts');
    const {winNumbers} = this.state;
    //당첨공
    for(let i=0; i < winNumbers.length - 1; i++){
      this.timeouts[i] = setTimeout(()=>{
        this.setState((prevState)=> {
          return{
            winBalls : [...prevState.winBalls, winNumbers[i]],
          }
        })
      }, (i + 1) * 1000);
    }

    //보너스공
    this.timeouts[6] = setTimeout(()=>{
      this.setState({
        bonus: winNumbers[6],
        redo : true
      })
    },7000);
  }

  componentDidMount(){ 
    console.log('componentDidMount');
    this.runTimeouts();
  }

  componentDidUpdate( prevProps , prevState){
    console.log('componentDidUpdate');
    //setState될때마다 실행 , 조건 중요
    if(this.state.winBalls.length === 0) { //reset 경우
      this.runTimeouts();
    }
  }

  componentWillUnmount(){
    this.timeouts.forEach((v)=>{
      clearTimeout(v);
    })
  }

  onClickRedo = ()=>{//reset
    console.log('onClickRedo');
    this.setState({ 
      winNumbers:getNumbers(), 
      winBalls:[],
      bonus:null, 
      redo: false,
    });
    this.timeouts = [];
  }

  render(){
    const {winBalls, bonus, redo} = this.state;
    
    return (
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
        { redo &&  <button onClick={this.onClickRedo}>한번 더!</button> }
      </>
    )
  }
}

export default LottoGame;