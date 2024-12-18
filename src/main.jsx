// src/main.jsx or src/index.js (depending on your setup)
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import App from './App';  // Import your main App component
import './index.css';  // Import your CSS file
import { BrowserRouter } from 'react-router-dom';  // Import the Router

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot here
root.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>
);
