import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { GrandTours, Riders, TourEditions, Header } from './components'

import './App.css'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'UNION',
          name: 'SearchByName',
          possibleTypes: [
            {
              name: 'GrandTour',
            },
            {
              name: 'Rider',
            },
          ],
        },
      ],
    },
  },
})

const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache,
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />

          <GrandTours />

          <Riders />

          <TourEditions />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
