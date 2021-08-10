
import {SET_AUTHENTICATED} from '../actions/types'

const initialState = {isAuthenticated:false};
export default (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {...state, isAuthenticated:action.isAuthenticated};
        default:
            return state;
    }
}
