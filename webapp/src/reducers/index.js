import { combineReducers } from 'redux';
import { SIGN_OUT } from '../actions/types';

import authentication from './authentication';


const combinedReducer = combineReducers({
    authentication,
    //TODO - add more reducers as app grows
});


const rootReducer = (state, action) => {
    if (action.type === SIGN_OUT) {
        state = undefined;
    }
    return combinedReducer(state, action);
}

export default rootReducer;
