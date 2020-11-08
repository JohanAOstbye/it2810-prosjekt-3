import React from "react";
import { AppBar, Button, Divider, List, ListItem, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import ReduxState from "../helperClasses/state";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    color: "white"
  },
  sideBar: {
    margin: "0.5rem",
    display: "flex",
    maxWidth: "12rem"
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

function SideBarList() {
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

function Footer() {
  const classes = useStyles();
  return (
    <Typography className={classes.typographyStyles} >
      Laget av Johan, Sebastian og Christoffer (c)
    </Typography>
  );
}

const SideBar = () => {
  const classes = useStyles();

  const user = useSelector((state: ReduxState) => state.user)
  if (user) {
    console.log("from state", user)
  }
  const dispatch = useDispatch()

  return (
    <AppBar position="static" className={classes.sideBar}>
      <Toolbar className={classes.toolBar}>
        {user ? (
          <div>
            Welcome, {user.username}<br></br>
            <Button
              color="inherit"
              size="large"
              onClick={() => {dispatch({ type: "AUTH_USER", payload: user })}}
              fullWidth>
              Logout
            </Button>
          </div>
        ) : (<Login />)
        }
      <List>
        <Divider />
      </List>
      <Typography className={classes.typographyStyles} variant="h5">
        Links
        </Typography>

      <SideBarList />
      <Footer />
      </Toolbar>
    </AppBar >
  );
}

export default SideBar;
