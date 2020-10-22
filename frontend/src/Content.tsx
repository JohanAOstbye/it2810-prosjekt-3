import React from 'react';
import './css/Responsive.css';
import SearchBar from './SearchBar';
import ComponentContainer from './ComponentContainer';
import Component from './Component';
import GenerationCard from './GenerationCard';


function Content() {
  return (
    <div className="content">
      <SearchBar />
      <ComponentContainer />
    </div>
  );
}

export default Content;