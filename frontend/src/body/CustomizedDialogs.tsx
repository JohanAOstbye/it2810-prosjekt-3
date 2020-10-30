import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useQuery, gql, NetworkStatus } from "@apollo/client";

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
  
  return <CustomizedDialogs pokemon={data.returnSinglePokemon} />;
};


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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <PokemonCard onClick={handleClickOpen}></PokemonCard>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>{props.pokemon.name}</DialogTitle>
        <DialogContent dividers>
        {props.pokemon.name}{props.pokemon.name}{props.pokemon.name}{props.pokemon.name}
        </DialogContent>
      </Dialog>

    </div>
  );
}




export default SinglePokemonQuery;