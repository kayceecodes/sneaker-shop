import { Product } from '@/src/types/interfaces/product'
import Modal from '@material-ui/core/Modal/Modal'
import Typography from '@material-ui/core/Typography/Typography'
import React from 'react'
import GridContainer from '../ui/grid/GridContainer'
import Image from 'next/image'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
import Button from '@material-ui/core/Button/Button'
import Link from '../../Link'
import { color } from '@/src/ColorPalette'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { LineItem } from 'shopify-buy'
import { shallowEqual, useSelector } from 'react-redux'
import { calcTotal, countTotalItems } from '@/src/utils/Calc'
import { useRouter } from 'next/router'
import { extractTitle } from '@/src/utils/Parse'

interface Props {
  open: boolean
  handleOpen: () => void
  product: Product
  quantity: number
  setPageValue: React.Dispatch<React.SetStateAction<number>>
}

const useStyles = makeStyles(() => ({
  btn: {
    textTransform: 'none',
    color: color.dimGray,
    fontSize: '0.75rem',
    border: `1px solid ${color.dimGray}`,
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    textDecoration: 'none',
    padding: '8px 20px',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: {
    width: '340px',
    backgroundColor: 'white',
    borderRadius: '3px',
    boxShadow: '0 0 20px rgba(0,0,0, 0.35)',
    [theme.breakpoints.up('sm')]: {
      width: 550,
    },
  },
}))

const ItemDetails = ({
  title,
  quantity,
  price,
}: {
  title: string
  quantity: number
  price: string
}) => (
  <GridContainer direction="column">
    <div>
      <strong>Name</strong>
      {/* <div>{extractTitle(title)}</div> */}
      <div>{title}</div>
    </div>
    <div>
      <strong>Price</strong>
      <div>${price}</div>
    </div>
    <div>
      <strong>Qty</strong>
      <div>{quantity}</div>
    </div>
  </GridContainer>
)

const CartDetails = ({ lineItems }: {lineItems: LineItem[]}) =>
  <>
    <div>
      <strong>{countTotalItems(lineItems)}</strong>{lineItems.length > 1 ? ' items' : ' item'} in cart
    </div>
    <strong style={{ fontSize: '1.3rem' }}>Cart Total</strong>
    <div>${calcTotal(lineItems)}</div>
  </>

export default function CartSummary({
  open,
  handleOpen,
  product,
  quantity,
  setPageValue,
}: Props) {
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
  } /* xs: 0, sm: 600 md: 960, lg:1280px, xl1920px */
  const classes = useStyles()
  const lineItems: LineItem[] = useSelector(
    (state: any) => state.checkoutReducer.checkout.lineItems,
    shallowEqual
  )
  const router = useRouter()

  return (
    <Modal className={classes.modal} open={open} onClose={handleOpen}>
      <div className={classes.summaryContainer}>
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
              src={product.images[0].src}
            />
            <ItemDetails
              title={product.title}
              price={product.variants[0].price}
              quantity={quantity}
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
          <Typography variant="body1" component="div">
            <div style={{ width: '100%' }}>
              <GridContainer
                justify="space-around"
                alignItems="center"
                margin="30px 0px 20px"
              >
                <Button
                  component={Link}
                  href="/catalog"
                  className={classes.btn}
                >
                  Continue Shopping
                </Button>
                <Button component={Link} href="/cart" className={classes.btn}>
                  Checkout
                </Button>
              </GridContainer>
            </div>
          </Typography>
        </Typography>
      </div>
    </Modal>
  )
}
