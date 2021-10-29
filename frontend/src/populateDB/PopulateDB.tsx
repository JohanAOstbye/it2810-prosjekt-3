import React from 'react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { PokemonInput, stat, IapiPokemon, pokemonReducer } from "./pokemonReducer"
import { Button } from '@mui/material';

class Stat implements stat {
    constructor(
        name: String,
        base_stat: number,
        effort: number,
    ) {
        this.name = name
        this.base_stat = base_stat;
        this.effort = effort;
    }
    name: String;
    base_stat: number;
    effort: number;

}


const CREATE_POKEMON = gql`
mutation ($pokemon: PokemonInput!, $stats: [PokemonStatInput!]! ) {
  createPokemon(
    Pokemon: $pokemon
    Stats: $stats
  ){
    id,
    name
  }
}
`;



function PopulateDB() {
    const [createPokemon, { error, data }] = useMutation(CREATE_POKEMON);

    const fetchAndStorePokemon = async (index: number) => {
        let tempPokemon: IapiPokemon = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`)).json();
        let [pokemon, stats]: [PokemonInput, Array<stat>] = pokemonReducer(tempPokemon)
        console.log(pokemon);
        console.log(stats);
        createPokemon({ variables: { pokemon: pokemon, stats: stats } })
    }

    const fetchPokemons = async () => {
        for(let i = 1; i <= 898; i++) {
            await fetchAndStorePokemon(i);
        }
    }

    if(error) {
        console.log(error.graphQLErrors)
    }

    return (
        <div>
            <Button size="large" color="primary" onClick={() => fetchPokemons()}>Update DB</Button>
        </div>
    );
}

export default PopulateDB;
