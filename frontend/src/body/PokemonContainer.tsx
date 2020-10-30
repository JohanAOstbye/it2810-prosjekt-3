import React, { Component, useState } from "react";
import "./../css/Responsive.css";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";

/* Styles */

//Styles for PokemonCard and PokemonContainer
const useStyles = makeStyles(() => ({
  pokemonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: "1rem",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  pokemonCard: {
    padding: "1rem",
    margin: "0.25rem",
    width: "10rem",
    height: "15rem",
    backgroundColor: "lightgoldenrodyellow",
    border: "0.2rem black solid",
  },
}));

// Styles for CustomizedDialog
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


/* Queries */

//Return all pokemon
const RETURN_ALL_POKEMON = gql`
  query {
    returnAllPokemon {
      id
      pokemonID
      name
      image
    }
  }
`;


/* Components */

// Container which returns PokemonCards
function PokemonContainer() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(RETURN_ALL_POKEMON); // all pokemon

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;

  console.log(data.returnAllPokemon[0]);

  return (
    <div className={classes.pokemonContainer} >
      {data.returnAllPokemon.map(({id, pokemonID, name, image})=>(
        <CustomizedDialog id={id} pokemonID={pokemonID} name={name} image={image}/>
      ))}
    </div>
  );
}

// PokemonCard, returns a pokemon-preview 
function PokemonCard(props) {
  const classes = useStyles();

  return(
  <div className={classes.pokemonCard}>
    <div>
      <Typography variant="h6">
        ID: {props.pokemonID}
        <br />
        Name: {props.name}
        <br />
      </Typography>
    </div>
    <img src={props.image} width="150px" />
  </div>);
}

// DialogTitle, returns a Custom Title
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <div>x</div>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

// DialogContent, returns a Custom Dialog to pop up
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// CustomizedDialog, returns the PokemonCard-preview, and the dialog when preview is clicked
function CustomizedDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("CLICKED!");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <PokemonCard id={props.id} pokemonID={props.pokemonID} name={props.name} image={props.image} />
      </div>
      
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>{props.id}</DialogTitle>
        <DialogContent dividers>
        {props.name}{props.id}{props.name}{props.name}{props.name}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PokemonContainer;







/* UNUSED */


/* Queries */

const GET_SINGLE_POKEMON = gql`
query ($id: String!){
  returnSinglePokemon(id: $id) {
    id
    name
  }
}
`;
function SinglePokemonQuery() {
  const { loading, error, data } = useQuery(
    GET_SINGLE_POKEMON,
    {
      variables: { id:"5f9b1c6c54664429f472fae0" }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;
  
  return <CustomizedDialog pokemon={data.returnSinglePokemon} />;
};


/* Show All Pokemon Component */
/*
function Pokemon() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(RETURN_ALL_POKEMON); // all pokemon

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;

  return (
    <div className={classes.pokemonCardContainer} >
      {data.returnAllPokemon.map(({ id, pokemonID, name, image }) => (
        <div className={classes.pokemonCard}>
          <div>
            <Typography variant="h6">
              ID: {pokemonID}
              <br />
              Name: {name}
              <br />
            </Typography>
          </div>
          <img src={image} width="150px" />
        </div>
      ))}
    </div>
  );
*/


/*{data.returnAllPokemon.map(({ id, pokemonID, name, image }) => (
}<PokemonCard pokemon={data.returnAllPokemon}/> 
        
      ))}*/