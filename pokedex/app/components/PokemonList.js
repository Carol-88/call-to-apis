"use client";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { PokeCard } from "./PokeCard";
import { TypeFilter } from "./TypeFilter";
import { NameFilter } from "./NameFilter";

export const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState(1); // Estado para la página actual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas (para mostrar la paginación)

  const limit = 20; // Definimos el límite de Pokémon por página

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        let fetchedPokemon = [];
        let totalPokemon = 0;

        if (selectedType) {
          // Si hay un tipo seleccionado, filtrar por tipo
          const typeResponse = await api.get(`/type/${selectedType}`);
          totalPokemon = typeResponse.data.pokemon.length;
          const paginatedPokemon = typeResponse.data.pokemon.slice(
            (page - 1) * limit,
            page * limit
          );
          fetchedPokemon = await Promise.all(
            paginatedPokemon.map(async (pokemonEntry) => {
              const pokemonDetail = await api.get(
                `/pokemon/${pokemonEntry.pokemon.name}`
              );
              return {
                name: pokemonEntry.pokemon.name,
                image: pokemonDetail.data.sprites.front_default,
              };
            })
          );
        } else {
          // Obtener los Pokémon paginados
          const response = await api.get(
            `/pokemon?limit=${limit}&offset=${(page - 1) * limit}`
          );
          totalPokemon = response.data.count; // Total de Pokémon
          fetchedPokemon = await Promise.all(
            response.data.results.map(async (pokemon) => {
              const pokemonDetail = await api.get(`/pokemon/${pokemon.name}`);
              return {
                name: pokemon.name,
                image: pokemonDetail.data.sprites.front_default,
              };
            })
          );
        }

        // Filtrar por nombre
        const filteredByName = fetchedPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(name.toLowerCase())
        );

        setTotalPages(Math.ceil(totalPokemon / limit)); // Calcular las páginas totales
        setPokemonList(filteredByName);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, [selectedType, name, page]); // Dependencias: actualizar cuando cambien `selectedType`, `name` o `page`

  // Función para cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <TypeFilter onTypeChange={setSelectedType} />
      <NameFilter onNameChange={setName} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemonList.map((pokemon, index) => (
          <PokeCard key={index} pokemon={pokemon} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-l"
        >
          Anterior
        </button>
        <span className="px-4 py-2">{`Página ${page} de ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-r"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
