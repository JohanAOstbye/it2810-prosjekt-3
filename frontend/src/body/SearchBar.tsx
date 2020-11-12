import Filter from './../helperClasses/filter'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReduxState from '../helperClasses/state'
import { FormControl, InputLabel, makeStyles, MenuItem, Select, Switch } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    paddingRight: "0.5rem",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortSelect: {
    margin: "0.5rem",
    flexGrow: 1,
    alignSelf: "flex-end"
  },
  pokedex: {
    margin: "0.5rem",
    flexGrow: 1,
    alignSelf: "flex-start"
  },
  search: {
    margin: "0.5rem",
    flexGrow: 4,
    alignSelf: "center"
  }
});

const SearchBar = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const reduxFilter: Filter = useSelector((state: ReduxState) => state.filter)


  const handleSubmit = (e: any) => {
    let filter: Filter = reduxFilter;
    filter.name = e.target.value.trim();
    // If the user pressed the Enter key:
    if (e.which === 13) {
      console.log(filter.name)
      // Dispatch the "todo added" action with this name
      dispatch({ type: 'CHANGE_FILTER', payload: filter })
      // And clear out the name input
      setName('')
    }
  }

  const user = useSelector((state: ReduxState) => state.user)

  const [orderby, setOrderby] = useState("pokemonID");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const filter = { ...reduxFilter, orderby }
    dispatch({ type: 'CHANGE_FILTER', payload: filter });
  }, [orderby])

  useEffect(() => {
    dispatch({ type: 'SHOW_POKEDEX', payload: { show: show } });
  }, [show])

  const handleOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrderby(event.target.value as string)
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShow(event.target.checked)
  }
  return (
    <div className={classes.container}>
      {user ? (<span className={classes.pokedex}><Switch
        checked={show}
        onChange={handleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> Show your pokedex </span>) : (<div className={classes.pokedex}/>)}
      <input
        className={classes.search}
        data-testid = "searchbar"
        type="name"
        placeholder="Search Pokébase..."
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => handleSubmit(e)}
      />
      <FormControl variant="filled" className={classes.sortSelect}>
        <InputLabel id="sortingLabel">Sort</InputLabel>
        <Select
          value={orderby}
          onChange={handleOrder}
          autoWidth
          labelId="sortingLabel"
        >
          <MenuItem value={"pokemonID"}>Id</MenuItem>
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"base_experience"}>Experience</MenuItem>
          <MenuItem value={"weight"}>Weight</MenuItem>
          <MenuItem value={"height"}>Height</MenuItem>
        </Select>
      </FormControl>
    </div >
  )
}

export default SearchBar;