import { AppBar, Box, Toolbar } from "@mui/material";
import { ReactNode } from "react";

export type HeaderContainerProps = {
  children: ReactNode;
};

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>{children}</Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default HeaderContainer;
