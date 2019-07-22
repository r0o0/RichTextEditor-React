import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './pages/App/App';
import * as serviceWorker from './serviceWorker';

const fancyLog = () => console.log('%c store 🤯👇🏿👇🏿', 'background: white; color: black; font-weight: bold;', '\n', store.getState());

const render = () => {
  fancyLog();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
