import React, { createContext, useState } from "react";
import PokemonPageination from "./Pokemon/PokemonPageination";
import WelcomeComponent from "./WelcomeComponent";
import { makeStyles } from "@material-ui/styles";
import SearchBar from "./SearchBar";
import { Provider } from 'react-redux';
//import { Values } from 'redux-form-website-template';
import store from './SearchBarStore';
import showResults from './ShowResults';


//const [input, setInput] = useState(null);

const useStyles = makeStyles(() => ({
  content: {
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    flexGrow: 1
  }
}));

function Content(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Provider store={store}>
        <SearchBar onSubmit={showResults} />
      </Provider>
      <WelcomeComponent />
      <PokemonPageination/>
    </div>
  );
}

export default Content;



/* OLD POKEMON_CONTAINER

import React, { Component, useContext, useState } from "react";
import CustomizedDialog from "./CustomizedDialog";
import { Typography } from "@material-ui/core";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import {
  makeStyles,
} from "@material-ui/core/styles";
import { SearchTermContext } from "../App";

//const { input } = useContext(SearchTermContext);


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


*/