import Filter from './../helperClasses/filter'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const SearchBar = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: any) => {
    let filter: Filter = new Filter();
    filter.name = e.target.value.trim();
    // If the user pressed the Enter key:
    if (e.which === 13 && filter.name) {
      // Dispatch the "todo added" action with this name
      dispatch({ type: 'CHANGE_FILTER', payload: filter })
      // And clear out the name input
      setName('')
    }
  }

  return (
    <input
      type="name"
      placeholder="Search Pokébase..."
      autoFocus={true}
      value={name}
      onChange={(e) => setName(e.target.value)}
      onKeyDown={(e) => handleSubmit(e)}
    />
  )
}

export default SearchBar;