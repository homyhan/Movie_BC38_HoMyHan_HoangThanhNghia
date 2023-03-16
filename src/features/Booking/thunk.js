import axios from "axios";
import { https } from "../../services/config";
import { movieServ } from "../../services/movieServices";
export const fetchBanners = async (dispatch) => {
  try {
    // const res = await axios({
    //   method: "GET",
    //   url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
    //   headers: {
    //     TokenCybersoft:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOCIsIkhldEhhblN0cmluZyI6IjA2LzA4LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MTI4MDAwMDAwMCIsIm5iZiI6MTY2MjM5NzIwMCwiZXhwIjoxNjkxNDI3NjAwfQ.66mNB20qUNFA8TlIzjAq7Ekv1hVfR3hQB4I3_yLui8Y",
    //   },
    // });
    const res = await movieServ.getBanners();
    dispatch({
      type: "SET_BANNER",
      payload: res.data.content,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieList =(soTrang)=> async (dispatch) => {
  try {
    // const res = await axios({
    //   method: "GET",
    //   url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
    //   params: {
    //     maNhom: "GP01",
    //     soTrang,
    //     soPhanTuTrenTrang: 8,
    //   },
    //   headers: {
    //     TokenCybersoft:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOCIsIkhldEhhblN0cmluZyI6IjA2LzA4LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MTI4MDAwMDAwMCIsIm5iZiI6MTY2MjM5NzIwMCwiZXhwIjoxNjkxNDI3NjAwfQ.66mNB20qUNFA8TlIzjAq7Ekv1hVfR3hQB4I3_yLui8Y",
    //   },
    // });
    const res = await movieServ.getMoviesList(soTrang);
    dispatch({
        type: "SET_MOVIES",
        payload: res.data.content,
      });
  } catch (error) {
    console.log(error);
  }
};

export function fetchScheduleDetail(id){
  return async (dispatch)=>{
    try {
      const res = await movieServ.getScheduleDetail(id);
      dispatch({
        type: "SET_SCHEDULE",
        payload: res.data.content
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchMovieDetail(id){
  return async (dispatch)=>{
    try {
      const res = await movieServ.getThongTinLichChieuPhim(id);
      dispatch({
        type: "SET_MOVIE_DETAIL",
        payload: res.data.content
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const bookingTicket = (data)=> async (dispatch)=>{
  try {
    const res = await movieServ.datVe(data);
    
  } catch (error) {
    console.log(error);
  }
}