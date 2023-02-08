import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {

    const { pokemonID } = useParams();
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonID}`,
        }).then((res) => {
            setPokemon(res.data);
            console.log(pokemon)
        })
    }, []);

    const { original_title, tagline, overview, poster_path } = pokemon;
    return (
        <div className="poster">
            <div className="description">
                <h2>{original_title}</h2>
                <h3>{tagline}</h3>
                <p>{overview}</p>
            </div>
            <div className="poster-image">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={`Movie poster for ${original_title}`}
                />
            </div>
        </div>
    )
}

export default PokemonDetails;