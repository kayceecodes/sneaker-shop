import { CartItem } from '@/src/types/interfaces'
import Paper from '@material-ui/core/Paper/Paper'
import React, { Dispatch, ReactNode, useEffect, useState } from 'react'
import GridContainer from '../ui/grid/GridContainer'
import Image from 'next/image'
import Typography from '@material-ui/core/Typography/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box/Box'
import Button from '@material-ui/core/Button/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
import EditQuantity, {
  WidthOfQuantityComponents,
} from './editQuantity/editQuantity'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { handleProgress } from '@/src/utils/timer'
import Grid from '@material-ui/core/Grid/Grid'
import { useDispatch } from 'react-redux'
import { deleteItem, updateLineItemQuantity } from '@/src/store/actions/actionCreators/checkout'
import { AnyAction } from 'redux'
import { extractColor, extractTitle } from '@/src/utils/Parse'
import { color } from '@/src/ColorPalette'

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: 600,
    color: color.charcoal
  },
  btn: {
    fontSize: '0.65rem',
    textTransform: 'none',
    letterSpacing: '1px',
    fontWeight: 600,
    color: `${theme.palette.primary.main}`,
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.85rem',
    },
  },
  cardText: {
    // fontFamily: 'Inter',
    fontSize: '0.6rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.85rem',
    },
  },
  container: {
    border: `0.7px solid #0000003f`,
    padding: '15px 0px 15px 10px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: '35px 0px 35px 10px',
    },
    // width: '99%'
  },
  imgWrapper: {
    width: '30px',
  },
}))

export default function ItemCard(props: CartItem) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
  const matches = {sm: useMediaQuery(theme.breakpoints.up('sm'))}
   /* xs: 0, sm: 600 md: 960, lg:1280px, xl1920px */
  const dispatch: Dispatch<any> = useDispatch()
  const [quantity, setQuantity] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<any>) => {
    setQuantity(parseInt(event.target.value));
  };

  useEffect(() => {
      setQuantity(props.quantity);
  }, []);

  const handleSave = (id: string | number, qty: number) => {
    dispatch(updateLineItemQuantity(id as string, qty));
};

  const LoadingProgress = ({children}: {children:ReactNode}) =>
    loading ? <CircularProgress color="secondary" size={matches.sm ? 23 : 18} thickness={5} /> : <>{children}</>

  return (
    <Box my={1}>
      <Paper elevation={3} classes={{ root: classes.container }}>
        <Typography
          className={classes.cardText}
          variant="caption"
          component="div"
        >
          <GridContainer alignItems="center" justify="space-around">
            <Image
              className={classes.imgWrapper}
              width={matches.sm ? 90 : 55}
              height={matches.sm ? 90 : 55}
              src={props.src}
            />
            <GridContainer
              spacing={1}
              direction="column"
            >
              <strong className={classes.boldText}>{extractTitle(props.title)}</strong>
              <div>{extractColor(props.title)}</div>
              <div><span className={classes.boldText}>Size</span> {props.size}</div>
              <div>${props.price}</div>
            </GridContainer>
            <Box width={WidthOfQuantityComponents}>
              {!isShowing ? (
                <div>
                  <span className={classes.boldText}>Quantity</span>
                  <br />
                  {quantity}
                </div>
              ) : (
                <EditQuantity
                  quantity={quantity}
                  handleChange={handleChange}
                />
              )}
            </Box>
            <div>
              <GridContainer>
                <GridContainer direction="column">
                  {isShowing ? (
                    <Button
                      disabled={loading === true}
                      className={classes.btn + ' ' + classes.boldText}
                      onClick={() => {
                        setTimeout(() => {setIsShowing(false)}, 500)
                        handleProgress(loading, setLoading, 500)
                        handleSave(props.id as string, quantity)
                      }}
                    >
                      <LoadingProgress>Save</LoadingProgress>
                    </Button>
                  ) : (
                    <Button
                      className={classes.btn}
                      onClick={() => {
                        setIsShowing(true)
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  <br />
                  <Button onClick={() => dispatch(deleteItem(props.id))} variant="text" className={classes.btn}>
                    Delete
                  </Button>
                </GridContainer>
              </GridContainer>
            </div>
          </GridContainer>
        </Typography>
      </Paper>
    </Box>
  )
}

