import React from 'react';
import { render } from '@testing-library/react';
import PokemonList from '../../../body/Pokemon/PokemonList';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ReduxState from '../../../helperClasses/state';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from "../../../cache/realstyleCache";

describe("Check if you get the end at the end of list", () => {
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

    it("Check if the end:( appears", () => {
        const { getByText } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <PokemonList />
                </Provider>
            </ApolloProvider>
            );
        const linkElement = getByText("the end:(");
        expect(linkElement).toBeInTheDocument();

    })
})