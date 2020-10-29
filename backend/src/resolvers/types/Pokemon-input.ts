import { InputType, Field, ID, Int } from "type-graphql";
import { Pokemon } from "../../entities/Pokemon";

@InputType()
export class PokemonInput implements Partial<Pokemon> {
  @Field(() => Int)
  pokemonID: number;

  @Field(() => String)
  name: String;

  @Field(() => String)
  image: String;

  @Field(() => Int)
  base_experience: number;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  weight: number;

  @Field(() => [String])
  moves: String[];

  @Field(() => [String])
  types: String[];
}
