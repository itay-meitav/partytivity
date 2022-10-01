import * as React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      style={props.style}
      component="h2"
      variant="h6"
      color="secondary"
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}
