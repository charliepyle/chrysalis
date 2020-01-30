import React from 'react';
import FirebaseProvider from './utils/firebase'
import AppContainer from './navigation';

// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
    /* add below if we need authToken to communicate with server */
    // connectionParams: {
    //   authToken: localStorage.getItem(AUTH_TOKEN),
    // }
  }
})

// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)


const cache = new InMemoryCache({ addTypename: false });

const client = new ApolloClient({
  link,
  cache,
  resolvers: {}
})

// structure of cache that will be used in app globally
const data = {
  currentUser: {
    id: 'asdf',
    email: 'asdf',
    firstName: 'asdf',
    lastName: 'asdf',
  },
}


cache.writeData({ 
  data
});
client.onResetStore(() => cache.writeData({ data }));


// firebase provider is a global container around the app to provide global vars
// app container is pulled from the navigation folder, that folder first looks 
// at index.js. check there for further detail.
export default function App() {
  return (
    <ApolloProvider client={client}>
      <FirebaseProvider >
        <AppContainer />
      </FirebaseProvider>
    </ApolloProvider>
  );
}