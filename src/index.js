import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from "redux-saga"
import rootReducers from './redux/reducers'
import { rootSaga } from "./redux/sagas"
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducers, compose(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
