import React from "react";
import { useQuery, gql, InMemoryCache, Reference } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import PokemonList from "./PokemonList";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        returnAllPokemon: {},
      },
    },
  },
});
/* Styles */

//Styles for PokemonCard and PokemonContainer
const useStyles = makeStyles(() => ({
  pokemonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: "1rem",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
}));

/* Queries */

//Return all pokemon
const RETURN_ALL_POKEMON = gql`
  query returnAllPokemon($after: String) {
    returnAllPokemon(
      orderby: "pokemonID"
      filter: {}
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

//Return all pokemon by search
const RETURN_POKEMON_BY_SEARCH = gql`
  query returnAllPokemon($after: String, $searchTerm: String!) {
    returnAllPokemon(
      orderby: "pokemonID"
      filter: { name: $searchTerm }
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

// pageData{
//     count,
//     limit,
//     offset
//   }

// Container which returns PokemonCards
function PokemonPageination(props: any) {
  // const filter = {

  // }
  const { data, loading, fetchMore, error } = useQuery(
    RETURN_POKEMON_BY_SEARCH,
    {
      variables: { searchTerm: props.term },
    }
  ); // all pokemon

  if (loading) return <p>Loading</p>;

  //console.log(getState())
  //console.log(props.searchTerm)
  console.log(props)
  console.log(props.term)
  console.log(data);
  console.log(data.returnAllPokemon);
  console.log(data.returnAllPokemon.edges);
  return (
    <div>
      
    </div>
  );
}

/*<PokemonList
        loading={loading}
        entries={data.returnAllPokemon.edges.map(
          (edge: { node: any }) => edge.node
        )}
        onLoadMore={() => {
          fetchMore({
            variables: {
              after: data.returnAllPokemon.pageInfo.endCursor,
            },
          });
        }}
        error={error}
        end={data.returnAllPokemon.pageInfo.hasNextPage}
      ></PokemonList>*/

export default PokemonPageination;
