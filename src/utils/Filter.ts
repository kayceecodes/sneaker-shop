import { PriceRangeState } from '@/components/filter/checkbox/PriceRange'
import { ProductTypeState } from '@/components/filter/checkbox/ProductType'
import { Product } from '../types/interfaces/product'

const products = [
  {
    id: 1,
    title: 'some 1',
    variants: [{ price: '20.00' }, { price: '200' }],
    images: [{ id: '', src: '' }],
    productType: 'Basketball',
    handle: '',
  },
  {
    id: 2,
    title: 'some 2',
    variants: [{ price: '62.00' }, { price: '200' }],
    images: [{ id: '', src: '' }],
    productType: 'Running',
    handle: '',
  },
  {
    id: 3,
    title: 'some 3',
    variants: [{ price: '90.00' }, { price: '200' }],
    images: [{ id: '', src: '' }],
    productType: 'Running',
    handle: '',
  },
  {
    id: 4,
    title: 'some 3',
    variants: [{ price: '120.00' }, { price: '200' }],
    images: [{ id: '', src: '' }],
    productType: 'Casual',
    handle: '',
  },
  {
    id: 5,
    title: 'some 2',
    variants: [{ price: '160.00' }, { price: '200' }],
    images: [{ id: '', src: '' }],
    productType: 'Basketball',
    handle: '',
  },
  {
    id: 6,
    title: 'some 3',
    variants: [{ price: '180.00' }, { price: '200' }],
    images: [{ id: '', src: '' }],
    productType: 'Running',
    handle: '',
  },
  {
    id: 7,
    title: 'some 3',
    variants: [{ price: '200.00' }, { price: '200' }],
    images: [{ id: '', src: '' }],
    productType: 'Basketball',
    handle: '',
  },
]
const filterByPriceRange = (
  items: Product[],
  state: PriceRangeState & { [char: string]: boolean }
) => {
  let filtered = []

  if (state['$0 - $60'] === true) {
    filtered.push(
      ...items.filter((item: Product) => parseInt(item.variants[0].price) < 60)
    )
  }
  if (state['$60 - $120'] === true) {
    filtered.push(
      ...items.filter(
        (item: Product) =>
          parseInt(item.variants[0].price) > 60 &&
          parseInt(item.variants[0].price) < 120
      )
    )
  }
  if (state['$120 - $180'] === true) {
    filtered.push(
      ...items.filter(
        (item: Product) =>
          parseInt(item.variants[0].price) > 120 &&
          parseInt(item.variants[0].price) < 180
      )
    )
  }
  if (state['over $180'] === true) {
    filtered.push(
      ...items.filter((item: Product) => parseInt(item.variants[0].price) > 180)
    )
  }

  for (let key in state) {
    if (state[key] === true) {
      return filtered
    }
  }
  return items
}
// console.log(filterByPriceRange(products, priceRangeState)[0].variants[0].price)

const productTypeState = {
  basketball: true,
  running: false,
  casual: true,
}

const filterByProductType = (
  items: any,
  state: ProductTypeState & { [char: string]: boolean }
) => {
  let filtered: Product[] = []

  let keys = Object.keys(state).map((key) => key)

  keys.forEach((key: string, index: number) => {
    // console.log(key)
    if (state[key] === true) {
      filtered.push(
        ...items.filter((item: Product) => item.productType === key[0].toUpperCase() + key.slice(1))
      )
    }
  })

  // console.log(filtered)
  for (let key in state) {
    if (state[key] === true) {
      return filtered
    }
  }
  return items
}

// console.log(filterByProductType(products, productTypeState))

export function filterItems(
  items: Product[],
  priceRangeState: PriceRangeState & { [char: string]: boolean },
  productTypeState: ProductTypeState & { [char: string]: boolean }
) {
  let temp = items

  temp = [...filterByPriceRange(temp, priceRangeState)]
  temp = [...filterByProductType(temp, productTypeState)]

  const ids = temp.map((item) => item.id)

  return temp.filter(({ id }, index) => !ids.includes(id, index + 1))
}
