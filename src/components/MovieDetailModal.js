import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import apiService from "../app/apiService";
import { Chip } from "@mui/material";
import { API_KEY } from "../app/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width: 500px)": {
    display: "block",
  },
};

// set state là chạy nguyên cái component
function MovieDetailPage({ isOpen, setOpen, id }) {
  const [detailMovies, setDetailMovies] = useState(null);
  useEffect(() => {
    if (!id) return;
    const getDetailMovies = async () => {
      try {
        const res = await apiService.get(
          `/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        // console.log(res);
        setDetailMovies(res.data);
        // return res;
      } catch (error) {
        console.log(error);
      }
    };
    getDetailMovies();
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} key={detailMovies?.id}>
          <img
            width={200}
            height={300}
            alt=""
            src={`https://image.tmdb.org/t/p/original${detailMovies?.poster_path}`}
          />
          <Box sx={{ ml: 3, display: "flex", flexDirection: "column" }}>
            <Typography component={"span"} variant="h4">
              {detailMovies?.title}
            </Typography>
            <Typography component={"span"} color="error">
              Popularity {detailMovies?.popularity}
            </Typography>
            <Typography component={"span"}>{detailMovies?.overview}</Typography>
            <Typography component={"span"}>
              {detailMovies?.genres.map((genre, i) => (
                <Chip
                  key={`${genre}+${i}`}
                  label={genre.name}
                  variant="outlined"
                  color="warning"
                />
              ))}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default MovieDetailPage;
