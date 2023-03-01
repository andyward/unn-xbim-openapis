import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { OpenAPI } from './flexapi';
import * as config from './Config';

const container = document.getElementById('root')!;
// Create a root.
const root = ReactDOM.createRoot(container);

// Set Credentials / PAT
OpenAPI.TOKEN = config.token;


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
