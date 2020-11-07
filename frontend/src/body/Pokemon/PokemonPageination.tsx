import React from "react";
import { useQuery, gql } from "@apollo/client";
// import { makeStyles } from "@material-ui/core/styles";
import PokemonList from "./PokemonList";
import { useSelector } from "react-redux";

/* Queries */

//Return all pokemon
const RETURN_POKEMON_BY_SEARCH = gql`
  query returnAllPokemon($after: String, $name: String!) {
    returnAllPokemon(
      orderby: "pokemonID"
      filter: { name: $name }
      data: { first: 20, after: $after }
    ) {
      edges {
        cursor
        node {
          id
          pokemonID
          name
          image
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

// Container which returns PokemonCards
function PokemonPageination(props: any) {
  const term = useSelector((state:{term:String}) => state.term)
  console.log("shearching for: ", term)
  const { data, loading, fetchMore, error } = useQuery(
    RETURN_POKEMON_BY_SEARCH,
    {
      variables: {name:""},
    }
  ); // all pokemon

  if (loading) return <p>Loading</p>;

  if (data === undefined) return <p>graphql is not working</p>;

  return (
    <div>
      <PokemonList
        loading={loading}
        entries={data.returnAllPokemon.edges.map((edge: { node: any; }) => edge.node)}
        onLoadMore={() => {
          fetchMore(
            {
              variables: {
                after: data.returnAllPokemon.pageInfo.endCursor,
              }
            });
        }}
        error={error}
        end={data.returnAllPokemon.pageInfo.hasNextPage}
      ></PokemonList>
    </div>
  );
}

export default PokemonPageination;
