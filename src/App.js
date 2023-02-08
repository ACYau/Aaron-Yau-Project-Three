import './App.css';

import PokemonName from "./PokemonName";

function App() {
  return (
    <div className="wrapper">
      <header>
        <h1>Pokedex</h1>
      </header>
      <div>
        <PokemonName/>
      </div>
    </div>
  );
}

export default App;
