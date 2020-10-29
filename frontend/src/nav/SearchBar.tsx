import { FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from '@material-ui/core';
import React from 'react';
import './../css/Responsive.css';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  searchBar: {
    color: "white",
    backgroundColor: "teal",
    padding: "0.5rem",
  },
}));

function SearchBar() {
  const classes = useStyles();
  return (
    <div className={classes.searchBar}>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Search Pokébase..." fullWidth />
      </form>
    </div>
  );
}

export default SearchBar;