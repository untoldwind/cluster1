import {h, render} from 'preact';
import store from './store';
import App from './components/app';

let root;

function init() {
  root = render(<App/>, document.body, root);
}

if(module.hot) {
  module.hot.accept('./components/app', () => {
    init();
  });
}

init();
