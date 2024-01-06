import { ThumbUp } from "@mui/icons-material";
import { Typography, TypographyProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode } from "react";

interface TextIconProps {
  icon?: ReactNode;
  children: ReactNode;
  textPosition?: "left" | "right";
  typographyProps?: TypographyProps;
}

const TextIcon = (props: TextIconProps) => {
  const { icon = <ThumbUp />, children, textPosition = "right", typographyProps } = props;

  const content = (
    <>
      {textPosition === "left" && <Typography {...typographyProps}>{children}</Typography>}
      {icon}
      {textPosition === "right" && <Typography {...typographyProps}>{children}</Typography>}
    </>
  );

  return <Box>{content}</Box>;
};

export default TextIcon;
