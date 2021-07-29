import * as React from 'react'
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
  darken,
} from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography/Typography'
import theme from '@/src/Theme'
import { color } from '../ColorPalette'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(12),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(20),
        paddingLeft: 60,
        paddingRight: 60,
      },
    },
    images: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexWrap: 'wrap',
    },
    imageWrapper: {
      position: 'relative',
      display: 'block',
      padding: 0,
      borderRadius: 0,
      height: '40vh',
      [theme.breakpoints.down('md')]: {
        width: '100% !important',
        height: 100,
      },
      '&:hover': {
        cursor: 'default',
        zIndex: 1,
      },
      '&:hover $imageBackdrop': {
        opacity: 0.15,
      },
      '&:hover $imageMarked': {
        opacity: 0,
      },
      '&:hover $imageTitle': {
        border: '4px solid #ffffffaa',
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
    },
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      background: theme.palette.common.black,
      opacity: 0.5,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: '7px 15px',
      borderRadius: '2px',
      transition: 'backgroundColor 0.3s',
      //   padding: `${theme.spacing(4)} ${theme.spacing(5)} 14px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      background: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
    blackTransparent: {
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
  })

function ProductCategories(props: WithStyles<typeof styles>) {
  const { classes } = props

  const images = [
    {
      url: 'assets/images/categories/street-skate.jpg',
      title: 'Street',
      width: '40%',
    },
    {
      url: 'assets/images/categories/track-field-sneakers.jpg',
      title: 'Track',
      width: '20%',
    },
    {
      url: 'assets/images/categories/football.jpeg',
      title: 'Yard',
      width: '40%',
    },
    {
      url: 'assets/images/categories/basketball-court.jpg',
      title: 'Court',
      width: '38%',
    },
    {
      url: 'assets/images/categories/skate-ring.jpg',
      title: 'Ring',
      width: '38%',
    },
    {
      url: 'assets/images/categories/baseball-field.jpg',
      title: 'Field',
      width: '24%',
    },
  ]

  return (
    // <Container className={classes.root} component="section">
    <div className={classes.root}>
      <Typography
        style={{
          textAlign: 'center',
          // color: darken(color.offWhite, 0.1),
          color: '#111',
          fontWeight: 500,
        }}
        variant="h2"
      >
        <span
          style={{
            borderBottom: '4px solid #ccc',
          }}
        >
          Pick Your Terrain
        </span>
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </div>
  )
}

export default withStyles(styles)(ProductCategories)
