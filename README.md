# Prosjekt 3 - Pokébase

## How to run

### Windows

1. Make sure you have [Node.js](https://nodejs.org/en/) installed.
2. Clone this repository into your desired file-path with 
```
$ git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-29/prosjekt-3.git
```
3. Open a terminal to start the backend  
    a. Navigate to `./backend`  
    b. Install dependencies  
    ```
    $ npm i
    ```
    c. Start server with:
    ```
    $ npm run build-ts
    $ npm start
    ```
4. Open a terminal to run the frontend  
    a. Navigate to `./frontend`  
    b. Install dependencies   
    ```
    $ npm i
    ```
    c. Run locally with:  
    ```
    $ npm start
    ```

Step 3b and 4b are only required the first time you run the app.

## Technology

### Backend 

A tech-stack with
- GraphQL, implemented in Typescript (TypeGraphQL)
- MongoDB
    - with mongoose (typegoose)
- Apollo
    - with Express

Most of us were familiear with REST API, but because of our previous troubles with this we went with graphQ. We saw this as a modern solution.

We chose MongoDB because we wanted a noSQL database, aswell as it provides us with tons of documentation and libraries.

#### Queries and API
Our API is defined with the GraphQL schema in `./backend/schema.qgl`. Here, the queries, mutations and the arguments you can or must pass are defined.
An example:

In "The Pokemon Model":
`returnAllPokemon(data: ConnectionArgs!, filter: PokemonFilter!, orderby: String!): PokemonResponse!`

The query:
```
query returnAllPokemon($orderby: String!, $after: String, $name: String!, $maxPokemonId: Int!, $minPokemonId: Int!) {
    returnAllPokemon(
      orderby: $orderby
      filter: { name: $name, maxPokemonId:$maxPokemonId, minPokemonId:$minPokemonId }
      data: { first: 20, after: $after }
    ) {
      edges {
        cursor
        node {
          id
          pokemonID
          name
          image
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
```

There are numerous more, however this is the one used most frequently when fetching the filtered data.

### Frontend

A tech-stack with
- React, initialized with `create-react-app`, implemented in Typescript. 
- Redux
- Material-UI
- ApolloClient

We chose to use Material-UI for their intuitive to understand and well-documented libraries of components, and are very happy with our choice.

We chose Redux over MobX mostly because our group wanted to learn it, because it is used professionally by a lot of companies.

#### Content
Pokébase(tm) is a single page application(SPA) where users can browse pokemon from all (8) generations. If they decide to register, they can log in and see their own personalized pokédex.

#### Search, filter and sorting
The user is able to search for their favorite pokémon, and sort by a number of different parameters. They can also view all or certain generations of pokémon.

#### Detail on pokemon
The user can click on any pokémon and see all data on it, they can also see our own ID of the pokemon if they wish to see more of the hidden data, listed only in MongoDB.

#### Responsive web design
The app is responsive in a way that ensures the number of pokémon presented is always proportional to the size of the users viewport/screen size.

### Testing

#### End-to-end (Cypress)
((Fill in here))

#### Jest (Unit testing)
We used Jest and React Testing library for our unit tests. React testing library lets ut test the individual react components. We have a number of unit tests that checks if the website has the correct textual output in a lot of cases, and if the site displays the loading screens before something is loaded. We also have tests on if the searchbar works correctly, and some more complicated tests that checks the register/login feature.

## File Structure

The app is divided into smaller components each with a single, or few, core task(s).

```
/backend
    /src
        /config/default.json
        /entities
            Pokemon.ts
            PokemonStats.ts
            User.ts
        /resolvers
            /types
                Pokemon-input.ts
                PokemonStat-input.ts
                User-input.ts
            Pokemon.ts
            User.ts
        /utils
            ConnectionArgs.ts
            Paginated-Response.ts
        data.ts
        server.ts
        types.ts
    package-lock.json
    package.json
    schema.qgl
    tsconfig.json
/frontend
    /__tests__
        App.test.tsx
    /cypress
        /plugins
            cy-ts-preprocessor.js
            index.js
        tsconfig.json
    /public/index.html
    /src
        /actions/types.ts
        /body
            /pokemon
                DenseTable.tsx
                Pokedex.tsx
                PokemonCard.tsx
                PokemonDialog.tsx
                PokemonDialogWrapper.tsx
                PokemonList.tsx
                PokemonPageination.tsx
            Content.tsx
            SearchBar.Tsx
            WelcomeComponent.tsx
        /cache/realstuleCache.ts
        /helperClasses
            filter.ts
            state.ts
            user.ts
        /nav
            Header.tsx
            SearchBar.tsx
        /populateDB
            PopulateDB.tsx
            pokemonReducer.ts
        /reducers
            filterReducer.ts
            index.ts
            pokedexReducer.ts
            userReducer.ts
        /sidebar
            Login.tsx
            SideBar.tsx
        App.tsx
        index.css
        index.tsx
        react-app-env.d.ts
        serviceWorker.ts
        setupTests.ts
        store.ts
        theme.js
    package-lock.json
    package.json
    tsconfig.json
    yarn.lock
README.md
```


### References

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
