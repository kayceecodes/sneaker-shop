import { CartItem, Product } from '@/src/types/interfaces/product'
import GridContainer from '@/src/components/ui/grid/GridContainer'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState } from 'react'
import Client from 'shopify-buy'
import Image from 'next/image'
import Button from '@material-ui/core/Button/Button'
import router from 'next/router'
import Icon from '@material-ui/core/Icon/Icon'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import Box from '@material-ui/core/Box/Box'
import Typography from '@material-ui/core/Typography/Typography'
import ProductInput from '@/components/product/ProductInput'
import AddToCart from '@/components/ui/btn/AddToCart'
import { SectionMargin } from '@/components/ui/Section'
import CartSummary from '@/components/product/CartSummary'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
import { extractTitle } from '@/src/utils/Parse'

interface Props {
  product: Product
  setPageValue: React.Dispatch<React.SetStateAction<number>>
}

export const getStaticPaths: GetStaticPaths = async () => {
  let productsData: Promise<any[]> = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN as string,
    storefrontAccessToken: process.env
      .NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
  })
    .product.fetchAll()
    .then((products) => {
      return products
    })

  return {
    paths: (await productsData).map((product: any) => ({
      params: { slug: product.handle },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  let { params } = context

  let product = await Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN as string,
    storefrontAccessToken: process.env
      .NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
  })
    .product.fetchByHandle(params?.slug as string)
    .then((res) => res)

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  }
}

const useStyles = makeStyles((theme) => ({
  arrow: {
    fontSize: '1.6rem',
    color: theme.palette.common.dimGray,
    transition: '0.3s',
    '&:hover': {
      color: lighten(theme.palette.common.dimGray, 0.5),
    },
  },
  btn: {
    textTransform: 'none',
  },
  cartBtn: {
    padding: '15px 30px',
    color: theme.palette.common.dimGray,
    textTransform: 'none',
  },
  sizeBtn: {
    padding: '10px',
    fontSize: '0.9rem',
    width: '180px',
  },
}))

export default function ProductPage({ product, setPageValue }: Props) {
  const classes = useStyles()
  const [itemValues, setItemValues] = useState<CartItem>({
    id: '',
    title: 'No Title',
    size: 0,
    src: '/',
    quantity: 1,
    price: '$0.00',
  })
  const [open, setOpen] = useState<boolean>(false)
  const [variantId, setVariantId] = useState<string>('')
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
  } /* xs: 0, sm: 600 md: 960, lg:1280px, xl1920px */

  /*If value passed to func is not an event object then it's a string, variantId*/
  const handleChange = (
    prop: keyof CartItem,
    event: any,
    variantId?: string
  ) => {
    setItemValues({ ...itemValues, [prop]: event.target.value })
  }

  const handleVariantId = (prop: any, id: string) => {
    console.log('itemValues.variantId in handleVariantId: ', id)
    setVariantId(id)
  }

  const handleOpen = () => setOpen(!open)

  return (
    <Box mt={25}>
      <CartSummary
        open={open}
        handleOpen={handleOpen}
        product={product}
        quantity={itemValues.quantity}
        setPageValue={setPageValue}
      />
      <GridContainer width="100%" spacing={matches.sm ? 4 : 1} justify="center">
        <Button onClick={() => router.push('/catalog')} className={classes.btn}>
          <Icon className={classes.arrow}>arrow_back_ios</Icon>back
        </Button>
        <Image width={matches.sm ? 300 : 290} height={matches.sm ? 300 : 290} src={product.images[0].src} />
        <GridContainer
          justify="space-between"
          alignItems="center"
          direction="column"
        >
          <Typography variant="body1" component="div">
            <h2>{extractTitle(product.title)}</h2>${product.variants[0].price}
            <br />
            {product.productType}
            <SectionMargin px="12px" />
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
            <SectionMargin px="10px" />
            <AddToCart
              handleOpen={handleOpen}
              itemValues={itemValues}
              variantId={variantId}
            />
          </Typography>
        </GridContainer>
      </GridContainer>
    </Box>
  )
}
