import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";

// Desde el main abrimos home. Hago el cambio a BrowserRouter para que React funcione con rutas.

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
)
