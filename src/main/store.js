import {createStore, applyMiddleware, compose} from 'redux';
import {electronEnhancer} from 'redux-electron-store';
import rootReducer from './reducers';

const enhancer = compose(
  applyMiddleware(),
  electronEnhancer({
    dispatchProxy: a => store.dispatch(a)
  })
)

const store = createStore(rootReducer, {"hurra":"bla"}, enhancer);

export default store;
