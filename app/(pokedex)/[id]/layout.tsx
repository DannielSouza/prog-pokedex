import { getDetails } from "@/app/api";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";

type PageParams = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageParams) {
  const pokemonInfo = await getDetails(params.id);
  if (!pokemonInfo?.name) return notFound();
  return {
    title: `Pokedex | ${pokemonInfo.name}`,
  };
}

const PokemonInfoLayout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default PokemonInfoLayout;
