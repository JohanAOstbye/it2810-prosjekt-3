import React from "react";
import { useQuery, gql, InMemoryCache, Reference } from "@apollo/client";
import {
    makeStyles,
} from "@material-ui/core/styles";
import PokemonList from "./PokemonList";
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                returnAllPokemon: relayStylePagination()
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
}
`;



// Container which returns PokemonCards
function PokemonPageination() {
    // const filter = {

    // }
    const { data, loading, fetchMore, error } = useQuery(
        RETURN_ALL_POKEMON
    ); // all pokemon

    if (loading) return (<p>Loading</p>);

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

export default PokemonPageination;