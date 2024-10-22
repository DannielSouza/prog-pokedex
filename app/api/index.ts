import axios from "axios";
import { TApiResponse } from "../_types/api";
import { TPokemon } from "../_types/pokemon";

const url = "https://pokeapi.co/api/v2/";

export async function getPokemons(page: number) {
  try {
    const response = await axios.get<TApiResponse>(
      `${url}pokemon?limit=20&offset=${page}`
    );
    const formatedList = response.data.results.map((pokemon) => ({
      name: pokemon.name,
      id: pokemon.url.split("/pokemon/")[1].replace("/", ""),
    }));

    return formatedList as TPokemon[];
  } catch (error) {
    console.log("error fetching data: " + error);
    throw error;
  }
}

export async function getDetails(id: string) {
  try {
    const response = await axios.get(`${url}pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.log("error fetching data: " + error);
  }
}
