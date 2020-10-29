import React from 'react';
import './css/SideBar.css';
import './css/Responsive.css';
import { AppBar, Toolbar, Box, Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchBar from './SearchBar';


const Header_OLD = () => {
  return (
    <div className="sideBar">
      <div className="sideBar-content">
        <Container>
          <Box my={4}>
            <Typography color="primary" variant="h3">
              Pokébase
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  headerContainer: {
    minHeight: "15vh",
    padding: "0"
  },
  contentContainer: {
  },
  typographyStyles: {
    color: "white",
    fontSize: 80,
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
        <SearchBar />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
