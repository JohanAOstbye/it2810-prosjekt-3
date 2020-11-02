import React from "react";
import WelcomeComponent from "./WelcomeComponent";
import PokemonContainer from "./PokemonContainer";
import "./../css/Responsive.css";

function Content() {
  return (
    <div className="content">
      <WelcomeComponent />
      <PokemonContainer />
    </div>
  );
}


export default Content;
