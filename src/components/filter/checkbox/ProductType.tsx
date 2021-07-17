import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import Typography from '@material-ui/core/Typography/Typography'
import Box from '@material-ui/core/Box/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
export interface ProductTypeState {
  basketball: boolean,
  running: boolean,
  casual: boolean,
}
interface Props {
  productTypeState: ProductTypeState
  handleProductTypeChange: (event: any) => void
}
const useStyles = makeStyles((theme) => ({
  sectionMargin: {
    marginTop: '35px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '60px',
    },
  },
}))

export default function PriceRange(props: Props) {
    const matches = { sm: useMediaQuery(theme.breakpoints.up('sm')) }

  return (
    <>
      <Box mt={3} fontWeight={500} fontSize={'0.9rem'}>
        Appearal Type
      </Box>
      <FormGroup row>
        <Typography variant="body1">
          <FormControlLabel
            style={{ fontFamily: 'Roboto' }}
            control={
              <Checkbox
                checked={props.productTypeState['basketball']}
                onChange={props.handleProductTypeChange}
                name="basketball"
              />
            }
            label="Basketball"
          />
          {matches.sm ? <br /> : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={props.productTypeState['casual']}
                onChange={props.handleProductTypeChange}
                name="casual"
              />
            }
            label="Casual"
          />
          {matches.sm ? <br /> : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={props.productTypeState['running']}
                onChange={props.handleProductTypeChange}
                name="running"
              />
            }
            label="Running"
          />          
        </Typography>
      </FormGroup>
    </>
  )
}
