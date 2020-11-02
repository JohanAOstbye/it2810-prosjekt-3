import React, { Component, useState } from "react";
import CustomizedDialog from "./CustomizedDialog";
import { Typography } from "@material-ui/core";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import {
  makeStyles,
} from "@material-ui/core/styles";

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
/*
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
    name: /$searchTerm/
  }, data: {first:3}){
    page{
      edges{
        node{id, pokemonID, name, image}
        }
      }
    }
  }
`;
*/

/* Components */

function PokemonSearchedFor(props: any) {
}

// Container which returns PokemonCards
function PokemonContainer(props: any) {
  const classes = useStyles();
  /*const { loading, error, data } = useQuery(
    RETURN_POKEMON_BY_SEARCH,
    {
      variables: { searchTerm:props.searchTerm }
    }
  ); // all pokemon, by $searchTerm

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;*/

  console.log(props);
  /*console.log(props.length);
  console.log(props.pokemon);
  console.log(props.pokemon.page.edges);*/

  return (
    <div className={classes.pokemonContainer}>
      
    </div>
  );
}

/*{props.pokemon.page.edges.map(({ node }: any) => (
        <CustomizedDialog
          id={node.id}
          pokemonID={node.pokemonID}
          name={node.name}
          image={node.image}
        />
      ))} */
export default PokemonContainer;
