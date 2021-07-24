import React from 'react'
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
import GridContainer from '@/components/ui/grid/GridContainer'
import ProductCategories from '@/src/landingpage/ProductCategories'
import Footer from '@/src/landingpage/Footer'

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
    left: '15%',
    font: '1.5rem Inter',
    color: color.offWhite,
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
      fontSize: '3rem',
      top: '15%',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '3.7rem',
      left: '70%',
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textTransform: 'none',
    color: color.offWhite,
    border: '9px solid #ffffff3a',
    // backgroundColor: 'rgba(0,0,0, 0.15)',
    padding: '7px 20px',
    zIndex: 1,
    fontSize: '1.1rem',
    letterSpacing: '0.7px',
    borderRadius: '3px',
    transition: 'border 0.3s',
    '&:hover': {
      border: '9px solid #ffffffbb',
      // border: '1px solid white',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.6rem',
      padding: '10px 40px',
    },
    '&:hover $underline': {
      backgroundColor: color.caribbeanBlue,
    },
  },
  underline: {
    height: '3px',
    width: '95%',
    margin: '0 auto',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s',
  },
}))

function Item(props: Pick<Props, 'item'>) {
  const classes = useStyles()
  const matches = { sm: useMediaQuery(theme.breakpoints.up('sm')) }
  return (
    <Paper classes={{ root: classes.noShadow }}>
      <div className={classes.imgWrapper}>
        <img
          src={props.item.src}
          style={
            matches.sm
              ? { minHeight: '100vh', minWidth: '100%' }
              : { height: '70vh', minWidth: '100%' }
          }
        />

        <h1 className={classes.imgHeader}>{props.item.header}</h1>
      </div>
    </Paper>
  )
}

export default function Index({ pageAnimations }: Props) {
  var items = [
    {
      header: '',
      description: '',
      images: {
        desktop: {
          src: './assets/images/hero/hero-img-pile-of-sneakers-9:6.jpg',
        },
        mobile: {
          src: './assets/images/hero/hero-img-pile-of-sneakers-15:16.jpg',
        },
      },
      src: '',
    },
    {
      header: 'Just Skate',
      description: '',
      images: {
        desktop: { src: './assets/images/hero/hero-img-street-skate-9:6.jpg' },
        mobile: { src: './assets/images/hero/hero-img-street-skate-15:16.jpg' },
      },
      src: '',
    },
    {
      header: 'Just Run',
      description: '',
      images: {
        desktop: { src: './assets/images/hero/hero-img-marathon-9:6.jpg' },
        mobile: { src: './assets/images/hero/hero-img-marathon-15:16.jpg' },
      },
      src: '',
    },
    {
      header: 'Just Jump',
      description: '',
      images: {
        desktop: { src: './assets/images/hero/hero-img-shoot-ball-9:6.jpg' },
        mobile: { src: './assets/images/hero/hero-img-shoot-ball-15:16.jpg' },
      },
      src: '',
    },
  ]
  const classes = useStyles()
  const matches = { sm: useMediaQuery(theme.breakpoints.up('sm')) }
  let src: string = ''

  return (
    <PageTransition
      pageStyle={{ backgroundColor: '#111' }}
      pageAnimations={pageAnimations}
    >
      <>
        <div className={classes.relativeContainer}>
          <div className={classes.overlay} />
          <Button
            className={classes.shopNowBtn}
            component={Link}
            href="/catalog"
          >
            <GridContainer direction="column">
              <>Shop Now</>
              <div className={classes.underline} />
            </GridContainer>
          </Button>
          <Carousel
            indicatorIconButtonProps={{
              style: { opacity: 0, color: 'transparent' },
            }}
            indicatorContainerProps={{ style: { height: 0, margin: '-3px' } }}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{ style: { zIndex: 2, opacity: 0.15 } }}
          >
            {items.map((item, i) => {
              item.src = matches.sm
                ? item.images.desktop.src
                : item.images.mobile
                    .src /* To Avoid functionality on an unmounted component */
              return <Item key={i} item={item} />
            })}
          </Carousel>
        </div>
        <ProductCategories />
        <Footer />
      </>
    </PageTransition>
  )
}
