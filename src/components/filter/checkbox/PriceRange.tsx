import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Typography from '@material-ui/core/Typography/Typography'
import Box from '@material-ui/core/Box/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
export interface PriceRangeState extends Record<string, boolean> {
  '$0 - $60': boolean
  '$60 - $120': boolean
  '$120 - $180': boolean
  'over $180': boolean
}

interface Props {
  priceRangeState: PriceRangeState
  handlePriceRangeChange: (event: any) => void
}

export default function PriceRange(props: Props) {
  const { priceRangeState, handlePriceRangeChange } = props
  const matches = { sm: useMediaQuery(theme.breakpoints.up('sm')) }

  return (
    <>
      <Box fontWeight={500} fontSize={'0.9rem'}>
        Price Range
      </Box>

      <FormGroup>
        <Typography variant="body1">
          <FormControlLabel
            control={
              <Checkbox
                checked={priceRangeState['$0 - $60']}
                onChange={handlePriceRangeChange}
                name="$0 - $60"
              />
            }
            label="$0 - $60"
          />
          {matches.sm ? <br /> : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={priceRangeState['$60 - $120']}
                onChange={handlePriceRangeChange}
                name="$60 - $120"
              />
            }
            label="$60 - $120"
          />
          {matches.sm ? <br /> : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={priceRangeState['$120 - $180']}
                onChange={handlePriceRangeChange}
                name="$120 - $180"
              />
            }
            label="$120 - $180"
          />
          {matches.sm ? <br /> : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={priceRangeState['over $180']}
                onChange={handlePriceRangeChange}
                name="over $180"
              />
            }
            label="over $180"
          />
        </Typography>
      </FormGroup>
    </>
  )
}
