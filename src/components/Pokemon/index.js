import React from "react";

const path = '/assets/types/';

export default function Pokemon(props){
    const typePrimary = props.types[0].type.name;
    return(
        <li className={`pokemon colour-${typePrimary}`}>
            <span className="number"># {props.id}</span>
            <span className="name">{props.name}</span>
            <div className="details">
                <ul className="types">
                    {props.types.map(type =>
                         <li className={`type colour-${type.type.name}`}>
                            <img src={`${path}${type.type.name}.svg`}></img>
                            {type.type.name}
                         </li>)}
                </ul>
                <img className="image"
                    src={props.image}
                    alt=""></img>
            </div>
        </li>
    )
}