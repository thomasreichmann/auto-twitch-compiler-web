import { Home, Inbox } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, ReactNode } from "react";

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
        <DrawerLink icon={<Home />} href="/" title="Home" />
        <DrawerLink icon={<Inbox />} href="test" title="Test" />
        <DrawerLink icon={<Inbox />} href="edit" title="Edit" />
      </List>
    </>
  );
};

export default DrawerContent;
