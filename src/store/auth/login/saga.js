import {put, takeEvery} from "redux-saga/effects"
import {GET_PROFILE, LOGIN_USER, LOGOUT_USER} from "./actionTypes"
import {apiError, getProfile, loginSuccess, logoutUserSuccess} from "./actions"
import api from "../../../helpers/api"

function* loginUserSaga(action)
{
    const {username, password, resolve} = action.payload
    try
    {
        if (username !== "09123702407") yield put(apiError({error: "نام کاربری یا کلمه عبور اشتباه است"})) // TODO REMOVE THIS HARD CODE
        else
        {
            const response = yield api.post({url: "oauth/token", data: {username, password, grant_type: "password"}, headers: {Authorization: "Basic QmltaXRvQ2xpZW50OkJpbWl0b1NlY3JldA=="}})
            const {access_token, token_type, message} = response
            if (access_token && token_type)
            {
                yield put(loginSuccess({user: {token: token_type + " " + access_token}}))
                yield put(getProfile({resolve}))
            }
            else yield put(apiError({error: message}))
        }
    }
    catch (error)
    {
        yield put(apiError({error: "Error in getting token."}))
    }
}

function* getProfileSaga(action)
{
    const {resolve} = action.payload
    try
    {
        const response = yield api.post({url: "app/user/getProfile"})
        const {result} = response
        if (result)
        {
            yield put(loginSuccess({user: result}))
            yield resolve()
        }
        else yield put(apiError({error: "Error in getting profile."}))
    }
    catch (error)
    {
        yield put(apiError({error: "Error in getting profile."}))
    }
}

function* logoutUserSaga(action)
{
    const {resolve} = action.payload
    yield put(logoutUserSuccess())
    yield resolve()
}

function* watchUserLogin()
{
    yield takeEvery(LOGIN_USER, loginUserSaga)
}

function* watchGetProfile()
{
    yield takeEvery(GET_PROFILE, getProfileSaga)
}

function* watchLogout()
{
    yield takeEvery(LOGOUT_USER, logoutUserSaga)
}

const authSaga = [
    watchUserLogin(),
    watchGetProfile(),
    watchLogout(),
]

export default authSaga