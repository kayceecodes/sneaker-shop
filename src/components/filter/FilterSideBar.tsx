import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import PriceRange, { PriceRangeState } from './checkbox/PriceRange'
import { color } from '../../ColorPalette'
import { ProductTypeState } from './checkbox/ProductType'
import FormControl from '@material-ui/core/FormControl/FormControl'
import Grid from '@material-ui/core/Grid/Grid'
import ProductType from './checkbox/ProductType'
import Box from '@material-ui/core/Box/Box'

const useStyles = makeStyles((theme: Theme) => ({
  
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
           
          </FormControl>
        </Box>
    </>
  )
}
