const mapperPokemon = (data) => {
    const pokemon = {
        name: data.name,
        id: data.id,
        image: data['sprites']['other']['official-artwork']['front_default'] || data.sprites.other.dream_world.front_default,
        types: data.types,
        weight: data.weight,
        height: data.height,
        moves: data.moves,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        type_primary: data.types ? data.types[0].type.name : null
    }
    return pokemon;
}

export default mapperPokemon;