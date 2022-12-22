import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import swDev from './swDev';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// swDev();

