import React, { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { getSearching } from "../app/apiService";

function SearchPage() {
  let [searchParams] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [setIsOpen, setIdMovie] = useOutletContext();

  const navigate = useNavigate();
  const totalPage = useRef(0);
  const q = searchParams.get("q");

  if (!q) {
    navigate("/");
  }
  useEffect(() => {
    getSearching(q, page).then((res) => {
      if (!totalPage.current) totalPage.current = res.data.total_pages;
      setSearchMovies(res.data.results);
    });
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
