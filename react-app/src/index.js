import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { SidebarContext } from './components/context/SidebarContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <SidebarContext.Provider value={{ sidebar: "<div>default test</div>" }}>
          <App />
        </SidebarContext.Provider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
