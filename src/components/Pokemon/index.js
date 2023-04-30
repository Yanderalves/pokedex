import React from "react";

export default function Pokemon(props){
    const typePrimary = props.types[0].type.name;
    return(
        <li className={`pokemon colour-${typePrimary}`}>
            <span className="number">{props.id}</span>
            <span className="name">{props.name}</span>
            <div className="details">
                <ul className="types">
                    {props.types.map(type => <li className="type">{type.type.name}</li>)}
                </ul>
                <img className="image"
                    src={props.image}
                    alt=""></img>
            </div>
        </li>
    )
}