import React from "react";
import "./../css/Responsive.css";
import PokemonPageination from "./Pokemon/PokemonPageination";
import WelcomeComponent from "./WelcomeComponent";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  content: {
    margin: "0.5rem",
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    flexGrow: 1
  }
}));

function Content() {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <WelcomeComponent />
      <PokemonPageination/>
    </div>
  );
}

export default Content;
