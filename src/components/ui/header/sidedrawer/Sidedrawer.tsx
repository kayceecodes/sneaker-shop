import React, { useState } from "react";
import Link from "../../../../Link"
import { Route } from "../Header";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from "@material-ui/core/ListItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid/Grid";
import { color } from "@/src/ColorPalette";

interface IProps {
  pageValue: number;
  setPageValue: React.Dispatch<React.SetStateAction<number>>;
  selectedIndex?: number;
  routes: Route[];
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  drawer: {
    backgroundColor: `${color.darkSlateGray} !important`,
  },
  drawerItem: {
    ...theme.typography,
    color: theme.palette.common.offWhite,
    opacity: 0.7,
  },
  drawerIcon: {
    height: "35px",
    width: "35px",
    color: '#fff'
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  svgGridContainer: {
    height: '100px',
    marginTop: '50px',
    paddingLeft: '10px'
  }
}));

export default function Sidedrawer(props: IProps) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <SwipeableDrawer
        disableBackdropTransition={iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        className={classes.drawer}
        classes={{ paper: classes.drawer, root: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {props.routes.map((route: Route) => (
            <ListItem
              key={`${route.link} + ${route.name}`}
              button
              component={Link}
              href={route.link}
              selected={props.pageValue === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                props.setPageValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <Grid
            container
            className={classes.svgGridContainer}
            direction="column"
            justify="space-around"

          >
            <Grid
              item
              xs={4}
              component={"a"}
              href=""
              rel="noopener noreferrer"
              target="_blank"
              data-aos='fade-right'
            >
              <img src='/assets/svg/facebook.svg' alt="Link To Instagram" />
            </Grid>
            <Grid
              item
              xs={4}
              component={"a"}
              href=""
              rel="noopener noreferrer"
              target="_blank"
              data-aos='fade-right'
            >
              <img src='/assets/svg/instagram.svg' alt="Link To Instagram" />
            </Grid>
          </Grid>
        </List>
      </SwipeableDrawer>
      <IconButton
        color="secondary"
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
}
