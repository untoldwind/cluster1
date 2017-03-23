import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import store from './store';

let root;

function init() {
    const App = require('./components/app').default;
    root = render((
        <Provider store={store}>
            <App/>
        </Provider>
    ), document.body, root);
}

if (module.hot) {
    module.hot.accept('./components/app', () => {
        init();
    });
}

init();
