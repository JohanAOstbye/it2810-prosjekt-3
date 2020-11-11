import React, { useEffect } from "react";
import {
  makeStyles,
} from "@material-ui/core/styles";
import PokemonDialogWrapper from "./PokemonDialogWrapper";

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



// Container which returns PokemonCards
function PokemonList(props: any) {
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return function cleanup() {
      window.removeEventListener("scroll", handleOnScroll);
    };
  });

  if (props.error) return <p>Error ${props.error.message}</p>;
  if (props.loading && !props.entries) return <p>Loading...</p>;
  const pokemon = props.entries || []

  const handleOnScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      props.onLoadMore();
    }
  };

  return (
    <div className={classes.pokemonContainer}>
      {pokemon.map((pokemon: any) => (
        <PokemonDialogWrapper
          key={pokemon.id + props.extraKey}
          id={pokemon.id}
          pokemonID={pokemon.pokemonID}
          name={pokemon.name}
          image={pokemon.image}
        />
      ))}
      {props.loading ? (<h2>Loading...</h2>) : (null)}
      {props.end ? (null) : (<p>the end:(</p>)}
    </div>
  );
}

export default PokemonList;
