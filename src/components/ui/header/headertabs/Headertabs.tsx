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
import { ShoppingCart } from "@material-ui/icons";

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
    // backgroundColor: "#1a1a1aba",
    // width: '350px',
    fontWeight: 400,
    fontSize: "1.1rem",
    textShadow: '0 0 10px hsl(0, 0%, 30%)',
    transition: "color 0.3s",
    textTransform: "none", // Remove the button transformation styles
    borderBottom: "2px solid rgba(0,0,0,0.0)",
    "&:hover": {
      textDecoration: "none !important",
    },
  },
  tabWrapper: {
    // width: '130px',
    // padding: '0 1%',
  },
  tab: {
    color: '#333',
    fontWeight: 400,
    // padding: '0 1%',
    fontSize: "1.1rem",
    transition: "color 0.3s",
    textTransform: "none", // Remove the button transformation styles,
    borderBottom: "2px solid rgba(0,0,0,0.0)",
    "&:hover": {
      textDecoration: "none !important",
    },
  },
  tabs: {
    // width: "100%",
  },
  tabHome: {
    borderTopLeftRadius: "1px",
    borderBottomLeftRadius: "1px",
  },
  tabCart: {
    borderTopRightRadius: "1px",
    borderBottomRightRadius: "1px",
  },
  indicator: {
    height: "1.5px",
    // width: "50px !important",
    // color: "hsl(50, 10%, 10%)",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      boxShadow: '0 0 7px rgba(0,0,0,1)',
      maxWidth: 40,
      width: "100%",
      backgroundColor: `${theme.palette.secondary.main}`,
    }
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    // width:'fit-content'
  }
  // wrapped: {
  //   width: 100,
  // },
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

  const CartIcon = (
    <Link href="/cart">
    <Badge style={{position: 'absolute', top: '15px', right: '80px', color: '#dedede'}} badgeContent={countTotalItems(lineItems)} color="secondary">
      {/* <ShoppingBasket /> */}
      <ShoppingCart />
    </Badge>
    </Link>
  );

  return (
    <>
      <Tabs
        value={props.pageValue}
        onChange={handleChange}
        classes={{
          indicator: classes.indicator,
          root: classes.tabs,
          flexContainer: "flexContainer",
        }}
        TabIndicatorProps={{children: <span />}}
      >
        {props.routes.map((route: Route) => (
          <Tab            
            key={`${route.link} ${classes.tab}`}
            aria-owns={route.ariaOwns}
            aria-haspopup={props.anchorEl ? "true" : undefined}
            className={( router.asPath === '/' ? classes.homePageTab : classes.tab) + " " + classes[route.tabStyle]}
            component={Link}
            wrapped={true}
            // classes={{wrapped: classes.wrapped}}
            href={route.link}
            onMouseOver={route.mouseOver}
            label={route.name}
            // label={route.link === "/cart" ? cartIcon : route.name}
          />
        ))}
      </Tabs>
      {CartIcon}
    </>
  );
}


export default Headertabs;
