import React from "react";
import { makeStyles } from "@mui/styles";

import {
  Typography,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    color: "white",
  },
  subHeader: {
  /*display: "flex",
    flexDirection: "row",
    width: "100%"*/
    padding: "0.5rem",
    textAlign: "center",
  },
  subHeaderText: {
    //flexGrow: 1
  },
}));

export default function WelcomeComponent() {
    const classes = useStyles();
    return (
      <div className={classes.subHeader}>
        <Typography variant="h4" className={classes.subHeaderText} >
          Click on a Pokémon to learn more about it. You can also filter by searching for a specific one.
        </Typography>
      </div>
    );
  }