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
import Product from '../pages/catalog/[slug]'
import { Product as ProductData } from '@/src/types/interfaces/product'

interface ProductType {
  product: ProductData
  setPageValue: React.Dispatch<React.SetStateAction<number>>
}

const baseProps: ProductType = {
  setPageValue: () => {},
  product: {
    id: 390943,
    title: 'Some Product',
    variants: [{ id: '03209', price: '155.00', title: '6.5' }],
    images: [{ id: '0329', src: '/' }],
    productType: 'Basketball',
    handle: 'some-handle',
    size: '6.5',
    options: [{}],
  },
}
const renderUI = (props: ProductType) => render(<Product {...props} />, {})

describe('after clicking Select button ', () => {
  beforeEach(() => {
    renderUI({ ...baseProps })
    userEvent.click(screen.getByText(/Mens/))
  })
  test('at least 1 option in select should show in select tag', () => {
    expect(screen.getAllByRole('option')[0]).toBeInTheDocument()
  })  
  test('Add Button should not be disabled ', () => {
    userEvent.click(screen.getByText(/6.5/))
    expect(screen.getByText(/Add/)).not.toBeDisabled()
  })
  test('and clicking an option, the value should match', () => {
    userEvent.click(screen.getByText(baseProps.product.size)) 
    expect(screen.getByTestId(/select-size/)).toHaveTextContent(baseProps.product.size)
  })
})
