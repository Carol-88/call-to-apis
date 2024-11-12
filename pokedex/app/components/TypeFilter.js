"use client";
import React, { useEffect, useState } from "react";
import api from "../services/api";

export const TypeFilter = ({ onTypeChange }) => {
  const [typesList, setTypesList] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await api.get("/type");
        setTypesList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon types:", error);
      }
    };

    fetchTypes();
  }, []);

  const handleTypeChange = (event) => {
    onTypeChange(event.target.value); // Envía el tipo seleccionado al componente padre
  };

  return (
    <div className="mb-4 text-center">
      <label htmlFor="type" className="block font-semibold">
        Filtrar por tipo:
      </label>
      <select
        id="type"
        onChange={handleTypeChange}
        className="border p-2 rounded-md mt-2"
      >
        <option value="">Todos los tipos</option>
        {typesList.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}{" "}
            {/* Para capitalizar */}
          </option>
        ))}
      </select>
    </div>
  );
};
