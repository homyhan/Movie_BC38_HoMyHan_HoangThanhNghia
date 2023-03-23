import React, { useState } from "react";
import { Card, Button, Modal } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./movieItem.css";
import { useNavigate } from "react-router-dom";

const MovieItem = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trailer } = useSelector((state) => state.booking);
  const newTrailer = trailer?.replace("watch?v=", "embed/");
  return (
    <Card
      hoverable
      className="contentItemMovie"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        border: "1px solid #3c3c3c",
      }}
      headStyle={{ backgroundColor: "rgba(255, 255, 255, 0.4)", border: 0 }}
      cover={
        <div className="w-full mvItem">
          <img
            className="w-full imgMovieItem"
            alt="example"
            src={props.item.hinhAnh}
          />
          <div className="bgHover"></div>
          <PlayCircleOutlined
            onClick={() => {
              dispatch({
                type: "SET_TRAILER",
                payload: props.item.trailer,
              });
              setOpen(true);
            }}
            className="iconPlay"
          />
        </div>
      }
    >
      <div className="name_desc_movieItem">
        <h1 className="font-bold text-white">{props.item.tenPhim}</h1>
        <div
          className="text-white"
          style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap" }}
        >
          <p style={{ textOverflow: "ellipsis" }}>{props.item.moTa}</p>
        </div>
      </div>
      <div className="customButtonHover">
        <Button
          className="w-full mt-2 btnMovieItem"
          onClick={() => navigate("/detail/" + props.item.maPhim)}
        >
          Book
        </Button>
      </div>

      <Modal
        title="Trailer"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
      >
        <iframe
          width="100%"
          height="315"
          src={newTrailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Modal>
    </Card>
  );
};

export default MovieItem;
