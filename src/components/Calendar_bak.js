import React from 'react';

const Calendar = (props) => {
    //constructor(props) {
    //    super(props);
    //    this.state = {today:new Date()};
    //  }
   
    let state = {today:new Date()};

    //render(){
        var this_year = state.today.getFullYear();
        var this_month = state.today.getMonth();
        console.log("this_year :"+this_year);
        console.log("this_month :"+this_month);
        const monList = [
            "1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",
          ];



        let calendarDays = [];
        let new_month = [];

        const makeCal = (year,month) =>{ // 달력 내부의 일 받아오는 함수
            let firstDayOfMonth = new Date(year, month, 1).getDay(); //1일이 시작되는 위치
            let endDateOfMonth = new Date(year, month + 1, 0).getDate(); // 월의 마지막 날

            let endDateOfPreMonth = new Date(year, month, 0).getDate();

            calendarDays = [];
            new_month = [];
        
            let cnt = 1;
            for (let i = 0; i < 6; i++) {
              var _days = [];
              var next_days = [];
              var pre_days = [];
              for (let j = 0; j < 7; j++) {
                if (cnt > endDateOfMonth) {
                  //_days.push(""); // 전월 data 입력
                  pre_days.push("");
                } else if (firstDayOfMonth > j && i === 0) {
                  //_days.push(""); // 후월 data 입력
                  next_days.push("");
                } else {
                  _days.push(cnt); // 현월 data 입력
                  cnt++;
                }
              }
              calendarDays.push(_days);
            }
            console.log(calendarDays);

            new_month = calendarDays.map((week) => {
                return(
                    <div key={week}>
                        {week.map((day, idx) => {
                            let dateKey =
                            year +
                            "-" +
                            (month < 9 ? "0" + (month + 1) : month + 1) +
                            "-" +
                            (day < 10 ? "0" + day : day);
                            console.log(dateKey);
                            return(
                                <div key={dateKey} >{day}</div>
                            )
                           
                            
                        })}
                    </div>
                )

            });
            return new_month;
            
        }

        //◀ ▶ 버튼 클릭시 년/월 이동 start
        const [month, changeMonth] = React.useState(this_month);
        const [year, changeYear] = React.useState(this_year);
        const nextMonth = () => {
            if (month != 11) {
                changeMonth((month) => month + 1);
              } else {
                changeMonth((month) => month - 11);
                changeYear((year) => year + 1);
              }
              makeCal(year, month);
              console.log("next!", year, month, new_month);
        };
        const prevMonth = () => {
            if (month != 0) {
                changeMonth((month) => month - 1);
              } else {
                changeMonth((month) => month + 11);
                changeYear((year) => year - 1);
              }
              makeCal(year, month);
        };
        //◀ ▶ 버튼 클릭시 년/월 이동 end

        return (
            <div >
                <div >
                    <button onClick={prevMonth}>◀</button>
                    <div>{year}년 {monList[month]}</div>
                    <button onClick={nextMonth}>▶</button>
                </div>
                <div >
                    <div>일</div>
                    <div>월</div>
                    <div>화</div>
                    <div>수</div>
                    <div>목</div>
                    <div>금</div>
                    <div>토</div>
                    
                {makeCal(year,month)}

                </div>
            </div>
        )
    //}
}

export default Calendar;