import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Pokemon } from "./Pokemon"
import relayTypes from "./../utils/Paginated-response"


@ObjectType({ description: "The User model" })
export class User {
  @Field(() => ID)
  readonly id: string;

  @Field(() => String)
  @Property({ required: true })
  username: String;

  @Property({ required: true })
  password: String;

  @Field(() => String)
  @Property({ required: true })
  email: String;

  @Field(() => [Pokemon])
  @Property({ type: () => Pokemon, default: [] })
  pokedex: Pokemon[] = [];
}

@ObjectType()
export class UserResponse extends relayTypes<User>(User) { }

export const UserModel = getModelForClass(User);
