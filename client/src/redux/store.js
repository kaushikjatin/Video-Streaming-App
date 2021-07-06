import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from './root-reducer'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';



const sagamiddleware=createSagaMiddleware();
const middlewares=[sagamiddleware]
if(process.env.NODE_ENV=='development')
    middlewares.push(logger);

export const store = createStore(rootReducer,applyMiddleware(...middlewares))
sagamiddleware.run(rootSaga);
