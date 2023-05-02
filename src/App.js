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
  }, [search, pokemonsFiltered])

  const onChangeValue = (e) => {
    setSearch(e.target.value.toLowerCase().trim());
  }

  const showMore = () => {
    setDisplayCount(displayCount + 21);
  }

  return (
    <section className="content">
      <div className="head-page">
        <h1>Pokedex</h1>
        <div className="search">
          <input type="text" placeholder="Por qual Pokemon você está procurando?" onChange={onChangeValue} />
          <button className="button-search">
          </button>
        </div>
      </div>
      <ul className="pokemons">
        {pokemonsFiltered.slice(0, displayCount).map((pokemon) => (
          <Pokemon id={pokemon.id} image={pokemon.sprites.other['official-artwork'].front_default ||
            pokemon.sprites.front_default} key={pokemon.id} name={pokemon.name} types={pokemon.types} />
        ))}
      </ul>
      {displayCount < pokemonsFiltered.length &&
        <button className="button-more" onClick={showMore}>Mostrar mais</button>
      }
    </section>
  );
}
