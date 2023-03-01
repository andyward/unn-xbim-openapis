import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { OpenAPI } from './flexapi';
import { Config } from './flexConfig';

const container = document.getElementById('root')!;
// Create a root.
const root = ReactDOM.createRoot(container);

// Set xbim Flex Credentials / Personal Access Token (PAT). Typically you'd do this via an OAuth2 flow / OIDC
OpenAPI.TOKEN = Config.token;


root.render(

  <React.StrictMode>
     <BrowserRouter>
       <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
