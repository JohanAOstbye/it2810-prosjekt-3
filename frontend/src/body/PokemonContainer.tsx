import React, { Component, useState } from "react";
import CustomizedDialog from "./CustomizedDialog";
import "./../css/Responsive.css";
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

//Return all pokemon
const RETURN_ALL_POKEMON = gql`
  query {
    returnAllPokemon {
      id
      pokemonID
      name
      image
    }
  }
`;

/* Components */

// Container which returns PokemonCards
function PokemonContainer() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(RETURN_ALL_POKEMON); // all pokemon

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;

  //console.log(data.returnAllPokemon[0]);

  return (
    <div className={classes.pokemonContainer}>
      {data.returnAllPokemon.map(({ id, pokemonID, name, image }) => (
        <CustomizedDialog
          id={id}
          pokemonID={pokemonID}
          name={name}
          image={image}
        />
      ))}
    </div>
  );
}

export default PokemonContainer;