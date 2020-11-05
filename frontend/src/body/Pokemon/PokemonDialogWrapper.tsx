import React from "react";
import PokemonCard from "./PokemonCard";
import PokemonDialog from "./PokemonDialog";

/* Dialogs */

// PokemonDialogWrapper, returns the PokemonCard-preview, and the dialog when preview is clicked
function PokemonDialogWrapper(props: any) {
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
        <PokemonCard
        onClick={handleClickOpen}
          id={props.id}
          pokemonID={props.pokemonID}
          name={props.name}
          image={props.image}
        />
        <PokemonDialog onClose={handleClose} open={open} id={props.id}/>
    </div>
  );
}


export default PokemonDialogWrapper;
