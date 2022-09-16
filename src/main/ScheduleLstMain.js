import React, { Component } from 'react';
import Calendar from './Calendar';
import TodayWork from './TodayWork';
import Header from '../components/Header';
import ScheduleLst from './ScheduleLst';

const MyWorkList = [ //달력에 표현할 임시 data(오늘 할일)
  { id:1,title:"메인화면 구축하기1", date:"2022-06-09 09:00:00"},
  { id:2,title:"데이터 정의서 작업완료", date:"2022-06-09 15:00:00"},
  { id:3,title:"디자인/CSS 반영", date:"2022-06-09 17:30:00"},
  { id:4,title:"데이터 매핑작업", date:"2022-07-01 05:00:00"},
  { id:5,title:"F/E 내용 최적화", date:"2022-06-24 15:30:00"},
  { id:6,title:"B/E 선행작업", date:"2022-06-28 18:20:00"},
  { id:7,title:"추가 홈페이지 작업", date:"2022-06-22 12:30:00"},
  { id:8,title:"DB 작업", date:"2022-07-03 09:30:00"},
  { id:9,title:"AXIOS 를 통한 API연동", date:"2022-06-31 20:30:00"}
  
];

class ScheduleLstMain extends Component{
    render(){
        return(
            <>
                <Header />
                <TodayWork MyWorkList={MyWorkList} />
                <ScheduleLst MyWorkList={MyWorkList} />
                
            </>
        );

    }
}

export default ScheduleLstMain;