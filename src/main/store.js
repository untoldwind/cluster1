import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import {electronEnhancer} from 'redux-electron-store';
import rootReducer from './reducers';

const enhancer = compose(
  applyMiddleware(promiseMiddleware),
  electronEnhancer({
    dispatchProxy: a => store.dispatch(a)
  })
)

const store = createStore(rootReducer, {directories:[]}, enhancer);

export default store;
