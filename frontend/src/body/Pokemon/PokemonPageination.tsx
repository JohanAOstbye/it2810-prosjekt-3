import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import PokemonList from "./PokemonList";
import { useSelector } from "react-redux";
import ReduxState from "../../helperClasses/state";
import Filter from "../../helperClasses/filter";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  content: {
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "stretch",
    flexGrow: 1,
  },
}));

/* Queries */

//Return all pokemon
const RETURN_POKEMON_BY_SEARCH = gql`
  query returnAllPokemon($orderby: String!, $after: String, $name: String!, $maxPokemonId: Int!, $minPokemonId: Int!) {
    returnAllPokemon(
      orderby: $orderby
      filter: { name: $name, maxPokemonId:$maxPokemonId, minPokemonId:$minPokemonId }
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
function PokemonPageination() {
  const classes = useStyles()
  const filter: Filter = useSelector((state:ReduxState) => state.filter)
  
  const { data, loading, fetchMore, error ,refetch} = useQuery(
    RETURN_POKEMON_BY_SEARCH,
    {
      variables: {
        name:filter.name,
        maxPokemonId: filter.pokemonId.lte,
        minPokemonId: filter.pokemonId.gte,
        orderby: filter.orderby
      },
    }
  ); // all pokemon

  useEffect(() => {
    refetch()
    console.log("refetching with new filter: ", filter)
  }, [filter, refetch])

  if (loading) return <p className={classes.content} ><br/><CircularProgress/></p>;

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
        extraKey="pokemons"
      ></PokemonList>
    </div>
  );
}

export default PokemonPageination;
