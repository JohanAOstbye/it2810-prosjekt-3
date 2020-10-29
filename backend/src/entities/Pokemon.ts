import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass, plugin } from "@typegoose/typegoose";
import { PokemonStat, PokemonStatModel } from "./PokemonStat";
import { Ref } from "../types";
// import * as autopopulate from 'mongoose-autopopulate';

// @plugin(require(autopopulate as any))
@ObjectType({ description: "The Pokemon model" })
export class Pokemon {
  @Field(() => ID)
  id: String;

  @Field(() => Int)
  @Property({ required: true })
  pokemonID: number;

  @Field(() => String)
  @Property({ required: true })
  name: String;

  @Field(() => String)
  @Property()
  image: String;

  @Field(() => Int)
  @Property({ required: true })
  base_experience: number;

  @Field(() => Int)
  @Property()
  height: number;

  @Field(() => Int)
  @Property()
  weight: number;

  @Field(() => [String])
  @Property({ required: true, default: [] })
  moves: String[];

  @Field(() => [String])
  @Property({ required: true, default: [] })
  types: String[];

  //@Field(() => [PokemonStat])
  @Property({
    ref: 'PokemonStat',
    // autopopulate: { maxDepth: 1},
  })
  stats: Ref<PokemonStat>[];
}

export const PokemonModel = getModelForClass(Pokemon);
