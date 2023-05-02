import React from "react";

export default function PokemonDetails(props) {

    console.log(props.key)
    return(
        <>
            <div class="details-head">
                <h2>{props.name}</h2>
                <span className="number"># {props.id}</span>
            </div>
            <div className="details-body">
                <ul className="types">
                    {props.types.map(type =>
                        <li className={`type colour-${type.type.name}`}>
                            <img src={`${path}${type.type.name}.svg`}></img>
                            {type.type.name}
                        </li>)}
                </ul>
                <div className="about">
                    <div className="weight"></div>
                    <div className="height"></div>
                    <div className="moves"></div>
                </div>
                <div className="stats">
                    
                </div>
            </div>

        </>
    )
}