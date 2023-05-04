import React, { useEffect, useRef, useState } from "react";
import apiService from "../app/apiService";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { API_KEY } from "../app/config";

function SearchPage() {
  let [searchParams] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen, setIdMovie] = useOutletContext();

  const navigate = useNavigate();
  const totalPage = useRef(0);
  const q = searchParams.get("q");

  if (!q) {
    navigate("/");
  }
  useEffect(() => {
    const getMoviebyGenres = async () => {
      try {
        const res = await apiService.get(
          `/search/movie?api_key=${API_KEY}&query=${q}&page=${page}`
        );
        if (!totalPage.current) totalPage.current = res.data.total_pages;
        setSearchMovies(res.data.results);
        return res;
      } catch (error) {
        console.log(error);
      }
    };
    getMoviebyGenres();
  }, [q, page]);

  return (
    <div>
      {searchMovies ? (
        <Box>
          <Grid container spacing={2} mt={15} pl={3}>
            {searchMovies?.map((searchMovie, i) => (
              <Grid
                key={`${searchMovie?.id}+${i}`}
                item
                xs={12}
                sm={4}
                md={3}
                lg={2}
              >
                <img
                  onClick={() => {
                    setIsOpen(true);
                    setIdMovie(searchMovie.id);
                  }}
                  loading="lazy"
                  style={{ maxHeight: 300, marginRight: 10 }}
                  alt={searchMovie?.name}
                  src={`https://image.tmdb.org/t/p/original${searchMovie?.poster_path}`}
                />
              </Grid>
            ))}
          </Grid>
          <Stack alignItems="center" spacing={2}>
            <Pagination
              onChange={(event, page) => setPage(page)}
              count={totalPage?.current}
              color="secondary"
            />
          </Stack>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h5"
            marginTop={30}
            color={(theme) => theme.palette.primary.contrastText}
            textAlign="center"
          >
            {`Your search for "${q}" did not have any matches`}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default SearchPage;
