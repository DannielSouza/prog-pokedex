export type TApiResponse = {
  results: TPokemonResponse[];
};

type TPokemonResponse = {
  name: string;
  url: string;
};
