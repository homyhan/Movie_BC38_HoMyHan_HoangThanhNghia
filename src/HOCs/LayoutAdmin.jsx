import React from "react";
import Header from "../components/Header";
import LeftBar from "../features/Admin/components/LeftBar";
import "./LayoutAdmin.css";

const LayoutAdmin = (props) => {
  return (
    <div className="h-full">
      <div style={{ position: "fixed", zIndex: "3", width: "100%" }}>
        <Header></Header>
      </div>
      <div style={{ height: "100%" }} className="bg-slate-900">
        <div className="bg-slate-900">
          <div className="container mx-auto">
            <div className="grid grid-cols-7 gap-2">
              <div
                style={{ height: "68px" }}
                className="col-span-1 bg-slate-900 w-full"
              >
                <div className="col-span-12 bg-slate-900 mt-20 border-solid border-12 border-gray-400 py-2 leftbar">
                  <LeftBar></LeftBar>
                </div>
              </div>
              <div className="col-span-6 mt-20">
                <div className="container mx-auto p-3 border-solid border-12 border-gray-400 bg-white">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
