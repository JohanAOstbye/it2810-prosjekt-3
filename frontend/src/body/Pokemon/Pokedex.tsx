import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import PokemonList from "./PokemonList";
import { useSelector } from "react-redux";
import ReduxState from "../../helperClasses/state";
import Filter from "../../helperClasses/filter";

/* Queries */

//Return all pokemon
const RETURN_POKEDEX = gql`
  query returnPokedex($orderby: String!, $userId: String!, $after: String, $name: String!, $maxPokemonId: Int!, $minPokemonId: Int!) {
    returnPokedex(
      userId: $userId
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
function Pokedex(props:any) {
  const filter: Filter = useSelector((state:ReduxState) => state.filter)
  const show = useSelector((state:ReduxState) => state.pokedex.show)
  
  const { data, loading, fetchMore, error ,refetch} = useQuery(
    RETURN_POKEDEX,
    {
      variables: {
        userId: props.id,
        name:filter.name,
        maxPokemonId: filter.pokemonId.lte,
        minPokemonId: filter.pokemonId.gte,
        orderby: filter.orderby
      },
    }
  ); // all pokemon

  useEffect(() => {
    refetch()
  }, [filter, refetch, show])

  if (loading) return <p>Loading</p>;

  if (data === undefined) return <p>graphql is not working</p>;

  return (
    <div>
      <PokemonList
        loading={loading}
        entries={data.returnPokedex.edges.map((edge: { node: any; }) => edge.node)}
        onLoadMore={() => {
          fetchMore(
            {
              variables: {
                after: data.returnPokedex.pageInfo.endCursor,
              }
            });
        }}
        error={error}
        end={data.returnPokedex.pageInfo.hasNextPage}
        extraKey="pokedex"
      ></PokemonList>
    </div>
  );
}

export default Pokedex;