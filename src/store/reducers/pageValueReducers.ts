import { ActionTypes } from '../actions/actionTypes'
import {
  SetPageValueAction,
  PageValueState,
} from '../actions/actionCreators/pageValue'

export const initialState: PageValueState = {
  pageValue: 0,
}

export default function pageValueReducer(
  state = initialState,
  action: SetPageValueAction
) {
  switch (action.type) {
    case ActionTypes.SET_PAGE_VALUE:
      return {
        ...state,
        checkout: action.pageValue,
      }
    default:
      return state
  }
}
