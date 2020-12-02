import axios from "axios"
import {select} from "redux-saga/effects"

const REST_URL = "https://bimename.com/bimename"

function* get({url, param = "", noToken})
{
    const token = yield select((state) => state?.Login?.token)
    return yield axios.get(encodeURI(REST_URL + "/" + url + "/" + param), {headers: !noToken && token ? {"Authorization": token} : null})
        .then((res) => res.data)
        .catch((err) =>
        {
            console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
            throw err
        })
}

function* post({url, data, param = "", noToken, headers})
{
    const token = yield select((state) => state?.Login?.token)
    const formData = new FormData()
    data && Object.keys(data).forEach(item => formData.append(item, data[item]))
    return yield axios.post(encodeURI(REST_URL + "/" + url + (param ? "/" + param : "")), formData, {headers: !noToken && token ? {"Authorization": token, ...headers} : headers ? {...headers} : null},
    )
        .then((res) => res.data)
        .catch((err) =>
        {
            console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
            throw err
        })
}

function* patch({url, data, param = ""})
{
    const token = yield select((state) => state.Login.token)
    return yield axios.patch(encodeURI(REST_URL + "/" + url + (param ? "/" + param : "")), data, {headers: {"Authorization": token}})
        .then((res) => res.data)
        .catch((err) =>
        {
            console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
            throw err
        })
}

function* del({url, data, param = ""})
{
    const token = yield select((state) => state.Login.token)
    return yield axios.delete(encodeURI(REST_URL + "/" + url + "/" + param), {headers: {"Authorization": token}, data})
        .then((res) => res.data)
        .catch((err) =>
        {
            console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
            throw err
        })
}

const api = {
    get,
    post,
    patch,
    del,
}
export default api
