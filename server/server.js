
const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const typeDefs = require('./models/graphql/typedefs');
const resolvers = require('./models/graphql/resolvers');
const configureMongoose = require('./config/mongoose');
const setupApp = require('./app');

const HTTP_PORT = 5000;

async function startExpressAndApolloServers(app) {
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({ typeDefs,
                                          resolvers,
                                          plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]});
  console.log('waiting on apollo');
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  console.log('apolloServer.graphqlPath', apolloServer.graphqlPath);

  setupApp(app);

  httpServer.on('listening', () => {
    console.log(`Listening on port ${HTTP_PORT}`);
    console.log('GraphQL on', `http://localhost:${HTTP_PORT}${apolloServer.graphqlPath}`);
  });
  httpServer.on('error', e => {
      console.error(e);
  });
  await httpServer.listen(HTTP_PORT);
}



configureMongoose();
startExpressAndApolloServers(app);
