import React, { useEffect, useState, useContext } from 'react';
import { CommonContext } from './context/CommonContext';

function TodoItem(props) {

  const [deletedList, setDeletedList] = useState([]);
  const { setModalState } = useContext(CommonContext);

  useEffect(()=>{
    const savedDoneList = props.getFromLocalStorage('deletedList');
    if(savedDoneList) {
      console.log('savedDoneList',savedDoneList);
      setDeletedList(prevDeletedList => [...prevDeletedList, ...savedDoneList]);
    }
  },[]); 

  useEffect(() => {
    props.saveToLocalStorage('deletedList', deletedList);
  }, [deletedList]); 

  const handleAction = (index, action) => {
    let updatedList = [...props.todoList];
    const finishedItem = updatedList.splice(index, 1);

    if(action === 'finish'){
      setDeletedList(prevDeletedList => [...prevDeletedList, ...finishedItem]);
      props.onUpdate(updatedList);
    }else if (action === 'return') {
      const returnedItem = deletedList.splice(index, 1)[0]; // Remove the item from deletedList
      setDeletedList([...deletedList]); // Update deletedList after removing the item
      updatedList = [...props.todoList, returnedItem];
      props.onUpdate(updatedList);
    }
    else if(action === 'remove'){
      setModalState({
        showModal: true,
        modalCont: '해당 목록을 삭제하시겠습니까?',
        callback: () => {
          setDeletedList((prevDeletedList) => prevDeletedList.filter((item, i) => i !== index));
        },
      });
    }
    
    // console.log('todo',props.todoList);
    // console.log('남은 항목', updatedList);
    // console.log('deletedList', deletedList);
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
                      <button type="button" onClick={()=> handleAction(index,'finish')}>완료</button>
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
          deletedList.length > 0 ? <>
            <ul>
              {
                deletedList.map((item,index) =>
                <li className='todo-item done' key={'deleted'+item+index}>
                  <p>{item}</p>
                  <div>
                    <button type="button" className='btn-return' onClick={()=> handleAction(index,'return')}>return</button>
                    <button type="button" className='btn-remove' onClick={()=> handleAction(index,'remove')}>삭제</button>
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
      </div>

    </>
  );
}

export default TodoItem;

