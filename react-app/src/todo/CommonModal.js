import React,{useContext, useState} from 'react';
import { CommonContext } from './context/CommonContext';

function CommonModal(props) {

    const { type, callback, setModalState } = useContext(CommonContext);

    const runCallBack = () => {
        callback();
        setModalState({showModal: false});   
    }

  return (
    <>  
        {
            props.showModal && 
            <div className='modal-container'>
                <div className='modal-inner'>
                    <p className='modal-txt' dangerouslySetInnerHTML={{ __html: props.modalCont }}></p>
                    <div className='modal-btns'>
                        {
                            type === 'alert' ? <>
                                 <button type='button' onClick={()=> setModalState({showModal: false})}>
                                    <span>확인</span>
                                </button>
                            </> : <>
                            <button type='button' onClick={()=> setModalState({showModal: false})}>
                                <span>취소</span>
                            </button>
                            <button type='button' onClick={()=> runCallBack()}>
                                <span>확인</span>
                            </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        }
    </>
  );
}
export default CommonModal;



