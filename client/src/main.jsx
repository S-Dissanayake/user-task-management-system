import React from 'react'
import ReactDOM from 'react-dom/client'
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
)
