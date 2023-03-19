import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners, fetchMovieList } from "./thunk";
import MovieList from "./components/MovieList";
import { useSearchParams } from "react-router-dom";
import MoviesTab from "./components/MoviesTab";
import Header from "../../components/Header";
import './Home.css';
import Contact from "./components/Contact";
import Footer from "../../components/Footer";

// const contentStyle = {
//   height: "700px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

const HomeBooking = () => {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.booking.banners);
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    dispatch(fetchBanners);
    dispatch(fetchMovieList(searchParam.get("page")));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchMovieList(searchParam.get("page")));
  }, [searchParam.get("page")]);
  return (
    <div>
      <div style={{ position: "fixed", width: "100%", zIndex: "100" }}>
        <Header></Header>
      </div>
      
        <Carousel autoplay effect="fade">
          {banners.map((item, index) => {
            return (
              <div key={item.maBanner}>
                <h3 className="contentCarousel" >
                  <img className="w-full" src={item.hinhAnh}></img>
                </h3>
              </div>
            );
          })}
        </Carousel>
      

      <div className="movieList">
        <MovieList></MovieList>
      </div>
        <div className="movieTab">
          <MoviesTab></MoviesTab>
        </div>
        <div className="contactHome">
          <Contact></Contact>
        </div>
          <div className="footer">
            <Footer></Footer>
          </div>
    </div>
  );
};

export default HomeBooking;
