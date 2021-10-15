import React from "react";
import Image from "next/image";
import { Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import theme from "@/src/Theme";
import { extractColor, extractTitle } from "@/src/utils/Parse";
import makeStyles from "@material-ui/core/styles/makeStyles";
interface Props {
  title: string;
  src: string;
  type: string;
  price: string;
}

const useStyles = makeStyles(() => ({
  captionText: {
    color: "#111",
    fontFamily: "Montserrat",
  },
}));

export default function Card({ title, type, src, price }: Props) {
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
  };
  const classes = useStyles();
  return (
    <div role="listitem">
      <div style={{ position: "relative" }}>
        <small
          className={classes.captionText}
          style={{ position: "absolute", left: "2%", top: "0%", zIndex: 1 }}
        >
          ${price}
        </small>
        <Image
          src={src}
          height={matches.lg ? 320 : matches.sm ? 280 : 140}
          width={matches.lg ? 320 : matches.sm ? 280 : 140}
        />
      </div>
      <div>
        <Typography variant="caption" className={classes.captionText}>
          <div>{extractTitle(title)}</div>
          <div>{extractColor(title)}</div>
          <div>{type}</div>
        </Typography>
      </div>
    </div>
  );
}
