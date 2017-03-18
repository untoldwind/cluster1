import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import store from './store';
import App from './components/app';

let root;

function init() {
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
