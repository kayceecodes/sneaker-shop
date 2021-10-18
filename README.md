# Cart - Nextjs Typescript Shopify Scaffold
    Includes...
    Material ui
    Typescript
    Nextjs
    Redux
    JS Shopify Buy SDK

    Mui-Org - Nextjs-With-Typescript
    https://github.com/mui-org/material-ui/tree/master/examples/nextjs-with-typescript

    JS Shopify Buy SDK
    Lightweight library that allows you to build ecommerce into any website. It's based on Shopify's Storefront API and provides the ability to retrieve products and collections from your shop, add products to a cart, and checkout.
    http://shopify.github.io/js-buy-sdk/





<!-- 





    import React, { useContext } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { PageAnimations, Motions, CartItem } from '@/src/types/interfaces/index'
import Button from '@material-ui/core/Button/Button'
import Link from '../src/Link'
import PageTransition from '@/src/components/ui/hoc/PageTransition'
import GridContainer from '@/src/components/ui/grid/GridContainer'
import { calcTotalCost, countTotalItems } from '@/src/utils/Calc'
import { CSSProperties } from '@material-ui/styles'
import { color } from '@/src/ColorPalette'
import ItemCard from '@/components/cart/itemcard'
import theme from '@/src/Theme'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'

interface IProps {
  pageStyle: CSSProperties
  pageAnimations: PageAnimations
  motions: Motions
  cartItems: CartItem[]
  cartTotal: number
}

const useStyles = makeStyles((theme) => ({
  circularProgressWrapper: {
    margin: '80px auto 0px',
  },
  cartDetailsBox: {
    // borderBottom:  `2px solid ${color.dimGray}`,
    padding: '20px 70px 30px',
  },
  itemsListContainer: {
    overflow: 'auto',
    height: '350px',
    minWidth: '370px',
    width: '360px',
    marginTop: '20px',
    marginBottom: '60px',
    paddingRight: '10px',
    paddingLeft: '10px',
    textAlign: 'center',
    border: `0.5px solid ${theme.palette.common.dimGray}`,
    backgroundColor: theme.palette.common.offWhite,
    borderRadius: '4px',
    boxShadow: '0px 0px 8px rgba(0,0,0,0.07)',
    [theme.breakpoints.up('sm')]: {
      width: '590px',
    },
    [theme.breakpoints.up('md')]: {
      width: '620px',
    },
  },
  checkoutBtn: {
    color: theme.palette.common.dimGray,
    // font: '0.8rem Raleway',
    textTransform: 'none',
    letterSpacing: '0.5px',
    padding: '12px 25px',
    boxShadow: '0px 0px 4px rgba(0,0,0,0.1)',
    border: `1px solid ${theme.palette.common.dimGray}`,
    // transition: 'color 0.3s',
    marginBottom: '60px',
    '&:hover': {
      color: theme.palette.common.cadetBlue,
    },
  },
}))

const ItemsList = (props: any) => {
  const classes = useStyles()

  return (
    <div className={classes.itemsListContainer}>
      {props.lineItems?.length > 0 ? (
        props.lineItems.map((item: any, index: number) => (
          <ItemCard
            key={item.title + item.size + index}
            title={item.title}
            quantity={item.quantity}
            size={item.variant.title.split(' /')[0]}
            price={item.variant.price}
            src={item.variant.image.src}
            id={item.id}
          />
        ))
      ) : (
        <span>Your Cart Is Empty</span>
      )}
    </div>
  )
}

const Stats = (props: any) => {
  const classes = useStyles()

  return (
    <div className={classes.cartDetailsBox}>
      {'Cart Total: $' + calcTotalCost(props.lineItems)}
      <br />
      {'Total Items in Cart: ' + countTotalItems(props.lineItems)}
    </div>
  )
}

export default function CartPage(props: IProps) {
  const checkout = useSelector(
    (state: any) => state.checkoutReducer.checkout,
    shallowEqual
  )
  const classes = useStyles()
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    xl: useMediaQuery(theme.breakpoints.up('xl'))
  } 
  return (
    <PageTransition
      pageStyle={props.pageStyle}
      pageAnimations={props.pageAnimations}
    >
      <GridContainer
        direction={matches.xl ? "row" : "column"}
        justifyContent="center"
        alignItems="center"
        margin="160px auto 0"
        xs={matches.xl ? 6 : 12}
      >
        <Stats lineItems={checkout?.lineItems} />
        <GridContainer direction="column" alignItems="center">
          <ItemsList
            lineItems={checkout?.lineItems}
            countTotalItems={countTotalItems}
          />
          <Button
            disabled={checkout?.lineItems === 0}
            component={Link}
            href={checkout?.webUrl ? checkout?.webUrl : '/'}
            className={classes.checkoutBtn}
          >
            Continue To Checkout
          </Button>
        </GridContainer>
      </GridContainer>
    </PageTransition>
  )
} -->
# Gear Shop
