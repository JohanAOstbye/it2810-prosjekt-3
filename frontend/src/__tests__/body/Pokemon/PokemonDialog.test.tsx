import React from 'react';
import { render } from '@testing-library/react';
import PokemonDialog from '../../../body/Pokemon/PokemonDialog';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ReduxState from '../../../helperClasses/state';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from "../../../cache/realstyleCache";

describe("Check loading pokemondialog", () => {
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

    it("Check if loading... appears", () => {
        const { getByText } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <PokemonDialog />
                </Provider>
            </ApolloProvider>
            );
        const linkElement = getByText(/Loading.../i);
        expect(linkElement).toBeInTheDocument();

    })
})