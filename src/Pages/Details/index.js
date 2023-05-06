import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../../services/api";
import { GiWeight } from "react-icons/gi";
import { CiLineHeight } from "react-icons/ci";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

import mapperPokemon from "../../Mapper";
 
import "./style.css";
import "../../colors.css";
import "../../App.css";

const path = './assets/types/';

export default function Details() {

    const {name} = useParams();

    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        api
            .get(`/pokemon/${name}`)
            .then((response) => (response.data))
            .then((data) => {
                const mapperPokemonDetails = mapperPokemon(data);
                setPokemon(mapperPokemonDetails);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

    }, [name]);
    
    return(
        <div className="pokemon-details">
            <div className={`details-header colour-${pokemon.type_primary}`}>
                <div className="details-header-head">
                    <Link to="/">
                        <BiArrowBack size={35} />
                    </Link>
                    <h1 className="pokemon-name">
                        {pokemon.name}
                    </h1>
                    <span className="pokemon-id">
                        # {pokemon.id}
                    </span>
                </div>
                <div className="container-image-details">
                    <img alt="pokemonImage" className="pokemon-image" src={pokemon.image} />
                </div>
            </div>
            <div className="details-body">
                <ul className="pokemon-types">
                    {pokemon.types ? pokemon.types.map((type) =>
                        <li className={`type colour-${type.type.name}`} key={type.type.name}> <img alt="typeImage" src={`${path}${type.type.name}.svg`}></img>{type.type.name}</li>) : null}
                </ul>
                <div className="pokemon-about">
                    <div className="container-infos">
                        <div className="pokemon-info">
                            <div>
                                <GiWeight size={35} />
                                {(Number(pokemon.weight) / 100).toFixed(2)}KG
                            </div>
                            <p>Weight</p>
                        </div>
                        <span  className="border-line"></span>
                        <div className="pokemon-info">
                            <div>
                                <CiLineHeight size={35} />
                                {(Number(pokemon.height) / 10).toFixed(2)}M
                            </div>
                            <p>Heigth</p>
                        </div>
                    </div>
                </div>
                <div className="description">
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisl euismod,
                </div>
                <div className="stats">
                    <h2>Stats</h2>
                    <ul className="pokemon-stats">
                        <li className="pokemon-stat">
                            <div className="label-stat">
                                <span>HP</span>
                                <span>{pokemon.hp}</span>
                            </div>
                            <span className="container-bar"><span style={{ width: `${Number(pokemon.hp)}%` }} className={`bar colour-${pokemon.type_primary}`}></span></span>
                        </li>
                        <li className="pokemon-stat">
                            <div class="label-stat">
                                <span>ATK</span>
                                <span>{pokemon.attack}</span>
                            </div>
                            <span className="container-bar"><span style={{ width: `${Number(pokemon.attack)}%` }} className={`bar colour-${pokemon.type_primary}`}></span></span>
                        </li>
                        <li className="pokemon-stat">
                            <div class="label-stat">
                                <span>DEF</span>
                                <span>{pokemon.defense}</span>
                            </div>
                            <span className="container-bar"><span style={{ width: `${Number(pokemon.defense)}%` }} className={`bar colour-${pokemon.type_primary}`}></span></span>
                        </li>
                        <li className="pokemon-stat">
                            <div class="label-stat">
                                <span>SPD</span>
                                <span>{pokemon.speed}</span>
                            </div>
                            <span className="container-bar"><span style={{ width: `${Number(pokemon.speed)}%` }} className={`bar colour-${pokemon.type_primary}`}></span></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}