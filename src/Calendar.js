import React, { useEffect, useState } from 'react';
import './Calendar.scss';
import $ from 'jquery';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';


let 박스5 = styled.div`
    height: (699.3px / 5);
`;
let 박스6 = styled.div`
    height: (699.3px / 6);
`;

function Calendar() {
    //상단 날짜
    var [현재시간, 현재시간변경] = useState(new Date());
    useEffect(()=>{
        setTimeout(()=>{
            현재시간변경(new Date())
        },1000)
    },[현재시간])
    var [요일, 요일변경] = useState(['일','월','화','수','목','금','토']);
    var year = 현재시간.getFullYear();
    var month = 현재시간.getMonth()+1;
    var date = 현재시간.getDate();
    var day = 현재시간.getDay();
    var hour = 현재시간.getHours();
    var min = 현재시간.getMinutes();
    var 오전오후;
    if (hour > 12) {
        오전오후 = '오후';
        hour = hour -12;
    } else if (hour==12) {
        hour = 12
        오전오후 = '오후'
    } else if (hour == 0) {
        hour = 12
        오전오후 = '오전'
    } else {
        오전오후 = '오전'
    }
    if (month < 10) {
        month = '0' + month;
    } else {
        month = month;
    }
    if (date < 10) {
        date = '0' + date;
    } else {
        date = date;
    }
    if (day === 1) {
        day = '월'
    } else if (day === 2) {
        day = '화'
    } else if (day === 3) {
        day = '수'
    } else if (day === 4) {
        day = '목'
    } else if (day === 5) {
        day = '금'
    } else if (day === 6) {
        day = '토'
    } else if (day === 7) {
        day = '일'
    };

    var nowDate = year+'.'+month;
    var nowDay = month+'.'+date+' ('+day+')';
    var nowTime = hour+'시'+' '+min+'분'+'('+오전오후+')'
    
    //LocalStorage에서 아이디 가져오기
    var id = localStorage.getItem('ID');
    id = JSON.parse(id);
    var idName = id.name + '님';
    
    //켈린더날짜
    var [dt,dt변경] = useState(new Date());
    var calendarDate = dt.getFullYear()+'년 '+(dt.getMonth()+1)+'월';
    $('.prev').on('click',function(){
        dt변경(new Date(dt.getFullYear(), dt.getMonth() - 1, dt.getDate()));
        calendarDate = dt.getFullYear()+'년 '+(dt.getMonth()+1)+'월';
    })
    $('.next').on('click',function(){
        dt변경(new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()));
        calendarDate = dt.getFullYear()+'년 '+(dt.getMonth()+1)+'월';
    })
    var thisMonth = new Date(dt.getFullYear(), dt.getMonth(), 1); //5월 1일이나옴
    var lastMonth = new Date(dt.getFullYear(), dt.getMonth(), 0); //4월 30일이나옴
    var thisLastDay = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);//5월 31일이나옴
    var nextDay = new Date(dt.getFullYear(), dt.getMonth() + 1, 1)//6월 1일나옴

    var 저번달 = [];
    for ( let i = lastMonth.getDate() - thisMonth.getDay() + 1; i <= lastMonth.getDate(); i++ ) {
        저번달.push(i);
    }
    var 현재달 = [];
    for ( let i = 1; i <= thisLastDay.getDate(); i++) {
        현재달.push(i);
    }
    var 다음달 = [];
    for ( let i = 1; i <= (6-thisLastDay.getDay()); i++) {
        다음달.push(i);
    }
    var 달력 = [...저번달,...현재달,...다음달];
    // console.log(달력.length);
    //일자 선택 클릭
    $(".cal_day").on("click", "div", function () {
        //일자선택
        $(".cal_day div").removeClass("select_day");
        $(this).removeClass("select_day").addClass("select_day");
    });
    $(".prev").on("click", function () {
        $(".cal_day div").removeClass("select_day");
    });
    $(".next").on("click", function () {
        $(".cal_day div").removeClass("select_day");
    });

    //메뉴선택시 토글
    let [menuModal, menuModal변경] = useState(false);
    
    //닉네임변경
    let history = useHistory();
    function linkLogin() {
        history.push('/')
    }
    
    //테마색/프로필
    let [themaModal, themaModal변경] = useState(false);
    let [profileModal, profileModal변경] = useState(false);
    let [nowImgNum, nowImgNum변경] = useState();
    let [img, img변경] = useState(['/프로필사진/프로필사진1.jpg','/프로필사진/프로필사진2.jpg','/프로필사진/프로필사진3.jpg','/프로필사진/프로필사진4.jpg','/프로필사진/프로필사진5.jpg','/프로필사진/프로필사진6.jpg','/프로필사진/프로필사진7.jpg','/프로필사진/프로필사진8.jpg']);
    let [nowNum, nowNum변경] = useState(1);
    
    function saveImg() {
        const userImg = {number : nowNum};
        window.localStorage.setItem("Img", JSON.stringify(userImg));
    }
    var imgNum = localStorage.getItem('Img');
    imgNum = JSON.parse(imgNum);

    let [color, color변경] = useState(['#e7f5ff','#f4fce3','#fff0f6','#f8f0fc','#fff4e6','#e3fafc','#e6fcf5','#fff9db']);
    let [nowColor, nowColor변경] = useState(1);
    let [nowColorNum, nowColorNum변경] = useState();
    function saveColor() {
        const userColor = {number : nowColor};
        window.localStorage.setItem("Color", JSON.stringify(userColor));
    }
    var ColorNum = localStorage.getItem('Color');
    ColorNum = JSON.parse(ColorNum);

    function todoimg() {
        $('.todo-top-plus-img').removeClass("todo-top-plus-img").addClass("plus-img-ing");
    }
    
    //todo선택시 토글
    let [todoModal, todoModal변경] = useState(false);
    return (
        <div className="calendar-container d-flex">
            {
                menuModal === true
                ? <MenuModal id={id} 
                idName={idName} 
                menuModal변경={menuModal변경} 
                linkLogin={linkLogin}
                themaModal={themaModal}
                themaModal변경={themaModal변경}
                profileModal={profileModal}
                profileModal변경={profileModal변경}
                nowNum={nowNum}
                imgNum={imgNum}
                nowColor={nowColor}
                nowColor변경={nowColor변경}
                ColorNum={ColorNum}
                color={color}
                color변경={color변경}
                ></MenuModal>
                : null
            }
            {
                themaModal === true
                ? <ThemaColor themaModal변경={themaModal변경}
                color={color}
                color변경={color변경}
                saveColor={saveColor}
                nowColor={nowColor}
                nowColor변경={nowColor변경}
                ColorNum={ColorNum}
                nowColorNum변경={nowColorNum변경}
                ></ThemaColor>
                : null
            }
            {
                profileModal === true
                ? <Profile profileModal변경={profileModal변경}
                img={img}
                img변경={img변경}
                nowNum={nowNum}
                nowNum변경={nowNum변경}
                saveImg={saveImg}
                imgNum={imgNum}
                nowImgNum변경={nowImgNum변경}
                ></Profile>
                : null
            }
            {
                todoModal === true
                ? <TodoModal todoModal={todoModal}
                todoModal변경={todoModal변경}
                ></TodoModal>
                : null
            }
            <div className="calendar">
                <div className="calendar-top">
                    <div className="menu" onClick={ () => {menuModal변경(true)} }>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="nowDate">
                        {nowDate}
                    </div>
                    <div className="calendar-top-img-box">
                        <img className="img" src={"/프로필사진/프로필사진"+imgNum.number+".jpg"} alt="" />
                    </div>
                    <div className="id">
                        {idName}
                    </div>
                </div>
                <div className="calendar-bottom">
                    <table className='custom_calendar_table'>
                        <thead className='cal_date'>
                            <tr>
                                <th><button type='button' className='prev' style={{backgroundColor:color[ColorNum.number]}}>&lt;</button></th>
                                <th colSpan='5'><span>{calendarDate}</span></th>
                                <th><button type='button' className='next' style={{backgroundColor:color[ColorNum.number]}}>&gt;</button></th>
                            </tr>
                        </thead>
                        <tbody  className='cal_week'>
                            <tr>
                                {
                                    요일.map(function(data,i){
                                        return (
                                            <th key={i}>{data}</th>
                                        )
                                    })
                                }
                            </tr>
                        </tbody>
                    </table>  
                    <div className='cal_day'>
                        {
                            달력.length > 35
                            ?   달력.map(function(day,i){
                                    return (
                                        <박스6 key={i}>{day}</박스6>
                                    )
                                })
                            :   달력.map(function(day,i){
                                    return (
                                        <박스5 key={i}>{day}</박스5>
                                    )
                                })
                            
                        }
                    </div>  
                                
                    
                </div>
            </div>
            <div className="todo">
                <div className="todo-top">
                    <div className="nowDay">
                        {nowDay}
                    </div>
                    <div className="nowTime">
                        {nowTime}
                    </div>
                    <div className="todo-top-plus-img" 
                        onClick={()=>{
                            todoModal변경(true);
                            todoimg();
                    }}></div>
                    
                </div>
                <div className="todo-bottom" style={{backgroundColor:color[ColorNum.number]}}>
                    <div className="todo-text">
                        <p className="basic-text">할 일이 없습니다.🎉</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
    
}
function TodoModal(props) {

    function todoplus(e) {
        function todominus(e) {
            console.log(this)
            
        }
        var 템플릿 = `
            <div className='todoModal-todo' style="font-size: 13px;
                text-align: start;
                margin: 0 auto;
                margin-bottom: 10px;
                width: 80%;
                border-radius: 10px;
                background-color: rgba(238,238,238,0.7);
                border: none;">
                    <input className="todoModal-todo-input" placeholder='하위 할 일을 입력해 주세요' style="font-size: 13px;
                        text-align: start;
                        margin: 0 auto;
                        width: 90%;
                        padding: 8px;
                        border-radius: 10px;
                        background-color: rgba(238,238,238,0.7);
                        border: none;"/>
                    <span className='todoModal-todo-plus' style="font-size: 15px;
                        text-align: start;
                        margin: 0 auto;
                        padding: 7px;
                        width: 10%;
                        border-radius: 10px;
                        background-color: rgba(238,238,238,0.7);
                        border: none;"
                        onClick="todominus()">-</span>
            </div>
        `;
        var 추가위치 = e.target.parentElement.parentElement
        $('#todoModal-todoBox').append(템플릿);

    }
    
    return (
        <div className="todoModal white-box">
            <div className="todo-close" onClick={ () => {props.todoModal변경(false)} }>
                        <div className="todo-close-line1"></div>
                        <div className="todo-close-line2"></div>
            </div>
            <input className="gray-box title" placeholder='제목을 입력해 주세요'/>
            <input className="gray-box tag" placeholder='태그를 입력해 주세요'/>
            <div id='todoModal-todoBox'>
                <div className='todoModal-todo'>
                    <input className="todoModal-todo-input" placeholder='하위 할 일을 입력해 주세요'/>
                    <span className='todoModal-todo-plus' onClick={todoplus}>+</span>
                </div>
            </div>
            {/* +버튼 누르면 동적으로 -버튼있는거 생성하고 -버튼 누르면 해당 박스 삭제하기 */}
            <input className="gray-box memo" placeholder='메모를 입력해 주세요'/>
            {/* placeholder가 위에있고, 칸 넓히기 */}
        </div>
    )
}
function MenuModal(props) {
    
    return (
        <div className="menuModal" style={{backgroundColor:props.color[props.ColorNum.number]}}>
            <div className="menuModal-top">
                <img className="img" src={"/프로필사진/프로필사진"+props.imgNum.number+".jpg"} alt="" />
                <div className='menuModal-top-name'>{props.id.name}</div>
                <div className='menuModal-top-greet'>
                    <div>{props.id.name} 님</div>
                    <div>안녕하세요!</div>
                </div>
                <div className="close" onClick={ () => {props.menuModal변경(false)} }>
                        <div className="close-line1"></div>
                        <div className="close-line2"></div>
                </div>
            </div>
            <div className="menuModal-bottom">
                <div className="menuModal-bottom-profile change"
                    onClick={ () => {props.profileModal변경(true)} }>
                    <div className="row">
                        <div className="col-2 left">º</div>
                        <div className="col-8 left">프로필 변경</div>
                        <div className="col-2">&gt;</div>
                    </div>
                </div>
                <div className="menuModal-bottom-thema change"
                    onClick={ () => {props.themaModal변경(true)} }>
                    <div className="row">
                        <div className="col-2 left">º</div>
                        <div className="col-8 left">테마색 변경</div>
                        <div className="col-2">&gt;</div>
                    </div>
                </div>
                <div className="menuModal-bottom-nickname change"
                    onClick={ () => {props.linkLogin()}}>
                    <div className="row">
                        <div className="col-2 left">º</div>
                        <div className="col-8 left">닉네임 변경</div>
                        <div className="col-2">&gt;</div>
                    </div>
                </div>
                <div className="menuModal-bottom-copyright">
                    copyright ⓒ dragonite-Lee
                </div>
            </div>
        </div>
    )
}

function ThemaColor(props) {
    return (
        <div className="background" onClick={ (e) => {
            if(e.target === e.currentTarget) {
                props.themaModal변경(false)}
            }}>
            <div className="white-background">
                <div className="sub-close" onClick={ () => {props.themaModal변경(false)} }>
                        <div className="sub-close-line1"></div>
                        <div className="sub-close-line2"></div>
                </div>
                <div className="nowColor" style={{backgroundColor:props.color[props.ColorNum.number]}}></div>
                <div className="currentText">현재 테마색</div>
                <div className="alert">아래 테마색 클릭 후, 변경하기 버튼을 눌러야 변경됩니다.</div>
                <div className="colorBox">
                    {
                        props.color.map(function(data,i) {
                            return (
                                <div key={i} 
                                style={{backgroundColor:data}} 
                                className="colorBox-color"
                                onClick={ () => {
                                    props.nowColor변경({i}.i)
                                    console.log({i}.i)
                                }}
                                ></div>  
                            )
                            
                        })
                    }
                </div>
                <button className="btn info-change"
                    onClick={ () => {
                        props.nowColorNum변경(props.nowColor)
                        props.saveColor()
                    }
                }>변경하기</button>
            </div>
        </div>
    )
}
function Profile(props) {
    
    return (
        <div className="background" onClick={ (e) => {
            if(e.target === e.currentTarget) {
                props.profileModal변경(false)}
            }}>
            <div className="white-background">
                <div className="sub-close" onClick={ () => {props.profileModal변경(false)} }>
                        <div className="sub-close-line1"></div>
                        <div className="sub-close-line2"></div>
                </div>
                <img className="img changeImg" src={"/프로필사진/프로필사진"+props.imgNum.number+".jpg"} alt="" />
                <div className="currentText">현재 프로필</div>
                <div className="alert">아래 이미지 클릭 후, 변경하기 버튼을 눌러야 변경됩니다.</div>
                <div className='imgBox'>
                    {
                        props.img.map(function(data,i) {
                            return (
                                    <img key={i} className='imgBox-img' 
                                    src={data} 
                                    alt=""
                                    onClick={()=>{
                                        props.nowNum변경({i}.i+1)
                                        console.log({i}.i)
                                    }}
                                    />
                            )
                        })
                    }
                </div>
                <button className="btn info-change"
                    onClick={ () => {
                        props.nowImgNum변경(props.nowNum)
                        props.saveImg()
                    }
                }>변경하기</button>
            </div>
        </div>
    )
}

    
   

export default Calendar;