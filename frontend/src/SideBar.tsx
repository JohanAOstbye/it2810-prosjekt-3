import React from "react";
import './css/SideBar.css';
import './css/Responsive.css';
import { AppBar, Box, Button, Container, List, ListItem, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    color: "white"
  },
  sideBar: {
    margin: "0.5rem",
    display: "flex",
    maxWidth: "15rem"
  },
  toolBar: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "1rem"
  },
  sideBarList: {
    color: "yellow",
    flexGrow: 1,
  }
}));

function SideBarList(){
  const classes = useStyles();
  return (
    <Typography className={classes.sideBarList}>
      <List>
        <ListItem>All Pokémon</ListItem>
        <ListItem>Generation 1</ListItem>
        <ListItem>Generation 2</ListItem>
        <ListItem>Generation 3</ListItem>
      </List>
      <List>
        <ListItem>PokeAPI</ListItem>
        <ListItem>TEst 2</ListItem>
        <ListItem>Test 3</ListItem>
      </List>
    </Typography>
  );
}

function Footer(){
  const classes = useStyles();
  return (
    <Typography className={classes.typographyStyles} variant="h5">
      Laget av Johan, Sebastian og Christoffer (c)
    </Typography>
  );
}

const SideBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.sideBar}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.typographyStyles} variant="h3">
          Links
        </Typography>

        <SideBarList/>
        <Footer/>
      </Toolbar>
    </AppBar>
  );
}

export default SideBar;
