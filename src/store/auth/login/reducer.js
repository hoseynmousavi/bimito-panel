import {API_ERROR, LOGIN_SUCCESS, LOGOUT_USER_SUCCESS} from "./actionTypes"

const initialState = {
    error: null,
}

const login = (state = initialState, action) =>
{
    switch (action.type)
    {
        case LOGIN_SUCCESS:
            const {user} = action.payload
            state = {...state, ...user}
            break
        case LOGOUT_USER_SUCCESS:
            state = initialState
            break
        case API_ERROR:
            const {error} = action.payload
            state = {...state, error}
            break
        default:
            break
    }
    return state
}

export default login