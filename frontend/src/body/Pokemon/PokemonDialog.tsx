import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { gql, useLazyQuery} from "@apollo/client";
import theme from "../../theme";
import {
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";
import DenseTable from "../DenseTable";


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

// DialogTitle, returns a Custom Title
function DialogTitle(props: any){
  const { children, onClose, ...other } = props;
  const classes = useStyles();
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
}

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

//PokemonDialog, return the fetched pokemon information
function PokemonDialog(props: any) {
  const classes = useStyles();
  const [ getPokemon, {loading, error, data, called} ] = useLazyQuery(
    GET_SINGLE_POKEMON
  );

  useEffect(()=> {
    getPokemon({
      variables: { id:props.id }
    })
  }, [props.open, getPokemon, props.id])

  if (loading || ! called) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;
  const pokemon = data.returnSinglePokemon
  const rows = [
    createData("Name", pokemon.name),
    createData("Experience", pokemon.base_experience),
    createData("Height", pokemon.height),
    createData("Weight", pokemon.weight),
  ];

  return(
    <Dialog onClose={props.handleClose} open={props.open}>
      <DialogTitle>
        Pokédex #{pokemon.pokemonID}
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <img className={classes.dialogContentImage} src={pokemon.image} alt={"picrute of" + pokemon.name} />
        <DenseTable rows={rows} />
        <Typography variant="caption">pokébase_id: {pokemon.id}</Typography>
      </DialogContent>
    </Dialog>
  );
}

export default PokemonDialog;
