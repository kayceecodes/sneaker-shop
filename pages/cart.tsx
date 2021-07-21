import React, { useContext } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { PageAnimations, Motions, CartItem } from '@/src/types/interfaces/index'
import Button from '@material-ui/core/Button/Button'
import Link from '../src/Link'
import PageTransition from '@/src/components/ui/hoc/PageTransition'
import Grid from '@/src/components/ui/grid/GridContainer'
import { calcTotalCost, countTotalItems } from '@/src/utils/Calc'
import { CSSProperties } from '@material-ui/styles'
import { color } from '@/src/ColorPalette'
import ItemCard from '@/components/cart/itemcard'
import Box from '@material-ui/core/Box/Box'

interface IProps {
  pageStyle: CSSProperties
  pageAnimations: PageAnimations
  motions: Motions
  cartItems: CartItem[]
  cartTotal: number
}

const useStyles = makeStyles((theme) => ({
  cartDetailsBox: {
    borderBottom: `2px solid ${color.dimGray}`,
    padding: '20px 70px 30px',
  },
  checkoutBtn: {
    color: theme.palette.common.dimGray,
    // font: '0.8rem Raleway',
    textTransform: 'none',
    letterSpacing: '0.5px',
    padding: '12px 25px',
    boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
    border: `1px solid ${theme.palette.common.dimGray}`,
    // transition: 'color 0.3s',
    marginBottom: '60px',
    '&:hover': {
      color: theme.palette.common.cadetBlue,
    },
  },
  disabled: {
    border: `1px solid #ddd`,
    textTransform: 'none',
    padding: '12px 25px',
  },
  itemsListContainer: {
    overflow: 'auto',
    height: '350px',
    marginTop: '20px',
    marginBottom: '60px',
    paddingRight: '05px',
    paddingLeft: '05px',
    textAlign: 'center',
    border: `0.5px solid ${theme.palette.common.dimGray}`,
    backgroundColor: theme.palette.common.offWhite,
    borderRadius: '4px',
    boxShadow: '0px 0px 20px rgba(0,0,0,0.05)',
    [theme.breakpoints.up('sm')]: {
      width: '590px',
    },
    [theme.breakpoints.up('md')]: {
      width: '620px',
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

  return (
    <PageTransition
      pageStyle={props.pageStyle}
      pageAnimations={props.pageAnimations}
    >
      <Box mt={25}>
        <Grid
          direction="column"
          justify="space-around"
          alignItems="center"
          xs={12}
        >
          <Stats lineItems={checkout?.lineItems} />
          <ItemsList
            lineItems={checkout?.lineItems}
            countTotalItems={countTotalItems}
          />
          <Button
            disabled={checkout?.lineItems.length === 0}
            component={Link}
            href={checkout?.webUrl ? checkout?.webUrl : '/'}
            className={
              checkout.lineItems.length > 0
                ? classes.checkoutBtn
                : classes.disabled
            }
          >
            Continue To Checkout
          </Button>
        </Grid>
      </Box>
    </PageTransition>
  )
}
