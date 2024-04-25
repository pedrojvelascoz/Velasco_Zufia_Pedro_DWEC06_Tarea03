import { Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import './index.css';
import { Link } from "react-router-dom";
import About from './About';
import Cabecera from './Cabecera';
import Coctail from './Coctail';
import Error from './Error';



function Home() {

  const [cocktails, setCocktails] = useState([]); // Declaramos cockteles vacio, que los llenaremos tras la llamada y los podremos usar después para el pintado
  const [loading, setLoading] = useState(true); // Declaramos un loading para que, mientras carga, pueda salir. Por defecto lo inicializamos "cargando"

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');    //Llamada asíncrona a la api. Cuando tengamos la respuesta, actualizamos los cockteles y cargando va a falsol
        const data = await response.json();
        setCocktails(data.drinks || []);  // Para prevenir errores, si datos va vacío o indefinido y no salta error, metemos una matriz vacía para que no pinte nada y no rompa
        setLoading(false);
      } catch (error) {
        console.error(error);  // Si hay un error, lo tiramos por consola
      }
    };

    cargaDatos();
  }, []);

  return (
    
    <div id="root"> 

      <Cabecera />    {/* Esto va a cargar siempre en root. Por lo tanto, meto cabecera aqui para que la pinte siempre y olvidarme de ella en cada componente */}

      <Routes>
        <Route path="/" element={<Listacocktail cocktails={cocktails} loading={loading} />} />  {/* La raiz es la lista de cockteles. Le paso la lista y el estad de cargando */}
        <Route path="/about" element={<About />} />   {/* resto de rutas, incluyendo error. Si hay cualquier cosa que no esté, *, a error */}
        <Route path="/cocktail/:id" element={<Coctail />} />
        <Route path="*" element={<Error />} />
      </Routes>

    </div>

  );
}


function Listacocktail({ cocktails, loading }) {                               {/* Mientras este cargando, pinto que cargando. No lleva estilos ni nada, lo he pillado del enunciado */}
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>                                                                  {/* Para cuando esté cargado, voy incorporando las partes que muestras en los html de ejemplo */}
      <section className="section">
        <h2 className="section-title">Cocktails</h2>
        <div className="cocktails-center">                                  {/* Los map ahora coo se debe, de cada elemento sus atributos. Los voy pintando */}
          {cocktails.map(({ idDrink, strDrinkThumb, strDrink, strGlass, strAlcoholic }) => (   
            <article key={idDrink} className="cocktail">
              <div className="img-container">
                <img src={strDrinkThumb} alt={strDrink} />
              </div>
              <div className="cocktail-footer">
                <h3>{strDrink}</h3>
                <h4>{strGlass}</h4>
                <p>{strAlcoholic}</p>
                <Link className="btn btn-primary btn-details" to={`/cocktail/${idDrink}`}>Details</Link> {/* Botón de detalles, construyo la url con el id. Si pincho, irá ahí */}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>

  );
}

export default Home;
