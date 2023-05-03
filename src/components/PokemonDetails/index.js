import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const path = '/assets/types/';

export default function PokemonDetails() {

    const {name} = useParams();
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        api
            .get(`/pokemon/${name}`)
            .then(response => response.data)
            .then(data => {

                const mapperPokemon =  {
                    name: data.name,
                    id: data.id,
                    image: data.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
                    types: data.types
                }
                setPokemon(mapperPokemon)
            })
    }, [name]);

    console.log(pokemon);
             
    return(
        <> 
            <div className="container">
                <div className="row">
                    
                </div>
            </div>
        </>
    )
}