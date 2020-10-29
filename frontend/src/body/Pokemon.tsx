import React, { useState } from "react";
import "./../css/Responsive.css";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useQuery, gql, NetworkStatus } from "@apollo/client";


/* Styles */

const useStyles = makeStyles(() => ({
  pokemonCardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: "1rem",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  pokemonCard: {
    padding: "1rem",
    margin: "0.25rem",
    width: "10rem",
    height: "15rem",
    backgroundColor: "lightgoldenrodyellow",
    border: "0.2rem black solid",
  },
}));


/* Queries */

//Return all pokemon
const RETURN_ALL_POKEMON = gql`
  query {
    returnAllPokemon {
      pokemonID
      name
      image
    }
  }
`;


/* Pokemon Component */

function Pokemon() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(RETURN_ALL_POKEMON); // all pokemon

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;

  return (
    <div className={classes.pokemonCardContainer}>
      {data.returnAllPokemon.map(({ pokemonID, name, image }) => (
        <div className={classes.pokemonCard} onClick={() => {}}>
          <div>
            <Typography variant="h6">
              ID: {pokemonID}
              <br />
              Name: {name}
              <br />
            </Typography>
          </div>
          <img src={image} width="150px" />
        </div>
      ))}
    </div>
  );
}

export default Pokemon;
