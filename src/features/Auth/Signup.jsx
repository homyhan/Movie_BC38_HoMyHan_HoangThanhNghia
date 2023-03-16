import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "./thunk";
import { HomeOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import './Signup.css';
import { useFormik } from "formik";

const Signup = () => {
  
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      hoTen: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().trim().required("Required"),
      matKhau: Yup.string().required("Required").matches(
        /^(?=.*[a-z]*)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#\$%\^&\*]+).{6,10}$/g,
        "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
      ),
      email: Yup.string().required("Required").matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
        "Error email"
      ),
      soDt: Yup.string().required("Required").matches(
        /(^[0-9]{10}$)+/g,
        "Error Phone"
      ),
      hoTen: Yup.string().trim().required("Required").matches(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g,
        "Error FullName"
      ),
      // maLoaiNguoiDung: Yup.string().required('Vui lòng chọn tùy chọn')

    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await dispatch(signup(values));
      // history.back();
      navigate("/signin");
      console.log("values", values);
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="pageSignup">
      <HomeOutlined
        className="text-white text-2xl ml-3 mt-3"
        onClick={() => navigate("/")}
      />
      <div className="contentSignup">
        <div className="mx-auto formSignup">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div>
                <label className="block">Account*</label>
                <input
                  className="w-60 p-3 mb-2"
                  type="text"
                  placeholder="Account"
                  name="taiKhoan"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.taiKhoan &&formik.errors.taiKhoan  ? (
            <p className="text-red-600 font-bold">{formik.errors.taiKhoan}</p>
          ) : null }
                {/* {validation.taiKhoan && <p>{validation.taiKhoan}</p>} */}
              </div>

              <div>
                <label className="block">Password*</label>
                <input
                  className="w-60 p-3 mb-2"
                  type="text"
                  placeholder="Password"
                  name="matKhau"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.matKhau &&formik.errors.matKhau  ? (
            <p className="text-red-600 font-bold">{formik.errors.matKhau}</p>
          ) : null }
                {/* {validation.matKhau && <p>{validation.matKhau}</p>} */}
              </div>

              <div>
                <label className="block">Email*</label>
                <input
                  className="w-60 p-3 mb-2"
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.email &&formik.errors.email  ? (
            <p className="text-red-600 font-bold">{formik.errors.email}</p>
          ) : null }
              </div>

              <div>
                <label className="block">Phone*</label>
                <input
                  className="w-60 p-3 mb-2"
                  type="text"
                  placeholder="Phone"
                  name="soDt"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.soDt &&formik.errors.soDt  ? (
            <p className="text-red-600 font-bold">{formik.errors.soDt}</p>
          ) : null }
              </div>

              {/* <div>
                <label className="block">Mã nhóm*</label>
                <input
                  className="w-60 p-3 mb-2"
                  type="text"
                  placeholder="mã nhóm"
                  name="maNhom"
                  onChange={formik.handleChange}
                ></input>
              </div> */}

              <div>
                <label className="block">Fullname*</label>
                <input
                  className="w-60 p-3 mb-2"
                  type="text"
                  placeholder="Fullname"
                  name="hoTen"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.hoTen &&formik.errors.hoTen  ? (
            <p className="text-red-600 font-bold">{formik.errors.hoTen}</p>
          ) : null }
              </div>
              <div className="text-center">
              <Button htmlType="submit" className="btnSignup">
                Signup
              </Button> <br></br>
              <NavLink className="linktoSignin" to="/signin">Signin?</NavLink>
              </div>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
