import { Dispatch } from 'redux'
import Client, { Cart } from 'shopify-buy'
import { ActionTypes } from '../actionTypes'

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN as string,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
})

export interface CheckoutState {
  checkout: Cart
}

export interface CheckoutAction {
  type: string
  checkout: Cart
}
export interface DeleteItemAction {
  type: string
  checkout: Cart
}
export interface UpdateQuantityAction {
  type: string
  payload: {
    variantId: string
    quantity: number
  }
}

export const fetchCheckout = (checkoutId: string) => {
  return (dispatch: Dispatch) => {
    console.log('checkoutId -> fetchCheckout(): ', checkoutId)
    return client.checkout.fetch(checkoutId).then((checkout) => {
      console.log('fetchCheckout -> checkout object: ', checkout)
      dispatch(setFetchedCheckout(checkout))
      return checkout
    })
  }
}

const setFetchedCheckout = (checkout: Promise<Cart> | any) => {
  const action: CheckoutAction = {
    type: ActionTypes.FETCH_CHECKOUT,
    checkout,
  }

  return action
}

/* There doesn't need to be an action call or actionType of
   any kind when using one http-action that calls a function 
   that sets up an action for the reducer
   */
const setCheckout = (checkout: Cart) => {
  const action: CheckoutAction = {
    type: ActionTypes.CREATE_CHECKOUT /*it's making a call to redux and it's reducer*/,
    checkout,
  }

  return action
}

export function createCheckout() {
  return (dispatch: Dispatch) => {
    return client.checkout.create().then((checkout) => {
      dispatch(setCheckout(checkout))
      localStorage.setItem('checkout_id', checkout.id as string)
    })
  }
}

const setAddToCheckoutAction = (checkout: Cart) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    checkout,
  }
}

export function addToCheckout(
  checkoutId: string | number,
  variantId: string | number,
  quantity: number
) {
  console.log(
    'Response/checkout object in addToCheckout() action: ',
    checkoutId
  )

  return (dispatch: Dispatch) => {
    return client.checkout
      .addLineItems(checkoutId, [{ variantId, quantity }])
      .then((checkout) => {
        dispatch(setAddToCheckoutAction(checkout))
      })
  }
}

export function updateLineItemQuantity(variantId: string, quantity: number) {
  const checkoutId = localStorage.checkout_id
  const lineItemsToAdd = [{ id: variantId, quantity: quantity }]
  if (checkoutId && variantId) {
    return (dispatch: Dispatch) => {
      client.checkout
        .updateLineItems(checkoutId, lineItemsToAdd)
        .then((checkout) => {          
          dispatch(setCheckout(checkout))
        })
        .catch((err) => console.log('Error in updateLineItem: ', err))
    }
  }
}

export function deleteItem(variantId: string) {
  return (dispatch: Dispatch) => {
    client.checkout
      .removeLineItems(localStorage.checkout_id, [variantId])
      .then((checkout) => dispatch(setDeleteItem(checkout)))
      .catch((err) => console.log('Error in deleteItem: ', err))
  }
}

const setDeleteItem = (checkout: Cart) => {
  const action: DeleteItemAction = {
    type: ActionTypes.DELETE_ITEM /*it's making a call to redux and it's reducer*/,
    checkout,
  }

  return action
}