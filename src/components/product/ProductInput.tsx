import React, { ReactElement } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import Select from '@material-ui/core/Select'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { CartItem, Product } from '@/src/types/interfaces/product'
import { ProductVariant } from 'shopify-buy'
import Box from '@material-ui/core/Box/Box'

interface Props {
  itemValues: CartItem
  inputType: string
  product: Product
  handleChange: (prop: any, e: any, varianId?: string) => void
  handleVariantId?: (prop: any, id: string) => void
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 85,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 100,
    },
  },
  outlined: {
    width: '180px',
    height: '35px',
    borderRadius: "0px",
    color: '#444',
  },
}))

export default function ProductInput(props: Props) {
  const classes = useStyles()
  let inputElement: ReactElement = <Select />
  let QuantityMenuItems = [<MenuItem key={'key0'} value={0}>1 - 5</MenuItem>]
  let SizeMenuItems = [<MenuItem key={'key0'} value={0}>Mens</MenuItem>]

  for (let i = 1; i < 6; i++)
    QuantityMenuItems.push(
      <MenuItem value={i} key={'key' + i}>
        {i}
      </MenuItem>
    )

  props.product?.variants.forEach((element: {title: string, id: string}, index) => {
    SizeMenuItems.push(
      <MenuItem
        value={`${element.title}`}
        onClick={ async (e: any) => {
          props.handleVariantId &&
          props.handleVariantId('variantId', element.id as string)
        }}
        // onClick={(e: any) => props.handleChange('variantId', e, element.id as string)}
        key={element.title}
      >
        {`${element.title}`}
      </MenuItem>
    )
  })

  /* Pick what will inputElement be for, Quantities or Sizes */
  switch (props.inputType) {
    case 'Qty':
      inputElement = (
        <Select
          value={props.itemValues.quantity}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange('quantity', event)
          }
          label="Qty"
          className={classes.outlined}
        >
          {QuantityMenuItems}
        </Select>
      )
      break
    case 'Size':
      inputElement = (
        <Select
          value={props.itemValues.size}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange('size', event)
          }
          label="Size"
          data-testid="select-size"
          className={classes.outlined}
        >
          {SizeMenuItems}
        </Select>
      )
      break
    default:
      ;<Select />
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Box mr={8}>
        <InputLabel>{props.inputType}</InputLabel>
        {inputElement}
      </Box>
    </FormControl>
  )
}
