import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import Link from "next/link";

const BASE_CLASS = "drawerLink";
const ACTIVE_CLASS = "activeLink";

type LinkProps = {
  icon: ReactElement;
  href: string;
  title: string;
};

const DrawerLink = (props: LinkProps) => {
  const router = useRouter();
  const [className, setClassName] = useState(BASE_CLASS);

  useEffect(() => {
    // Entire code for computing active className might not be necessary at the end of the day.
    if (!router.isReady) return;

    const linkPathname = new URL(props.href as string, location.href).pathname;
    const activePathname = new URL(router.asPath, location.href).pathname;

    let computedClassName = "";

    if (linkPathname == activePathname)
      computedClassName = `${BASE_CLASS} ${ACTIVE_CLASS}`;
    else computedClassName = BASE_CLASS;

    setClassName(computedClassName);
  }, [router.asPath, router.isReady, props.href]);

  const handleClick = () => {
    router.push(props.href);
  };

  return (
    <ListItemButton
      selected={className.match(ACTIVE_CLASS) != null}
      LinkComponent={Link}
      href={props.href}
    >
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
        <DrawerLink icon={<InboxIcon />} href="/test" title="Test" />
        <DrawerLink icon={<InboxIcon />} href="/edit" title="Edit" />
        <DrawerLink icon={<InboxIcon />} href="/login" title="Login" />
      </List>
    </>
  );
};

export default DrawerContent;
