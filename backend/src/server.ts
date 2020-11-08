import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";

// resolvers
import { UserResolver } from "./resolvers/User";
import { PokemonResolver } from "./resolvers/Pokemon";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, PokemonResolver],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = await connect(
    "mongodb+srv://admin:safepswrd@pokedb.chnl7.mongodb.net/Pokedb?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  await mongoose.connection;

  const server = new ApolloServer({ schema });
  const app = Express();
  server.applyMiddleware({ app });
  app.listen({ port: 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at http://localhost:3333${server.graphqlPath}`
    )
  );
};
main().catch((error) => {
  console.log(error, "error");
});
