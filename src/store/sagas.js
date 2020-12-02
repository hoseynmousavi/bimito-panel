import {all} from "redux-saga/effects"
import accountSaga from "./auth/register/saga"
import authSaga from "./auth/login/saga"
import forgetPasswordSaga from "./auth/forgetpwd/saga"
import layoutSaga from "./layout/saga"

const rootSaga = function* ()
{
    yield all([
        ...accountSaga,
        ...authSaga,
        ...forgetPasswordSaga,
        ...layoutSaga,
    ])
}

export default rootSaga