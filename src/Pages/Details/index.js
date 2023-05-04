import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../../services/api";
import { GiWeight } from "react-icons/gi";
import { CiLineHeight } from "react-icons/ci";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

import "./style.css";
import "../../colors.css";
import "../../App.css";


const path = '/assets/types/';

export default function Details() {

    const {name} = useParams();

    const [pokemon, setPokemon] = useState({});
    let mapperPokemon;


    useEffect(() => {
        api
            .get(`/pokemon/${name}`)
            .then((response) => (response.data))
            .then((data) => {
                mapperPokemon = {
                    name: data.name,
                    id: data.id,
                    image: data.sprites.other.dream_world.front_default || data.sprites.other.home.front_default,
                    types: data.types,
                    weight: data.weight,
                    height: data.height,
                    moves: data.moves,
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    speed: data.stats[5].base_stat
                }

                setPokemon(mapperPokemon);

            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

    }, [name]);

        // const type_primary = pokemon.types[0].type.name;
        const type_primary = pokemon.types ? pokemon.types[0].type.name : null;
    
    return(
        <div className="pokemon-details">
            <div className={`details-header colour-${type_primary}`}>
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
                    <img className="pokemon-image" src={pokemon.image} alt=""/>
                </div>
            </div>
            <div className="details-body">
                <ul className="pokemon-types">
                    {pokemon.types ? pokemon.types.map((type) =>
                        <li className={`type colour-${type.type.name}`} key={type.type.name}> <img src={`${path}${type.type.name}.svg`}></img>{type.type.name}</li>) : null}
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
                            <span>HP</span>
                            <span>{pokemon.hp}</span>
                            <span className="container-bar"><span style={{width: `${Number(pokemon.hp)}%`}} className="bar"></span></span>
                        </li>
                        <li className="pokemon-stat">
                            <span>ATK</span>
                            <span>{pokemon.attack}</span>
                            <span className="container-bar"><span style={{ width: `${Number(pokemon.attack)}%` }} className="bar"></span></span>
                        </li>
                        <li className="pokemon-stat">
                            <span>DEF</span>
                            <span>{pokemon.defense}</span>
                            <span className="container-bar"><span style={{ width: `${Number(pokemon.defense)}%` }} className="bar"></span></span>
                        </li>
                        <li className="pokemon-stat">
                            <span>SPD</span>
                            <span>{pokemon.speed}</span>
                            <span className="container-bar"><span style={{ width: `${Number(pokemon.speed)}%` }} className="bar"></span></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}