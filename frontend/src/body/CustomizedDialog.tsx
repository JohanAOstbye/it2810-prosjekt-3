import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import {
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";
import DenseTable from "./DenseTable";


/* Styles */

const useStyles = makeStyles({
  pokemonCard: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    margin: "0.25rem",
    width: "10rem",
    height: "15rem",
    backgroundColor: "#f1f8e9",
    border: "0.2rem black solid",
  },
  pokemonCardImage: {
    marginTop: "auto",
  },
  dialogContent: {
    width: "275px",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContentImage: {
    width: "225px",
    padding: "0.5rem",
    border: "1px solid black",
    borderRadius: "1rem",
  },
});

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

const GET_SINGLE_POKEMON = gql`
query ($id: String!){
  returnSinglePokemon(id: $id) {
    id
    pokemonID
    image
    name
    base_experience
    height
    weight
  }
}
`;


/* Components */

// Returns a DialogPokemon component with the pokemon-parameteres fetched.
function SinglePokemonQuery(props) {
  const { loading, error, data } = useQuery(
    GET_SINGLE_POKEMON,
    {
      variables: { id:props.id }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;
  
  return <DialogPokemon pokemon={data.returnSinglePokemon} />;
};


// PokemonCard, returns a pokemon-preview
function PokemonCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.pokemonCard}>
      <Typography variant="h4">{props.pokemonID}</Typography>
      <Typography variant="h6">{props.name}</Typography>
      <img
        className={classes.pokemonCardImage}
        src={props.image}
        width="150px"
      />
    </div>
  );
}


/* Dialogs */

// CustomizedDialog, returns the PokemonCard-preview, and the dialog when preview is clicked
function CustomizedDialog(props) {
  const classes = useStyles();
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
        <PokemonCard
          id={props.id}
          pokemonID={props.pokemonID}
          name={props.name}
          image={props.image}
        />
      </div>

      <Dialog onClose={handleClose} open={open}>
        <SinglePokemonQuery id={props.id}/>
      </Dialog>
    </div>
  );
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


// createData, helping function to create TableRows
function createData(name: string, value: string) {
  return { name, value };
}

//DialogPokemon, return the fetched pokemon information
function DialogPokemon(props) {
  const classes = useStyles();
  
  const rows = [
    createData("Name", props.pokemon.name),
    createData("Experience", props.pokemon.base_experience),
    createData("Height", props.pokemon.height),
    createData("Weight", props.pokemon.weight),
  ];

  return(
    <div>
      <DialogTitle /*onClose={handleClose}*/>
        Pokédex #{props.pokemon.pokemonID}
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <img className={classes.dialogContentImage} src={props.pokemon.image} />
        <DenseTable rows={rows} />
        <Typography variant="caption">pokébase_id: {props.pokemon.id}</Typography>
      </DialogContent>
    </div>
  );
}

export default CustomizedDialog;
