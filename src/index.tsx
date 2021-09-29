import React from 'react';
import './config/configureMobX'
import ReactDOM from 'react-dom';
import './index.scss';
import * as Router from "react-router-dom"
import App from "./App/App";

ReactDOM.render(
  <React.StrictMode>
      <Router.BrowserRouter>
          <App />
      </Router.BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

