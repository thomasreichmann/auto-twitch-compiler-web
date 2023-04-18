import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";

type LinkProps = {
  icon: ReactElement;
  href: string;
  title: string;
};

const DrawerLink = (props: LinkProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(props.href);
  };

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItemButton>
  );
};

const DrawerContent = () => {
  return (
    <>
      <List>
        <DrawerLink icon={<HomeIcon />} href="/" title="Home" />
        <DrawerLink icon={<InboxIcon />} href="test" title="Test" />
        <DrawerLink icon={<InboxIcon />} href="edit" title="Edit" />
      </List>
    </>
  );
};

export default DrawerContent;
