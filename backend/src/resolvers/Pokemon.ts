import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { Pokemon, PokemonModel, PokemonResponse } from "../entities/Pokemon";
import { PokemonFilter, PokemonInput } from "./types/Pokemon-input";
import { PokemonStat, PokemonStatModel } from "../entities/PokemonStat";
import { PokemonStatInput } from "./types/PokemonStat-input";
import ConnectionArgs from "../utils/ConnectionArgs";
import * as Relay from "graphql-relay";

@Resolver((of) => Pokemon)
export class PokemonResolver {
  @Query((_returns) => Pokemon, { nullable: false })
  async returnSinglePokemon(@Arg("id") id: string) {
    return await PokemonModel.findById({ _id: id }).then((pokemon: any) => {
      return pokemon
        .populate({
          path: "pokemonId",
          model: "PokemonStat",
        })
        .execPopulate();
    });
  }

  @Query(() => PokemonResponse)
  async returnAllPokemon(
    @Arg("data") args: ConnectionArgs,
    @Arg("filter")
    {
      maxPokemonId,
      minPokemonId,
      name,
      maxWeight,
      minWeight,
      maxHeight,
      minHeight,
    }: PokemonFilter,
    @Arg("orderby") orderBy?: String //Optional (???)
  ): Promise<PokemonResponse> {
    let filter: {
      pokemonId?: { $lte?: number, $gte?: number};
      name?: String;
      weight?: { $lte?: number, $gte?: number};
      height?: { $lte?: number, $gte?: number};
    } = {};
    // setting filter for id
    if (maxPokemonId || minPokemonId) {
      filter.pokemonId = {};
      if (maxPokemonId) {
        filter.pokemonId.$lte = maxPokemonId
      }
      if (minPokemonId) {
        filter.pokemonId.$gte = minPokemonId
      }
    }
    // setting filter for wheight
    if (maxWeight || minWeight) {
      filter.weight = {};
      if (maxWeight) {
        filter.weight.$lte = maxWeight
      }
      if (minWeight) {
        filter.weight.$gte = minWeight
      }
    }
    // setting filter for height
    if (maxHeight || minHeight) {
      filter.height = {};
      if (maxHeight) {
        filter.height.$lte = maxHeight
      }
      if (minHeight) {
        filter.height.$gte = minHeight
      }
    }

    // setting filter for name
    if(name) {
      filter.name = name
    }

    const { limit, offset } = args.pagingParams();
    const pokemons = await PokemonModel.find(filter).sort(orderBy);
    const count = await PokemonModel.countDocuments(filter);
    const page = Relay.connectionFromArraySlice(pokemons, args, {
      arrayLength: pokemons.length,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @Mutation(() => PokemonStat)
  async createStat(
    @Arg("data")
    { pokemonId, name, base_stat, effort }: PokemonStatInput
  ): Promise<PokemonStat> {
    const pokemonStat = await PokemonStatModel.create({
      pokemonId,
      name,
      base_stat,
      effort,
    });
    const pokemon = await PokemonModel.findOneAndUpdate(
      { _id: pokemonId },
      { $push: { stats: pokemonStat } },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            "Updated pokeomon with id: " +
              pokemonId +
              " with stat: " +
              pokemonStat._id
          );
        }
      }
    );
    if (!pokemon) {
      throw Error("no pokemon with id " + pokemonId);
    }
    return pokemonStat;
  }

  @Query((_returns) => PokemonStat, { nullable: false })
  async returnSinglePokemonStat(@Arg("id") id: string) {
    return await PokemonStatModel.findById({ _id: id });
  }

  @Mutation(() => Pokemon)
  async createPokemon(
    @Arg("Pokemon", (type) => PokemonInput)
    {
      pokemonID,
      name,
      image,
      base_experience,
      height,
      weight,
      moves,
      types,
    }: PokemonInput,
    @Arg("Stats", (type) => [PokemonStatInput])
    pokemonStats: PokemonStatInput[]
  ): Promise<Pokemon> {
    console.log(moves.toString() + types.toLocaleString());
    const stats: PokemonStat[] = [];
    const pokemon = (
      await PokemonModel.create({
        pokemonID,
        name,
        image,
        base_experience,
        height,
        weight,
        moves,
        types,
        stats,
      })
    ).save();
    if (!pokemon) {
      throw new Error("pokemonfailure");
    }

    pokemonStats.forEach(async (stat) => {
      let newstat = stat;
      newstat.pokemonId = (await pokemon)._id;
      this.createStat(newstat);
    });
    return pokemon.then((pokemon: any) => {
      return pokemon
        .populate({
          path: "pokemonId",
          model: "PokemonStat",
        })
        .execPopulate();
    });
  }

  @Mutation(() => Boolean)
  async deletePokemon(@Arg("id") id: string) {
    await PokemonModel.deleteOne({ id });
    return true;
  }

  @FieldResolver(() => PokemonStat)
  async stats(@Root() pokemon: Pokemon): Promise<PokemonStat[]> {
    if (!pokemon.stats) {
      console.log("no stats");
      return [];
    }
    console.log(pokemon, "pokemon!");

    const populatedStats = await PokemonStatModel.find({
      pokemonId: pokemon.id.toString(),
    });
    // const populatedStats = await PokemonModel.findById(pokemon.id);

    // if (!populatedStats) {
    //   throw new Error("could not find any stats");

    // }

    // populatedStats.populate({path: 'stats', model: 'PokemonStat'}).execPopulate()

    return populatedStats;
  }
}
