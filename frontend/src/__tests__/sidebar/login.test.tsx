import React from 'react';
import { act, render } from '@testing-library/react';
import Login from '../../sidebar/Login';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ReduxState from '../../helperClasses/state';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from "../../cache/realstyleCache";

describe("Login component", () => {
    const initialState = new ReduxState();
    const mockStore = configureStore()
    let store: any;

    const client = new ApolloClient({
        uri: "http://localhost:3333/graphql",
        cache: cache
    });

    beforeEach(() => {
        store = mockStore(initialState)
        act(() => {
            render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Login />
                </Provider>
            </ApolloProvider>
            );
        });
    })

    it("Input for username exist", () => {
        const usernameInput = document.querySelector("#username")
        expect(usernameInput?.id).toBe("username")
    })
})
