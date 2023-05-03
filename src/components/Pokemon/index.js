import React from "react";
import { Link } from "react-router-dom";

const path = '/assets/types/';

export default function Pokemon(props){
    const typePrimary = props.pokemon.types[0].type.name;
    
    return(
        <Link to={`/pokemon/${props.pokemon.name}`} className={`pokemon colour-${typePrimary}`}>
            <span className="number"># {props.pokemon.id}</span>
            <span className="name">{props.pokemon.name}</span>
            <div className="details">
                <ul className="types">
                    {props.pokemon.types.map(type =>
                         <li className={`type colour-${type.type.name}`}>
                            <img src={`${path}${type.type.name}.svg`}></img>
                            {type.type.name}
                         </li>)}
                </ul>
                <div className="container-image">
                    <img className="image"
                        src={props.pokemon.image}
                        alt=""></img>
                </div>
            </div>
        </Link>
    )
}