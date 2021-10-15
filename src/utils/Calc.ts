// import { LineItem, Item } from 'shopify-buy'

import { Product } from "../types/interfaces";

/* takes in a number of pages and returns an array of increments representing each page
that's availble */
export function pageNum(filteredProducts: Product[], paginationValue: number) {
  let index = 0;
  let pageNumbers: number[] = new Array(Math.ceil(filteredProducts.length/paginationValue));
  for (let val of pageNumbers)
    pageNumbers[index] = index++;

  return pageNumbers
}

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
  let totalItems: number = 0;

  lineItems?.forEach((item: any) => totalItems = item.quantity + totalItems)

  return (totalItems).toString();
};  
