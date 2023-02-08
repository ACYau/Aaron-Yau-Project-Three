import {useState, useEffect} from 'react';
import Child from './Child';

export default function PokemonName() {
    const [data, setData] = useState('');
    const childToParent = (childdata) => {
        setData(childdata);
    }
    const [searchedPokemon, setSearchedPokemon] = useState([]);

    //stores previously searched pokemon
    useEffect(()=>{
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${data}`;
        async function getPokemon(){
            const data = await fetch(pokemonURL);
            const pokemon = await data.json();
            return pokemon
        }
        getPokemon()
            .then((pokemon) => {
                setSearchedPokemon(searchedPokemon => searchedPokemon.concat(pokemon.name))
        });
    }, [data])

    return (
        <div>
            {searchedPokemon.join(" ")}
            <div className="child">
                <div className="child">
                <Child childToParent={childToParent}/>
                </div>
                {data}
            </div>
        </div>
    )
}