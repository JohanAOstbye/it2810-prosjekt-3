import React from "react";
import { useQuery, gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import PokemonList from "./PokemonList";
<<<<<<< HEAD

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        returnAllPokemon: {},
      },
    },
  },
});
=======
>>>>>>> 5547edee133b71988db017344b32c194c8653c78
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
query returnAllPokemon($after: String){
  returnAllPokemon(orderby: {key:"pokemonID", direction:1}, filter: {}, data: {first: 20, after:$after}){
    edges{
        cursor,
        node{
        id,
        pokemonID,
        name,
        image,
        base_experience,
        height,
        weight
        }
    }
    pageInfo{
        startCursor,
        endCursor,
        hasPreviousPage,
        hasNextPage
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
function PokemonPageination(props:any) {
  // const filter = {

  // }
  const { data, loading, fetchMore, error } = useQuery(
    RETURN_POKEMON_BY_SEARCH,
    {
      variables: { searchTerm: props.term },
    }
  ); // all pokemon

  if (loading) return <p>Loading</p>;

    console.log(data);
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
