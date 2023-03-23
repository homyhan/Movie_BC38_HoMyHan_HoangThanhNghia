
import { movieServ } from "../../services/movieServices";
export const fetchBanners = async (dispatch) => {
  try {
    
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