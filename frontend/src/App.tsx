import React, { useState } from "react";
import Header from "./nav/Header";
import Content from "./body/Content";
import SideBar from "./sidebar/SideBar";
import "./css/Responsive.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";


const client = new ApolloClient({
  uri: "http://localhost:3333/graphql", 
  cache: new InMemoryCache()
});

export default function App() {
  return (
    
    <ApolloProvider client={client}>
      <div className="app">
        <Header />
        <div className="app-content">
          <Content />
          <SideBar />
        </div>
      </div>
    </ApolloProvider>
  );
}






/*
import { configureStore } from '@reduxjs/toolkit'

function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(0)

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter(prevCounter => prevCounter + 1)
  }

  // View: the UI definition
  return (
    <div>
      Value: {counter} <button onClick={increment}>Increment</button>
    </div>
  )
}

const initialState = { value: 0 }

function counterReducer(state = initialState, action:any) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())

store.dispatch({ type: 'counter/increment' })
console.log(store.getState())

const increment = () => {
  return {
    type: 'counter/increment'
  }
}
store.dispatch(increment())
console.log(store.getState())
*/