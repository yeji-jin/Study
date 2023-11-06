import React,{useState, useRef, useEffect, useContext} from 'react';
import TodoItem from './TodoItem';
import { CommonContext } from './context/CommonContext';

function TodoBoard() {

  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [saveFlag, setSaveFlag] = useState(false);
  const todoInput = useRef(null);
  const { setModalState } = useContext(CommonContext);
  
  // 데이터 저장
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // 데이터 가져오기
  const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  useEffect(()=>{
    const savedTodoList = getFromLocalStorage('todoList');
    const savedDoneList = getFromLocalStorage('deletedList');
    if(savedTodoList){
      setTodoList(savedTodoList);
    }
    if(savedDoneList) {
      setDeletedList([...savedDoneList]);
    }
  },[]);

  useEffect(() => {
    if(saveFlag){
      saveToLocalStorage('deletedList', deletedList);
    }
  }, [deletedList]); 

  useEffect(() => {
    if(saveFlag){
      saveToLocalStorage('todoList', todoList); 
    }
  }, [todoList]); 


  const addItem = ()=> {
    // 미입력 case
    if(inputValue.length <= 0) {
      setModalState({
        showModal: true,
        modalCont: '할일을 입력해주세요.',
        type:'alert'
      });
      return;
    }
    // 중복 case
    const savedTodoList = getFromLocalStorage('todoList');
    const savedDoneList = getFromLocalStorage('deletedList');
    if(savedTodoList && savedTodoList.includes(inputValue)){
      setModalState({
        showModal: true,
        modalCont: `진행중인 목록에 동일한 내용이 존재합니다.<br/> <b>* 동일한 내용 : ${inputValue}</b>`,
        type:'alert'
      });
      return;
    }
    if(savedDoneList && savedDoneList.includes(inputValue)){
      setModalState({
        showModal: true,
        modalCont: `완료된 목록에 동일한 내용이 존재합니다.<br/>
          해당 목록을 진행목록으로 옮기시겠습니까?<br/>
          <b>* 동일한 내용 : ${inputValue}</b>`,
        callback: () => {
          const updatedDoneList = savedDoneList.filter(item => item !== inputValue); 
          const updatedTodoList = savedTodoList ? [...savedTodoList, inputValue] : [inputValue];
          setDeletedList(updatedDoneList);
          setTodoList(updatedTodoList);
          console.log('목록을 옮겼습니다.',inputValue);
        },
      });
      return;
    }
    // 업데이트된 todoList를 사용하여 저장
    const updatedList = [...todoList, inputValue];
    setTodoList(updatedList);
    saveToLocalStorage('todoList', updatedList);
    //reset
    setInputValue('');
    todoInput.current.focus();
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <>  
        <main className='todo-board'>
          <h1 className='todo-board__title'>ToDoList를 작성해보자!</h1>
          <div className='todo-board-box'>
            <input  type='text' 
                    placeholder='할 일을 입력해주세요.' 
                    className='todo-board__input'
                    ref={todoInput}
                    value={inputValue} 
                    onChange={(e)=> setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress} />

            <button type='button'
                    className='todo-board__btn'
                    onClick={addItem}>
                  추가
            </button>
          </div>

          {/* item list */}
          <TodoItem 
            todoList={todoList} 
            deletedList={deletedList}
            setTodoList={setTodoList}
            setDeletedList={setDeletedList}
            setSaveFlag={setSaveFlag}/>

        </main>
    </>
  );
}

export default TodoBoard;

/**
  * 언어: Javascript
  *라이브러리: React
  * 스타일링: Css
  * ------
* 자동화: -
* 배포: - 


@ 작업 내용
- 입력창 및 버튼 UI제작
- Doing, Done목록 작업
- 완료목록에서 되돌리기, 삭제작업 
- list localStorage 저장작업
- 다크모드
- 팝업컴포넌트 소통을 통한 삭제..
- 유효성 검증 

*/




