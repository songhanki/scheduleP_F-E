import React,  { Component, useState } from "react";
import axios from 'axios';

function SignUp(props){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  

    const onNameHandler = (event) => {
      setName(event.currentTarget.value);
    };
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };
  
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };
  
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };
  
    const chk_email = (event) => {
      event.preventDefault();

      let form = new FormData();
      form.append('per_id', email);

      const api = axios.create({
          baseURL:'https://schedulep-be.herokuapp.com' //heroku서버
          //baseURL:'http://localhost:8090'
          });
        api.get('/ChkId',form).then(function(response){
          //console.log(response.data);
          if(response.data=="notok"){
              alert("중복된 이메일입니다.");
              const target = document.getElementById('btn_signup');
              target.disabled = true;
          }
          if(response.data=="200ok"){
            alert('사용할 수 있는 이메일입니다.');
            const target = document.getElementById('btn_signup');
            target.disabled = false; //사용할 수 있는 아이디는 회원가입 활성화
            
          }
        });

  }
    const onSubmit  = (event) => {
        // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
      event.preventDefault();

      let form = new FormData();
      form.append('per_id', email);
      form.append('per_pass', password);
      form.append('per_name', name);
      
      if(password !== confirmPassword) {
        return alert('비밀번호와 비밀번호확인은 같아야 합니다.');
      }
      const api = axios.create({
        baseURL:'https://schedulep-be.herokuapp.com' //heroku서버
        //baseURL:'http://localhost:8090/'
      });
      api.post('/InsertPerson',form).then(function(response){
        //console.log(response.data);
        if(response.data=="200ok"){
          alert('회원 가입이 정상적으로 진행 되었습니다.');
          props.history.push('/');
        }
      });
    }; 

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={onSubmit} >                
              <div>
                <input name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler} />
                <button onClick={chk_email}>중복확인</button>
              </div>
              <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} /></div>

              <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} /></div>
              <div><input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler}/></div>
              <div><button id="btn_signup" type="submit" disabled>계정 생성하기</button></div>
            </form>
        </div>
      );
}

 export default SignUp;