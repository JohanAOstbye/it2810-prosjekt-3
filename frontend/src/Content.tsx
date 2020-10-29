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
  query{returnAllPokemon{name}}
`

const POKEMON = gql`
query GetPokemon {
  pokemons{
    query {returnAllPokemon{id, name}}
  }
}`

function Pokemon() {
  const { loading, error, data } = useQuery(POKEMON);

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

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;


const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map(dog => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}

function DogPhoto({ breed }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
}

/*function Pokemon(){
  const { loading, error, data } = useQuery(RETURN_ALL_POKEMON);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      {data.pokemons.map(pokemon => (
        <li>
          {pokemon.name}
        </li>
      ))}
    </ul>
  );
}*/

/*
<select name="dog" onChange={onDogSelected}>
      {data.dogs.map(dog => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
*/


function Content() {
  const [selectedDog, setSelectedDog] = useState(null);

  function onDogSelected({ target }) {
    setSelectedDog(target.value); 
  }
  

  return (
    <div className="content">
      <WelcomeComponent />
      <Pokemon/>
    </div>
  );
}


/*
      
*/
export default Content;