import React, { Component, useEffect, useState } from 'react';

import './Modal.css'

const ModalCreateWork = (props) =>{
  const {open, close} = props;
  console.log(props);
  
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [strdate, setStrdate] = useState("");
  const [eddate, setEddate] = useState("");


  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onCommentHandler = (event) => {
    setComment(event.currentTarget.value);
  };

  const onStrdateHandler = (event) => {
    setStrdate(event.currentTarget.value);
  };

  const onEddateHandler = (event) => {
      setEddate(event.currentTarget.value);
  };
  const onSubmit  = (event) => {
  event.preventDefault();

  //일정등록 api 호출
  alert('일정이 정상적으로 등록되었습니다.');
  props.history.push('/');
  
  
}; 

  return(
    /**클릭한 날짜의 일정 리스트정보 */
    <div className={open?'openModal modalbody' : 'modalbody'}>
      {
      open?(
        
        <div className='Modalmain'>
          <div>일정 생성하기</div>
          <form onSubmit={onSubmit} >
              <div>제목<input name="name" type="text" placeholder="제목" value={name} onChange={onNameHandler} /></div>
              <div>내용<input name="comment" type="text" placeholder="내용" value={comment} onChange={onCommentHandler} /></div>
              <div>시작날짜<input name="strdate" type="date" placeholder="시작날짜(추후변경)" value={strdate} onChange={onStrdateHandler} /></div>
              <div>종료날짜<input name="eddate" type="date" placeholder="종료날짜(추후변경)" value={eddate} onChange={onEddateHandler}/></div>
              <div><button type="submit" >일정 생성하기</button></div>
          </form>
          <button onClick={close}>닫기</button>
        </div>
        
      ):null
      }
    </div>
  );
};
export default ModalCreateWork;