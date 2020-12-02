import {put, takeEvery} from "redux-saga/effects"
import {REGISTER_USER} from "./actionTypes"
import {registerUserFailed, registerUserSuccessful} from "./actions"
import api from "../../../helpers/api"

function* registerUser({payload: {user}})
{
    try
    {
        const response = yield api.post()
        yield put(registerUserSuccessful(response))
    }
    catch (error)
    {
        yield put(registerUserFailed(error))
    }
}

export function* watchUserRegister()
{
    yield takeEvery(REGISTER_USER, registerUser)
}

const accountSaga = [
    watchUserRegister,
]

export default accountSaga