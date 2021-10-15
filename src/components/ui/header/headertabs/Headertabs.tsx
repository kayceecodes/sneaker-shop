import React, { ReducerState, useContext } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from "../../../../Link";
import { Route } from "../Header";
import { MouseEvent } from "../../../../types/aliases";
import Grid from "@material-ui/core/Grid/Grid";
import { connect, shallowEqual, useSelector } from "react-redux";
import { color } from "@/src/ColorPalette";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { useRouter } from "next/router";
import Badge from "@material-ui/core/Badge/Badge";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import { CheckoutState } from "@/src/store/actions/actionCreators/checkout";
import { countTotalItems } from "@/src/utils/Calc";

interface IProps {
  pageValue: number;
  setPageValue: React.Dispatch<React.SetStateAction<number>>;
  routes: Route[];
  anchorEl?: HTMLElement;
  openMenu: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  homePageTab: {
    color: "rgba(250,250,250,1)", 
    backgroundColor: "#1a1a1aba",
    fontWeight: 400,
    fontSize: "1.3rem",
    transition: "color 0.3s",
    textTransform: "none", // Remove the button transformation styles
    paddingLeft: "50px",
    paddingRight: "50px",
    borderBottom: "2px solid rgba(0,0,0,0.0)",
    "&:hover": {
      textDecoration: "none !important",
    },
  },
  
  tab: {
    color: '#333',
    fontWeight: 400,
    fontSize: "1.3rem",
    transition: "color 0.3s",
    textTransform: "none", // Remove the button transformation styles
    paddingLeft: "50px",
    paddingRight: "50px",
    borderBottom: "2px solid rgba(0,0,0,0.0)",
    "&:hover": {
      textDecoration: "none !important",
    },
  },
  tabs: {
    width: "100%",
  },
  tabHome: {
    borderTopLeftRadius: "1px",
    borderBottomLeftRadius: "1px",
  },
  tabCart: {
    borderTopRightRadius: "1px",
    borderBottomRightRadius: "1px",
  },
  tabWrapper: {
    width: "300px",
  },
  indicator: {
    height: "1.5px",
    width: "15px",
  },
  wrapped: {
    width: 100,
  },
}));

function Headertabs(props: IProps) {
  const classes = useStyles();
  const router = useRouter();
  let path = router.asPath;
  const handleChange = (e: any, pageValue: number) => {
    e;
    props.setPageValue(pageValue);
  };

  const lineItems = useSelector(
    (state: any) => state.checkoutReducer.checkout.lineItems,
    shallowEqual
  );

  const cartIcon = (
    <Badge badgeContent={countTotalItems(lineItems)} color="primary">
      <ShoppingBasket />
    </Badge>
  );

  return (
    <>
      <Tabs
        value={props.pageValue}
        onChange={handleChange}
        classes={{
          indicator: classes.indicator,
          root: classes.tabs,
        }}
      >
        {props.routes.map((route: Route) => (
          <Tab            
            key={`${route.link} ${classes.tab}`}
            aria-owns={route.ariaOwns}
            aria-haspopup={props.anchorEl ? "true" : undefined}
            className={( router.asPath === '/' ? classes.homePageTab : classes.tab) + " " + classes[route.tabStyle]}
            component={Link}
            wrapped={true}
            classes={{wrapped: classes.wrapped}}
            href={route.link}
            onMouseOver={route.mouseOver}
            label={route.link === "/cart" ? cartIcon : route.name}
          />
        ))}
      </Tabs>
    </>
  );
}


export default Headertabs;
