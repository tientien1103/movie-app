import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import { getMoviebyGenres } from "../app/apiService";

function GenrePage() {
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [setIsOpen, setIdMovie] = useOutletContext();

  const totalPage = useRef(0);
  const params = useParams();
  const genreId = params.genreid;
  useEffect(() => {
    getMoviebyGenres(page, genreId).then((res) => {
      if (!totalPage.current) totalPage.current = res.data.total_pages;
      setMoviesByGenre(res.data.results);
    });
  }, [genreId, page]);
  return (
    <>
      <Box>
        <Grid container spacing={2} mt={15} pl={3}>
          {moviesByGenre?.map((movieByGenre, i) => (
            <Grid
              key={`${movieByGenre?.id}+${i}`}
              item
              xs={12}
              sm={4}
              md={3}
              lg={2}
            >
              <img
                onClick={() => {
                  setIsOpen(true);
                  setIdMovie(movieByGenre.id);
                }}
                loading="lazy"
                style={{ maxHeight: 300, marginRight: 10 }}
                alt={movieByGenre?.name}
                src={`https://image.tmdb.org/t/p/original${movieByGenre?.poster_path}`}
              />
            </Grid>
          ))}
        </Grid>
        <Stack alignItems="center" spacing={2}>
          <Pagination
            onChange={(event, page) => setPage(page)}
            count={totalPage.current}
            color="secondary"
          />
        </Stack>
      </Box>
    </>
  );
}

export default GenrePage;
