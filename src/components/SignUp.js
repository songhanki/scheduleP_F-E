import React,  { Component, useState } from "react";

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
  
    const onSubmit  = (event) => {
        // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
      event.preventDefault();
      if(password !== confirmPassword) {
        return alert('비밀번호와 비밀번호확인은 같아야 합니다.');
      }
      //회원id 중복 여부 확인api 호출
      //
      alert('회원 가입이 정상적으로 진행 되었습니다.');
      props.history.push('/');
      
      
    }; 

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={onSubmit} >
                <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} /></div>
                <div><input name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler} /></div>
                <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} /></div>
                <div><input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler}/></div>
                <div><button type="submit" >계정 생성하기</button></div>
            </form>
        </div>
      );
}

 export default SignUp;