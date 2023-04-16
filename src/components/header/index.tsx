import { Toolbar } from "@mui/material";
import { BarContent } from "./barContent";

export interface HeaderProps {
  onOpen: () => void;
  open: boolean;
}

const Header = (props: HeaderProps) => {
  console.log(props);

  return (
    <Toolbar>
      <BarContent onDrawerClick={props.onOpen} open={props.open} />
    </Toolbar>
  );
};

export default Header;
