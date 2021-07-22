import { CartItem, Product } from '@/src/types/interfaces/product'
import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Icon from '@material-ui/core/Icon/Icon'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCheckout } from '../../../store/actions/actionCreators/checkout'

interface Props {
  itemValues: CartItem
  variantId: string
  handleOpen: () => void
  // onAddToCart: (itemValues: CartItem) => void
}

const useStyles = makeStyles((theme) => ({
  cartBtn: {
    padding: '15px 30px',
    color: theme.palette.common.dimGray,
    textTransform: 'none',
  },
}))

export default function AddToCart({ itemValues, variantId, handleOpen }: Props) {
  const classes = useStyles()
  const isDisabled = itemValues.size === 0 || itemValues.quantity === 0
  const [loading, setLoading] = useState<boolean>(false)
  const setLoadTime = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 400)
  }
  const dispatch = useDispatch()
  return (
    <Button
      className={classes.cartBtn}
      variant="outlined"
      disabled={isDisabled}
      onClick={(e: any) => {
        console.log('itemValues In BtnAddToCart: ', itemValues)
        dispatch(addToCheckout(localStorage.checkout_id, variantId, itemValues.quantity))
        setLoadTime()
        handleOpen()
      }}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <div style={{ marginRight: '10px' }}>Add</div>
          <Icon>add_shopping_cart</Icon>
        </>
      )}
    </Button>
  )
}
