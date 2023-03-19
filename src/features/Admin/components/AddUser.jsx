import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Form,
  Input,
  message,
  Select,
} from "antd";

import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../thunk";
import { useNavigate } from "react-router-dom";
import { movieList } from "../services/adminService";
import { createBrowserHistory } from "history";
import './User.css';
let history = createBrowserHistory();

const AddUser = () => {
  const redirect = (page) => {
    navigate("/" + page);
  };
  const [state, setState] = useState({
    loaiNguoiDung: []
  })
  useEffect(
    () => async () => {
      try {
        const res = await movieList.getLoaiNguoiDung();
        setState({
          ...state,
          loaiNguoiDung: res.data.content,
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN")).maNhom;
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().trim().required("Required").matches(
        /([A-z]\S)+/g,
        "Account mustn't whitespace"
      ),
      matKhau: Yup.string().required("Required").matches(
        /^(?=.*[a-z]*)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#\$%\^&\*]+).{6,10}$/g,
        "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
      ),
      email: Yup.string().required("Required").matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
        "Error Email"
      ),
      soDt: Yup.string().required("Required").matches(
        /(^[0-9]{10}$)+/g,
        "Error Phone"
      ),
      hoTen: Yup.string().trim().required("Required").matches(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g,
        "Error Fullname"
      ),
      maLoaiNguoiDung: Yup.string().required('Vui lòng chọn tùy chọn')

    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await dispatch(addUser(values));
      history.back()
      console.log("values", values);
    },
  });

  const handleChangeDoiTuong = (values) => {
    console.log(values);
   return formik.setFieldValue("maLoaiNguoiDung", values);
  };

  const [messageApi, contextHolder] = message.useMessage();
 
  return (
    <LayoutAdmin>
      {contextHolder}
      <div className="top2btn">
        <div className="main2btn">
        <Button
          className="w-full mb-2 rounded-none"
          onClick={() => {
            redirect("admin");
          }}
        >
          Movie Manager
        </Button>
        
        <Button
          onClick={() => {
            redirect("admin/user");
          }}
          className="w-full rounded-none mb-2"
        >
          User Manager
        </Button>
        </div>
        
      </div>
      <h3 className="px-3">Add User</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
        size="default"
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Form.Item label="Account">
          <Input placeholder="Account" name="taiKhoan" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.taiKhoan &&formik.errors.taiKhoan  ? (
            <p className="text-red-600 font-bold">{formik.errors.taiKhoan}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Fullname">
          <Input placeholder="Fullname" name="hoTen" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.hoTen &&formik.errors.hoTen  ? (
            <p className="text-red-600 font-bold">{formik.errors.hoTen}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Password">
          <Input placeholder="Password" name="matKhau" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.matKhau &&formik.errors.matKhau  ? (
            <p className="text-red-600 font-bold">{formik.errors.matKhau}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
          />
          {formik.touched.email &&formik.errors.email  ? (
            <p className="text-red-600 font-bold">{formik.errors.email}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Phone">
          <Input name="soDt" placeholder="Phone" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.soDt &&formik.errors.soDt  ? (
            <p className="text-red-600 font-bold">{formik.errors.soDt}</p>
          ) : null }
        </Form.Item>


        <Form.Item label="Permission">
          <Select
            options={state.loaiNguoiDung?.map((item, index)=>({
              label: item.tenLoai,
              value: item.maLoaiNguoiDung,
            }))}
            onChange={handleChangeDoiTuong}
            onBlur={() => formik.setFieldTouched('select', true)}
            placeholder="Permission"
          />
          {formik.touched.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung ? (
            <p className="text-red-600 font-bold">{formik.errors.maLoaiNguoiDung}</p>
          ) : null}
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            className="mx-2 border-1 border-green-500 bg-green-500 text-white"
            htmlType="submit"
          >
            Submit and back
          </Button>
          <Button
            className="border-1 border-orange-400 text-orange-400"
            onClick={() => {
              navigate("/admin/user");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </LayoutAdmin>
  );
};

export default AddUser;


