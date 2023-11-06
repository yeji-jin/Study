import React, { useState, useContext, useRef } from 'react';
import { CommonContext } from './context/CommonContext';

function TodoItem(props) {

  const { setModalState , setIsDone } = useContext(CommonContext);
  const editInput = useRef(null);
  const [editStatus, setEditStatus] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState(null);

  const handleAction = (item, index, action) => {
    let updatedList = [...props.todoList];
    const finishedItem = updatedList.splice(index, 1);
    props.setSaveFlag(true);
    
    if(action === 'finish'){
      props.setDeletedList(prevDeletedList => [...prevDeletedList, ...finishedItem]);
      props.setTodoList(updatedList);
      setIsDone(true);
      setModalState({
        showModal: true,
        type:'alert', 
        modalCont: '축하합니다!',
      });
    }
    else if(action === 'edit'){
      setEditStatus(true);
      setEditValue(item);
      setEditIndex(index);
    }
    else if (action === 'return') {
      const returnedItem = props.deletedList.splice(index, 1)[0]; // Remove the item from deletedList
      props.setDeletedList([...props.deletedList]); // Update deletedList after removing the item
      updatedList = [...props.todoList, returnedItem];
      props.setTodoList(updatedList);
    }
    else if(action === 'remove'){
      setModalState({
        showModal: true,
        modalCont: '해당 목록을 삭제하시겠습니까?',
        callback: () => {
          props.setDeletedList((prevDeletedList) => prevDeletedList.filter((item, i) => i !== index));
        },
      });
    }
    
    // console.log('todo',props.todoList);
    // console.log('남은 항목', updatedList);
    // console.log('deletedList', deletedList);
  }

  const fnEditValue = () => {
    if (editValue.length > 0) {
      //update
      let updatedList = [...props.todoList];
      updatedList[editIndex] = editValue;
      props.setTodoList(updatedList);
      //init
      setEditStatus(false);
      setEditValue(null);
      setEditIndex(null);
    }
  }

  return (
    <>
      <div className='todo-container'>
        {/* doing */}
        <section className='todo-doing'>
          <h2>Do</h2>
          {
            props.todoList.length > 0 ? <>
              <ul>
                {
                  props.todoList.map((item,index) =>
                    <li className='todo-item' key={item+index}>
                      <p>{item}</p>
                      <div>
                        <button type="button" onClick={()=> handleAction(item, index, 'edit')}>수정</button>
                        <button type="button" onClick={()=> handleAction(item, index, 'finish')}>완료</button>
                      </div>
                    </li>  
                  )
                }
              </ul>
            </> : 
            <>
              <p className='empty-txt'>등록된 내용이 없습니다.</p>
            </>
          }
        </section>
        
        {/* done */}
        <section className='todo-done'>
        <h2>Done</h2>
        {
          props.deletedList.length > 0 ? <>
            <ul>
              {
                props.deletedList.map((item,index) =>
                <li className='todo-item done' key={'deleted'+item+index}>
                  <p>{item}</p>
                  <div>
                    <button type="button" className='btn-return' onClick={()=> handleAction(item, index,'return')}>return</button>
                    <button type="button" className='btn-remove' onClick={()=> handleAction(item, index,'remove')}>삭제</button>
                  </div>
                </li>  
              )
            }
            </ul>
          </> : 
          <>
            <p className='empty-txt'>등록된 내용이 없습니다.</p>
          </>
        }
        </section>

        {/* edit */}
        <div className={`edit-container ${editStatus ? 'on' : ''}`}>
          <div className={`edit-wrapper`}> 
            <div className='edit-box'>
              <input type='text' 
                ref={editInput} 
                className='todo-board__input'
                value={editValue || ''}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus />
              <button type='button' onClick={() => fnEditValue()}>저장</button>
            </div>
          </div>
        </div>
      

      </div>

    </>
  );
}

export default TodoItem;

