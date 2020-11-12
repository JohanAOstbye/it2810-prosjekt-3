import React from 'react';
import { render } from '@testing-library/react';
import PokemonCard from '../../../body/Pokemon/PokemonCard';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ReduxState from '../../../helperClasses/state';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from "../../../cache/realstyleCache";

describe("Check what happens if no props are passed", () => {
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

    it("Check if undefined if noe prop is passed", async () => {

        const setup = () => {
            const utils = render(
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        <PokemonCard />
                    </Provider>
                </ApolloProvider>
                );
            const input = utils.getByTestId('pokemoncard')
            return {
              input,
              ...utils,
            }
          }
      
        const { input } = setup()
        expect(input.alt).toBe('Picture of undefined')
      });
})