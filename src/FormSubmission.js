import React from 'react'
import {useState} from 'react';

export default function Child({childToParent}) {
    const [search, setSearch] = useState([]);
    function submitHandler(e) {
        //resets form entry
        document.getElementById("pokemonNameForm").reset()
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
        </div>
    )
}