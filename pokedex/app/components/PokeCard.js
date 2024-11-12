import React from "react";
import Image from "next/image";

export const PokeCard = ({ pokemon }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 m-2 bg-white text-center">
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto"
        width={96}
        height={96}
      />
      <h2 className="text-xl font-bold">{pokemon.name}</h2>
    </div>
  );
};
