import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import apiService from "../app/apiService";
import requests from "./Requests";

const DivHead = styled("div")(({ theme }) => ({
  height: "90vh",
  position: "relative",
  marginTop: 65,
  [theme.breakpoints.up("xs")]: {
    height: "30vh",
  },
  [theme.breakpoints.up("md")]: {
    height: "60vh",
  },
}));

function Banner() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovieBanner = async () => {
      try {
        const res = await apiService.get(requests.fetchNetflixOriginals);
        setMovies(
          res.data.results[
            Math.floor(Math.random() * res.data.results.length - 1)
          ]
        );
        return res;
      } catch (error) {
        console.log(error);
      }
    };
    getMovieBanner();
  }, []);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <DivHead>
      <img
        width="100%"
        height="100%"
        alt=""
        src={`https://image.tmdb.org/t/p/original${movies?.backdrop_path}`}
      />
      <Box
        sx={{ position: "absolute", width: "35%", left: "5%", bottom: "15%" }}
      >
        <Typography variant="h3">{movies?.title}</Typography>
        <Typography>{truncate(movies?.overview, 150)}</Typography>
      </Box>
    </DivHead>
  );
}

export default Banner;
