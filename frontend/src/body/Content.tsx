import React, { createContext, useState } from "react";
import WelcomeComponent from "./WelcomeComponent";
import PokemonContainer from "./PokemonContainer";
import { makeStyles } from "@material-ui/styles";
import SearchBar from "./SearchBar";
import { Provider } from 'react-redux';
//import { Values } from 'redux-form-website-template';
import store from './SearchBarStore';
import showResults from './ShowResults';


//const [input, setInput] = useState(null);

const useStyles = makeStyles(() => ({
  content: {
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    flexGrow: 1
  }
}));

function Content(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Provider store={store}>
        <SearchBar onSubmit={showResults} />
      </Provider>
      <WelcomeComponent />
      <PokemonContainer />
    </div>
  );
}

/*<SearchTermContext.Provider value={{ input, onChange: setInput }}>

      </SearchTermContext.Provider>
*/

export default Content;
