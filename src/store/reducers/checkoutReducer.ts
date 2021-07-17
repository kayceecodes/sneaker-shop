import { ActionTypes } from '../actions/actionTypes'
import {
  CheckoutAction,
  CheckoutState,
  UpdateQuantityAction,
} from '../actions/actionCreators/checkout'

export const initialState: CheckoutState = {
  checkout: {
    checkoutUrl: '',
    id: '',
    lineItems: [],
    lineItemCount: 0,
    subtotalPrice: '',
    completedAt: null,
  },
}

const checkoutReducer = (
  state = initialState,
  action: CheckoutAction & UpdateQuantityAction
) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHECKOUT:
      return {
        ...state,
        checkout: action.checkout,
      }
    case ActionTypes.CREATE_CHECKOUT:
      return {
        ...state,
        checkout: action.checkout,
      }
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        checkout: action.checkout,
      }
    case ActionTypes.UPDATE_QUANTITY:
      return {
        ...state,
        checkout: action.checkout,
      }
    case ActionTypes.DELETE_ITEM:
      return {
        ...state,
        checkout: action.checkout,
      }
    // case ActionTypes.UPDATE_QUANTITY:
    //   return {
    //     ...state,
    //     lineItems: state.checkout.lineItems.map((item) => {
    //         item.id === action.payload.variantId ?
    //           item.quantity - action.payload.quantity
    //     })
    //   }
    // case ActionTypes.UPDATE_QUANTITY:
    //   return {
    //     ...state,

    //     lineItems: state.checkout.lineItems.map((item, i, arr) => {
    //       if (action.payload.variantId === item.id) {
    //         /*if there's an id that matches, add quantities and return the item object back to cartItems */
    //         arr[i].quantity = action.payload.quantity
    //         updateLineItems
    //         return item;
    //       } else {
    //         /* Always return an item back into cartItems */
    //         return item;
    //       }
    //     }),

    //   }
    default:
      return state
  }
}

export default checkoutReducer
