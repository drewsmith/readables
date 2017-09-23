import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
