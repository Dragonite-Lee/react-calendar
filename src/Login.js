import React, { useState } from 'react';
import './Login.scss';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login(props) {

    /* 시작하기 버튼 클릭시 작성한 닉네임 localStorage에 저장하기 */
    function saveId() {
        const userId = {name : props.inputID입력값};
        window.localStorage.setItem("ID", JSON.stringify(userId));
    }
    //LocalStorage에서 꺼낼 때 사용
    // var a = localStorage.getItem('ID');
    // a = JSON.parse(a)
    // console.log(a.name);

    let history = useHistory();
    function linkCalendar() {
        history.push('/calendar');
    };
    return (
        <div className="login-container">
            {/* input에 값 입력하면 자동으로 input입력값변경에 담음 */}
            <input  className="input-id" 
                    type="text" 
                    placeholder='닉네임을 적어주세요.'
                    onChange={ (e) => { props.inputID입력값변경(e.target.value) } }/>
            <button className='start btn' onClick={ ()=>{
                saveId();
                linkCalendar();
            }}>시작하기</button>
            <p className='copyright'>copyright ⓒ dragonite-Lee</p>
        </div>
    );
}

export default Login;