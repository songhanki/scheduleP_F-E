import React, { Component ,useState} from 'react';

function Login(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };
  
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmit  = (event) => {
        // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
      event.preventDefault();

      //회원id 중복 여부 확인api 호출
      //
      alert('회원 가입이 정상적으로 진행 되었습니다.');
      props.history.push('/');
      
      
    }; 

        return(

            <div className='login_main'>
                <div>LOGIN 화면</div>
                <form onSubmit={onSubmit} >
                    <div>
                        <span>이메일</span>
                        <input type="email" id="email_val" name="email" placeholder="이메일" value={email} onChange={onEmailHandler}/>
                    </div>
                    <div>
                        <span>비밀번호</span>
                        <input type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} />
                    </div>
                    <ul>
                        <li> <a href="/SignUp">{/*<Link to={'/register_check'}>회원가입</Link>*/}회원가입</a></li>
                        {/*<li className="pwr_b"><a href="#n">비밀번호 재설정</a></li>*/}
                    </ul>
                    <button type="submit">로그인</button>
                    

                </form>

            </div>

        );
    }

export default Login;