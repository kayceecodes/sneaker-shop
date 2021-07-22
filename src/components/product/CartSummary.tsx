import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import GridContainer from '../ui/grid/GridContainer'
import Image from 'next/image'
import { calcTotal, countTotalItems } from '@/src/utils/Calc'
import { LineItem } from 'shopify-buy'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { color } from '@/src/ColorPalette'
import { shallowEqual, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Product } from '@/src/types/interfaces'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import Link from '@/src/Link'
import Typography from '@material-ui/core/Typography/Typography'

interface Props {
  open: boolean
  handleOpen: () => void
  product: Product
  quantity: number
}

const useStyles = makeStyles(() => ({
  btn: {
    textTransform: 'none',
    color: color.dimGray,
    border: `1px solid ${color.dimGray}`,
    boxShadow: '0 0 3px rgba(0,0,0,0.2)',
    padding: '8px 20px',
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
  boldText: {
    color: '#444',
    // fontFamily: ''
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: {
    boxShadow: '0 0 20px rgba(0,0,0, 0.35)',
    color: color.dimGray,
  },
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})
const CartDetails = ({ lineItems }: { lineItems: LineItem[] }) => {
  const classes = useStyles()
  return (
    <>
      <div>
        <strong className={classes.boldText}>{countTotalItems(lineItems)}</strong>
        {lineItems.length > 1 ? ' items' : ' item'} in cart
      </div>
      <strong className={classes.boldText} style={{ fontSize: '1.3rem' }}>Cart Total</strong>
      <div>${calcTotal(lineItems)}</div>
    </>
  )
}
const ItemDetails = ({
  title,
  quantity,
  price,
}: {
  title: string
  quantity: number
  price: string
}) => {
  const classes = useStyles()
  return (
    <GridContainer direction="column">
      <div>
        <strong className={classes.boldText}>Name</strong>
        {/* <div>{extractTitle(title)}</div> */}
        <div>{title}</div>
      </div>
      <div>
        <strong className={classes.boldText}>Price</strong>
        <div>${price}</div>
      </div>
      <div>
        <strong className={classes.boldText}>Qty</strong>
        <div>{quantity}</div>
      </div>
    </GridContainer>
  )
}
export default function CartSummary(props: Props) {
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
  } /* xs: 0, sm: 600 md: 960, lg:1280px, xl1920px */
  const classes = useStyles()
  const lineItems: LineItem[] = useSelector(
    (state: any) => state.checkoutReducer.checkout.lineItems,
    shallowEqual
  )
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      className={classes.summaryContainer}
      keepMounted
      onClose={props.handleOpen}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <div className={classes.boldText} style={{ fontSize: '2rem' }}>{'Just Added'}</div>
      </DialogTitle>
      <Typography variant="body1" component="div">
        <GridContainer
          padding="35px 10px 5px"
          justify="space-around"
          wrap="wrap"
          width={matches.sm ? '550px' : 'auto'}
        >
          <Image
            width={matches.sm ? 155 : 125}
            height={matches.sm ? 155 : 125}
            src={props.product.images[0].src}
          />
          <ItemDetails
            title={props.product.title}
            price={props.product.variants[0].price}
            quantity={props.quantity}
          />
          <GridContainer
            margin="60px 0 0"
            direction="column"
            alignItems={matches.sm ? 'flex-end' : 'center'}
            xs={12}
          >
            <CartDetails lineItems={lineItems} />
          </GridContainer>
        </GridContainer>
        <div style={{ width: '100%' }}>
          <GridContainer
            justify="space-around"
            alignItems="center"
            margin="30px 0px 20px"
          >
            <Button component={Link} href="/catalog" className={classes.btn}>
              Continue Shopping
            </Button>
            <Button component={Link} href="/cart" className={classes.btn}>
              Checkout
            </Button>
          </GridContainer>
        </div>
      </Typography>
    </Dialog>
  )
}
