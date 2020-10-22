import React from "react";
import './css/SideBar.css';
import './css/Responsive.css';
import { AppBar, Box, Button, Container, List, ListItem, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

function Footer_OLD() {
  return (
    <div className="sideBar">
      <div className="sideBar-content">
        <Container>
          <Box my={4}>
            <Typography color="primary" variant="h5">
              Laget av Johan, Sebastian og Christoffer
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
}

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
  }
}));

const SideBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.sideBar}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.typographyStyles} variant="h3">
          Links
        </Typography>
        <Typography>
          <List>
            <ListItem>1</ListItem>
            <ListItem>2</ListItem>
            <ListItem>3</ListItem>
          </List>
        </Typography>
        <Typography className={classes.typographyStyles} variant="h5">
          Laget av Johan, Sebastian og Christoffer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default SideBar;
