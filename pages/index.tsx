import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '../src/Link'
import { PageAnimations } from '@/src/types/interfaces/animation'
import PageTransition from '@/src/components/ui/hoc/PageTransition'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper/Paper'
import Button from '@material-ui/core/Button/Button'
import Carousel from 'react-material-ui-carousel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { color } from '@/src/ColorPalette'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
import zIndex from '@material-ui/core/styles/zIndex'

interface Props {
  pageAnimations: PageAnimations
  item: {
    header: string
    description: string
    src: string
    images: { mobile: { src: string }; desktop: { src: string } }
  }
}

const useStyles = makeStyles((theme) => ({
  buttonHidden: {
    opacity: '0',
  },
  carouselContainer: {
    width: '100%',
  },
  margin: {
    marginTop: 20,
  },
  imgWrapper: {
    textAlign: 'center',
    position: 'relative',
    maxHeight: '100vh',
    overflow: 'hidden',
  },
  imgHeader: {
    position: 'absolute',
    top: '10%',
    left: '70%',
    fontSize: '2.5rem',
    color: color.offWhite,
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
      fontSize: '3rem',
      top: '15%',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '3.7rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '4rem',
    },
  },
  noShadow: {
    boxShadow: 'none',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 1,
  },
  relativeContainer: {
    position: 'relative',
  },
  shopNowBtn: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textTransform: 'none',
    color: color.offWhite,
    border: '2px solid #ffffff9a',
    // backgroundColor: 'rgba(0,0,0, 0.15)',
    padding: '5px 20px',
    zIndex: 1,
    '&:hover': {
      // border: '1px solid white',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1rem',
      padding: '10px 40px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.55rem',
    },
  },
}))

function Item(props: Pick<Props, 'item'>) {
  const classes = useStyles()

  return (
    <Paper classes={{ root: classes.noShadow }}>
      <div className={classes.imgWrapper}>
        <img
          style={{ width: '100%' }}
          src={props.item.src}
        />
        <Button className={classes.shopNowBtn} component={Link} href="/catalog">
          Shop Now
        </Button>
        <h1 className={classes.imgHeader}>{props.item.header}</h1>
      </div>
    </Paper>
  )
}

export default function Index({ pageAnimations }: Props) {
  var items = [
    {
      header: 'Nike',
      description: 'Probably the most random thing you have ever seen!',
      images: {
        desktop: { src: './assets/images/hero-img-pile-of-sneakers.jpg' },
        mobile: { src: './assets/images/hero-img-pile-of-sneakers-9:12.jpg' },
      },
      src: '',
    },
    {
      header: 'Just Skate',
      description: 'Probably the most random thing you have ever seen!',
      images: {
        desktop: { src: './assets/images/hero-img-street-skate.jpg' },
        mobile: { src: './assets/images/hero-img-street-skate-9:12.jpg' },
      },
      src: ''
    },
    {
      header: 'Just Run',
      description: '3 most probably the most random thing you have ever seen!',
      images: {
        desktop: { src: './assets/images/hero-img-beach-run.jpg' },
        mobile: { src: './assets/images/hero-img-beach-run-9:12.jpg' },
      },
      src: ''
    },
  ]
  const classes = useStyles()
  const matches = { sm: useMediaQuery(theme.breakpoints.up('sm')) }
  let src: string = '' 

  return (
    <>
      <PageTransition pageAnimations={pageAnimations}>
        <div className={classes.relativeContainer}>
          <div className={classes.overlay} />
          <Carousel
            indicatorIconButtonProps={{
              style: { opacity: 0, color: 'transparent' },
            }}
            indicatorContainerProps={{ style: { height: 0, margin: '-3px' } }}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{style: {zIndex: 2, opacity: 0.15}}}
          >
            {items.map((item, i) => {
              item.src = matches.sm
              ? item.images.desktop.src as string
              : item.images.mobile.src as string /* To Avoid functionality on an unmounted component */
              return <Item key={i} item={item}  />
            })}
            {/* <Image width='100%' height='auto' src='/assets/images/hero-img-1.jpg' /> */}
          </Carousel>
        </div>
      </PageTransition>
    </>
  )
}
