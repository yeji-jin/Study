import React, { Component } from "react";

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

class RSP extends Component {
    state = {
      result: '',
      imgCoord: rspCoords.rock,
      score: 0,
      gameStart:false,
      gameCount:0,
      gameRound:3,
    };
  
    interval;
  
    componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
    //   this.interval = setInterval(this.changeHand, 100);
      console.log('componentDidMount');
    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
      clearInterval(this.interval);
      console.log('componentWillUnmount');
    }
  
    changeHand = () => {
      const {imgCoord} = this.state;
      if (imgCoord === rspCoords.rock) {
        this.setState({
          imgCoord: rspCoords.scissor,
        });
      } else if (imgCoord === rspCoords.scissor) {
        this.setState({
          imgCoord: rspCoords.paper,
        });
      } else if (imgCoord === rspCoords.paper) {
        this.setState({
          imgCoord: rspCoords.rock,
        });
      }
    };

    toggleGameStart = ()=> {
        this.setState(prevState => ({
            gameStart: !prevState.gameStart
        }));
    };

    onClickBtn = (choice) => (e) => {
      e.preventDefault();
      const {imgCoord , gameCount , gameRound} = this.state;
      clearInterval(this.interval);

      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
            this.setState({
                result: '비겼습니다!',
            });
      } else if ([-1, 2].includes(diff)) {
        this.setState((prevState) => {
            return {
                result: '이겼습니다!',
                score: prevState.score + 1,
            };
        });
      } else {
        this.setState((prevState) => {
            return {
                result: '졌습니다!',
                score: prevState.score - 1,
            };
        });
      }

      this.setState((prevState) =>{ 
        return {
            gameCount: prevState.gameCount + 1
        }
      });

      if((gameCount + 1) < gameRound){
          setTimeout(() => {  //2초 후 다시재생
              this.interval = setInterval(this.changeHand, 100);
          }, 2000);
      }else{
        setTimeout(() => { 
          clearInterval(this.interval);
          this.setState({
            gameCount: 0,
            score:0,
            result:''
          });
        }, 2000);
      }
      
    };
    
    onClickStart = ()=>{
        this.toggleGameStart(); 
        this.interval = setInterval(this.changeHand, 100);
    }

    render(){
        const { result,score,imgCoord, gameStart , gameCount, gameRound } = this.state;
        return(
            <>
                { gameStart ?
                 <>
                    {gameCount >= gameRound ? <h1>게임 끝</h1> : <h2>게임 진행중</h2>}
                    <div id="computer" style={{ width: '140px', height:'200px', background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                    <div>
                        <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
                        <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
                        <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
                    </div>
                    <div>{result}</div>
                    <div>현재 {score}점</div>
                    <div>{gameCount}번째 대결중</div>
                 </>
                    : 
                 <>
                    <h1>게임 시작을 눌러주세요.</h1>
                    <button onClick={this.onClickStart}>게임시작</button>
                 </>
                }
            </>
        )
    }
}

export default RSP;