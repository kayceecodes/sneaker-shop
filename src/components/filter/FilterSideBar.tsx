import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import PriceRange, { PriceRangeState } from './checkbox/PriceRange'
import { color } from '../../ColorPalette'
import { ProductTypeState } from './checkbox/ProductType'
import FormControl from '@material-ui/core/FormControl/FormControl'
import ProductType from './checkbox/ProductType'
import Box from '@material-ui/core/Box/Box'

const useStyles = makeStyles((theme: Theme) => ({
boxContainer: {
    // boxShadow: '0 0 5px rgba(0,0,0,0.2)',
    // border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: '5px',
    // backgroundColor: '#f5f5f5',
    fontFamily: 'Montserrat',
  }
}))

interface Props {
  handlePriceRangeChange: (event: any) => void
  priceRangeState: PriceRangeState & { [char: string]: boolean }
  handleProductTypeChange: (event: any) => void
  productTypeState: ProductTypeState & { [char: string]: boolean }
}

export default function FilterSideBar(props: Props) {
  const classes = useStyles()
  
  return (
    <>     
        <Box py={4} pl={6} className={classes.boxContainer} maxWidth="282px">
          <FormControl style={{color: '#2d2d2d'}}>
            <PriceRange
              priceRangeState={props.priceRangeState}
              handlePriceRangeChange={props.handlePriceRangeChange}
            />
            <ProductType
              handleProductTypeChange={props.handleProductTypeChange}
              productTypeState={props.productTypeState}
            />
           
          </FormControl>
        </Box>
    </>
  )
}
