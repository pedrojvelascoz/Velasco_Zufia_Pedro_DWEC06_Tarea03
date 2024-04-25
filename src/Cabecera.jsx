import React from 'react';
import './index.css';
import { Link } from "react-router-dom";

//Importo estilos y links, ya que de aquí nos moveremos entre dos páginas
//El resto no tiene misterio: return/export para que la cabecera se pinte siempre dede home.

const Cabecera = () => {

  return (
    <nav className="navbar">
      <div className="nav-center">
        <ul className="nav-links">
          <span>Cocktail DWEC-DB</span>
        </ul>
        <ul className="nav-links">
          <li><Link to="/">home</Link></li>
          <li><Link to="/about">about</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Cabecera;
