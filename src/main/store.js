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

const initialState = {
  directories: {},
  bla: "Blub"
};
const store = createStore(rootReducer, initialState, enhancer);

if(module.hot) {
  console.log("Iam hot");
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
    console.log('Updated main reducers');
  });
  setInterval(() => {
    try {
      module.hot.check(true);
    } catch (err) {
      console.log(`Hot err ${err}`);
    }
  }, 1000);
}

export default store;
