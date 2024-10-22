export type TPokemon = {
  name: string;
  id: string;
};

type TTypes = {
  slot: number;
  type: {
    name: string;
  };
};

type TStats = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type TPokemonInfo = {
  name: string;
  id: string;
  types: TTypes[];
  height: number;
  weight: number;
  stats: TStats[];
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
    front_default: string;
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
};
