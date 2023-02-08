import {useState, useEffect} from 'react';
import Child from './Child';

export default function PokemonName() {
    const [data, setData] = useState('');
    const childToParent = (childdata) => {
        setData(childdata);
    }
    const [searchedPokemon, setSearchedPokemon] = useState([]);
    const [searchedPokemonMoves, setSearchedPokemonMoves] = useState([]);

    //stores previously searched pokemon
    useEffect(()=>{
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${data}`;
        async function getPokemon(){
            const results = await fetch(pokemonURL);
            const pokemon = await results.json();
            //resets state for pokemon moves
            setSearchedPokemonMoves([])
            return pokemon
        }
        getPokemon()
            .then((pokemon) => {
                var arr = [{id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default}]
                setSearchedPokemon(searchedPokemon => searchedPokemon.concat(arr))
                var moveSet = pokemon.moves
                //maps through an array of objects and appends the move names to an array
                moveSet.map((moveset) => setSearchedPokemonMoves(searchedPokemonMoves => searchedPokemonMoves.concat(moveset.move.name)))
            });
    }, [data])

    return (
        <div>
            {/* .filter(Boolean) filters any undefined values */}
            <div className = "previousSelections">
                {searchedPokemon.filter(Boolean).map((pokemon) => <button key={pokemon.id}> {pokemon.name} </button>)}
            </div>

            <div>
                <div className="child">
                    <Child childToParent={childToParent}/>
                </div>
                <h1>{data}</h1>
                <div>
                    <img>
                        {/* src={searchedPokemon.pokemon.sprites.front_default} */}
                    </img>
                </div>
                <ul>
                    {searchedPokemonMoves.filter(Boolean).map((moves) =>
                        <li> {moves} </li>
                    )}
                </ul>
            </div>
        </div>
    )
}