import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Details from './Pages/Details';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemon/:name" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </HashRouter>
);
