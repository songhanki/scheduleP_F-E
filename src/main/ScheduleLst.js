import React, {useState} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import Modal from './ModalModWork '

const ScheduleLst =(props) => {

    let history = useHistory();
    const location = useLocation();
    const full_dates = location.state.full_dates;
    const MyWorkList = location.state.props.MyWorkList;

    const [isModalOpen, setModalState] = useState(false);
    const [sch_seq, setSeq] = useState("");

    const openModal = (event) => {
        setSeq(event.target.getAttribute('data-msg'));
        //console.log("seq: "+setSeq);
        setModalState(true);
    };

    const delSchedule = (event) => {
        setSeq(event.target.getAttribute('data-msg'));
        const api = axios.create({
            baseURL:'https://schedulep-be.herokuapp.com' //heroku서버
            });
          api.put('/UpdateScheduleOne',{params:{
            seq:sch_seq
            }}).then(function(response){
            console.log(response.data);
            if(response.data=="200ok"){
              alert('일정이 정상적으로 삭제되었습니다.');
              props.history.push('/');
            }
          });
        
      };

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
                                <tr key={list.sch_SEQ}>
                                    <td>{list.sch_NAME}</td>
                                    <td>{list.sch_STRDATE.substr(0,10)}</td>
                                    <td>{list.sch_EDDATE.substr(0,10)}</td>
                                    <td><button onClick={openModal} data-msg={list.sch_SEQ}>수정</button></td>
                                    <td><button onClick={delSchedule} data-msg={list.sch_SEQ}>삭제</button></td>
                                </tr>
                                );
                            }
                        })
                    }
                </tbody>
            </table>
            <Modal open={isModalOpen} close={closeModal} mainseq={sch_seq}/>
            </>
        );

}


export default ScheduleLst;