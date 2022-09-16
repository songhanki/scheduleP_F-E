import React, { Component } from 'react';
import { Router, Routes, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

import Login from './components/Login';
import ScheduleMain from './main/ScheduleMain';
import SignUp from './components/SignUp'
import Main from './Main';
import ScheduleLstMain from './main/ScheduleLstMain';

class App extends Component{
  render(){
    return (
      <div className="App">

            
        <Switch>
          <Route exact path='/Login' component={Login}></Route>
          <Route exact path='/SignUp' component={SignUp}></Route>
        </Switch>
        
            {/*
            <Route exact path='/' component={Main}></Route>
            <Route exact path='/ScheduleMain' component={ScheduleMain}></Route>
            */}
            <Route exact path='/' component={ScheduleMain}></Route>
            <Route exact path='/ScheduleLst' component={ScheduleLstMain}></Route>
        {/*<Calendar />    */}
      </div>
    );
  }
}

export default App;
