import React, { Component, useContext, useState } from "react";
import CustomizedDialog from "./CustomizedDialog";
import { Typography } from "@material-ui/core";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import {
  makeStyles,
} from "@material-ui/core/styles";
import { SearchTermContext } from "../App";

//const { input } = useContext(SearchTermContext);


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
query {returnAllPokemon(orderby: "pokemonID", filter: {}, data: {first:4}){
    page{
      edges{
        node{id, pokemonID, name, image}
        }
      }
    }
  }
`;

//Return pokemon by search
const RETURN_POKEMON_BY_SEARCH = gql`
query ($searchTerm: String!){
  returnAllPokemon(orderby: "pokemonID", filter: {
    name: $searchTerm
  }, data: {first:3}){
    page{
      edges{
        node{id, pokemonID, name, image}
        }
      }
    }
  }
`;

/* Components */

// Container which returns PokemonCards
function PokemonContainer() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(
    RETURN_POKEMON_BY_SEARCH,
    {
      variables: { searchTerm:"charmander" }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;

  console.log();

  return (
    <div className={classes.pokemonContainer}>
      {data.returnAllPokemon.page.edges.map(({ node }: any) => (
        <CustomizedDialog
          id={node.id}
          pokemonID={node.pokemonID}
          name={node.name}
          image={node.image}
        />
      ))}
    </div>
  );
}

export default PokemonContainer;
