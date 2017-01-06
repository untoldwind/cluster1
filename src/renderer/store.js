import {createStore, applyMiddleware, compose} from 'redux';
import {electronEnhancer} from 'redux-electron-store';

const enhancer = compose(
  applyMiddleware(),
  electronEnhancer({
    dispatchProxy: a => store.dispatch(a)
  }),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(s => s, {}, enhancer);

export default store;
