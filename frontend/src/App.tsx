import React, { createContext } from "react";
import Header from "./nav/Header";
import Content from "./body/Content";
import SideBar from "./sidebar/SideBar";
import {
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import { Provider} from "react-redux";
import termReducer from "./reducers/termReducer";
import { createStore } from "redux";
import { cache } from "./cache/realstyleCache";

export const SearchTermContext = createContext(null);
/* Styles */


const store = createStore(termReducer);

const useStyles = makeStyles(() => ({
  app: {
    minHeight: "100vh",
    backgroundColor: "teal",
    display: "flex",
    flexDirection: "column",
  },
  appContent: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  }
}));

const client = new ApolloClient({
  uri: "http://localhost:3333/graphql", 
  cache: cache
});

console.log('Initial State:', store.getState())

const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
)

store.dispatch({
  type: "CHANGE_TERM",
  payload: "lmaooo"
});

store.dispatch({
  type: "CHANGE_TERM",
  payload: "xD"
});

unsubscribe();

export default function App() {
  const classes = useStyles();
  return (
    
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className={classes.app}>
          <Header />
          <div className={classes.appContent}>
            <Content />
            <SideBar />
          </div>
        </div>
      </Provider>
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