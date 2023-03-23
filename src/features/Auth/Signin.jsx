import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "./thunk";
import { HomeOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { createBrowserHistory } from "history";
import "./Signin.css";
let history = createBrowserHistory();

const Signin = () => {
  const [loginInfo, setLoginInfo] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(loginInfo);
    if (
      loginInfo.taiKhoan === "" ||
      loginInfo.matKhau === "" ||
      loginInfo.taiKhoan.trim() == "" ||
      loginInfo.matKhau.trim() == ""
    ) {
      return alert("Vui long nhap day du thong tin");
    } else {
      await dispatch(login(loginInfo));
      if (user?.maLoaiNguoiDung === "GV") {
        return navigate("/admin");
      } else {
        return navigate("/");
      }
    }
  };

  return (
    <div className="pageSignin">
      <HomeOutlined
        className="text-white text-2xl ml-3 mt-3
      "
        onClick={() => navigate("/")}
      />
      <div className="contentSignin">
        <div
          className="mx-auto formSignin
        max-w-sm text-center
        sm:max-w-md
        "
        >
          <form
            className="max-w-10 max-h-30
          "
            onSubmit={handleSubmit}
          >
            <div className="">
              <div className="">
                <label className="block max-w-xs">Username</label>
                <input
                  onChange={handleChange}
                  className="p-3 mb-2 rounded-lg
                  max-w-xs ml-0"
                  type="text"
                  name="taiKhoan"
                  placeholder="Username"
                ></input>
              </div>
              <div>
                <label className="block">Password</label>
                <input
                  onChange={handleChange}
                  className="p-3 mb-2 rounded-lg
                  max-w-xs"
                  type="password"
                  name="matKhau"
                  placeholder="Password"
                ></input>
              </div>
              <div className="text-center">
                <Button htmlType="submit" className="btnSigin">
                  Signin
                </Button>{" "}
                <br></br>
                <NavLink className="linktoSignup" to="/signup">
                  Signup?
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
