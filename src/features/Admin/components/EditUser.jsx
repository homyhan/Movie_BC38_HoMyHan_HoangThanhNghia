import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
  Space,
  Select,
} from "antd";

import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addMoive, addUser, fetchUserItem, updateUser } from "../thunk";
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const EditUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userItem = params.id;
  useEffect(()=>{
     dispatch(fetchUserItem(userItem))
  }, [])

  const {selectedUser} = useSelector(state=>state.admin);
  const navigate = useNavigate();
  const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN")).maNhom;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: selectedUser?.taiKhoan,
      matKhau: selectedUser?.matKhau,
      email: selectedUser?.email,
      soDt: selectedUser?.soDT,
      maNhom: selectedUser?.maNhom,
      maLoaiNguoiDung: selectedUser?.maLoaiNguoiDung,
      hoTen: selectedUser?.hoTen,
    },
    validationSchema: Yup.object().shape({
      
      // matKhau: Yup.string().required().matches(
      //   /^(?=.*[a-z]*)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#\$%\^&\*]+).{6,10}$/g,
      //   "Password must be from 6 to 10 characters (contain at least 1 numeric character, 1 uppercase character, 1 special character)"
      // ),
      email: Yup.string().required("Required").matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
        "Error email"
      ),
      soDt: Yup.string().required("Required").matches(
        /(^[0-9]{10}$)+/g,
        "Error phone number"
      ),
      hoTen: Yup.string().trim().required("Required").matches(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g,
        "Enter FullName"
      ),
      maLoaiNguoiDung: Yup.string().required('Vui lòng chọn tùy chọn')

    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await dispatch(updateUser(values));
      // await success();
      history.back();
      // console.log("values", values);
    },
  });

  const handleChangeDoiTuong = (values) => {
    // console.log(values);
    formik.setFieldValue("maLoaiNguoiDung", values);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const handleChangeMaNhom = (values) => {
    // console.log(values);
    formik.setFieldValue("maNhom", values);
  };
  return (
    <LayoutAdmin>
      {contextHolder}
      <h3 className="px-3">Edit User</h3>
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
        {/* <Form.Item label="Tai khoan">
          <Input name="taiKhoan" disabled={true} onChange={formik.handleChange} value={formik.values.taiKhoan} />
        </Form.Item> */}
        <Form.Item label="Fullname">
          <Input name="hoTen" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hoTen}/>
          {formik.touched.hoTen &&formik.errors.hoTen  ? (
            <p className="text-red-600 font-bold">{formik.errors.hoTen}</p>
          ) : null }
        </Form.Item>
        {/* <Form.Item label="Mat Khau">
          <Input name="matKhau" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.matKhau} />
          {formik.touched.matKhau &&formik.errors.matKhau  ? (
            <p className="text-red-600 font-bold">{formik.errors.matKhau}</p>
          ) : null }
        </Form.Item> */}
        <Form.Item label="Email">
          <Input
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.touched.email &&formik.errors.email  ? (
            <p className="text-red-600 font-bold">{formik.errors.email}</p>
          ) : null }
        </Form.Item>
        <Form.Item label="Phone">
          <Input name="soDt" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.soDt} />
          {formik.touched.soDt &&formik.errors.soDt  ? (
            <p className="text-red-600 font-bold">{formik.errors.soDt}</p>
          ) : null }
        </Form.Item>

        <Form.Item label="Permission">
          <Select
            options={[
              {
                label: "User",
                value: "KhachHang",
              },
              {
                label: "Admin",
                value: "QuanTri",
              },
            ]}
            onChange={handleChangeDoiTuong}
            
            placeholder="Permission"
            value={formik.values.maLoaiNguoiDung}
          />
         
        </Form.Item>


        <Form.Item className="text-center">
          <Button
            className="mx-2 border-1 border-green-500 bg-green-500 text-white"
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            className="border-1 border-orange-400 text-orange-400"
            onClick={() => {
              history.back();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </LayoutAdmin>
  );
};

export default EditUser;
