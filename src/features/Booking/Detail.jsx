import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Detail.css";
import { fetchMovieDetail } from "./thunk";
import { Button, Tabs } from "antd";
import moment from "moment";

const Detail = () => {
  const { filmDetail } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params.id;
  console.log(movieId);
  useEffect(() => {
    dispatch(fetchMovieDetail(movieId));
  }, [params, dispatch]);
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${filmDetail?.hinhAnh})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="detail_banner"
      >
        <div className="detail_intro">
          <div className="detail_left">
            <img
              style={{ width: "200px", height: "250px", objectFit:'cover' }}
              src={filmDetail?.hinhAnh}
            ></img>
            <h3 className="
            text-xs inline 
            sm:text-sm sm:inline sm:ml-2
            md:text-xl md:block
            lg:text-lg 
            xl:block xl:text-xl xl:ml-0">
              {filmDetail?.tenPhim}
              </h3>
            
          </div>
          <div className="detail_right container">
            <p className="text-xs text-black ml-4
            sm:text-sm sm:text-black sm:ml-8 
            md:text-md 
            lg:text-lg lg:ml-0
            xl:text-black xl:ml-0 xl:text-xl">{filmDetail?.moTa}</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 mx-auto my-10">
        {filmDetail?.heThongRapChieu?.length === 0? <h1 style={{color:'gray', textAlign:'center', margin:'30px 0px'}}>Dữ liệu chưa được cập nhật</h1>:<Tabs
          defaultActiveKey="1"
          centered
          items={filmDetail?.heThongRapChieu?.map((item, index) => {
            return {
              label: <img style={{ width: "80px" }} src={item.logo}></img>,
              key: index,
              children: item.cumRapChieu.map((itemCumRap) => {
                return (
                  <div className="grid grid-cols-2 text-center mb-2 ">
                    <b>{itemCumRap.tenCumRap}</b>

                    <Button
                      onClick={() => {
                        navigate(
                          "/seats/" +
                            itemCumRap.lichChieuPhim.map(
                              (itemLichChieuPhim) => {
                                return itemLichChieuPhim.maLichChieu;
                              }
                            )
                        );
                      }}
                    >
                      {itemCumRap.lichChieuPhim.map((itemLichChieuPhim) => {
                        return moment(
                          itemLichChieuPhim.ngayChieuGioChieu
                        ).format("DD/MM/YYYY hh:mm:ss");
                      })}
                    </Button>
                  </div>
                );
              }),
            };
          })}
        />}
        
      </div>
    </div>
  );
};

export default Detail;
