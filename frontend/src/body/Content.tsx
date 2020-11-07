import React from "react";
import PokemonPageination from "./Pokemon/PokemonPageination";
import WelcomeComponent from "./WelcomeComponent";
import { makeStyles } from "@material-ui/styles";
import SearchBar from "./SearchBar";
//const [input, setInput] = useState(null);

const useStyles = makeStyles(() => ({
  content: {
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
}));


function Content() {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <WelcomeComponent />
      <SearchBar />
      <PokemonPageination/>
    </div>
  );
}

export default Content;
