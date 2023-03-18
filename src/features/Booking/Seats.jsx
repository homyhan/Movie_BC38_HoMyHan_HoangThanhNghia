import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { bookingTicket, fetchScheduleDetail } from "./thunk";
import { Button, message } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
// import style  from './seats.module.css';
import "./seats.css";
// import { movieServ } from "../../services/movieService";

const Seats = () => {
  <h1>abc</h1>
  // từ url => mã lịch chiếu
  const params = useParams();
  const scheduleId = params.id;
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { selectedScheduleDetail, dsGheDangDat, isLoading} = useSelector(
    (state) => state.booking
  );
  const {user} = useSelector(state=>state.auth);
  //call api =>dữ liệu phòng chiếu => store
  useEffect(() => {
    dispatch(fetchScheduleDetail(scheduleId));
  }, [scheduleId, dispatch, dsGheDangDat]);
  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Booking',
        duration: 2.5,
      })
      .then(() => message.success('Success', 2.5))
      // .then(() => message.info('Loading finished', 2.5));
  };
  return (
    <div className="grid grid-cols-5 gap-5 seats_content">
       {contextHolder}
      
      <div className="col-span-3">
      <ArrowLeftOutlined title="back to home" className="arrow" onClick={()=> navigate("/")}/>
        <h1 className="text-center py-3 bg-stone-300 w-11/12 mx-auto screen">
          SCREEN
        </h1>
        <div className="text-center">
          {selectedScheduleDetail?.danhSachGhe?.map((item, index) => {
          let gheVip = item.loaiGhe === "Vip" ? "vip" : "";
          let gheDaDat = item.daDat === true ? "booked" : "";
          let gheDangDat ='';
          let indexGheDangDat = dsGheDangDat.findIndex(
            gheDD => gheDD.maGhe === item.maGhe
          );
          if (indexGheDangDat != -1) {
           gheDaDat = "booking";
          }
          return (
            <Fragment key={index}>
              <button
                onClick={() => {
                  dispatch({
                    type: "BOOKING",
                    payload: item,
                  });
                }}
                key={index}
                disabled={item.daDat}
                className={`chair ${gheVip} ${gheDaDat} ${gheDangDat}`}
              >
                {item.tenGhe}
              </button>
              
              {/* {isLoading ? <span class="loader"></span>: null} */}
              
            </Fragment>
          );
            
          // <button key={item.maGhe} className='m-2 p-2'>{item.tenGhe}</button>
        })}
        </div>
        
        <div className="mx-auto flex justify-center table-color">
          <table className="divide-y divide-gray-200 w-2/3 mx-auto">
            <thead className="bg-gray-50 p-5">
              <tr>
                <th>Ghế đã đặt</th>
                <th>Ghế chưa đặt</th>
                <th>Ghế đang đặt</th>
                <th>Ghế VIP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="chair booked"></td>
                <td className="chair"></td>
                <td className="chair booking"></td>
                <td className="chair vip"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-2 mr-5">
        
        <div>
          <h1 className="seats_price text-center">{dsGheDangDat?.reduce((prevValue, current)=>{
          return prevValue+current.giaVe
        }, 0).toLocaleString()} VND</h1>
          <h2>Tên phim: {selectedScheduleDetail?.thongTinPhim?.tenPhim}</h2>
          
        </div>
        <div className="soGhe_gia">
          <p>Ghế:  {dsGheDangDat.map((item) => (
            <span>{item.tenGhe} </span>
          ))}</p>
          <p>Giá: {dsGheDangDat.reduce((prevValue, current)=>{
          return prevValue+current.giaVe
        }, 0).toLocaleString()}</p>
        </div>
        <div className="thongtinuser">
          <h2>Thông tin: </h2>
          <p >Họ tên: {user?.hoTen}</p>
          <p className="text-xs">Email: {user?.email}</p>
        </div>
        <div>
          <button className="btnCheckout" onClick={()=>{
            const thongTinDatVe = {};
            thongTinDatVe.maLichChieu = scheduleId;
            thongTinDatVe.danhSachVe = dsGheDangDat;
            console.log(thongTinDatVe);
            if(dsGheDangDat?.length ===0){
              // dispatch(bookingTicket(thongTinDatVe));
              alert("chua dat ve")
            }else{
              dispatch({
                type:'LOADING',
                payload: true
              })
              setTimeout(()=>{
                  dispatch(bookingTicket(thongTinDatVe));
              }, 0)
              setTimeout(() => {
                dispatch({
                  type: "SET_DSGHEDANGFAT",
                })
              }, 500);
              success();
              // alert("da dat")
            }
            
          }}>Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Seats;
