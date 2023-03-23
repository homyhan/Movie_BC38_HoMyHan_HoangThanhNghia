import { Button, Menu } from "antd";
import React from "react";
import {  useNavigate } from "react-router-dom";

const LeftBar = () => {
  const navigate = useNavigate();
  const redirect = (page) => {
    navigate("/" + page);
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
      
    </div>
  );
};

export default LeftBar;
