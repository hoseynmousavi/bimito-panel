import {LOGIN_USER, LOGIN_SUCCESS, LOGOUT_USER, GET_PROFILE, API_ERROR, LOGOUT_USER_SUCCESS} from "./actionTypes"

export const loginUser = ({username, password, resolve}) => ({
    type: LOGIN_USER,
    payload: {username, password, resolve},
})

export const loginSuccess = ({user}) => ({
    type: LOGIN_SUCCESS,
    payload: {user},
})

export const logoutUser = ({resolve}) => ({
    type: LOGOUT_USER,
    payload: {resolve},
})

export const logoutUserSuccess = () => ({
    type: LOGOUT_USER_SUCCESS
})

export const getProfile = ({resolve}) => ({
    type: GET_PROFILE,
    payload: {resolve},
})

export const apiError = ({error}) => ({
    type: API_ERROR,
    payload: {error},
})
