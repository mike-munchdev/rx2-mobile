import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { useServerInfo } from '../hooks/serverInfo';

import { GET_CUSTOMER_CLIENT, GET_CLIENT_INFO } from './queries/localState';

export default (token: string): ApolloClient<any> => {
  const [httpLinkUri, wsLinkUri] = useServerInfo();

  // Create an http link:
  const httpLink = new HttpLink({
    uri: `${httpLinkUri}/graphql`,
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `${wsLinkUri}/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        'x-auth': token,
      },
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'x-auth': token,
      },
    };
  });
  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  const cache = new InMemoryCache();

  cache.writeQuery({
    query: GET_CLIENT_INFO,
    data: {
      clientInfo: {
        isLoggedIn: false,
        token: null,
        customer: null,
      },
    },
  });

  return new ApolloClient({
    link: authLink.concat(link),
    cache,
    resolvers: {},
  });
};
