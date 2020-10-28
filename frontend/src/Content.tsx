import React from 'react';
import './css/Responsive.css';
import SearchBar from './SearchBar';
import ComponentContainer from './ComponentContainer';
import Component from './Component';
import GenerationCard from './GenerationCard';
import { Typography } from '@material-ui/core';

function WelcomeComponent(){
  return (
    <div>
      <Typography variant="h2">
        Welcome to the Pokébase site!
      </Typography>
      <Typography variant="h4">
        Search for a Pokémon, or click on a generation to see all from that one.
      </Typography>
    </div>
  );
}

function Content() {
  return (
    <div className="content">
      <WelcomeComponent />
      <ComponentContainer />
    </div>
  );
}

export default Content;