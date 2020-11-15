import React, {useState} from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/body/SearchBar';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ReduxState from '../../src/helperClasses/state';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from "../../src/cache/realstyleCache";

describe("SideBar component", () => {
    const initialState = new ReduxState();
    const mockStore = configureStore()
    let store: any;

    const client = new ApolloClient({
        uri: "http://localhost:3333/graphql",
        cache: cache
    });

    beforeEach(() => {
        store = mockStore(initialState)
        
    })

    it("Check if searchbar input works", async () => {

        const setup = () => {
            const utils = render(
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        <SearchBar />
                    </Provider>
                </ApolloProvider>
                );
            const input = utils.getByTestId('searchbar')
            return {
              input,
              ...utils,
            }
          }
      
        const { input } = setup()
        fireEvent.change(input, { target: { value: 'charizard' } })
        expect((input as HTMLInputElement).value).toBe('charizard')
      });

})