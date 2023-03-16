import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieItem from "./MovieItem";
import { Pagination } from "antd";
import { fetchMovieList } from "../thunk";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./MovieList.css";

const MovieList = () => {
  const movieList = useSelector((state) => state.booking.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-7xl font-bold mb-10 pt-10 text-white titleMovieList">
        MovieList
      </h1>
      <div className="grid grid-cols-4 gap-6">
        {movieList.items?.map((item) => {
          return <MovieItem key={item.maPhim} item={item}></MovieItem>;
        })}
      </div>
      
        <Pagination
          current={
            searchParam.get("page") === null
              ? 1
              : Number(searchParam.get("page"))
          }
          className="p-6 text-center text-white "
          pageSize={8}
          total={movieList.totalCount}
          onChange={(page, pageSize) => {
            // dispatch(fetchMovieList(page))
            // console.log(page);
            setSearchParam({ page });
          }}
        />
        
      
    </div>
  );
};

export default MovieList;
