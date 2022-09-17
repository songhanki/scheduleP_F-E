import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Modal from './Modal'

const ScheduleLst =(props) => {
    let history = useHistory();
    const location = useLocation();
    const full_dates = location.state.full_dates;
    const MyWorkList = location.state.props.MyWorkList;

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

        return(
            <> 
            <div className='main'>{full_dates.full_date} 의 할일 List</div>
            <div>
                <button onClick={()=>{history.goBack()}}>뒤로가기</button>
                
            </div>{/**추후 일정 생성 버튼 */}
            <table>
                <thead>
                <tr>
                    <th>제목</th>
                    <th>시작날짜</th>
                    <th>종료날짜</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                    {
                        MyWorkList.map((list) => {
                            if(list.sch_STRDATE.substr(0, 10) <= full_dates.full_date &&
                            list.sch_EDDATE.substr(0, 10) >= full_dates.full_date 
                            ){
                            //if(list.date.substr(0,10) === full_dates.full_date){
                                return(
                                <tr key={list.id}>
                                    <td>{list.sch_NAME}</td>
                                    <td>{list.sch_STRDATE.substr(0,10)}</td>
                                    <td>{list.sch_EDDATE.substr(0,10)}</td>
                                    <td><button>수정</button></td>
                                    <td><button>삭제</button></td>
                                </tr>
                                );
                            }
                        })
                    }
                </tbody>
            </table>
            <Modal open={isModalOpen} close={closeModal}/>
            </>
        );

}


export default ScheduleLst;