import { Button, Menu } from "antd";
import React from "react";
import {  useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  
];
const LeftBar = () => {
  const navigate = useNavigate();
  const redirect = (page) => {
    navigate("/" + page);
  };
  const onClick = (e) => {
    return redirect("admin/user");
  };
  return (
    <div className="w-full">
      <Button
        className="w-full mb-2 rounded-none"
        onClick={() => {
          redirect("admin");
        }}
      >
        Movie Manager
      </Button>{" "}
      <br></br>
      <Button
        onClick={() => {
          redirect("admin/user");
        }}
        className="w-full rounded-none mb-2"
      >
        User Manager
      </Button>
      
      {/* <Menu
      onClick={onClick}
      style={{
        width: "100%",
      }}
      // defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub2']}
      mode="inline"
      items={items}
    /> */}
    </div>
  );
};

export default LeftBar;
