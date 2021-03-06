import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import {electronEnhancer} from 'redux-electron-store';

const filter = {
  directories: true,
  currentDirectory: true
};

const enhancer = compose(
  applyMiddleware(promiseMiddleware),
  electronEnhancer({
    filter,
    dispatchProxy: a => store.dispatch(a)
  }),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(s => s, {}, enhancer);

export default store;
