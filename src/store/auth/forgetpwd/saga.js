import {put, takeEvery} from "redux-saga/effects"
import {FORGET_PASSWORD} from "./actionTypes"
import {userForgetPasswordError, userForgetPasswordSuccess} from "./actions"
import api from "../../../helpers/api"

function* forgetUser({payload: {user, history}})
{
    try
    {
        const response = yield api.post()
        yield put(userForgetPasswordSuccess("Reset link are sended to your mailbox, check there first"))
    }
    catch (error)
    {
        yield put(userForgetPasswordError(error))
    }
}

export function* watchUserPasswordForget()
{
    yield takeEvery(FORGET_PASSWORD, forgetUser)
}

const forgetPasswordSaga = [
    watchUserPasswordForget,
]

export default forgetPasswordSaga