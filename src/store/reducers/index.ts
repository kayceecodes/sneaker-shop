//  export defaults allows for you to rename your imports
import { combineReducers } from 'redux';
import checkoutReducer from './checkoutReducer';

// export {initialState} from './cart_reducer';

const rootReducer = combineReducers({
    checkoutReducer: checkoutReducer,
}); 

export default rootReducer;

export type ReducerState = typeof rootReducer
