import { InputType, Field, ID, Int } from "type-graphql";

@InputType()
export class PokemonInput {
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

@InputType()
export class PokemonFilter {
  @Field(() => Int)
  maxPokemonId?: number;

  @Field(() => Int)
  minPokemonId?: number;

  @Field(() => String)
  name?: String;
  
  @Field(() => Int)
  maxWeight?: number;
  
  @Field(() => Int)
  minWeight?: number;
  
  @Field(() => Int)
  maxHeight?: number;
  
  @Field(() => Int)
  minHeight?: number;
}