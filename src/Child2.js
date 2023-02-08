import React from 'react'
import {useState} from 'react';

export default function Child({childToParent}) {
    const [searchedPokemon, setSearchedPokemon] = useState([]);
    useEffect(()=>{
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${props.name}`;
        // const pokemonURL = `https://pokeapi.co/api/v2/pokemon/charmander`;
        // const pokemonURL = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
        // const pokemonURL = `https://pokeapi.co/api/v2/pokemon/ditto`;
        async function getPokemon(){
            const data = await fetch(pokemonURL);
            const pokemon = await data.json();
            console.log(pokemon.name)
            return pokemon.name
        }
        getPokemon()
            .then((pokemon) => {
                //console.log(caughtPokemon);
                setSearchedPokemon(searchedPokemon => searchedPokemon.concat(pokemon))
                console.log(searchedPokemon)    
        });
        // fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
        // .then(results => {
        //     return results.json()
        // }).then(data => {
        //     const abilityList = data.abilities;
        //     const moves = data.moves;
        //     console.log(moves)
        //     //gets abilities that a pokemon can have
        //     function getAbilities(abilityText){
        //         return [abilityText.ability.name]
        //     }
        //     console.log(data.moves[0].move.name)
        //     // function getMoves(shortEffect){
        //     //     return [shortEffect.name]
        //     // }
        //     setAbilities(abilityList.map(getAbilities))
        //     return data.abilities
        // })
    }, [])

    return (
        <div>
            <p>{}</p>
        </div>
    )
}