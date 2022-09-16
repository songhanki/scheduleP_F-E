import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import Calendar from './Calendar';
import Header from '../components/Header';
import TodayWork from './TodayWork';
import Footer from '../components/Footer';
/**
[{
    "sch_STRDATE": "2022-07-12T15:00:00.000+00:00",
    "sch_YN": "N",
    "sch_SEQ": 10,
    "sch_NAME": "B/E 마무리 작업",
    "sch_COMMENT": null,
    "sch_EDDATE": "2022-07-15T15:00:00.000+00:00"
}] 
*/
const ScheduleMain = () => {
    const [MyWorkList,setData] = useState([]);
    useEffect(() => {
        const api = axios.create({
            baseURL:'https://schedulep-be.herokuapp.com' //heroku서버
            //baseURL:'http://localhost:8090' //local 서버 사용시
        });
            api.get('/SelectScheduleAllList',{params:{
        }}).then(function(response){
            //console.log(response.data);
            setData(response.data);
        })  
    },[])

        return(
            <>
                <Header />
                <TodayWork/>
                <Calendar MyWorkList={MyWorkList} />
                <Footer />
            </>
        );

}

export default ScheduleMain;