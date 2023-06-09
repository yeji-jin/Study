// ---------- class 
// const React = require('react');
// const {Component} = React;
// class ResponseCheck extends Component {
//     state = {
//         gameState:'waiting',
//         message: '클릭해서 시작하세요.',
//         result:[],
//     };

//     TIMEOUT;
//     startTime;
//     endTime;

//     onClickScreen = ()=>{
//         const { gameState , message, result } = this.state;
//         if(gameState === 'waiting'){
//             this.setState({
//                 gameState : 'ready',
//                 message: '초록색이 되면 클릭하세요.',
//             });
//             this.TIMEOUT = setTimeout(() => {
//                 this.setState({
//                     gameState : 'now',
//                     message: '지금 클릭!',
//                 });
//                 this.startTime = new Date(); //start
//             }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤
//         }
//         else if(gameState === 'ready') {  
//             clearTimeout(this.TIMEOUT); 
//             this.setState({
//                 gameState : 'waiting',
//                 message: '너무 성급하시군요! 초록색일때 클릭해주세요. 다시시작해주세요!',
//             });
//         }
//         else if(gameState === 'now') { //반응속도 체크!
//             this.endTime = new Date(); //start
//             this.setState((prevState)=>{
//                 return {
//                     gameState : 'waiting',
//                     message: '클릭해서 다시 시작하세요!',
//                     result: [...prevState.result, this.endTime - this.startTime],
//                 }
//             });
//         }
//     };
//     fnReset = ()=>{
//         this.setState({
//             result:[],
//         })
//     };
//     renderAverage = ()=>{
//         const { result } = this.state;
//         return (
//             result.length === 0 ? null : 
//             <>
//                 <div>평균시간 : {result.reduce((a,c) => a+c)  / result.length }ms</div>
//                 <button type='button' onClick={this.fnReset}>reset</button>
//             </>
//         )
//     };

//     render(){
//         const { gameState, message } = this.state;
//         return (
//             <>
//                 <div id="screen"
//                      className={gameState}
//                      onClick={this.onClickScreen}
//                 >
//                     <p>{message}</p>
//                 </div>
//                {this.renderAverage()}
                
//             </>
//         )
//     }
// }
// ---------- hooks 
const React = require('react');
const { useState , useRef} = React;

const ResponseCheck = ()=>{
    const [gameState , setGameState ] = useState('waiting');
    const [message , setMessage ] = useState('클릭해서 시작하세요.');
    const [result , setResult ] = useState([]);
    const TIMEOUT = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = ()=>{
        if(gameState === 'waiting'){
            setGameState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            TIMEOUT.current = setTimeout(() => {
                setGameState('now');
                setMessage('지금 클릭!');
                startTime.current = new Date(); //start
            }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤
        }
        else if(gameState === 'ready') {  
            clearTimeout(TIMEOUT.current); 
            setGameState('waiting');
            setMessage('너무 성급하시군요! 초록색일때 클릭해주세요. 다시시작해주세요!');
        }
        else if(gameState === 'now') { //반응속도 체크!
            endTime.current = new Date(); //start
            setGameState('waiting');
            setMessage('클릭해서 다시 시작하세요!');
            setResult((prevState)=>{
                return [...prevState, endTime.current - startTime.current]
            });
        }
    };
    const fnReset = ()=>{
        setResult([]);
    };
    const renderAverage = ()=>{
        return (
            result.length === 0 ? null : 
            <>
                <div>평균시간 : {result.reduce((a,c) => a+c)  / result.length }ms</div>
                <button type='button' onClick={fnReset}>reset</button>
            </>
        )
    };

    //render
    return (
        <>
            <div id="screen"
                 className={gameState}
                 onClick={onClickScreen}
            >
                <p>{message}</p>
            </div>
            {/* {(()=>{
                if( result.length === 0 ){
                    return null;
                }else{
                    return <>
                            <div>평균시간 : {result.reduce((a,c) => a+c)  / result.length }ms</div>
                            <button type='button' onClick={fnReset}>reset</button>
                        </>
                }
            })()} */}
           {renderAverage()}
            
        </>
    )

}
module.exports = ResponseCheck;

