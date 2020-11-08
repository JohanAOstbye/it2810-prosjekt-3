import { InputType, Field, Int } from "type-graphql";
import { PokemonStat } from "../../entities/PokemonStat";
import { ObjectId } from "mongodb";


@InputType()
export class PokemonStatInput implements Partial<PokemonStat> {
  @Field(() => String)
  name: String;

  @Field(() => Int)
  base_stat: number;

  @Field(() => Int)
  effort: number;

  _id: ObjectId;
  pokemonId: ObjectId;
  
}
