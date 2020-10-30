import React, { useState } from "react";
import PokemonContainer from "./PokemonContainer";
import "./../css/Responsive.css";
import {
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SinglePokemonQuery from "./CustomizedDialogs";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    color: "white",
  },
  subHeader: {
  /*display: "flex",
    flexDirection: "row",
    width: "100%"*/
  },
  subHeaderText: {
    //flexGrow: 1
  },
}));

function WelcomeComponent() {
  const classes = useStyles();
  return (
    <div className={classes.subHeader}>
      <Typography variant="h5" className={classes.subHeaderText} >
        Click on a Pokémon to learn more about it. You can also filter by searching for a specific one.
      </Typography>
    </div>
  );
}

function Content() {
  return (
    <div className="content">
      <WelcomeComponent />
      <PokemonContainer/>
    </div>
  );
}

/*<SinglePokemonQuery />*/

export default Content;
