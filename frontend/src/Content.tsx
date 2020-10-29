import React, { useState } from 'react';
import './css/Responsive.css';
import SearchBar from './SearchBar';
import ComponentContainer from './ComponentContainer';
import Component from './Component';
import GenerationCard from './GenerationCard';
import { Typography } from '@material-ui/core';
import {
  useQuery,
  gql,
  NetworkStatus,
  useLazyQuery
} from "@apollo/client";

function WelcomeComponent(){
  return (
    <div>
      <Typography variant="h3">
        Welcome to the Pokébase site!
      </Typography>
      <Typography variant="h5">
        Search for a Pokémon, or click on a generation to see all from that one.
      </Typography>
    </div>
  );
}

const GET_ALL_POKEMON = gql`
  query GetAllPokemon {
    pokemons {
      id
      name
    }
  }
`;

const RETURN_ALL_POKEMON = gql`
  query{returnAllPokemon{id, name}}
`

const POKEMON = gql`
query GetPokemon {
  pokemons{
    query {returnAllPokemon{id, name}}
  }
}`

function Pokemon() {
  const { loading, error, data } = useQuery(GET_ALL_POKEMON);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Du har en Error:(</p>;

  return data.pokemons.map(({id, name }) => (
    <div key={id}>
      <p>
        {id}:{name}
      </p>
    </div>
  ));
}

function Content() {
  return (
    <div className="content">
      <WelcomeComponent />
      <Pokemon/>
    </div>
  );
}

export default Content;