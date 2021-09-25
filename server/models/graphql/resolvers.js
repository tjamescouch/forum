const User = require('../schema/user').User;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAllUsers: async () => {
      try {
        return User.find().sort({date: -1});
      } catch (e) {
        console.error(e);
      }
      return [];
    }
  },
};

module.exports = resolvers;
