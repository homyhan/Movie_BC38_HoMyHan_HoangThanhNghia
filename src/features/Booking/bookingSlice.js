import { produce } from "immer";
const initialState = {
  banners: [],
  movies: {},
  selectedScheduleDetail: null,
  trailer: "",
  filmDetail:{},
  dsGheDangDat:[],
  isLoading: false
};

export const bookingReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === "SET_BANNER") {
      draft.banners = payload;
    }
    if (type === "SET_MOVIES") {
      draft.movies = payload;
    }
    if (type === "SET_SCHEDULE") {
      draft.selectedScheduleDetail = payload;
      console.log(payload);
    }
    if(type === "SET_TRAILER"){
      draft.trailer = payload;
      console.log(draft.trailer);
    }
    if(type === "SET_MOVIE_DETAIL"){
      draft.filmDetail = payload;
      console.log(payload);
    }
    if(type === "BOOKING"){
      let index = draft.dsGheDangDat.findIndex((item)=>item.maGhe === payload.maGhe);
      if(index!=-1){
        draft.dsGheDangDat.splice(index, 1);
      }else{
        draft.dsGheDangDat.push(payload);
      }
    }
    if(type === "LOADING"){
      draft.isLoading = true
    }
    if(type === "SET_DSGHEDANGFAT"){
      draft.dsGheDangDat=[];
      draft.isLoading = false;
    }
    
  });
};
