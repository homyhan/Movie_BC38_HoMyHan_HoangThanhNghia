import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./thunk";

const Signin = () => {
  const [loginInfo, setLoginInfo] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user}=useSelector(state=>state.auth);
  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  // const checkAdmin = ()=>{
  //   const localUserLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
  //   if(user?.maLoaiNguoiDung!=='KhachHang'){
  //    return navigate('/admin');
  //   }else{
  //     return navigate('/');
  //   }
  // }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(loginInfo);
    if(loginInfo.taiKhoan==='' || loginInfo.matKhau==='' || loginInfo.taiKhoan.trim()=='' || loginInfo.matKhau.trim()==''){
      return alert("Vui long nhap day du thong tin")
    }else{
      await dispatch(login(loginInfo));
      // checkAdmin();
      if(user?.maLoaiNguoiDung ==='QuanTri'){
        return navigate('/admin');
       }else{
         return navigate('/');
       }
    }
    
    
  };

  return (
    <div className="text-center mt-12 py-10 border-solid border-2 w-1/2 mx-auto">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label className="block">Username</label>
            <input
              onChange={handleChange}
              className="w-60 p-3 mb-2 rounded-lg"
              type="text"
              name="taiKhoan"
              placeholder="Username"
            ></input>
          </div>
          <div>
            <label className="block">Password</label>
            <input
              onChange={handleChange}
              className="w-60 p-3 mb-2 rounded-lg"
              type="password"
              name="matKhau"
              placeholder="Password"
            ></input>
          </div>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
