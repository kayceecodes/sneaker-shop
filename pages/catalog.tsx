import React, { useState } from 'react'
import GridContainer from '../src/components/ui/grid/GridContainer'
import Client from 'shopify-buy'
import Card from '../src/components/catalog/card'
import PageTransition from '../src/components/ui/hoc/PageTransition'
import { PageAnimations } from '@/src/types/interfaces/animation'
import Button from '@material-ui/core/Button/Button'
import Link from '../src/Link'
import FilterPopover from '../src/components/filter/FilterPopover'
import Container from '@material-ui/core/Container/Container'
import Box from '@material-ui/core/Box/Box'
import { PriceRangeState } from '@/components/filter/checkbox/PriceRange'
import { filterItems } from '@/src/utils/Filter'
import Grid from '@material-ui/core/Grid/Grid'
import { Product } from '@/src/types/interfaces/product'
import { ProductTypeState } from '@/components/filter/checkbox/ProductType'
import FilterSideBar from '@/components/filter/FilterSideBar'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import useTheme from '@material-ui/core/styles/useTheme'
import { SectionBreak } from '@/components/ui/Section'
import { handleProgress } from '@/src/utils/timer'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import CenteredAbsolute from '@/components/ui/hoc/CenteredAbsolute'

export async function getStaticProps() {
  let products = await Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN as string,
    storefrontAccessToken: process.env
      .NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
  })
    .product.fetchAll()
    .then((products) => {
      console.log('Fetch All Products:', products)
      return products
    })
    .catch((err) => {
      /*console.log("Error Message: ", err)*/
    })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

interface Props {
  products: Product[]
  pageAnimations: PageAnimations
  setPageValue: React.Dispatch<React.SetStateAction<number>>
}

export default function Catalog(props: Props) {
  const [priceRangeState, setPriceRangeState] = useState<
    PriceRangeState & { [char: string]: boolean }
  >({
    ['$0 - $60']: false,
    ['$60 - $120']: false,
    ['$120 - $180']: false,
    ['over $180']: false,
  })
  const [productTypeState, setProductTypeState] = useState<
    ProductTypeState & { [char: string]: boolean }
  >({
    basketball: false,
    running: false,
    casual: false,
  })

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceRangeState({
      ...priceRangeState,
      [event.target.name]: event.target.checked,
    })
    handleProgress(loading, setLoading, 600)
  }
  const handleProductTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductTypeState({
      ...productTypeState,
      [event.target.name]: event.target.checked,
    })
    handleProgress(loading, setLoading, 600)
  }

  const products = props.products.map((product: Product) => product)
  const filteredProducts = filterItems(
    products,
    priceRangeState,
    productTypeState
  )
  const theme = useTheme()
  const [loading, setLoading] = useState<boolean>(false)
  const matches = {
    mdUp: useMediaQuery(theme.breakpoints.up('md')),
    smDown: useMediaQuery(theme.breakpoints.down('sm')),
  } /* xs: 0, sm: 600 md: 960, lg:1280px, xl1920px */

  // console.log('product.prices in catalog: ', products[0])
  return (
    <PageTransition pageAnimations={props.pageAnimations}>
        <Container maxWidth="xl">
          <Box pr={3} pl={matches.mdUp ? 10 : 3}>
          <GridContainer justify="flex-start" width="100%">
            {
              <FilterPopover
                handlePriceRangeChange={handlePriceRangeChange}
                priceRangeState={priceRangeState}
                handleProductTypeChange={handleProductTypeChange}
                productTypeState={productTypeState}              
              />
            }
          </GridContainer>
          <SectionBreak mt={ matches.smDown ? 5 : 0} />
          <Grid container justify="space-between" wrap="wrap">
            {matches.mdUp && (
              <Grid item xs={3}>
                <FilterSideBar
                  handlePriceRangeChange={handlePriceRangeChange}
                  priceRangeState={priceRangeState}
                  handleProductTypeChange={handleProductTypeChange}
                  productTypeState={productTypeState}
                />
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <GridContainer xs={6} md={4} spacing={4}>
                {filteredProducts.length === 0 ? (
                  <h3>No items match the criteria</h3>
                ) : (
                  loading ? <CircularProgress /> 
                  : 
                  filteredProducts?.map((product: Product) => (
                    <Grid key={product.title} container justify="center">
                      <Button
                        component={Link}
                        as={`/catalog/${product.handle}`}
                        href={`/catalog/${product.handle}`}
                        onClick={() => {
                          props.setPageValue(1)
                        }}
                        data-testid="catalog-card"
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
            </Grid>
          </Grid>
          </Box>
        </Container>
    </PageTransition>
  )
}
