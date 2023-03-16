import React, { useEffect, useState } from "react";
import { Button, Tabs } from "antd";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './MovieTab.css';
import { movieServ } from "../../../services/movieServices";

const MoviesTab = () => {
  const userLogin = useSelector(state=>state.auth.user);
  const [dataMovie, setDataMovie] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      async function fetchScheduleByTheater() {
        let res = await movieServ.getScheduleByTheater();
        console.log("res",res);
        setDataMovie(res.data.content);
      }
      fetchScheduleByTheater();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function goToBooking(id) {
    navigate("/seats/" + id);
  }

  // CHECK SIGNIN 
  const checkLogin = (id)=>{
    if(userLogin){
      goToBooking(id);
    }else{
      navigate("/signin");
    }
  }

  let renderHeThongRap = () => {
    return dataMovie.map((heThongRap) => {
      return {
        label: (
          <img
            style={{
              height: "50px",
              width: "50px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
            }}
            src={heThongRap.logo}
          ></img>
        ),
        key: heThongRap.maHeThongRap,
        children: (
          <Tabs
            defaultActiveKey="0"
            tabPosition={"left"}
            style={{
              height: 550,
            }}
            items={heThongRap.lstCumRap.map((cumRap) => {
              return {
                key: cumRap.maCumRap,
                label: (
                  <div style={{ width: "356px" }} className="text-left text-white">
                    <h1 className="text-xl">{cumRap.tenCumRap}</h1>
                    <p className="w-full">{cumRap.diaChi}</p>
                  </div>
                ),
                children: (
                  <div
                    style={{
                      height: 550,
                      overflowY: "scroll",
                    }}
                  >
                    {cumRap.danhSachPhim.map((item) => {
                      return (
                        <div className="flex my-2" key={item.maPhim}>
                          <img
                            style={{
                              height: "150px",
                              width: "100px",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                            src={item.hinhAnh}
                          ></img>
                          <div>
                            <p className="text-white">
                              <b>{item.tenPhim}</b>
                            </p>
                            <div>
                              {item.lstLichChieuTheoPhim.map((itemTime) => {
                                return (
                                  <Button
                                    onClick={() =>
                                      checkLogin(itemTime.maLichChieu)
                                    }
                                    className="bg-stone-20 m-1 btnTime font-bold"
                                    key={itemTime.maPhim}
                                  >
                                    <p className="text-lime-600">
                                      {moment(
                                        itemTime.ngayChieuGioChieu
                                      ).format("DD-MM-yyyy")}{" "}
                                      <span className="font-bold text-2xl text-black">
                                        ~
                                      </span>{" "}
                                      <span className="text-red-600 ">
                                        {moment(
                                          itemTime.ngayChieuGioChieu
                                        ).format("hh:mm")}
                                      </span>{" "}
                                    </p>
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ),
              };
            })}
          ></Tabs>
        ),
      };
    });
  };
  return (
    <div className="container mx-auto">
      <h1 className="mb-5 pt-5 text-center text-white titleMovieTab">Theater Cluster</h1>
      <div style={{ border: "1px solid gray", padding: "20px 25px" }}>
        <Tabs
          defaultActiveKey="0"
          tabPosition={"left"}
          style={{
            height: 550,
            margin: "0px",
          }}
          items={renderHeThongRap()}
        />
      </div>
    </div>
  );
};

export default MoviesTab;
