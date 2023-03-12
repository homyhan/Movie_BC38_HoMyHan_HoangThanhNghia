import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUserList, fetchUserSearch } from "../thunk";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;
const { Search } = Input;

const columns = [
  {
    title: "Account",
    dataIndex: "taiKhoan",
  },
  {
    title: "Fullname",
    dataIndex: "hoTen",
  },
  {
    title: "Email",
    dataIndex: "email",

    width: "28%",
  },
  {
    title: "Phone",
    dataIndex: "soDt",

    width: "300px",
  },

  {
    title: "Action",
    dataIndex: "action",
    width: "140px",
  },
];

const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN"))?.maNhom;

const User = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const { userList, userListSearch } = useSelector((state) => state.admin);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value.toLowerCase());
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
      <div className="text-right mb-4">
        <h2 className="text-left px-3">User Manager</h2>
        <Button onClick={() => navigate("/admin/user/adduser")}>
          Add User
        </Button>{" "}
        <br />
        <Space className="w-2/5" direction="vertical">
          <Search
            placeholder="Search by fullname"
            enterButton
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Space>
      </div>
      {searchTerm === "" || searchTerm.trim() === "" ? (
        <>
          {" "}
          <Table
            columns={columns}
            pagination={false}
            dataSource={userList?.items?.map((item) => {
              return {
                key: item.taiKhoan,
                taiKhoan: item.taiKhoan,
                hoTen: item.hoTen,
                email: item.email,
                soDt: item.soDt,

                action: (
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

                          okText: "Yes",
                          okType: "danger",
                          cancelText: "No",
                          onOk() {
                            dispatch(deleteUser(item.taiKhoan));
                            dispatch(fetchUserList(searchParam.get("page")));
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
            total={userList?.totalCount}
            onChange={(page) => {
              setSearchParam({ page });
            }}
          />
        </>
      ) : (
        <Table
          columns={columns}
          pagination={false}
          dataSource={userListSearch?.map((item) => {
            return {
              key: item.taiKhoan,
              taiKhoan: item.taiKhoan,
              hoTen: item.hoTen,
              email: item.email,
              soDt: item.soDT,
              action: (
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
                          dispatch(fetchUserList(searchParam.get("page")));
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
              ),
            };
          })}
        />
      )}
    </LayoutAdmin>
  );
};

export default User;
