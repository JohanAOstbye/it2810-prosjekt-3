import { FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from '@material-ui/core';
import React from 'react';
import './css/Responsive.css';
import { makeStyles } from "@material-ui/styles";

function SearchBar() {
  return (
    <div className="searchBar">
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Search Pokébase..." fullWidth />
      </form>
    </div>
  );
}

export default SearchBar;