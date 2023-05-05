import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import "./List.css";
import apiService from "../app/apiService";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useOutletContext } from "react-router-dom";

function List({ title, fetchUrl, isLargeRow = false }) {
  const [movieLists, setMoviesLists] = useState([]);
  const [numberScroll, setNumberScroll] = useState(1);

  const [setIsOpen, setIdMovie] = useOutletContext();

  const base_url = `https://image.tmdb.org/t/p/original`;
  const listRef = useRef();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await apiService.get(fetchUrl);
        setMoviesLists(res.data.results);
        return res;
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [fetchUrl]);
  function scroll(id) {
    if (numberScroll <= 4) {
      let value = (listRef.current.scrollWidth / 4) * numberScroll;
      console.log("listRef.current.scrollWidth");
      if (id === "right") {
        // console.log(numberScroll);

        setNumberScroll((e) => (e < 4 ? e + 1 : e));

        listRef.current.scrollTo({
          left: value,
          behavior: "smooth",
        });
      } else if ((id = "left")) {
        // console.log(numberScroll);

        setNumberScroll(1);

        listRef.current.scrollTo({
          left: -listRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }
  }
  return (
    <div className="list">
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ position: "relative" }}>
        <ArrowBackIosNewIcon
          onClick={() => scroll("left")}
          sx={{ position: "absolute", top: "45%", left: 15, zIndex: 100 }}
        />
        <div ref={listRef} className="row_posters">
          {movieLists?.map((movieList, index) => (
            <img
              onClick={() => {
                setIsOpen(true);
                setIdMovie(movieList.id);
              }}
              loading="lazy"
              className={`row_poster ${isLargeRow && "row_posterLarge"} `}
              alt={movieList?.name}
              key={movieList?.id}
              src={`${base_url}${
                isLargeRow ? movieList?.poster_path : movieList?.backdrop_path
              }`}
            />
          ))}
        </div>
        <ArrowForwardIosIcon
          onClick={() => scroll("right")}
          sx={{ position: "absolute", top: "45%", right: 10, zIndex: 100 }}
        />
      </Box>
    </div>
  );
}

export default List;
