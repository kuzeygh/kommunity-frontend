/* global window */
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { isServer } from '../utils';

export default new ApolloClient({
  cache: !isServer()
    ? // eslint-disable-next-line no-underscore-dangle
      new InMemoryCache().restore(window.__APOLLO_STATE__)
    : new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development',
  link: new HttpLink({
    fetch,
    // TODO make it work for windows
    // uri: 'http://192.168.99.100:3008/gql',
    // uri: 'https://staging-api.kommunity.app/gql',
    uri: 'http://localhost:3008/gql',
  }),
  ssrMode: isServer(),
});
