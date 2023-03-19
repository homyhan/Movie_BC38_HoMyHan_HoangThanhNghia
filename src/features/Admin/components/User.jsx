import React, { useEffect, useState } from "react";
import { AudioOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovie,
  deleteUser,
  fetchMovieList,
  fetchUserList,
  fetchUserSearch,
} from "../thunk";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { ExclamationCircleFilled, CalendarOutlined } from "@ant-design/icons";
import { movieList } from "../services/adminService";
import './User.css'
// import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;
const { Search } = Input;

const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN"))?.maNhom;

const User = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const redirect = (page) => {
    navigate("/" + page);
  };
  const param = useParams();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const { userList, userListSearch } = useSelector((state) => state.admin);

  
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value.toLowerCase());
    // handleSearch(value);
  };

  useEffect(() => {
    dispatch(fetchUserList(searchParam.get("page"), "GP01"));
    
  }, [dispatch, searchParam.get("page"), searchParam]);

  useEffect(() => {
    dispatch(fetchUserSearch(searchTerm.trim()));
  }, [dispatch, searchTerm]);

  if (!idGroup) {
    return <Navigate to="/signin"></Navigate>;
  }
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
        <h2 className="text-left px-3">User Manager</h2>
        <Button onClick={() => navigate("/admin/user/adduser")}>
          Add User
        </Button>{" "}
        <br />
        <Space className="w-2/5" direction="vertical">
          <Search
            placeholder="Search by fullname"
            // onSearch={handleSearch}
            enterButton
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Space>
      </div>
      {searchTerm === "" || searchTerm.trim() === "" ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList?.items?.map((item) => {
                return (
                  <tr key={item.taiKhoan}>
                    <td>{item.taiKhoan}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.email}</td>
                    <td>{item.soDt}</td>
                    <td>
                      <span>
                        <EditOutlined
                          className="text-2xl"
                          onClick={() => {
                            navigate("/admin/user/edituser/" + item.taiKhoan);
                          }}
                        />

                        <Button
                          className="bg-red-600 text-white"
                          onClick={() => {
                            confirm({
                              title: `Are you sure delete ${item.hoTen} ?`,
                              icon: <ExclamationCircleFilled />,
                              // content: 'Some descriptions',
                              okText: "Yes",
                              okType: "danger",
                              cancelText: "No",
                              onOk() {
                                dispatch(deleteUser(item.taiKhoan));
                                dispatch(
                                  fetchUserList(searchParam.get("page"))
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

                        {/* <CalendarOutlined className="text-green-600 text-xl"/> */}
                      </span>
                    </td>
                  </tr>
                );
              })}
             
            </tbody>
          </table>
          <Pagination className="text-center my-4" current={searchParam.get("page")===null? 1 : searchParam.get("page")*1} pageSize={10} total={userList?.totalCount} onChange={(page)=>{
        setSearchParam({page})
      }}/>
        </>
      ) : <table className="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Fullname</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userListSearch?.map((item) => {
          return (
            <tr key={item.taiKhoan}>
              <td>{item.taiKhoan}</td>
              <td>{item.hoTen}</td>
              <td>{item.email}</td>
              <td>{item.soDt}</td>
              <td>
                <span>
                  <EditOutlined
                    className="text-2xl"
                    onClick={() => {
                      navigate("/admin/user/edituser/" + item.taiKhoan);
                    }}
                  />

                  <Button
                    className="bg-red-600 text-white"
                    onClick={() => {
                      confirm({
                        title: `Are you sure delete ${item.hoTen} ?`,
                        icon: <ExclamationCircleFilled />,
                        // content: 'Some descriptions',
                        okText: "Yes",
                        okType: "danger",
                        cancelText: "No",
                        onOk() {
                          dispatch(deleteUser(item.taiKhoan));
                          dispatch(
                            fetchUserList(searchParam.get("page"))
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
                </span>
              </td>
            </tr>
          );
        })}
       
      </tbody>
    </table>}
    </LayoutAdmin>
  );
};

export default User;
