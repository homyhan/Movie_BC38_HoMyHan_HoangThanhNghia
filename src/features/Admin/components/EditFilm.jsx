import React, { useState, useEffect } from "react";
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
} from "antd";
import dayjs from "dayjs";
import moment from 'moment';
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieItem, updateMovie } from "../thunk";
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import './User.css';
let history = createBrowserHistory();

const { TextArea } = Input;

const EditFilm = () => {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const redirect = (page) => {
    navigate("/" + page);
  };
  const movieItem = params.id;
  useEffect(() => {
    dispatch(fetchMovieItem(movieItem));
  }, []);

  const { selectedFilm } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN")).maNhom;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: selectedFilm?.maPhim,
      tenPhim: selectedFilm?.tenPhim,
      trailer: selectedFilm?.trailer,
      moTa: selectedFilm?.moTa,
      ngayKhoiChieu: moment(selectedFilm?.ngayKhoiChieu).format('DD/MM/YYYY'),
      dangChieu: selectedFilm?.dangChieu,
      sapChieu: selectedFilm?.sapChieu,
      hot: selectedFilm?.hot,
      danhGia: selectedFilm?.danhGia,
      maNhom: idGroup,
      hinhAnh: null,
    },
    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().trim().required("Required"),
      trailer: Yup.string().trim().required("Required").matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    ),
      moTa: Yup.string().trim().required("Required"),
      danhGia: Yup.number()
        .required("Required")
        .min(0, "Số sao phải lớn hơn hoặc bằng 0")
        .max(10, "Số sao phải nhỏ hơn hoặc bằng 10"),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log("values", values);
      values.maNhom = selectedFilm?.maNhom;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      await dispatch(updateMovie(formData));
      
      history.back();
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = dayjs(value).format('DD/MM/YYYY')
    console.log(ngayKhoiChieu);
    return formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNum = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (evt) => {
    let file = evt.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        setImgSrc(evt.target.result);
        console.log(evt.target.result);
      };
      return formik.setFieldValue("hinhAnh", file);
    }
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
      <h3 className="px-3">Edit Film</h3>
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
        <Form.Item className="text-start" label="Name">
          <Input
            name="tenPhim"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
          {formik.touched.tenPhim && formik.errors.tenPhim ? (
            <p className="text-red-600 font-bold">{formik.errors.tenPhim}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
          {formik.touched.trailer && formik.errors.trailer ? (
            <p className="text-red-600 font-bold">{formik.errors.trailer}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            name="moTa"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.moTa}
            rows={4}
            placeholder="Description"
          />
          {formik.touched.moTa && formik.errors.moTa ? (
            <p className="text-red-600 font-bold">{formik.errors.moTa}</p>
          ) : null}
        </Form.Item>

        <Form.Item label="DatePicker">
          <DatePicker
            format="DD/MM/YYYY"
            onBlur={() => formik.setFieldTouched("date", true)}
            onChange={handleChangeDatePicker}
            value={dayjs(formik.values.ngayKhoiChieu, 'DD/MM/YYYY')}
          />
         
        </Form.Item>

        <Form.Item label="Now showing">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Coming soon" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Vote">
          <InputNumber
            onBlur={() => formik.setFieldTouched("danhGia", true)}
            onChange={handleChangeInputNum("danhGia")}
            min={1}
            max={10}
            value={formik.values.danhGia}
          />
          {formik.touched.danhGia && formik.errors.danhGia ? (
            <p className="text-red-600 font-bold">{formik.errors.danhGia}</p>
          ) : null}
        </Form.Item>
        <Form.Item label="Image">
          <input
            className="bg-white"
            type="file"
            onChange={handleChangeFile}
          ></input>

          <img
            style={{ width: "100px", height: "150px", objectFit: "cover" }}
            src={imgSrc === "" ? selectedFilm?.hinhAnh : imgSrc}
            alt="Image"
          ></img>
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

export default EditFilm;
