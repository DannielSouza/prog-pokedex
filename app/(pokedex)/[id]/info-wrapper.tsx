/* eslint-disable @next/next/no-img-element */
"use client";

import { PhosphorIcon } from "@/app/_components/phosphor-icon";
import usePokemonView from "@/app/_states/pokemon-view";
import { TPokemonInfo } from "@/app/_types/pokemon";
import { getDetails } from "@/app/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const InfoWrapper = () => {
  const { id } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState<TPokemonInfo | null>(null);
  const [pokemonImage, setPokemonImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentView } = usePokemonView();
  const router = useRouter();

  useEffect(() => {
    getPokemonInfo();
  }, []);

  useEffect(() => {
    handleSetPokemonImage();
  }, [currentView, pokemonInfo]);

  async function getPokemonInfo() {
    const response = await getDetails(id as string);
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
      <div className="flex justify-center items-center text-4xl text-white shadow-sm min-h-svh bg-[#1C1C1C]">
        <PhosphorIcon name="Spinner" className="animate-spin" />
      </div>
    );
  return (
    <div className="min-h-svh bg-[#1C1C1C] flex items-center justify-center">
      <div
        className={`grid grid-rows-[1fr_200px] relative border w-[80vw] md:w-[500px] h-[450px] md:h-[650px] rounded-lg  text-white ${pokemonInfo.types[0].type.name}
          `}
      >
        <div
          className={`border-2 border-inherit  rounded-full absolute -right-3 text-center -top-3 z-10 bg-opacity-20 cursor-pointer ${pokemonInfo.types[0].type.name}`}
        >
          <PhosphorIcon
            onClick={() => router.push("/")}
            name="X"
            className="pl-[6px] p-1 h-9 w-9"
          />
        </div>

        <div className="flex items-center justify-center">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <PhosphorIcon name="Spinner" className="animate-spin" />
            </div>
          ) : (
            <img
              className={`mx-auto w-[50%]`}
              src={pokemonImage}
              alt={"foto do " + pokemonInfo.name}
            ></img>
          )}
        </div>

        <div className="bg-[#00000060] border-inherit border-t-2 flex flex-col gap-2 py-2 rounded-b-md">
          <div className="flex flex-col text-center">
            <p>#{String(pokemonInfo.id).padStart(3, "0")}</p>
            <p>{pokemonInfo.name.toUpperCase()}</p>
          </div>

          <div className="flex text-center items-center justify-center gap-3 md:gap-4 text-xs text-gray-300">
            <p>Height: {pokemonInfo.height * 10}cm</p>
            <p>Weight: {pokemonInfo.weight / 100}kg</p>
            <p>
              Type:{" "}
              {pokemonInfo.types[1]
                ? pokemonInfo.types[0].type.name +
                  " and " +
                  pokemonInfo.types[1].type.name
                : pokemonInfo.types[0].type.name}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-xs max-w-full gap-2 text-center">
            {pokemonInfo.stats.slice(0, 3).map((item) => {
              return (
                <li key={item.stat.name}>
                  <div>
                    {item.stat.name.toUpperCase()}

                    <div
                      style={{ width: item.base_stat * 2 }}
                      className={`h-3 rounded-md ${item.stat.name} w-0 transition-all flex items-center justify-center`}
                    >
                      <p>{item.base_stat}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
