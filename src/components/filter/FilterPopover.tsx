import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import PriceRange, { PriceRangeState } from './checkbox/PriceRange'
import FilterListIcon from '@material-ui/icons/FilterList'
import { color } from '../../ColorPalette'
import { Box, lighten } from '@material-ui/core'
import { ProductTypeState } from './checkbox/ProductType'
import FormControl from '@material-ui/core/FormControl/FormControl'
import Grid from '@material-ui/core/Grid/Grid'
import ProductType from './checkbox/ProductType'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import useTheme from '@material-ui/core/styles/useTheme'

const useStyles = makeStyles((theme: Theme) => ({
  closeBtn: {
    textTransform: 'none',
    fontWeight: 400,
  },
  iconBtn: {
    backgroundColor: color.transparent,
    boxShadow: 'none',
    color: color.dimGray,
    textTransform: 'none',
    border: `1px solid ${color.transparent}`,
    '&:hover': {
      color: lighten(color.dimGray, 0.4),
      backgroundColor: color.transparent,
      boxShadow: 'none',
      border: `1px solid ${color.dimGray}`,
    },
  },
  sectionMargin: {
    marginTop: '35px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '60px',
    },
  },
}))

interface Props {
  handlePriceRangeChange: (event: any) => void
  priceRangeState: PriceRangeState & { [char: string]: boolean }
  handleProductTypeChange: (event: any) => void
  productTypeState: ProductTypeState & { [char: string]: boolean }
}

export default function FilterPopover(props: Props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const theme = useTheme()
  const matches = {
    mdUp: useMediaQuery(theme.breakpoints.up('md')),
    smDown: useMediaQuery(theme.breakpoints.down('sm')),
  } /* xs: 0, sm: 600 md: 960, lg:1280px, xl1920px */

  return (
    <div style={{ visibility: `${matches.mdUp ? 'hidden' : 'visible'}` }}>
      <Button
        aria-describedby={id}
        variant="outlined"
        color="primary"
        role="button"
        onClick={handleClick}
        className={classes.iconBtn}
      >
        <FilterListIcon color="primary" />
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        role="dialog"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box py={2} px={3}>
          <FormControl>
            <PriceRange
              priceRangeState={props.priceRangeState}
              handlePriceRangeChange={props.handlePriceRangeChange}
            />
            <ProductType
              handleProductTypeChange={props.handleProductTypeChange}
              productTypeState={props.productTypeState}
            />
            <br />
            <Grid container justify="flex-end">
              <Button
                onClick={() => handleClose()}
                variant="outlined"
                className={classes.closeBtn}
                data-testid="close"
              >
                Close
              </Button>
            </Grid>
          </FormControl>
        </Box>
      </Popover>
    </div>
  )
}
