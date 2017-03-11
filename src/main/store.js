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

if(module.hot) {
  console.log("Iam hot");
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
    console.log('Updated main reducers');
  });
  setInterval(() => {
    module.hot.check(true);
  }, 1000);
}

export default store;
