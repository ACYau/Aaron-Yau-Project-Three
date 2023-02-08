import React from 'react'
import {useState} from 'react';

export default function Child({childToParent}) {
    const [search, setSearch] = useState([]);
    const data = search;
    //prevents page from refreshing
    function submitHandler(e) {
        e.preventDefault();
        const searchPokemonName = search;
    }
    return (
        <div>
            <form onSubmit= {submitHandler}>
                <label>
                    POKEMON:
                    <input type="text" name="pokemonName" onChange = {event => setSearch(event.target.value)}/>
                </label>
                {/* On click event, the child element populates empty div*/}
                <input type="submit" value="Submit" onClick={() => childToParent(data)}/>
            </form>
        </div>
    )
}