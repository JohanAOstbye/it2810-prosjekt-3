import { ObjectType, Field, Int, ID } from "type-graphql";
import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// import { Pokemon } from "./Pokemon";
// import { Ref } from "../types";

@ObjectType({ description: "The PokemonStat model" })
export class PokemonStat {
  @Field(() => ID)
  id: String;

  @Property({ required: true})
  public pokemonId: ObjectId;

  @Field(() => String)
  @Property({ required: true })
  name: String;

  @Field(() => Int)
  @Property({ required: true })
  base_stat: number;

  @Field(() => Int)
  @Property({ required: true })
  effort: number;
}

export const PokemonStatModel = getModelForClass(PokemonStat);
