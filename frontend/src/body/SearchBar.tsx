import Filter from './../helperClasses/filter'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReduxState from '../helperClasses/state'
import { InputLabel, makeStyles, MenuItem, Select, Switch } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "row"
  },
  sortSelect: {
    alignSelf: "flex-end"
  },
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

  useEffect(()=>{
    const filter = {...reduxFilter, orderby}
    dispatch({ type: 'CHANGE_FILTER', payload: filter });
  },[orderby])

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
      <input
        type="name"
        placeholder="Search Pokébase..."
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => handleSubmit(e)}
      />
      {user ? (<span> Show your pokedex <Switch
        checked={show}
        onChange={handleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /></span>) : (null)}
      <InputLabel id="sortingLabel">Sort</InputLabel>
      <Select
        value={orderby}
        onChange={handleOrder}
        className={classes.sortSelect}
        autoWidth
        labelId="sortingLabel"
      >
        <MenuItem value={"pokemonID"}>Id</MenuItem>
        <MenuItem value={"name"}>Name</MenuItem>
        <MenuItem value={"base_experience"}>Experience</MenuItem>
        <MenuItem value={"weight"}>Weight</MenuItem>
        <MenuItem value={"height"}>Height</MenuItem>
      </Select>
    </div>
  )
}

export default SearchBar;