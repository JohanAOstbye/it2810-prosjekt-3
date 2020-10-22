import { Typography } from '@material-ui/core';
import React from 'react';
import './css/Responsive.css';
import GenerationCard from './GenerationCard';

function ComponentContainer() {
  return (
    <div className="componentContainer">
      <GenerationCard />
      <GenerationCard />
      <GenerationCard />
      <GenerationCard />
      <GenerationCard />
      <GenerationCard />
      <GenerationCard />
      <GenerationCard />
    </div>
  );
}

export default ComponentContainer;