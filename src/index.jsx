import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BaseState from './Context/baseState';

ReactDOM.render(
    <React.StrictMode>
        <BaseState>
            <App />
        </BaseState>
  </React.StrictMode>,
  document.getElementById('root')
);


