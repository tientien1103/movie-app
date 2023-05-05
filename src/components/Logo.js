import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../netflix-logo.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 100, height: 30, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
