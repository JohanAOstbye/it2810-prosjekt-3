import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const SearchBar = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e: any) => setText(e.target.value);

  const handleSubmit = (e: any) => {
    const text = e.target.value.trim()
    // If the user pressed the Enter key:
    if (e.which === 13 && text) {
      // Dispatch the "todo added" action with this text
      dispatch({ type: 'CHANGE_TERM', payload: text })
      // And clear out the text input
      setText('')
    }
  }

  return (
    <input
      type="text"
      placeholder="Search Pokébase..."
      autoFocus={true}
      value={text}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  )
}

export default SearchBar;