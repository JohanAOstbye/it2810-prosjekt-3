import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import PokemonDialogWrapper from "./PokemonDialogWrapper";
import { CircularProgress } from "@mui/material";

/* Styles */

//Styles for PokemonCard and PokemonContainer
const useStyles = makeStyles(() => ({
  content: {
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "stretch",
    flexGrow: 1,
  },
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
  if (props.loading && !props.entries) return <p><br/><CircularProgress /></p>;
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
      console.log("loading");
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
      {props.loading ? (<h2 className={classes.content} ><br/><CircularProgress /></h2>) : (null)}
      {props.end ? (null) : (<p className={classes.content} ><br/><CircularProgress /></p>)}
    </div>
  );
}

export default PokemonList;
