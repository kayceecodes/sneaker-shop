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
  // tabContainer: {
  //   marginLeft: "auto", //pushes the tab container to the right as much as possible
  // },
  tab: {
    backgroundColor: "rgba(0,0,0,0.65)",
    // borderBottom: '1px solid #ddd',
    // minWidth: 10,
    fontWeight: 400,
    fontSize: "1.3rem",
    // fontWeight: 500,
    transition: "color 0.3s",
    textTransform: "none", // Remove the button transformation styles
    paddingLeft: "50px",
    paddingRight: "50px",
    borderBottom: "2px solid rgba(0,0,0,0.0)",
    // padding: '0 1.4%',
    "&:hover": {
      textDecoration: "none !important",
    },
  },
  tabs: {
    width: "100%",
  },
  tabHome: {
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  tabCart: {
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  tabWrapper: {
    width: "300px",
  },
  indicator: {
    height: "2px",
  },
  wrapped: {
    width: 100,
  }
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
      <ShoppingBasket color="secondary" />
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
            style={{ color: "#fff" }}
            key={`${route.link} ${classes.tab}`}
            aria-owns={route.ariaOwns}
            aria-haspopup={props.anchorEl ? "true" : undefined}
            className={classes.tab + " " + classes[route.tabStyle]}
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
const mapStateToProps = (state: any) => ({
  // cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(Headertabs);
