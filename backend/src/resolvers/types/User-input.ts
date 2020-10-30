import { InputType, Field, ID } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { User } from "../../entities/User";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  username: String;

  @Field()
  @IsEmail()
  email: String;

  @Field()
  password: String;
}

@InputType()
export class UserAddPokemonInput {
  @Field()
  pokemonID: String;

  @Field()
  userID: String;
}

@InputType()
export class UserLoginInput {
  @Field()
  username: String;

  @Field()
  password: String;
}
