import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
import './index.css';
import  sessionStore  from "./redux/sessionStore";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={sessionStore}>
    <App />
    </Provider>
  </React.StrictMode>,
);
