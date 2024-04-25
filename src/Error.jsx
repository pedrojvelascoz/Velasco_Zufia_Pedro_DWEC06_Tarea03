import React from 'react';
import { useParams, Link } from 'react-router-dom';

//Error es similar a cabecera o about. Como tiene el link de vueta, importo links
//La página en si no tiene nada: el mensaje de error y el botón de vuelta.

function Error() {
  return (
    <section className="section cocktail-section">
      <h1 className="section-title">Vaya, la página que buscas no está disponbile</h1>
      <Link className="btn btn-primary" to="/">Back Home</Link>
    </section>
  );
}

export default Error;
