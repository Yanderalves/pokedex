import React, { useEffect, useState } from "react";
import api from "./services/api";
import Pokemon from "./components/Pokemon";
import axios from "axios";
import './App.css'
import "./colors.css";


export default function App() {
  const [endpoints, setEndpoints] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
  const [displayCount, setDisplayCount] = useState(21);

  useEffect(() => {
    api
      .get(`/pokemon?limit=1281&offset=0`)
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

  useEffect(() => {
    setPokemonsFiltered(pokemons.filter(pokemon => pokemon.name.includes(search)));
  }, [search, pokemons])

  const mapperPokemon = (pokemon) => {
    return{
      name:  pokemon.name,
      id: pokemon.id,
      image: pokemon['sprites']['other']['official-artwork']['front_default'] || pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types,
    }
  }

  return (
    <section className="content">
      <div className="head-page">
        <img alt="pokedex-title" className="page-title" src="./assets/patterns/pokedex-title.png"></img>
        <div className="search">
          <input type="text" placeholder="FAAAAAAAAAAAAAAALA ZEZE" onChange={(e => setSearch(e.target.value.toLowerCase().trim()))} />
          <button className="button-search">
          </button>
        </div>
      </div>
      {pokemonsFiltered &&  pokemonsFiltered.length > 0 ? <ul className="pokemons"  >
        {pokemonsFiltered.slice(0, displayCount).map((pokemon) => (
          < Pokemon key={pokemon.id} pokemon={mapperPokemon(pokemon)} />
        ))}
      </ul> : 
      <div className="loading">
        <img alt="pikachu-running" src="./assets/patterns/pikachu-running.gif" className="empty-list" />
        <p>Loading...</p>
      </div> }
      
      {displayCount < pokemonsFiltered.length &&
        <button className="button-more" onClick={(e) => setDisplayCount(displayCount + 21)}>Mostrar mais</button>
      }
    </section>
  );
}
