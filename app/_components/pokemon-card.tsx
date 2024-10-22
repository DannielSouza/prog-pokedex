/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { TPokemon, TPokemonInfo } from "../_types/pokemon";
import usePokemonView from "../_states/pokemon-view";
import { getDetails } from "../api";
import Link from "next/link";
import { PhosphorIcon } from "./phosphor-icon";

export const PokemonCard = ({ data }: { data: TPokemon }) => {
  const [pokemonInfo, setPokemonInfo] = useState<TPokemonInfo | null>(null);
  const [pokemonImage, setPokemonImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentView } = usePokemonView();

  useEffect(() => {
    getPokemonInfo();
  }, []);

  useEffect(() => {
    handleSetPokemonImage();
  }, [currentView, pokemonInfo]);

  async function getPokemonInfo() {
    const response = await getDetails(data.id);
    setPokemonInfo(response);
  }

  function handleSetPokemonImage() {
    if (!pokemonInfo) return;
    setIsLoading(true);

    if (currentView === 1)
      setPokemonImage(pokemonInfo["sprites"]["front_default"]);
    if (currentView === 2)
      setPokemonImage(
        pokemonInfo["sprites"]["versions"]["generation-v"]["black-white"][
          "animated"
        ]["front_default"]
      );
    if (currentView === 3)
      setPokemonImage(pokemonInfo["sprites"]["other"]["home"]["front_default"]);
    setTimeout(() => {
      setIsLoading(false);
    });
  }

  if (!pokemonInfo)
    return (
      <div className="w-[200px] h-[250px] flex justify-center items-center text-2xl text-white shadow-sm border border-black rounded-lg">
        <PhosphorIcon name="Spinner" className="animate-spin" />
      </div>
    );
  if (pokemonInfo)
    return (
      <Link
        href={`/${data.name}`}
        className={`w-[170px] md:w-[200px] h-[250px] grid grid-rows-[1fr_80px] items-center  self-center justify-self-center shadow-sm border border-black rounded-lg bg-center bg-cover text-white reltive overflow-hidden
          ${pokemonInfo.types[0].type.name}          
          `}
      >
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <PhosphorIcon name="Spinner" className="animate-spin" />
          </div>
        ) : (
          <img
            className={`mx-auto w-[50%]`}
            src={pokemonImage}
            alt={"foto do " + data.name}
          ></img>
        )}
        <div className="bg-[#00000060] w-full h-full text-xs p-2 gap-1 flex flex-col items-center">
          <span>#{data.id.padStart(3, "0")}</span>

          <p className="">{data.name.toUpperCase()}</p>

          <div className="flex gap-2">
            {pokemonInfo.types.map((currentType, index) => {
              return (
                <span
                  className={`${pokemonInfo.types[0].type.name} rounded-full px-2 `}
                  key={index}
                >
                  {currentType.type.name.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    );
};
