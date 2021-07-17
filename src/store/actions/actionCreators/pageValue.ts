import { ActionTypes } from "../actionTypes";

export interface SetPageValueAction {
    type: string,
    pageValue: number
}

export interface PageValueState {
    pageValue: number
}

export function setPageValue(pageValue: number) {
    const action: SetPageValueAction = {
        type: ActionTypes.SET_PAGE_VALUE,
        pageValue
    }
    return action
} 