import { ThumbUp } from "@mui/icons-material";
import { Typography, TypographyProps } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";

interface TextIconProps {
  icon?: ReactNode;
  children: ReactNode;
  textPosition?: "left" | "right";
  typographyProps?: TypographyProps;
}

const TextIcon = (props: TextIconProps) => {
  const { icon = <ThumbUp />, children, textPosition = "right", typographyProps } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: textPosition === "left" ? "row-reverse" : "row",
        alignItems: "flex-end",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: textPosition === "right" ? 0.5 : 0,
          marginLeft: textPosition === "left" ? 0.5 : 0,
        }}
      >
        {icon}
      </Box>
      <Typography variant="caption" {...typographyProps}>
        {children}
      </Typography>
    </Box>
  );
};

export default TextIcon;
