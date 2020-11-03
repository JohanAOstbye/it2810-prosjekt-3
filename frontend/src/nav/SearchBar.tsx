import { FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from '@material-ui/core';
import React, { Component, useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { gql } from 'apollo-boost';
import PokemonContainer from '../body/PokemonContainer';
import { useQuery } from '@apollo/client';


/* Styles */

const useStyles = makeStyles(() => ({
  searchBar: {
    color: "white",
    backgroundColor: "teal",
    padding: "0.5rem",
  },
}));

/* States */



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

// Returns a PokemonContainer compoenent with the searchTerms provided.
function PokemonContainerBySearchQuery(props: any) {

  const { loading, error, data } = useQuery(
    RETURN_POKEMON_BY_SEARCH,
    {
      variables: { searchTerm:props.searchTerm }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;

  console.log(data.searchTerm)
  
  return <PokemonContainer pokemon={data.returnAllPokemon} />;
};


export default function SearchBarOld() {

  const [searchTerm, setSearchTerm] = useState("");

  const classes = useStyles();
  return (
    <div className={classes.searchBar}>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Search Pokébase..." fullWidth onChange={e=>setSearchTerm(e)}/>
      </form>
      <PokemonContainerBySearchQuery searchTerm={searchTerm}/>
    </div>
  );
}
