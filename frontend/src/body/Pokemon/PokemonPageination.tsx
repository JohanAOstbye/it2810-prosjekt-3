import React from "react";
import { useQuery, gql } from "@apollo/client";
// import { makeStyles } from "@material-ui/core/styles";
import PokemonList from "./PokemonList";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
/* Styles */

//Styles for PokemonCard and PokemonContainer
// const useStyles = makeStyles(() => ({
//   pokemonContainer: {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingTop: "1rem",
//     justifyContent: "center",
//     alignContent: "center",
//     alignItems: "center",
//   },
// }));

/* Queries */

//Return pokemon by search
const RETURN_POKEMON_BY_SEARCH = gql`
  query returnAllPokemon($after: String, $name: String!) {
    returnAllPokemon(
      filter: { name: $name }
      data: { first: 20, after: $after }
      orderby: "pokemonID"
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

const RETURN_ALL_POKEMON = gql`
  query returnAllPokemon($after: String) {
    returnAllPokemon(
      filter: {}
      data: { first: 20, after: $after }
      orderby: "pokemonID"
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
function PokemonPageination() {
  const term = useSelector((state:{term:String}) => state.term);
  console.log("Searching for: ", term);

  //const { data, loading, fetchMore } = useQuery(RETURN_ALL_POKEMON); // all pokemon

  const { data, loading, fetchMore, refetch, error } = useQuery( // all pokemon with name == term
    RETURN_POKEMON_BY_SEARCH,
    {
      variables: {name: term},
    }
  ); 
    
  
    if (loading) return <p>Loading</p>;
  if (data === undefined) return <p>graphql is not working</p>;
  
  return (
    <div>

      <Button onClick={() => refetch()}>Refetch</Button>

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
