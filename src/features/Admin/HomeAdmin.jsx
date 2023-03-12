import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { fetchMovieList } from './thunk';
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import Film from './components/Film';
import User from './components/User';

const HomeAdmin = (props) => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const {user} = useSelector(state=>state.auth);
  const {movies} = useSelector(state=>state.admin);
  useEffect(()=>{
    dispatch(fetchMovieList(searchParam.get("page"), user?.maNhom, 10));
}, [dispatch, searchParam.get("page")]);

  const isAdmin = JSON.parse(localStorage.getItem("USER_LOGIN"))?.maLoaiNguoiDung==='QuanTri';
  // if(!localStorage.getItem("USER_LOGIN") || !isAdmin){
  //   return <Navigate to="/signin"></Navigate>
  // }
  
  return (
    <>
        <Film></Film>
        
    </>    
  )
}

export default HomeAdmin