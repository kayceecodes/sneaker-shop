import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

import { createWrapper } from "next-redux-wrapper";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const middlewares = [thunk];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__<any>({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
/* Edit - Update: store needs to be exported for test-utils */
export const store = () => createStore(rootReducer, enhancer)

export const wrapper = createWrapper(store);


