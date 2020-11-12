import React from 'react';
import { render } from '@testing-library/react';
import SideBar from './../../src/sidebar/SideBar';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ReduxState from './../../src/helperClasses/state';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from "./../../src/cache/realstyleCache";

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

    it("Category 1 exists", () => {
        const { getByText } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <SideBar />
                </Provider>
            </ApolloProvider>
            );
        const linkElement = getByText(/Generation 1/i);
        expect(linkElement).toBeInTheDocument();

    })

    it("Categories exists", () => {
        const { getByText } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <SideBar />
                </Provider>
            </ApolloProvider>
            );
        const linkElement = getByText(/All Generations/i);
        expect(linkElement).toBeInTheDocument();

    })

})