// import { LineItem, Item } from 'shopify-buy'

export const calcTotal = (items: any[]): string => {
  let total = items.reduce((acc: number, val: any) => {
    acc += val.quantity * parseFloat(val.variant.price)
    return acc
  }, 0)

  return (total).toFixed(2)
}
// console.log(calcTotal([{ variant: {price: '40.01', quantity: 4} }]))
// console.log(parseFloat('39.93') * 4)

export const calcTotalCost = (lineItems: any) => {
  let cartTotal = 0

  lineItems?.forEach((item: any) => 
  {cartTotal = (Number(item.variant.price) * item.quantity) + cartTotal})

  return cartTotal.toFixed(2)
}


// export const calcTotalCost = (lineItems: Item[]) => {
//   let cartTotal = 0

//   if (lineItems.length !== 0)
//     lineItems?.forEach((item: Item) => {
//       cartTotal = Number(item.variant.price) * item.quantity + cartTotal
//     })
//   else return cartTotal

//   return cartTotal.toFixed(2)
// }

export const countTotalItems = (lineItems: any) => {
  let totalItems = 0;

  lineItems?.forEach((item: any) => totalItems = item.quantity + totalItems)

  return totalItems > 0 ? totalItems : 'No Items';
};  
