import React from "react";
import PokemonPageination from "./Pokemon/PokemonPageination";
import WelcomeComponent from "./WelcomeComponent";
import { makeStyles } from "@material-ui/styles";
import SearchBar from "./SearchBar";
import ReduxState from "../helperClasses/state";
import { useSelector } from "react-redux";
import Pokedex from "./Pokemon/Pokedex";
//const [input, setInput] = useState(null);

const useStyles = makeStyles(() => ({
  content: {
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "stretch",
    flexGrow: 1,
  },
}));

function Content() {
  const user = useSelector((state:ReduxState) => state.user)
  const pokedex = useSelector((state:ReduxState)=> state.pokedex)
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <WelcomeComponent/>
      <SearchBar />
      {pokedex.show && user ? (<Pokedex id={user.id}/>) : (<PokemonPageination/>)}
    </div>
  );
}

export default Content;
