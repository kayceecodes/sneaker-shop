import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

interface Props {
  quantity: number
  handleChange: (event: React.ChangeEvent<any>) => void
}

export const WidthOfQuantityComponents = 68

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
  },
  select: {
    fontSize: '0.8rem',
    height: 40,
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.95rem',
      height: 50,
    },
  },
}))

export default function EditQuantity(props: Props) {
  const classes = useStyles()
  let options = []

  for (let i = 0; i < 10; i++)
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    )

  return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-quantity-native-simple">Quantity</InputLabel>
        <Select
          native
          className={classes.select}
          value={props.quantity}
          onChange={props.handleChange}
          label="Quantity"
          inputProps={{
            name: 'quantity',
            id: 'outlined-quantity-native-simple',
          }}
        >
          {options}
        </Select>
      </FormControl>
  )
}
