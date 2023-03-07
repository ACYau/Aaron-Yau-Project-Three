import {useState, useEffect} from 'react';
import FormSubmission from './FormSubmission';

export default function PokemonName() {
    const [data, setData] = useState('');
    const childToParent = (childdata) => {
        setData(childdata);
    }
    const [searchedPokemon, setSearchedPokemon] = useState([]);
    const [searchedPokemonMoves, setSearchedPokemonMoves] = useState([]);
    const [searchedPokemonSprite, setSearchedPokemonSprite] = useState([]);

    //stores previously searched pokemon
    useEffect(()=>{
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${data}`;
        async function getPokemon(){
            const results = await fetch(pokemonURL);
            const pokemon = await results.json();
            //resets state for pokemon moves
            setSearchedPokemonMoves([]);
            setSearchedPokemonSprite([]);
            return pokemon
        }
        getPokemon()
            .then((pokemon) => {
                var arr = [{id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default}]
                setSearchedPokemon(searchedPokemon => searchedPokemon.concat(arr))
                var moveSet = pokemon.moves
                //maps through an array of objects and appends the move names to an array
                moveSet.map((moveset) => setSearchedPokemonMoves(searchedPokemonMoves => searchedPokemonMoves.concat(moveset.move.name)))

                var spriteArray = [{frontSprite: pokemon.sprites.front_default, backSprite: pokemon.sprites.back_default, name: pokemon.name}]
                setSearchedPokemonSprite(searchedPokemonSprite => searchedPokemonSprite.concat(spriteArray))
            });
    }, [data])

    return (
        <div className="previousSelectionsBackground">
            {/* .filter(Boolean) filters any undefined values */}
            <div className = "previousSelections">
                {searchedPokemon.filter(Boolean).map((pokemon) =>
                    <button key={pokemon.id}>
                        <img 
                            src={pokemon.sprite}
                            alt={`Default Front View for ${pokemon.name}`} 
                        />
                    </button>
                )}
            </div>

            <div className="wrapper">
                <div className="inputFields">
                    <FormSubmission childToParent={childToParent}/>
                </div>
                <h2>{data}</h2>
                <div>
                    {searchedPokemonSprite.filter(Boolean).map((sprites) =>
                        <div className = "spriteView">
                            <img className = "sprites"
                                src={sprites.frontSprite}
                                alt={`Default Front View for ${sprites.name}`} 
                            />
                            <img className = "sprites"
                                src={sprites.backSprite}
                                alt={`Default Back View for ${sprites.name}`} 
                            />
                        </div>
                    )}
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