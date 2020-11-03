export interface IapiPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<any>;
  forms: Array<any>;
  game_indices: Array<any>;
  held_items: Array<any>;
  location_area_encounters: string;
  moves: Array<any>;
  sprites: any;
  species: any;
  stats: Array<IapiStat>;
  types: Array<any>;
}

export interface IapiStat {
  base_stat: number;
  effort: number;
  stat: {
    name: String;
    url: String;
  };
}

export interface Istat {
  name: String;
  base_stat: number;
  effort: number;
}

export class stat {
  constructor(stat: IapiStat) {
    this.base_stat = stat.base_stat;
    this.effort = stat.effort;
    this.name = stat.stat.name;
  }
  name: String;
  base_stat: number;
  effort: number;
}

export class PokemonStatInput extends stat {
    constructor(stat: IapiStat) {
        super(stat);
        this.base_stat = stat.base_stat;
        this.effort = stat.effort;
        this.name = stat.stat.name;
      }
    name: String;
    base_stat: number;
    effort: number;
    
  }

export class move {
  move!: {
    name: string;
    url: string;
  };
  version_group_details!: Array<any>;
}

export class type {
  slot!: number;
  type!: {
    name: string;
    url: string;
  };
}

export class Pokemon {
  constructor(
    pokemonID: number,
    name: string,
    base_experience: number,
    height: number,
    weight: number,
    moves: Array<move>,
    types: Array<type>
  ) {
    this.pokemonID = pokemonID;
    this.name = name;
    this.image = `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`;
    this.base_experience = base_experience;
    this.height = height;
    this.weight = weight;
    this.moves = moves.map((val) => val.move.name);
    this.types = types.map((val) => val.type.name);
  }
  _id?: String;
  pokemonID: number;
  name: string;
  image: string;
  base_experience: number;
  height: number;
  weight: number;
  moves: Array<string>;
  types: Array<string>;
}

export class PokemonInput extends Pokemon {
  constructor(
    pokemonID: number,
    name: string,
    base_experience: number,
    height: number,
    weight: number,
    moves: Array<move>,
    types: Array<type>
  ) {
    super(pokemonID, name, base_experience, height, weight, moves, types);
    this.pokemonID = pokemonID;
    this.name = name;
    this.image = `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`;
    this.base_experience = base_experience;
    this.height = height;
    this.weight = weight;
    this.moves = moves.map((val) => val.move.name);
    this.types = types.map((val) => val.type.name);
  }
  _id?: String;
  pokemonID: number;
  name: string;
  image: string;
  base_experience: number;
  height: number;
  weight: number;
  moves: Array<string>;
  types: Array<string>;
}

export function pokemonReducer(
  apiPokemon: IapiPokemon
): [Pokemon, Array<stat>] {
  return [
    new Pokemon(
      apiPokemon.id,
      apiPokemon.name,
      apiPokemon.base_experience,
      apiPokemon.height,
      apiPokemon.weight,
      apiPokemon.moves,
      apiPokemon.types
    ),
    apiPokemon.stats.map((val) => new stat(val)),
  ];
}
