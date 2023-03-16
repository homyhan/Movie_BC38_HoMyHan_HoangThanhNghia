import React, { useEffect, useState } from "react";
import { AudioOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, deleteUser, fetchMovieList, fetchUserList, fetchUserSearch } from "../thunk";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import LayoutAdmin from "../../../HOCs/LayoutAdmin";
import { ExclamationCircleFilled, CalendarOutlined } from "@ant-design/icons";
import { movieList } from "../services/adminService";
// import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;
const { Search } = Input;

const onSearch = (value) => console.log(value);
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
  },
];

const idGroup = JSON.parse(localStorage.getItem("USER_LOGIN"))?.maNhom;

const User = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const param = useParams();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const { userList, userListSearch } = useSelector((state) => state.admin);

  // const debounce = (func, delay) => {
  //   let timerId;
  //   return (...args) => {
  //     if (timerId) {
  //       clearTimeout(timerId);
  //     }
  //     timerId = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };

  // const handleSearch = debounce(async(value) => {
  //   // Gửi yêu cầu tìm kiếm tại đây với giá trị tìm kiếm là "value"
  //   console.log(value.trim());
  //     try {
  //       const res = await movieList.searchUserItem(value);
        
  //       console.log("res", res.data.content);
  //     } catch (error) {
  //       console.log(error);
  //     }
    
  //   console.log('Đã gửi yêu cầu tìm kiếm với giá trị:', value);
  // }, 500); // Chờ đợi 500ms trước khi gửi yêu cầu tìm kiếm

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value.toLowerCase());
    // handleSearch(value);
  };
  
  useEffect(() => {
    dispatch(fetchUserList(searchParam.get("page"), "GP01"));
    // dispatch(fetchUserList(searchTerm));
    // const fetchResults = async () => {
    //   const results = await fetchUserSearch(searchTerm);
    //   setSearchTerm(results);
    // };
    // fetchResults();
  }, [dispatch, searchParam.get("page"), searchParam]);

  useEffect(()=>{
    dispatch(fetchUserSearch(searchTerm.trim()));
  }, [dispatch, searchTerm])

  if (!idGroup) {
    return <Navigate to="/signin"></Navigate>;
  }
  return (
    <LayoutAdmin>
      <div className="text-right mb-4">
        <h2 className="text-left px-3">User Manager</h2>
        <Button onClick={()=>navigate("/admin/user/adduser")}
        >
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
      {searchTerm==='' || searchTerm.trim()==='' ? <> <Table
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
                  onClick={()=>{
                    navigate("/admin/user/edituser/"+item.taiKhoan);
                  }}
                />

                <Button
                  className="bg-red-600 text-white"
                  onClick={()=>{
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
                  <DeleteOutlined ></DeleteOutlined>
                </Button>

                {/* <CalendarOutlined className="text-green-600 text-xl"/> */}
              </span>
            ),
          };
        }
        )}
        
      />
      <Pagination className="text-center my-4" current={searchParam.get("page")===null? 1 : searchParam.get("page")*1} pageSize={10} total={userList?.totalCount} onChange={(page)=>{
        setSearchParam({page})
      }}/>
      </>
      : <Table
      columns={columns}
      pagination={false}
      dataSource={userListSearch?.map((item) => {
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
                onClick={()=>{
                  navigate("/admin/user/edituser/"+item.taiKhoan);
                }}
              />

              <Button
                className="bg-red-600 text-white"
                onClick={()=>{
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
                <DeleteOutlined ></DeleteOutlined>
              </Button>

              {/* <CalendarOutlined className="text-green-600 text-xl"/> */}
            </span>
          ),
        };
      }
      )}
      
    /> }
      
      
    </LayoutAdmin>
  );
};

export default User;
