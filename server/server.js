
const express = require('express');
const passport = require('passport');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const typeDefs = require('./models/graphql/typedefs');
const resolvers = require('./models/graphql/resolvers');
const configureMongoose = require('./config/mongoose');
const setupApp = require('./app');

const HTTP_PORT = 5000;
const GRAPHQL_PATH = '/graphql';

async function startExpressAndApolloServers(app) {
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({ typeDefs,
                                          resolvers,
                                          context: async ({ req }) => {
                                            return {
                                              user: req.user
                                            };
                                          },
                                          plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]});
  console.log('waiting on apollo');
  await apolloServer.start();

  setupApp(app);
  app.use(GRAPHQL_PATH, (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (user) {
        req.user = user
      }

      next()
    })(req, res, next)
  })

  apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH });
  console.log('apolloServer.graphqlPath', apolloServer.graphqlPath);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.send('error');
  });


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
