import React, { useEffect, useState } from "react";
import { AudioOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, fetchMovieList, fetchMovieListFull } from "../thunk";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { ExclamationCircleFilled, CalendarOutlined } from "@ant-design/icons";
import HomeAdmin from "../HomeAdmin";
import "./Film.css";
// import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;
const { Search } = Input;

const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN"))?.maNhom;

const Film = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { movies, keySearch } = useSelector((state) => state.admin);
  const redirect = (page) => {
    navigate("/" + page);
  };
  const moveToAddnew = () => {
    navigate("/admin/film/addnew");
  };
  // console.log(searchParam.get("page"));
  useEffect(() => {
    dispatch(fetchMovieList(searchParam.get("page"), idGroup, 10));
  }, [dispatch, searchParam.get("page"), 10, searchTerm]);

  if (!idGroup) {
    return <Navigate to="/signin"></Navigate>;
  }
  const onSearch = (value) => {
    // console.log(value);
  };
  const handleInputChange = (evt) => {
    const value = evt.target.value;
    dispatch({
      type: "SEARCH_FILM",
      payload: value,
    });
    setSearchTerm(value);
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
      <div className="text-right mb-4">
        <h2 className="text-left px-3">Movie Manager</h2>
        <Button
          onClick={() => {
            moveToAddnew();
          }}
        >
          Add Film
        </Button>{" "}
        <br />
        <Space className="w-2/5" direction="vertical">
          <Search
            placeholder="Search by film name"
            onSearch={onSearch}
            enterButton
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Space>
      </div>
      {keySearch.length === 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Namefilm</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies?.items?.map((item) => {
                return (
                  <tr key={item.maPhim}>
                    <td>{item.maPhim}</td>
                    <td>
                      <img
                        style={{
                          height: "150px",
                          width: "100px",
                          objectFit: "cover",
                        }}
                        src={item.hinhAnh}
                      ></img>
                    </td>
                    <td>{item.tenPhim}</td>
                    <td>{item.moTa}</td>
                    <td>
                      <span>
                        <EditOutlined
                          onClick={() => {
                            navigate("/admin/film/edit/" + item.maPhim);
                          }}
                          className="text-2xl"
                        />

                        <Button
                          className="bg-red-600 text-white"
                          onClick={() => {
                            confirm({
                              title: `Are you sure delete ${item.tenPhim} ?`,
                              icon: <ExclamationCircleFilled />,
                              // content: 'Some descriptions',
                              okText: "Yes",
                              okType: "danger",
                              cancelText: "No",
                              onOk() {
                                dispatch(deleteMovie(item.maPhim));
                                dispatch(
                                  fetchMovieList(
                                    searchParam.get("page"),
                                    idGroup,
                                    10
                                  )
                                );
                              },
                              onCancel() {
                                // console.log("Cancel");
                              },
                            });
                          }}
                        >
                          <DeleteOutlined></DeleteOutlined>
                        </Button>

                        <CalendarOutlined
                          onClick={() => {
                            navigate("/admin/showtime/" + item.maPhim);
                          }}
                          className="text-green-600 text-xl"
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            className="text-center my-4"
            current={
              searchParam.get("page") === null ? 1 : searchParam.get("page") * 1
            }
            pageSize={10}
            total={movies?.totalCount}
            onChange={(page) => {
              setSearchParam({ page });
            }}
          />
        </>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Namefilm</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {keySearch?.map((item) => {
              return (
                <tr key={item.maPhim}>
                  <td>{item.maPhim}</td>
                  <td>
                    <img
                      style={{
                        height: "150px",
                        width: "100px",
                        objectFit: "cover",
                      }}
                      src={item.hinhAnh}
                    ></img>
                  </td>
                  <td>{item.tenPhim}</td>
                  <td>{item.moTa}</td>
                  <td>
                    <span>
                      <EditOutlined
                        onClick={() => {
                          navigate("/admin/film/edit/" + item.maPhim);
                        }}
                        className="text-2xl"
                      />

                      <Button
                        className="bg-red-600 text-white"
                        onClick={() => {
                          confirm({
                            title: `Are you sure delete ${item.tenPhim} ?`,
                            icon: <ExclamationCircleFilled />,
                            // content: 'Some descriptions',
                            okText: "Yes",
                            okType: "danger",
                            cancelText: "No",
                            onOk() {
                              dispatch(deleteMovie(item.maPhim));
                              dispatch(
                                fetchMovieList(
                                  searchParam.get("page"),
                                  idGroup,
                                  10
                                )
                              );
                            },
                            onCancel() {
                              // console.log("Cancel");
                            },
                          });
                        }}
                      >
                        <DeleteOutlined></DeleteOutlined>
                      </Button>

                      <CalendarOutlined
                        onClick={() => {
                          navigate("/admin/showtime/" + item.maPhim);
                        }}
                        className="text-green-600 text-xl"
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      
    </LayoutAdmin>
  );
};

export default Film;
