import Product, { ProductVariant } from 'shopify-buy'
/* Product Data For display  */

/*Product custom built typeto display what's need from shopify*/
export interface Product {
  id?: number
  title: string
  variants: {id: string, price: string, title: string}[]
  // variants: {price: string}[]
  images: {id: string, src: string}[]
  productType: string
  handle: string
  size: string
  options: any[]
}

export interface CartItem {
  id: string
  title: string
  src: string
  size: string | number
  quantity: number
  price: string
}

/* Items for storing in a cart */
export interface Items {
      name: string
      quantity: number
      size: number
      price: number
      src: string
      id: any
}[]

// '{ price: string; }[]' is not assignable to type '[{ price: string; }]'.
// '{ id: string; src: string; }[]' is not assignable to type '[{ id: string; src: string; }]'