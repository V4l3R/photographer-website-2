import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import CursorProvider from './context/CursorContext';
import AdminProvider from './context/AdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CursorProvider>
    <AdminProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AdminProvider>
  </CursorProvider>
);
