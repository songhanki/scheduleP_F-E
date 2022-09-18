import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './components.css'

class Header extends Component{
    render(){
        return(
            <header>
                <>{/*로그인 Yn에 따라서 로그인/화원가입 - 로그아웃 구현 준비해야함 */}
                    <Link to={'/SignUp'}>회원가입</Link>
                    <Link to={'/Login'}>로그인</Link>
                </>
            </header>
        );
    }
}

export default Header;