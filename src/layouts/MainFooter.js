import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.coderschool.vn">
        Tien Tien
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
