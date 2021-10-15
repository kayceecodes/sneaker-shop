import { CartItem, Product } from "@/src/types/interfaces/product";
import GridContainer from "@/src/components/ui/grid/GridContainer";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import Client from "shopify-buy";
import Image from "next/image";
import Button from "@material-ui/core/Button/Button";
import router from "next/router";
import Icon from "@material-ui/core/Icon/Icon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import ProductInput from "@/components/product/ProductInput";
import { SectionBreak, SectionMargin } from "@/components/ui/Section";
import CartSummary from "@/src/components/product/CartSummary";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import theme from "@/src/Theme";
import { extractTitle } from "@/src/utils/Parse";
import { useDispatch } from "react-redux";
import { addToCheckout } from "@/src/store/actions/actionCreators/checkout";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

interface Props {
  product: Product;
  setPageValue: React.Dispatch<React.SetStateAction<number>>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let productsData: Promise<any[]> = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN as string,
    storefrontAccessToken: process.env
      .NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
  })
    .product.fetchAll()
    .then((products) => {
      return products;
    });

  return {
    paths: (await productsData).map((product: any) => ({
      params: { slug: product.handle },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let { params } = context;

  let product = await Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN as string,
    storefrontAccessToken: process.env
      .NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
  })
    .product.fetchByHandle(params?.slug as string)
    .then((res) => res);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

const useStyles = makeStyles((theme) => ({
  arrow: {
    fontSize: "1.6rem",
    color: theme.palette.common.dimGray,
    transition: "0.3s",
    "&:hover": {
      color: lighten(theme.palette.common.dimGray, 0.5),
    },
  },
  btn: {
    textTransform: "none",
    fontFamily: 'Montserrat', 
  },
  cartBtn: {
    height: "35px",
    width: "180px",
    padding: "15px 30px",
    color: theme.palette.common.dimGray,
    textTransform: "none",
    borderRadius: "0px",
  },
  image: {
    border: '0.7px solid #444 !important'
  }
}));
function AddToCart({
  itemValues,
  variantId,
  handleOpen,
}: {
  itemValues: CartItem;
  variantId: string;
  handleOpen: () => void;
}) {
  const classes = useStyles();

  const isDisabled = itemValues.size === 0 || itemValues.quantity === 0;
  const [loading, setLoading] = useState<boolean>(false);

  const setLoadTime = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };
  const dispatch = useDispatch();
  return (
    <Button
      className={classes.cartBtn}
      variant="outlined"
      disabled={isDisabled}
      onClick={(e: any) => {
        console.log("itemValues In BtnAddToCart: ", itemValues);
        dispatch(
          addToCheckout(
            localStorage.checkout_id,
            variantId,
            itemValues.quantity
          )
        );
        setLoadTime();
        handleOpen();
      }}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <div style={{ marginRight: "10px" }}>Add</div>
          <Icon>add_shopping_cart</Icon>
        </>
      )}
    </Button>
  );
}

export default function ProductPage({ product, setPageValue }: Props) {
  const classes = useStyles();
  const [itemValues, setItemValues] = useState<CartItem>({
    id: "",
    title: "No Title",
    size: 0,
    src: "/",
    quantity: 1,
    price: "$0.00",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [variantId, setVariantId] = useState<string>("");
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
  }; /* xs: 0, sm: 600 md: 960, lg:1280px, xl1920px */

  /*If value passed to func is not an event object then it's a string, variantId*/
  const handleChange = (
    prop: keyof CartItem,
    event: any,
    variantId?: string
  ) => {
    setItemValues({ ...itemValues, [prop]: event.target.value });
  };

  const handleVariantId = (prop: any, id: string) => {
    console.log("itemValues.variantId in handleVariantId: ", id);
    setVariantId(id);
  };

  const handleOpen = () => setOpen(!open);

  return (
    <Box mt={matches.sm ? 30 : 10}>
      {/* <CartSummary
        open={open}
        handleOpen={handleOpen}
        product={product}
        quantity={itemValues.quantity}
        setPageValue={setPageValue}
      /> */}
      <CartSummary
        product={product}
        quantity={itemValues.quantity}
        handleOpen={handleOpen}
        open={open}
      />
      <GridContainer width="100%" spacing={matches.sm ? 4 : 1} justifyContent="center">
        <Button onClick={() => router.push("/catalog")} className={classes.btn}>
          <Icon className={classes.arrow}>arrow_back_ios</Icon>back
        </Button>
        <SectionBreak mt={10} />
        <Image
          width={matches.sm ? 300 : 290}
          height={matches.sm ? 300 : 290}
          className={classes.image}
          src={product.images[0].src}
        />
        <GridContainer
          justifyContent="space-between"
          alignItems="center"
          direction="column"
          padding="0 15px"
        >
          <Typography
            variant="body1"
            component="div"
            style={{ fontFamily: "Montserrat", color: "#444" }}
          >
            <h2>{extractTitle(product.title)}</h2>${product.variants[0].price}
            <br />
            {product.productType}
            <SectionMargin px="10px" />
            <GridContainer direction="column">
              <ProductInput
                itemValues={itemValues}
                inputType="Size"
                product={product}
                handleChange={handleChange}
                handleVariantId={handleVariantId}
              />
              <ProductInput
                itemValues={itemValues}
                inputType="Qty"
                product={product}
                handleChange={handleChange}
              />
              <AddToCart
                handleOpen={handleOpen}
                itemValues={itemValues}
                variantId={variantId}
              />
            </GridContainer>
          </Typography>
        </GridContainer>
      </GridContainer>
    </Box>
  );
}
