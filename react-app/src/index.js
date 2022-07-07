import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import GetitProvider from './components/context/GetitContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <GetitProvider>
          <App />
        </GetitProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
