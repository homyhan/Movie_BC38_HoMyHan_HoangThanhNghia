import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Form,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { movieList } from "../services/adminService";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { createBrowserHistory } from "history";
import dayjs from "dayjs";
import './User.css';

let history = createBrowserHistory();

const ShowTime = (props) => {
  const params = useParams();
  const idFilm = params.id;
  const navigate = useNavigate();
  const redirect = (page) => {
    navigate("/" + page);
  };
  const formik = useFormik({
    initialValues: {
      maPhim: idFilm,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    validationSchema: Yup.object().shape({
      ngayChieuGioChieu: Yup.string().required("Required"),
      maRap: Yup.string().required("Required"),
      giaVe: Yup.string().required("Required")
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const res = await movieList.addLichChieu(values);
        alert("them thanh cong");
        history.back();
      } catch (error) {
        console.log(error);
      }
      // console.log("values", values);
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  // console.log(state.heThongRapChieu);
  useEffect(
    () => async () => {
      try {
        const res = await movieList.getInfoHeThongRap();
        setState({
          ...state,
          heThongRapChieu: res.data.content,
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const handleChangeHeThongRap = async (value) => {
    // console.log("mahethongrap", value);
    try {
      const res = await movieList.getInfoCumRap(value);
      setState({
        ...state,
        cumRapChieu: res.data.content,
      });
      // console.log(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const onOk = (value) => {
   return formik.setFieldValue(
      "ngayChieuGioChieu",
      dayjs(value).format("DD/MM/YYYY hh:mm:ss")
    );
    
  };
  const handleChangeCumRap = (values) => {
    // console.log(values);
    formik.setFieldValue("maRap", values);
  };
  const onChangeDate = (values) => {
   return formik.setFieldValue(
      "ngayChieuGioChieu",
      dayjs(values).format("DD/MM/YYYY hh:mm:ss")
    );
    
  };
  const onChangeInputNum = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  return (
    <LayoutAdmin>
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
      <h3 className="px-3">Create Movie Showtimes</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item label="Theater system">
          <Select
            options={state.heThongRapChieu?.map((itemHtr, index) => ({
              label: itemHtr.tenHeThongRap,
              value: itemHtr.maHeThongRap,
            }))}
            onChange={handleChangeHeThongRap}
            placeholder="Theater system"
          />
          
        </Form.Item>

        <Form.Item label="Theater cluster">
          <Select
            options={state.cumRapChieu?.map((itemCumRap, index) => ({
              label: itemCumRap.tenCumRap,
              value: itemCumRap.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Theater cluster"
          />
          {formik.touched.maRap && formik.errors.maRap?<p className="text-red-600 font-bold">{formik.errors.maRap}</p>:null}
        </Form.Item>

        <Form.Item label="Show date and time">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
          {formik.touched.ngayChieuGioChieu && formik.errors.ngayChieuGioChieu? <p className="text-red-600 font-bold">{formik.errors.ngayChieuGioChieu}</p>:null}
        </Form.Item>

        <Form.Item label="Price">
          <InputNumber min={75000} max={150000} onChange={onChangeInputNum} />
          {formik.touched.giaVe && formik.errors.giaVe? <p className="text-red-600 font-bold">{formik.errors.giaVe}</p>:null}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="border-1 border-green-500 bg-green-500 text-white" htmlType="submit">
            Submit
          </Button>
          <Button className="ml-2 border-1 border-orange-400 text-orange-400" onClick={()=>history.back()} >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </LayoutAdmin>
  );
};

export default ShowTime;
