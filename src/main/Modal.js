import React from 'react';
import './Modal.css'

const Modal = (props) =>{
  const {open, close} = props;
  console.log(props);

  return(
    /**클릭한 날짜의 일정 리스트정보 */
    <div className={open?'openModal modal' : 'modal'}>
      {
      open?(
        
        <div className='Modalmain'>
          <div>스케쥴 생성하기</div>
          
          <button onClick={close}>닫기</button>
        </div>
        
      ):null
      }
    </div>
  );
};
export default Modal;