import React from "react";
import { PokemonList } from "@/app/components/PokemonList";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <PokemonList />
    </div>
  );
}

export default App;
