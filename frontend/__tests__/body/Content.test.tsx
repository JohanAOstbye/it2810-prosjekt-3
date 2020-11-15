import React from 'react';
import { render } from '@testing-library/react';
import Content from '../../src/body/Content';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ReduxState from '../../src/helperClasses/state';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from "../../src/cache/realstyleCache";

describe("Check if text appears", () => {
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

    it("Check if description appears", () => {
        const { getByText } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Content />
                </Provider>
            </ApolloProvider>
            );
        const linkElement = getByText(/Click on a Pokémon to learn more about it. You can also filter by searching for a specific one./i);
        expect(linkElement).toBeInTheDocument();

    })

    it("Check if sort appears", () => {
        const { getByText } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Content />
                </Provider>
            </ApolloProvider>
            );
        const linkElement = getByText(/sort/i);
        expect(linkElement).toBeInTheDocument();

    })

    it("Check if id appears", () => {
        const { getByText } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Content />
                </Provider>
            </ApolloProvider>
            );
        const linkElement = getByText(/id/i);
        expect(linkElement).toBeInTheDocument();

    })

    it("Check if loading appears", () => {
        const { getByText } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Content />
                </Provider>
            </ApolloProvider>
            );
        const linkElement = getByText(/loading/i);
        expect(linkElement).toBeInTheDocument();

    })
})