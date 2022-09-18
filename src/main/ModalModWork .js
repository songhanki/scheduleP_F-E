import React, { Component, useLayoutEffect, useEffect, useState } from 'react';
import axios from 'axios';
import './Modal.css'

const ModalModWork = (props) =>{
  const {open, close, mainseq} = props;
  console.log(props);

  const [articles, setArticles] = useState(null);
  
  const [seq, setSeq] = useState("");
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

  
  //seq 호출 api연동

  useEffect(() => {
  const api = axios.create({
    baseURL:'https://schedulep-be.herokuapp.com' //heroku서버
  });
  api.get('/SelectScheduleOne',{params:{
    seq:props.mainseq
    }}).then(function(response){
      console.log(response.data);
      response.data.map((list) =>{
        setSeq(list.sch_SEQ);
        setName(list.sch_NAME);
        setComment(list.sch_COMMENT);
        setStrdate(list.sch_STRDATE.substr(0,10));
        setEddate(list.sch_EDDATE.substr(0,10));
      })
    })
  },[props.mainseq])

  const onSubmit = (event) => {
    event.preventDefault();
    let form = new FormData();
    form.append('sch_seq', seq);
    form.append('sch_name', name);
    form.append('sch_comment',strdate);
    form.append('sch_strdate', strdate);
    form.append('sch_eddate',eddate);
    console.log(seq+","+ name+","+ comment+","+ strdate+","+ eddate)

    const api = axios.create({
      baseURL:'https://schedulep-be.herokuapp.com' //heroku서버
      
      });
    api.put('/UpdateScheduleOne',form).then(function(response){
      console.log(response.data);
      if(response.data=="200ok"){
        alert('일정이 정상적으로 수정되었습니다.');
        props.close();
      }
    });
  };
  
  //일정등록 api 호출
  //alert('일정이 정상적으로 등록되었습니다.');
  //props.history.push('/');
  
  return(
    /**클릭한 날짜의 일정 리스트정보 */
    <div className={open?'openModal modalbody' : 'modalbody'}>
      {
      open?(
        
        <div className='Modalmain'>
          <div>일정 수정하기</div>
          <form onSubmit={onSubmit} >
              <input name="seq" type="hidden" value={seq} />
              <div>제목<input name="name" type="text" placeholder="제목" value={name} onChange={onNameHandler} /></div>
              <div>내용<input name="comment" type="text" placeholder="내용" value={comment} onChange={onCommentHandler} /></div>
              <div>시작날짜<input name="strdate" type="date" placeholder="시작날짜(추후변경)" value={strdate} onChange={onStrdateHandler} /></div>
              <div>종료날짜<input name="eddate" type="date" placeholder="종료날짜(추후변경)" value={eddate} onChange={onEddateHandler}/></div>
              <div><button type="submit" >일정 수정하기</button></div>
          </form>
          <button onClick={close}>닫기</button>
        </div>
        
      ):null
      }
    </div>
  );
};
export default ModalModWork;