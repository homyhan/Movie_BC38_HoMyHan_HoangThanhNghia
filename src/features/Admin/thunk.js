import { movieList } from "./services/adminService"

export const fetchMovieList =(soTrang, maNhom, soPhanTuTrenTrang)=> async (dispatch) => {
    try {
      
      const res = await movieList.getMoviesList(soTrang, maNhom, soPhanTuTrenTrang);
      dispatch({
          type: "SET_MOVIES_ADMIN",
          payload: res.data.content,
        });
        console.log(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };  
  export const fetchMovieListFull =(maNhom)=> async (dispatch) => {
    try {
      
      const res = await movieList.getMoviesListFull(maNhom);
      dispatch({
          type: "SET_MOVIES_FULL_ADMIN",
          payload: res.data.content,
        });
        console.log(res.data.content);
    } catch (error) {
      console.log(error);
    }
  }; 

export const addMoive = (data)=> async (dispatch)=>{
  try {
    const res = await movieList.postMovie(data);
    
  } catch (error) {
    console.log(error);
  }
}

export const updateMovie = (data)=>async (dispatch)=>{
  try {
    const res = await movieList.updateMovieItem(data);
    
  } catch (error) {
    console.log(error);
  }
}

export const deleteMovie = (idFilm) =>async (dispatch)=>{
  try {
    const res = await movieList.deleteMovie(idFilm);
    // dispatch(fetchMovieList());
  } catch (error) {
    console.log(error);
  }
}

export function fetchMovieItem(id){
  return async (dispatch)=>{
    try {
      const res = await movieList.getMovieItem(id);
      dispatch({
        type: "SET_MOVIE_ITEM",
        payload: res.data.content
      })
     console.log(res.data.content);
    } catch (error) {
      console.log(error);
    }
  }
}


// MANAGEMENT USER 
export const fetchUserList =(soTrang, maNhom)=> async (dispatch) => {
  try {
    
    const res = await movieList.getUserList(soTrang, maNhom);
    dispatch({
        type: "SET_USER_LIST",
        payload: res.data.content,
      });
      console.log(res.data.content);
  } catch (error) {
    console.log(error);
  }
};  

export const addUser = (data)=> async (dispatch)=>{
  try {
    const res = await movieList.postUser(data);
    
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = (id) =>async (dispatch)=>{
  try {
    const res = await movieList.deleteUser(id);
    // dispatch(fetchMovieList());
  } catch (error) {
    console.log(error);
  }
}

export function fetchUserItem(id){
  return async (dispatch)=>{
    try {
      const res = await movieList.getUserItem(id);
      dispatch({
        type: "SET_USER_ITEM",
        payload: res.data.content
      })
     console.log(res.data.content);
    } catch (error) {
      console.log(error);
    }
  }
}

export const updateUser = (data)=>async (dispatch)=>{
  try {
    const res = await movieList.updateUserItem(data);
    console.log(res.data.content);
  } catch (error) {
    console.log(error);
  }
}

export const fetchUserSearch =(tuKhoa)=> async (dispatch) => {
  try {
    
    const res = await movieList.searchUserItem(tuKhoa);
    dispatch({
        type: "SET_USER_LIST_SEARCH",
        payload: res.data.content,
      });
      console.log(res.data.content);
  } catch (error) {
    console.log(error);
  }
};  