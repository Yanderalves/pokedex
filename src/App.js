import React, { useEffect, useState } from "react";
import api from "./services/api";
import Pokemon from "./components/Pokemon";
import axios from "axios";
import './App.css'

export default function App() {
  const [endpoints, setEndpoints] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    api
      .get("/pokemon/")
      .then((response) => setEndpoints(response.data.results))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  useEffect(() => {
    const pokemonRequests = endpoints.map(endpoint =>
      axios.get(endpoint.url)
    );
    Promise.all(pokemonRequests)
      .then(responses => {
        const pokemonData = responses.map(response => response.data);
        setPokemons(pokemonData);
      })
      .catch(error => {
        console.log(`Erro na requisição: ${error}`);
      });
  }, [endpoints]);

  return (
    <section className="content">
      <h1>Pokedex</h1>
      <ul className="pokemons">
        {pokemons.map(pokemon => (
          <Pokemon id={pokemon.id} image={pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']} key={pokemon.id} name={pokemon.name} types={pokemon.types} />
        ))}
      </ul>
    </section>
  );
}
