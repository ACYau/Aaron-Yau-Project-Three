import React from 'react'
import {useState} from 'react';

export default function Child({childToParent}) {
    const [search, setSearch] = useState([]);
    function submitHandler(e) {
        //resets form entry
        document.getElementById("pokemonNameForm").reset()
        //removes instructions
        document.getElementById("pokedexInstructions").innerHTML = "";
        //prevents page from refreshing
        e.preventDefault();
    }
    return (
        <div>
            <form id="pokemonNameForm" onSubmit= {submitHandler}>
                <label>
                    POKEMON:
                    {/* converts user input to all lowercase since the API accepts the pokemon name in all lowercase */}
                    <input type="text" name="pokemonName" onChange = {event => setSearch(event.target.value.toLowerCase())}/>
                </label>
                {/* On click event, the child element populates empty div*/}
                <input type="submit" value="Submit" onClick={() => childToParent(search)}/>
            </form>
            <div class="pokedexInstructions" id="pokedexInstructions">
                <h3>
                    <u><b>Instructions:</b></u>
                    <br></br>
                    <br></br>
                    Please type the name of the Pokemon you would like to search! This Pokedex will return the image of the Pokemon and a list of moves it can learn!
                </h3>
            </div>
        </div>
    )
}