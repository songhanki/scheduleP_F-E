import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Modal from './ModalCreateWork'
            //console.log(response.data[0].sch_NAME);
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

const TodayWork = () => {
    const [data,setData] = useState([]);
    const [isModalOpen, setModalState] = React.useState(false);

    const openModal = (full_dates) => {
        console.log("full_dates: "+full_dates);
        setModalState(true);
    };
    const OpenSchdleLstModal = () =>{
        setModalState(true);
    }
    const closeModal = () => {
        setModalState(false);   
    };

    let state = {today:new Date()};
  
    var this_year = state.today.getFullYear();
    var this_month = state.today.getMonth()+1;
    this_month = this_month<10?"0"+this_month:this_month;
    var this_day = state.today.getDate();
    this_day = this_day<10?"0"+this_day:this_day;
    //console.log(props);
    var full_date = this_year +"-"+this_month+"-"+this_day;

    useEffect(() => {
        const api = axios.create({
            baseURL:'https://schedulep-be.herokuapp.com' //heroku서버
            //baseURL:'http://localhost:8090' //local 서버 사용시
        });
            api.get('/SelectScheduleDayList',{params:{
            date:full_date
        }}).then(function(response){
            //console.log(response.data);
            setData(response.data);
        })  
    },[])
    

    return (
        <>
            <div>오늘의 할일</div>
            <ul>
                {
                    //data
                    data.map((list) =>{
                        //console.log(list);
                        if(list !== null){
                            console.log("not null!");
                            return(<li key={list.sch_SEQ}>{list.sch_NAME}</li>);
                        } else {
                            return(<li>오늘의 일정이 없습니다.</li>);
                        }                      
                    })
                }
            </ul>
            <button onClick={openModal}>일정 생성</button>
            <Modal open={isModalOpen} close={closeModal}/>
        </>
    )
}

export default TodayWork;