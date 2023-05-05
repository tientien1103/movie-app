import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  position: "absolute",
}));

function BlankLayout() {
  return (
    <Stack
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage:
          "url(https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg)",
      }}
    >
      <HeaderStyle>
        <Logo
          sx={{
            width: 120,
            height: 60,
          }}
        />
      </HeaderStyle>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
