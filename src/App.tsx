import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { GrandTours, Riders } from './components'

import './App.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <p>GraphQL Client</p>
          </header>

          <GrandTours />

          <Riders />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
