import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
// import { useHistory, useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import axios from 'axios';
import Login from './Login'
import Calendar from './Calendar'


function App() {

  let [inputID입력값,inputID입력값변경] = useState([]);
  
  return (
    
    <Switch>
      <Route exact path="/">
        {/* 로그인페이지 */}
        <Login inputID입력값={inputID입력값} inputID입력값변경={inputID입력값변경}></Login>
      </Route>
      <Route path="/calendar">
        {/* 메인켈린더페이지 */}
        <Calendar></Calendar>
      </Route>
    </Switch>

  );
}

export default App;
