import React from 'react';
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  headerContainer: {
    minHeight: "8vh",
    padding: "0"
  },
  contentContainer: {
  },
  typographyStyles: {
    color: "white",
    fontSize: 60,
    flexGrow: 1
  },
  toolBarStyles: {
    display: "flex",
    flexDirection: "row"
  }

}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.headerContainer} color="primary" color-variant="dark">
      <Toolbar className={classes.toolBarStyles}>
        <Typography className={classes.typographyStyles}>Pokébase</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
