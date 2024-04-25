import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './index.css';

//Recordemos que a Coctail se llega desde Home, con un botón en cada bebida. Es del tipo " <Link className="btn btn-primary btn-details" to={`/cocktail/${idDrink}`}>Details</Link> "
// Tengo pues la constante cocktail para guardar los datos del cocktail concreto que voy a pintar. Empieza nulo y lo actualizo con setCocktail
// También describo una constante de error, que empieza verdad por si acaso, y se actualiza con setError. Es por si nos meten una id a mano de un cocktail falso.
// Id proviene del hook useParams, que permiet acceder a los parámetros de la url. Lo uso para boscarlo

const Coctail = () => {
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const consultaCoctail = async () => { // Vamos allá con la llamada asíncrona. Llamo de manera asíncrona al cocktail concreto con esa id
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.drinks && data.drinks.length > 0) {  // Si la respuesta tiene alguna bebida, y por si acaso, si es mayor que cero para no liarla
          setCocktail(data.drinks[0]);                //Actualizo cocktail con los datos
          setError(false);                             //Actualizo error para que no haya, por si acaso.
        } else {
          setError(true);                             //Pero si nos han intentado enañar, activo el error
        }
      } catch (error) {
        setError('Error fetching cocktail');
        console.error(error);
      }
    };

    consultaCoctail();
  }, [id]);

  if (error) {                            // Si hay error, pinto que hay error y le pongo un botón para que el usuario pueda volver a home. Por si no sabe usar el dela cabecera, jajaja.
    return(
    <section className="section cocktail-section">
      <h1 className="section-title">Upps! Ese cocktail no lo tenemos...</h1>
      <Link className="btn btn-primary" to="/">Back Home</Link>
    </section>
    );
  }

  if (!cocktail) {              // Mientras no haya cocktail cargado, le digo al usuario que cargando.
    return <div>Loading...</div>;
  }

  return (                                                        
    <section className="section cocktail-section">                      {/* Pues vamos a pintar. Primero, el botón de volver */}
      <Link className="btn btn-primary" to="/">Back Home</Link>
      <h1 className="section-title">{cocktail.strDrink}</h1>            {/* Título y después la imagen. Usando como referencia tu html de ejemplo */}
      <div className="drink">
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="drink-detail" />
        <div className="drink-info">                                                                {/*Voy pintando */}
          <p><span className="drink-data">Category:</span> {cocktail.strCategory}</p>
          <p><span className="drink-data">Info:</span> {cocktail.strAlcoholic}</p>
          <p><span className="drink-data">Glass:</span> {cocktail.strGlass}</p>
          <p><span className="drink-data">Instructions:</span> {cocktail.strInstructions}</p>
          <p><span className="drink-data">Ingredients:</span>                                       {/* Ingredienes tiene trampa viendo el json. Hay una lista del 1 al 15 de strIngrediente*/}
            {Object.keys(cocktail)                                                                    // Así que para mi cocktail
              .filter(key => key.startsWith('strIngredient') )                                   // Filtro todo lo que aparezca en esas etiquetas, con cualquiera de los numero
              .map((key, index) => (                                                                  // Y a pintar!! Menos mal que el solito quita los nulos o indefinidos :)
                <span key={index}>{cocktail[key]}</span>                                              
              ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Coctail;
