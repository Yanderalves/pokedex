import React, { useEffect, useState } from "react";
import api from "./services/api";
import Pokemon from "./components/Pokemon";
import axios from "axios";
import './App.css'

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

  const onChangeValue = (e) => {
    setSearch(e.target.value.toLowerCase().trim());
  }

  const showMore = () => {
    setDisplayCount(displayCount + 21);
  }

  const mapperPokemon = (pokemon) => {
    return {
      name: pokemon.name, 
      id: pokemon.id,
      image: pokemon.sprites.other['official-artwork'].front_default ||
        pokemon.sprites.front_default,
      types: pokemon.types
    }
  }

  return (
    <section className="content">
      <div className="head-page">
        <img className="title-page" src="../../assets/patterns/pokedex-title.png" alt="PokeAPI" />
        <div className="search">
          <input type="text" placeholder="Qual Pokemon você está buscando?" className="input-search" onChange={onChangeValue} />
          <button className="button-search">
          </button>
        </div>
      </div>
      <ul className="pokemons">
        {pokemonsFiltered.slice(0, displayCount).map((pokemon) => (
          < Pokemon key = { pokemon.id } pokemon = {mapperPokemon(pokemon)} />
        ))}
      </ul>
      {displayCount < pokemonsFiltered.length &&
        <button className="button-more" onClick={showMore}>Mostrar mais</button>
      }
    </section>
  );
}
