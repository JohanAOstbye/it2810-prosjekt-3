import React from "react";
import { AppBar, Button, Divider, List, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import ReduxState from "../helperClasses/state";
import Filter from "../helperClasses/filter";

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
  const dispatch = useDispatch()
  const reduxFilter: Filter = useSelector((state: ReduxState) => state.filter)

  const handleClick = (lower: number, upper: number) => {
    let filter: Filter = reduxFilter;
    filter.pokemonId = { lte: upper, gte: lower }
    dispatch({ type: "CHANGE_FILTER", payload: filter })
  }
  return (
    <div className={classes.sideBarList}>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(1, 898) }}
        fullWidth>
        All Generations
      </Button>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(1, 151) }}
        fullWidth>
        Generation 1
      </Button>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(152, 251) }}
        fullWidth>
        Generation 2
      </Button>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(252, 386) }}
        fullWidth>
        Generation 3
      </Button>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(387, 493) }}
        fullWidth>
        Generation 4
      </Button>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(494, 649) }}
        fullWidth>
        Generation 5
      </Button>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(650, 721) }}
        fullWidth>
        Generation 6
      </Button>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(722, 809) }}
        fullWidth>
        Generation 7
      </Button>
      <Button
        color="inherit"
        size="large"
        onClick={() => { handleClick(810, 898) }}
        fullWidth>
        Generation 8
      </Button>
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
              onClick={() => { dispatch({ type: "AUTH_USER", payload: null }) }}
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
          Generations
        </Typography>

        <SideBarList />
        <Footer />
      </Toolbar>
    </AppBar >
  );
}

export default SideBar;
