import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { registerGqlTag } from 'apollo-client/gql'
import { ApolloProvider } from 'react-apollo'

import './style.css'

// Globally register gql template literal tag
registerGqlTag()

const networkInterface =
  createNetworkInterface('https://api.graph.cool/simple/v1/__PROJECT_ID__')

const client = new ApolloClient({
  networkInterface,
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
