import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Core Design System CSS imports
import './styles/tokens.css';
import './styles/reset.css';
import './styles/themes.css';
import './styles/animations.css';
import './styles/components.css';
import './styles/layout.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
