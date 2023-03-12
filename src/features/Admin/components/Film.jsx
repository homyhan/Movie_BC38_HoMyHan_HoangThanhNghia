import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, fetchMovieList, fetchMovieListFull } from "../thunk";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { ExclamationCircleFilled, CalendarOutlined } from "@ant-design/icons";
const { confirm } = Modal;
const { Search } = Input;

const columns = [
  {
    title: "ID Film",
    dataIndex: "idFilm",
    sorter: (a, b) => a.idFilm - b.idFilm,
  },
  {
    title: "Image",
    dataIndex: "img",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.img.startsWith(value),
  },
  {
    title: "NameFilm",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: "28%",
  },
  {
    title: "Description",
    dataIndex: "desc",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.desc.startsWith(value),
    width: "400px",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN"))?.maNhom;

const Film = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { movies, keySearch } = useSelector((state) => state.admin);
  const moveToAddnew = () => {
    navigate("/admin/film/addnew");
  };
  console.log(searchParam.get("page"));
  useEffect(() => {
    dispatch(fetchMovieList(searchParam.get("page"), idGroup, 10));
  }, [dispatch, searchParam.get("page"), 10, searchTerm]);

  if (!idGroup) {
    return <Navigate to="/signin"></Navigate>;
  }
  const onSearch = (value) => {
    console.log(value);
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
          <Table
            columns={columns}
            pagination={false}
            dataSource={movies?.items?.map((item) => {
              return {
                key: item.maPhim,
                idFilm: item.maPhim,
                img: (
                  <img
                    style={{
                      height: "150px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                    src={item.hinhAnh}
                  ></img>
                ),
                name: item.tenPhim,
                desc: item.moTa,

                action: (
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
                            console.log("Cancel");
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
                ),
              };
            })}
          />
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
        <Table
          columns={columns}
          pagination={false}
          dataSource={keySearch?.map((item) => {
            return {
              key: item.maPhim,
              idFilm: item.maPhim,
              img: (
                <img
                  style={{
                    height: "150px",
                    width: "100px",
                    objectFit: "cover",
                  }}
                  src={item.hinhAnh}
                ></img>
              ),
              name: item.tenPhim,
              desc: item.moTa,

              action: (
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

                        okText: "Yes",
                        okType: "danger",
                        cancelText: "No",
                        onOk() {
                          dispatch(deleteMovie(item.maPhim));
                          dispatch(
                            fetchMovieList(searchParam.get("page"), idGroup, 10)
                          );
                        },
                        onCancel() {
                          console.log("Cancel");
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
              ),
            };
          })}
        />
      )}
    </LayoutAdmin>
  );
};

export default Film;
