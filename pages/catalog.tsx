import React, { useState } from "react";
import GridContainer from "../src/components/ui/grid/GridContainer";
import Client from "shopify-buy";
import Card from "../src/components/catalog/card";
import PageTransition from "../src/components/ui/hoc/PageTransition";
import { PageAnimations } from "@/src/types/interfaces/animation";
import Button from "@material-ui/core/Button/Button";
import Link from "../src/Link";
import FilterPopover from "../src/components/filter/FilterPopover";
import Container from "@material-ui/core/Container/Container";
import Box from "@material-ui/core/Box/Box";
import { PriceRangeState } from "@/components/filter/checkbox/PriceRange";
import { filterItems } from "@/src/utils/Filter";
import Grid from "@material-ui/core/Grid/Grid";
import { Product } from "@/src/types/interfaces/product";
import { ProductTypeState } from "@/components/filter/checkbox/ProductType";
import FilterSideBar from "@/components/filter/FilterSideBar";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import { SectionBreak } from "@/components/ui/Section";
import { handleProgress } from "@/src/utils/timer";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import { pageNum } from "@/src/utils/Calc";
import { PaginationItem } from "@material-ui/lab";
import Footer from "@/src/landingpage/Footer";

export async function getStaticProps() {
  let products = await Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN as string,
    storefrontAccessToken: process.env
      .NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
  })
    .product.fetchAll()
    .then((products) => {
      // console.log('Fetch All Products:', products)
      return products;
    })
    .catch((err) => {
      /*console.log("Error Message: ", err)*/
    });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

interface Props {
  products: Product[];
  pageAnimations: PageAnimations;
  setPageValue: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles(() => ({
  cardBtn: {
    border: "1px solid #4d4d4d50 !important",
    backgroundColor: "#f6f6f6 !important",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    transition: "0.3s border, 0.3s box-shadhow",
    "&:hover": {
      border: "1px solid #4d4d4d50 !important",
      boxShadow: "0 0 8px rgba(0,0,0,0.17)",
    },
  },
  pageButton: {
    border: "0.01px solid rgba(0,0,0,0.2",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
  },
  progress: {
    position: "absolute",
    top: "40%",
    left: "45%",
  },
}));

interface PaginationProps {
  array: number[];
  numOfItems: number;
  paginateValue: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationButtons = ({
  array,
  numOfItems,
  paginateValue,
  pageNumber,
  setPageNumber,
}: PaginationProps) => {
  const theme = useTheme();
  const matches = { sm: useMediaQuery(theme.breakpoints.up("sm")) };
  return (
    <Box>
      <GridContainer xs={4} sm={1} justifyContent="center">
        {array.map((val: number) => (
          <Button
            key={val + 1}
            onClick={() => setPageNumber(val + 1)}
            style={{
              textDecoration: val + 1 === pageNumber ? "underline" : "none",
              fontFamily: "Montserrat",
            }}
          >
            {val + 1}
          </Button>
        ))}
      </GridContainer>
      <SectionBreak mt={3} />
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: matches.sm ? "0.45%" : "3.05%",
        }}
      >
        {paginateValue + " of " + numOfItems + "  items"}
      </div>
    </Box>
  );
};

export default function Catalog(props: Props) {
  const classes = useStyles();
  const [priceRangeState, setPriceRangeState] = useState<
    PriceRangeState & { [char: string]: boolean }
  >({
    ["$0 - $60"]: false,
    ["$60 - $120"]: false,
    ["$120 - $180"]: false,
    ["over $180"]: false,
  });
  const [productTypeState, setProductTypeState] = useState<
    ProductTypeState & { [char: string]: boolean }
  >({
    basketball: false,
    running: false,
    casual: false,
  });

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceRangeState({
      ...priceRangeState,
      [event.target.name]: event.target.checked,
    });
    handleProgress(loading, setLoading, 600);
  };
  const handleProductTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductTypeState({
      ...productTypeState,
      [event.target.name]: event.target.checked,
    });
    handleProgress(loading, setLoading, 600);
  };

  const products = props.products.map((product: Product) => product);
  const filteredProducts = filterItems(
    products,
    priceRangeState,
    productTypeState
  );
  const [paginateValue, setPaginateValue] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const arrayOfPageNum = pageNum(filteredProducts, paginateValue);
  /**
   * paginateValue * pageNumber gives you indexs that you want to limit up to.
   * if index of product is more than (i > pV*(pN-1) && i < pV*pN)
   */
  const paginatedProducts = filteredProducts.filter(
    (val) =>
      (val.index as number) >= paginateValue * (pageNumber - 1) &&
      (val.index as number) < paginateValue * pageNumber
  );
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const matches = {
    mdUp: useMediaQuery(theme.breakpoints.up("md")),
    smDown: useMediaQuery(theme.breakpoints.down("sm")),
  }; /* xs: 0, sm: 600 md: 960, lg:1280px, xl1920px */

  // console.log('product.prices in catalog: ', products[0])
  return (
    <PageTransition pageAnimations={props.pageAnimations}>
      {/* <div style={{ marginTop: 120 }} /> */}
      <Box pr={3} mt={matches.mdUp ? 20 : 14} mb={15} pl={matches.mdUp ? 10 : 3}>
        <Container maxWidth="xl">
          {/* <SectionBreak mt={18} /> */}
          <PaginationButtons
            array={arrayOfPageNum}
            numOfItems={filteredProducts.length}
            paginateValue={paginateValue}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
          <SectionBreak mt={5} />
          <GridContainer justifyContent="flex-start" width="100%">
            {
              <FilterPopover
                handlePriceRangeChange={handlePriceRangeChange}
                priceRangeState={priceRangeState}
                handleProductTypeChange={handleProductTypeChange}
                productTypeState={productTypeState}
              />
            }
          </GridContainer>
          <SectionBreak mt={matches.smDown ? 5 : 0} />
          <Grid container justifyContent="space-between" wrap="wrap">
            {matches.mdUp && (
              <Grid
                item
                xs={3}
                style={{
                  border: "1px solid #4d4d4d50",
                  borderRadius: "4px",
                  boxShadow: "0 0 4px hsl(0, 2%, 82%",
                }}
              >
                <FilterSideBar
                  handlePriceRangeChange={handlePriceRangeChange}
                  priceRangeState={priceRangeState}
                  handleProductTypeChange={handleProductTypeChange}
                  productTypeState={productTypeState}
                />
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <div style={{ position: "relative", height: "100%" }}>
                <GridContainer xs={6} md={6} lg={4} spacing={4}>
                  {filteredProducts.length === 0 ? (
                    <h3>No items match the criteria</h3>
                  ) : loading ? (
                    <CircularProgress
                      size={55}
                      thickness={3}
                      className={classes.progress}
                      color="secondary"
                    />
                  ) : (
                    paginatedProducts?.map((product: Product) => (
                      <Grid key={product.index} container justifyContent="center">
                        <Button
                          component={Link}
                          as={`/catalog/${product.handle}`}
                          href={`/catalog/${product.handle}`}
                          onClick={() => {
                            props.setPageValue(1);
                          }}
                          data-testid="catalog-card"
                          className={classes.cardBtn}
                        >
                          <Card
                            title={product.title}
                            type={product.productType}
                            src={product.images[0].src}
                            price={product.variants[0].price}
                          />
                        </Button>
                      </Grid>
                    ))
                  )}
                </GridContainer>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </PageTransition>
  );
}
