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
  @Field(() => Int, { nullable: true })
  maxPokemonId?: number;

  @Field(() => Int, { nullable: true })
  minPokemonId?: number;

  @Field(() => String, { nullable: true })
  name?: String;
  
  @Field(() => Int, { nullable: true })
  maxWeight?: number;
  
  @Field(() => Int, { nullable: true })
  minWeight?: number;
  
  @Field(() => Int, { nullable: true })
  maxHeight?: number;
  
  @Field(() => Int, { nullable: true })
  minHeight?: number;
}