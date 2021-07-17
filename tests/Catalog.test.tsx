jest.mock('shopify-buy')

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
))
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathName: '',
      query: '',
      asPath: '',
    }
  },
}))
import React from 'react'
import { render } from './test-utils'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import Catalog from '../pages/catalog'
/*borisowsky - https://github.com/vercel/next.js/issues/7479*/
import { Product } from '@/src/types/interfaces/product'

interface CatalogType {
  products: Product[]
  pageAnimations: any
  setPageValue: React.Dispatch<React.SetStateAction<number>>
}

const baseProps: CatalogType = {
  setPageValue: () => {},
  pageAnimations: {},
  products: [
    {
      id: 2034,
      title: '5th Title',
      variants: [
        {
          id: "2034 A",
          price: '55.00',
          title: "4"
        },
      ],
      size: "",
      images: [{ id: 'img-id-2034', src: '/some-img2034' }],
      productType: 'Running',
      handle: '5th-handle',
      options: [{}]
    },
    {
      id: 2120,
      title: '6th Title',
      variants: [
        {   id: "4132",
        price: '200.00',
        title: "6"
        },
      ],
      size: "",
      images: [{ id: 'img-id-2120', src: '/some-img2034' }],
      productType: 'Casual',
      handle: '6th-handle',
      options: [{}]
    },
    {
      id: 2209,
      title: '7th Title',
      variants: [
        {
          id: "3241",
          price: '150.00',
          title: "5"
        },
      ],
      size: "",
      images: [{ id: 'img-id-2034', src: '/some-img2034' }],
      productType: 'Basketball',
      handle: '7th-handle',
      options: [{}]
    },
  ],
}

const renderUI = (props: CatalogType) => render(<Catalog {...props} />, {})

const PricesOverOneEighty: Product[] = baseProps.products.filter(
  (val) => parseInt(val.variants[0].price) > 180
)
const PricesUnderSixty: Product[] = baseProps.products.filter(
  (val) => parseInt(val.variants[0].price) < 60
)
test('show the same number of cards that are in products', async () => {
  renderUI({ ...baseProps })

  await waitFor(() => screen.queryAllByRole('listitem').length)
})

describe('after each click of check box filter length of them changes according', () => {
  beforeEach(() => {
    renderUI({ ...baseProps })

    const filterBtn = screen.getByText('Filter')

    userEvent.click(filterBtn)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('click on under $60 and the lowest products will show', () => {
    userEvent.click(screen.getByLabelText('$0 - $60') /*$0 - $60*/)
    userEvent.click(screen.getByText(/Close/))

    expect(screen.getAllByRole('listitem').length).toEqual(
      PricesUnderSixty.length
    )
  })

  test('click on over $180 and the highest products will show', () => {
    userEvent.click(screen.getByLabelText('over $180'))
    userEvent.click(screen.getByText(/Close/))

    expect(screen.getAllByRole('listitem').length).toEqual(
      PricesOverOneEighty.length
    )
  })
})

const typeFilter = (type: string) =>
  baseProps.products.filter((val: Product) => type === val.productType)

describe('after each click of a product type the length of products array changes according', () => {
  beforeEach(() => {
    renderUI({ ...baseProps })

    const filterBtn = screen.getByText('Filter')

    userEvent.click(filterBtn)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('click on Bastketball, product types of Basketball will show', () => {
    userEvent.click(screen.getByLabelText('Basketball'))
    userEvent.click(screen.getByText(/Close/))

    expect(screen.getAllByRole('listitem').length).toEqual(
      typeFilter('Basketball').length
    )
  })

  test('click on Casual, product type of Casual will show', () => {
    userEvent.click(screen.getByLabelText('Casual'))
    userEvent.click(screen.getByText(/Close/))

    expect(screen.getAllByRole('listitem').length).toEqual(
      typeFilter('Casual').length
    )
  })

  test('click on Running, product type of Running will show', () => {
    userEvent.click(screen.getByLabelText('Running'))
    userEvent.click(screen.getByText(/Close/))

    expect(screen.getAllByRole('listitem').length).toEqual(
      typeFilter('Running').length
    )
  })
})
