import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User, UserModel } from "../entities/User";
import { Pokemon, PokemonModel } from "../entities/Pokemon";
import { UserAddPokemonInput, UserInput, UserLoginInput } from "./types/User-input";


@Resolver()
export class UserResolver {

  @Query((_returns) => User, { nullable: false })
  async returnSingleUser(@Arg("id") id: string) {
    return await UserModel.findById({ _id: id });
  }

  @Query((_returns) => User)
  async login(@Arg("data") { username, password }: UserLoginInput) {
    const user = (await UserModel.findOne({username, password}));
  }

  @Query(() => [User])
  async returnAllUsers() {
    return await UserModel.find();
  }



  @Mutation(() => User)
  async createUser(
    @Arg("data") { username, email, password }: UserInput
  ): Promise<User> {
    const pokedex: Pokemon[] = [];
    const user = (
      await UserModel.create({
        username,
        email,
        password,
        pokedex,
      })
    ).save();
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
    const user = (
      await UserModel.findByIdAndUpdate(
        userID,
        { $push: { pokedex: pokemon } },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated User : ", docs);
          }
        }
      )
    );
    if (!user) {
      throw Error('no user with id ' + userID)
    }
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    await UserModel.deleteOne({ id });
    return true;
  }
}
