const { AuthenticationError } = require('apollo-server-express');
const User = require('../schema/user').User;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAllUsers: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Unauthorized!')
      }
      try {
        console.log('context.user', context.user);
        return User.find().sort({date: -1});
      } catch (e) {
        console.error(e);
      }
      return [];
    }
  },
};

module.exports = resolvers;
