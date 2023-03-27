import {useState, useEffect} from 'react';
import FormSubmission from './FormSubmission';

export default function PokemonName() {
    //declare usestate for queried pokemon
    const [data, setData] = useState('');
    //declare function for parent to receive input from child component (form submission)
    const childToParent = (childdata) => {
        setData(childdata);
    }
    //declare use state to store searched pokemon
    const [searchedPokemon, setSearchedPokemon] = useState([]);
    //declare use state to display pokemon moves
    const [searchedPokemonMoves, setSearchedPokemonMoves] = useState([]);
    //declare use state to display pokemon sprites
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
                //Removes oldest element of list (Maximum length of 10)
                if (searchedPokemon.length > 9){
                    searchedPokemon.shift()
                }
                //Removes duplicates (oldest entry from SearchedPokemon array)
                for (let i=0; i < searchedPokemon.length; i++){
                    if(JSON.stringify(arr[0]) === JSON.stringify(searchedPokemon[i])){
                        searchedPokemon.splice(i,1)
                    }
                }
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
                    // on click changes useState and re-renders components
                    <button key={pokemon.id} onClick={() => setData(pokemon.name)}>
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