import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { Pokemon, PokemonModel } from "../entities/Pokemon";
import { PokemonInput } from "./types/Pokemon-input";
import { PokemonStat, PokemonStatModel } from "../entities/PokemonStat";
import { PokemonStatInput } from "./types/PokemonStat-input";
import * as mongoose from "mongoose";

@Resolver(of => Pokemon)
export class PokemonResolver {
  @Query((_returns) => Pokemon, { nullable: false })
  async returnSinglePokemon(@Arg("id") id: string) {
    return await PokemonModel.findById({ _id: id }).then((pokemon: any) => {
      return pokemon.populate({
        path: "pokemonId",
        model: "PokemonStat"
      }).execPopulate()
    });
  }

  @Query(() => [Pokemon])
  async returnAllPokemon() {
    const pokemons = await PokemonModel.find();
    await PokemonModel.populate(pokemons, {path: "pokemonId", model: "PokemonStat"});
    return pokemons;
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
    const pokemon = (
      await PokemonModel.findByIdAndUpdate(
        pokemonId,
        { $push: { stats: pokemonStat._id } },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated pokeomon with id: " + pokemonId + " with stat: " + pokemonStat._id);
          }
        }
      )
    );
    if (!pokemon) {
      throw Error('no pokemon with id ' + pokemonId)
    }
    return pokemonStat;
  }

  @Query((_returns) => PokemonStat, { nullable: false })
  async returnSinglePokemonStat(@Arg("id") id: string) {
    return await PokemonStatModel.findById({ _id: id });
  }

  @Mutation(() => Pokemon)
  async createPokemon(
    @Arg("Pokemon", type => PokemonInput)
    {
      pokemonID,
      name,
      image,
      base_experience,
      height,
      weight,
      moves,
      types
    }: PokemonInput,
    @Arg("Stats", type => [PokemonStatInput])
    pokemonStats: PokemonStatInput[]
  ): Promise<Pokemon> {
    const stats:PokemonStat[] = []
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
        stats
      })
    ).save();
    if (!pokemon) {
      throw new Error("pokemonfailure")
    }

    pokemonStats.forEach(async stat => {
      let newstat = stat
      newstat.pokemonId = (await pokemon)._id
      this.createStat(newstat);
    });
    return pokemon.then((pokemon: any) => {
      return pokemon.populate({
        path: "pokemonId",
        model: "PokemonStat"
      }).execPopulate()
    });;
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
    
    const populatedStats = await PokemonStatModel.find({pokemonId: pokemon.id.toString()})
    // const populatedStats = await PokemonModel.findById(pokemon.id);

    // if (!populatedStats) {
    //   throw new Error("could not find any stats");
      
    // }

    // populatedStats.populate({path: 'stats', model: 'PokemonStat'}).execPopulate()
    
    return populatedStats;
  }
}
