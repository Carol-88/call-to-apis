"use client";
import React, { useState, useEffect } from "react";
import api from "../services/api"; // Importa api

export const NameFilter = ({ onNameChange }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      // Renombrado a fetchNames
      try {
        const response = await api.get("/pokemon?limit=2000"); // Ajustamos limit para traer más nombres
        setNames(response.data.results.map((pokemon) => pokemon.name));
      } catch (error) {
        console.error("Error fetching Pokémon names:", error);
      }
    };
    fetchNames();
  }, []);

  const handleNameChange = (event) => {
    onNameChange(event.target.value); // Llama a la función que recibimos como prop
  };

  return (
    <div className="mb-4 text-center">
      <label htmlFor="name" className="block font-semibold mb-2">
        Buscar por Nombre
      </label>
      <input
        id="name"
        type="search"
        onChange={handleNameChange}
        className="border p-2 rounded-md"
        placeholder="Escribe el nombre de un Pokémon"
      />
    </div>
  );
};
