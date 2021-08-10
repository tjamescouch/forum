import { applyMiddleware, createStore } from 'redux';

import rootReducer from '../reducers';


function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

let middleware = [logger];

let store = createStore(rootReducer, {}, applyMiddleware(...middleware));

export default store;
