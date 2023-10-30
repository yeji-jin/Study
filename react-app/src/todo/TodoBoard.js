import React,{useState, useRef, useEffect} from 'react';
import TodoItem from './TodoItem';

function TodoBoard() {

  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const todoInput = useRef(null);

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
    // console.log('가져온 데이터가 있다.', savedTodoList);
    if(savedTodoList){
      setTodoList(savedTodoList);
    }
  },[]);

  const addItem = ()=> {
    // 미입력 case
    if(inputValue.length <= 0) {
      alert('할 일을 입력해주세요.');
      return;
    }
    // 중복 case
    const savedTodoList = getFromLocalStorage('todoList');
    if(savedTodoList.includes(inputValue)){
      alert('동일한 내용이 존재합니다.');
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

  const handleRemoveItem = (updatedList) => {
    setTodoList(updatedList);
    saveToLocalStorage('todoList', updatedList); //local save
  };

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
            onUpdate={handleRemoveItem}
            saveToLocalStorage={saveToLocalStorage}
            getFromLocalStorage={getFromLocalStorage}/>

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

have to
- 유효성 검증
- 팝업컴포넌트 소통을 통한 삭제..

*/




