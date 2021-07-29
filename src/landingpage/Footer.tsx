import GridContainer from '@/components/ui/grid/GridContainer'
import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
import Typography from '@material-ui/core/Typography/Typography'
import { color } from '../ColorPalette'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Box from '@material-ui/core/Box/Box'
import styled from '@material-ui/core/styles/styled'
import Icon from '@material-ui/core/Icon/Icon'
import Instagram from '@material-ui/icons/Instagram'

const useStyles = makeStyles((theme) => ({
  boldText: {
    color: '#fff',
    letterSpacing: '0.9px',
    fontWeight: 300,
    fontSize: '0.8rem',
    margin: '15px 0px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.35rem',
      borderBottom: `1px solid transparent`,
    },
  },
  section: {
    borderBottom: `1px solid ${fade('#fff', 0.25)}`,
    [theme.breakpoints.up('sm')]: {
      borderBottom: `1px solid transparent`,
    },
  },
  text: {
    color: fade('#fff', 0.6),
    fontWeight: 300,
    fontSize: '0.8rem',
    letterSpacing: '1.2px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.35rem',
    },
  },
}))

export default function Footer() {
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
  }
  const classes = useStyles()
  return (
    <Box pt={8} pb={4} style={{ backgroundColor: '#050505' }}>
      <GridContainer
        xs={12}
        md={6}
        xl={4}
        justify="center"
        direction={matches.sm ? 'row' : 'column'}
      >
        <Box pb={3} mb={3} mx={matches.sm ? 8 : 5} className={classes.section}>
          <Typography
            variant="h2"
            style={{ fontSize: '2rem' }}
            className={classes.boldText}
          >
            Sneaker Shop
          </Typography>
          <div className={classes.text}>
            <span>The place to get your gear</span>
            <br />
          </div>
          <strong className={classes.boldText}>Shop Here</strong>
        </Box>
        <Box pb={8} mb={3} mx={matches.sm ? 8 : 5} className={classes.section}>
          <GridContainer xs={6} spacing={4}>
            <div>
              <Typography variant="h5" className={classes.boldText}>
                Visit
              </Typography>
              <div className={classes.text}>
                <div>3532 Bell Dr</div>
                <div>Detroit, MI</div>
                <div>98201</div>
              </div>
            </div>
            <div>
              <Typography variant="h5" className={classes.boldText}>
                Follow
              </Typography>
              <div className={classes.text}>
                <Icon>facebook</Icon>
                <Instagram />
              </div>
            </div>
          </GridContainer>
        </Box>
      </GridContainer>
      <Typography variant="caption" className={classes.text}>
        <small style={{marginLeft: '60px'}}>@Copywright 2021</small>
      </Typography>
    </Box>
  )
}
