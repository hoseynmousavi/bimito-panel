import {createStore, applyMiddleware, compose} from "redux"
import createSagaMiddleware from "redux-saga"
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import rootReducer from "./reducers"
import rootSaga from "./sagas"

const persistedReducer = persistReducer({key: "root", storage, whitelist: ["Login"]}, rootReducer)

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

export default store