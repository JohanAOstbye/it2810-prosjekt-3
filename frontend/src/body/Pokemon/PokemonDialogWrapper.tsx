import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core";
import React from "react";
import PokemonCard from "./PokemonCard";
import PokemonDialog from "./PokemonDialog";


/* Styles */
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
}));

/* Dialogs */

// PokemonDialogWrapper, returns the PokemonCard-preview, and the dialog when preview is clicked
function PokemonDialogWrapper(props: any) {
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
    <div className={classes.pokemonContainer}>
      <PokemonCard
        onClick={handleClickOpen}
        id={props.id}
        pokemonID={props.pokemonID}
        name={props.name}
        image={props.image}
      />

      <Dialog onClose={handleClose} open={open}>
        <PokemonDialog id={props.id} />
      </Dialog>
    </div>
  );
}


export default PokemonDialogWrapper;
