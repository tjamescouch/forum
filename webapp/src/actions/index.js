import {SET_AUTHENTICATED, SIGN_OUT} from './types'


export const setAuthenticated = (isAuthenticated) => {
    return { type:SET_AUTHENTICATED, isAuthenticated:isAuthenticated};
}

export const signOut = () => {
    return { type:SIGN_OUT};
}
