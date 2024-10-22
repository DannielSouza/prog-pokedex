"use client";

import React, { useEffect, useState } from "react";
import { getPokemons } from "../api";
import { TPokemon } from "../_types/pokemon";
import { PokemonCard } from "./pokemon-card";
import { PhosphorIcon } from "./phosphor-icon";

export const ListItems = () => {
  const [offSet, setOffSet] = useState(20);
  const [pokemons, setPokemons] = useState<TPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInitialData();
  }, []);

  async function getInitialData() {
    try {
      const pokemons = await getPokemons(0);
      setPokemons(pokemons);
      console.log(pokemons);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function getData() {
    if (isLoading) return;
    try {
      const pokemons = await getPokemons(offSet);
      setPokemons((prev) => [...prev, ...pokemons]);
      setOffSet((prev) => prev + 20);
      console.log(pokemons);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <PhosphorIcon
          name="Spinner"
          className="animate-spin text-3xl text-white"
        />
      </div>
    );
  return (
    <div className="pb-8 flex flex-col gap-8">
      <div className="max-sm:px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => {
          return <PokemonCard key={pokemon.id} data={pokemon} />;
        })}
      </div>

      <button
        onClick={getData}
        className="bg-gray-200 border rounded-full py-1 px-2 w-fit mx-auto text-sm hover:bg-gray-300 transition"
      >
        {isLoading ? (
          <PhosphorIcon name="Spinner" className="animate-spin" />
        ) : (
          "Buscar mais"
        )}
      </button>
    </div>
  );
};
