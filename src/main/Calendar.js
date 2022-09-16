import React from 'react';
import './calendar.css'
import { useHistory } from 'react-router-dom';



const Calendar = (props) => {
  let state = {today:new Date()};
  
  var this_year = state.today.getFullYear();
  var this_month = state.today.getMonth();
  const monList = [
      "1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",
    ];
    

  //let calendarDays = [];
  let new_month = [];

  const makeCal = (year,month) =>{ // 달력 내부의 일 받아오는 함수
    const prevLast = new Date(year, month, 0);
    const thisLast = new Date(year, month + 1, 0);

    const PLDate = prevLast.getDate(); //지난달 마지막 날짜
    const PLDay = prevLast.getDay();//지난달 마지막 요일

    const TLDate = thisLast.getDate(); //이번달 마지막 날짜
    const TLDay = thisLast.getDay();//이번달 마지막 요일

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];
        
    let full_dates = [];

    if (PLDay !== 6) { // 년도가 바뀔때 / month 값이 1 이하일때 full_date 값 변경하는 것 적용해야함(nextMonth, preMonth 에서 year,month 넘기는 작업쪽 확인 필요)
      for (let i = 0; i < PLDay + 1; i++) {
        let Pdate = PLDate -i;
        prevDates.unshift(Pdate);
        let Pmonth = month<10? "0"+month:month;
        let full_date = year+"-"+Pmonth+"-"+Pdate;
        full_dates.unshift({"full_date":full_date, "date":Pdate});

      } 
    }

    for(let i=0;i<thisDates.length; i++){
      let Tdate = month+1;
      Tdate = Tdate<10 ? "0"+Tdate : Tdate;
      let Tday = thisDates[i]<10? "0"+thisDates[i] : thisDates[i];
      
      let full_date = year+"-"+Tdate+"-"+Tday;
      full_dates.push({"full_date":full_date, "date":thisDates[i]});
    }

    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
      let TLdate = month+2;
      TLdate = TLdate<10?"0"+TLdate:TLdate;
      let full_date = year+"-"+TLdate+"-0"+i;
      full_dates.push({"full_date":full_date, "date":i});
    }
    

    const datamap = full_dates.map((full_dates,idx) => 
      <div key={idx} className='date' onClick={() => {
        history.push({
          pathname:"/ScheduleLst",
          state:{
            full_dates,
            props
          }
        })
        
      }}>

        {full_dates.date}
        {
          props.MyWorkList.map((workdate) => {
            if(workdate.sch_STRDATE.substr(0, 10) <= full_dates.full_date &&
              workdate.sch_EDDATE.substr(0, 10) >= full_dates.full_date 
              ){
              return(
                  <div key={workdate.sch_SEQ} className='schedule'>
                    {workdate.sch_NAME} 
                  </div>
              );
          }
          })
        }
      </div>
    );
      
    return(
      datamap
    )
  }

  //◀ ▶ 버튼 클릭시 년/월 이동 start
  const [month, changeMonth] = React.useState(this_month);
  const [year, changeYear] = React.useState(this_year);
  
  const nextMonth = () => {
      if (month !== 11) {
          changeMonth((month) => month + 1);
        } else {
          changeMonth((month) => month - 11);
          changeYear((year) => year + 1);
        }
        makeCal(year, month);
        console.log("next!", year, month, new_month);
  };
  const prevMonth = () => {
      if (month !== 0) {
          changeMonth((month) => month - 1);
        } else {
          changeMonth((month) => month + 11);
          changeYear((year) => year - 1);
        }
        makeCal(year, month);
  };



  let history = useHistory();
  

  //◀ ▶ 버튼 클릭시 년/월 이동 end
  return (
      <div className='calendar'>
          <div className='cal_header'>
              <button onClick={prevMonth}>◀</button>
              <span>{year}년 {monList[month]}</span>
              <button onClick={nextMonth}>▶</button>
          </div>
          <div className='main'>
            <div className='days'>
                <span className='day'>일</span>
                <span className='day'>월</span>
                <span className='day'>화</span>
                <span className='day'>수</span>
                <span className='day'>목</span>
                <span className='day'>금</span>
                <span className='day'>토</span>
            </div>
            <div className='dates'>
              <>
                {makeCal(year,month)}
              </>
            </div>
          </div>
         
      </div>
  );
}



export default Calendar;