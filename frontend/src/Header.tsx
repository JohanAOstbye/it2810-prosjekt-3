import React from 'react';
import './css/SideBar.css';
import './css/Responsive.css';
import { AppBar, Toolbar, Box, Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


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
  },
  contentContainer: {
  },
  typographyStyles: {
    color: "white",
    fontSize: 100,
  },

}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.headerContainer}>
      <Toolbar>
        <Typography className={classes.typographyStyles}>Pokébase</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
