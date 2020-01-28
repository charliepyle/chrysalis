import React from 'react';
import FirebaseProvider from './utils/firebase'
import AppContainer from './navigation';

// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})



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