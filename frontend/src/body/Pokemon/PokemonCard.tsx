import React from "react";
import Typography from "@material-ui/core/Typography";
import theme from "./../../theme";
import {
  makeStyles,
} from "@material-ui/core/styles";


/* Styles */

const useStyles = makeStyles({
  pokemonCard: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    margin: "0.25rem",
    width: "10rem",
    height: "15rem",
    backgroundColor: "#f1f8e9",
    border: "0.2rem black solid",
  },
  pokemonCardImage: {
    marginTop: "auto",
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  }
});

// PokemonCard, returns a pokemon-preview
function PokemonCard(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.pokemonCard} onClick={props.onClick}>
      <Typography variant="h4">{props.pokemonID}</Typography>
      <Typography variant="h6">{props.name}</Typography>
      <img
        data-testid = "pokemoncard"
        className={classes.pokemonCardImage}
        src={props.image}
        width="150px"
        alt={"Picture of " + props.name}
      />
    </div>
  );
}

export default PokemonCard;
