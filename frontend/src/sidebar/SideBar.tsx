import React from "react";
import { AppBar, List, ListItem, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    color: "white"
  },
  sideBar: {
    margin: "0.5rem",
    display: "flex",
    maxWidth: "10rem"
  },
  toolBar: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "1rem",
    padding: "0.5rem"
  },
  sideBarList: {
    color: "yellow",
    flexGrow: 1,
  }
}));

function SideBarList(){
  const classes = useStyles();
  return (
    <div className={classes.sideBarList}>
      <List>
        <ListItem>All Pokémon</ListItem>
        <ListItem>Generation 1</ListItem>
        <ListItem>Generation 2</ListItem>
        <ListItem>Generation 3</ListItem>
      </List>
      <List>
        <ListItem>PokeAPI</ListItem>
      </List>
    </div>
  );
}

function Footer(){
  const classes = useStyles();
  return (
    <Typography className={classes.typographyStyles} >
      Laget av Johan, Sebastian og Christoffer (c)
    </Typography>
  );
}

const SideBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.sideBar}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.typographyStyles} variant="h5">
          Links
        </Typography>

        <SideBarList/>
        <Footer/>
      </Toolbar>
    </AppBar>
  );
}

export default SideBar;
