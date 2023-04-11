import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Header.css";
const Header = () => {
  const userLogin = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = window.location.href;
  return (
    <div className="bg-black py-4">
      <div className="container flex mx-auto justify-between items-center content-header">
        <div>
          <NavLink className="headermovie mr-4" to="/">
            CyberMovie
          </NavLink>
          {userLogin?.maLoaiNguoiDung === 'QuanTri'?<NavLink className="text-white linkToAdmin" style={url.includes("admin")===true? {color:'#ffd60a'}:null} to="/admin">Admin</NavLink>:null}
          
        </div>

        <nav>
          {userLogin ? (
            <div style={{ display: "flex", alignItems:'center' }}>
              <p className="text-white mr-2 nameuser">Hello {userLogin.hoTen}</p>
              <UserOutlined
                style={{
                  height: "30px",
                  width: "30px",
                  textAlign: "center",
                  borderRadius: "50%",
                }}
                className="text-xl text-white border-solid border-2 border-white mx-2"
              />
              <Button
                onClick={() => {
                  dispatch({
                    type: "LOGOUT",
                  });
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <NavLink
                className={(params) => {
                  const classes = " mr-5 font-semibold auth";
                  if (params.isActive) {
                    return clsx("text-yellow-300 ", classes);
                  }
                  return clsx("text-white", classes);
                }}
                to="/signin"
              >
                Signin
              </NavLink>
              <NavLink
                className={(params) => {
                  const classes = " mr-5 font-semibold auth";
                  if (params.isActive) {
                    return clsx("text-yellow-300", classes);
                  }
                  return clsx("text-white", classes);
                }}
                to="/signup"
              >
                Signup
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
