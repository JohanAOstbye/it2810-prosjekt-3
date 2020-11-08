import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from "type-graphql";
import { User, UserModel, UserResponse } from "../entities/User";
import { Pokemon, PokemonModel, PokemonResponse } from "../entities/Pokemon";
import {
  UserAddPokemonInput,
  UserInput,
  UserLoginInput,
} from "./types/User-input";
import ConnectionArgs from "../utils/ConnectionArgs";
import * as Relay from "graphql-relay"
import { PokemonFilter } from "./types/Pokemon-input";

@Resolver((of) => User)
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async returnSingleUser(@Arg("id") id: string) {
    return await UserModel.findById({ _id: id });
  }

  @Query((_returns) => User)
  async login(@Arg("data") { username, password }: UserLoginInput) {
    console.log(username, password)
    const user = await UserModel.findOne({ username, password });
    if (!user) {
      throw new Error("Wrong username or password")
    }
    console.log("found user: ", user)
    return user;
  }

  @Query(() => UserResponse)
  async returnAllUsers(
    @Arg("data") args: ConnectionArgs
  ): Promise<UserResponse> {
    const { offset } = args.pagingParams();
    const users = await UserModel.find();
    const page = Relay.connectionFromArraySlice(users, args, {
      arrayLength: users.length,
      sliceStart: offset || 0,
    });

    return page;
  }

  // @Query(() => PokemonResponse)
  @Query(() => PokemonResponse)
  async returnPokedex(
    @Arg("userId") userid: String,
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
    @Arg("orderby") orderBy: String
  ): Promise<PokemonResponse> {
    const { offset } = args.pagingParams();
    const founduser = await UserModel.findById({_id: userid})
    if(!founduser) {
      throw new Error("could not find user")
    }
    const pokedex = founduser.pokedex.filter(
      pokemon => filterPokemon(pokemon, {
        maxPokemonId,
        minPokemonId,
        name,
        maxWeight,
        minWeight,
        maxHeight,
        minHeight,
      })
    ).sort(dynamicSort(orderBy.toString()))
    const page = Relay.connectionFromArraySlice(pokedex, args, {
      arrayLength: pokedex.length,
      sliceStart: offset || 0,
    });

    return page;
  }

  @FieldResolver(() => PokemonResponse)
  async pokedex(
    @Root() user: User,
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
    @Arg("orderby") orderBy: String
  ): Promise<PokemonResponse> {
    const { offset } = args.pagingParams();
    const founduser = await UserModel.findById({_id: user.id})
    if(!founduser) {
      throw new Error("could not find user")
    }
    const pokedex = founduser.pokedex.filter(
      pokemon => filterPokemon(pokemon, {
        maxPokemonId,
        minPokemonId,
        name,
        maxWeight,
        minWeight,
        maxHeight,
        minHeight,
      })
    ).sort(dynamicSort(orderBy.toString()))
    const page = Relay.connectionFromArraySlice(pokedex, args, {
      arrayLength: pokedex.length,
      sliceStart: offset || 0,
    });

    return page;
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("data") { username, email, password }: UserInput
  ): Promise<User> {
    const pokedex: Pokemon[] = [];
    const testUser = await UserModel.findOne({username})
    console.log(testUser)
    if ( testUser ) {
      throw new Error("username in use")
    }
    const user = (
      await UserModel.create({
        username,
        email,
        password,
        pokedex,
      })
    ).save();
    console.log("Registered user: ", user)
    return user;
  }

  @Mutation(() => User)
  async addPokemon(
    @Arg("data") { userID, pokemonID }: UserAddPokemonInput
  ): Promise<User> {
    const pokemon = await PokemonModel.findById({ _id: pokemonID });
    if (!pokemon) {
      throw new Error("no pokemon with id " + pokemonID);
    }
    const testUser = await UserModel.findById({_id: userID})
    if (!testUser) {
      throw Error("no user with id " + userID);
    }
    if(testUser.pokedex.some(pokemon => pokemon.id === pokemonID)) {
      console.log("fant pokemonen i brukeren fra førav")
      return testUser;//kunne evt fjernet den
    }

    const user = await UserModel.findByIdAndUpdate(
      userID,
      { $push: { pokedex: pokemon } },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
        }
      }
    );
    if (!user) {
      throw Error("no user with id " + userID);
    }
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    await UserModel.deleteOne({ id });
    return true;
  }
}

function filterPokemon(pokemon: Pokemon, filter: PokemonFilter): boolean {
  let filters: boolean = true;
  const checkCondition = (condition:boolean) => {
    if (!condition)  {
      filters = false;
    }
  }
  //filtering id
  if (filter.maxPokemonId || filter.minPokemonId) {
    if (filter.maxPokemonId) {
      checkCondition(pokemon.pokemonID < filter.maxPokemonId)
    }
    if (filter.minPokemonId) {
      checkCondition(pokemon.pokemonID > filter.minPokemonId)
    }
  }
  // setting filter for wheight
  if (filter.maxWeight || filter.minWeight) {
    if (filter.maxWeight) {
      checkCondition(pokemon.weight < filter.maxWeight)
    }
    if (filter.minWeight) {
      checkCondition(pokemon.weight > filter.minWeight)
    }
  }
  // setting filter for height
  if (filter.maxHeight || filter.minHeight) {
    if (filter.maxHeight) {
      checkCondition(pokemon.height < filter.maxHeight)
    }
    if (filter.minHeight) {
      checkCondition(pokemon.height > filter.minHeight)
    }
  }

  // setting filter for name
  if(filter.name) {
    filters = pokemon.name.includes(filter.name.toString())
  }

  return filters;
}

function dynamicSort(property: string) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a:any,b:any) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}