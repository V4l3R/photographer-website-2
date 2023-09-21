import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import CursorProvider from './context/CursorContext';
import AdminProvider from './context/AdminContext';
import SettingsProvider from './context/SettingsContext';
import FocusProvider from './context/FocusContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <FocusProvider>
  <CursorProvider>
   <AdminProvider>
    <SettingsProvider>
     <React.StrictMode>
      <App />
     </React.StrictMode>
    </SettingsProvider>
   </AdminProvider>
  </CursorProvider>
 </FocusProvider>,
);
