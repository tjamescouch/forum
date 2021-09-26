const { AuthenticationError } = require('apollo-server-express');
const User = require('../schema/user').User;
const Post = require('../schema/post').Post;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAllUsers: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Unauthorized!')
      }
      //console.log('context.user', context.user);
      return User.find().sort({date: -1}).exec();
    },
    getAllPosts: async (parent, args, context, info) => {
      return Post.find().sort({date: -1}).populate('author', '-password -email').exec();
    }
  },
};

module.exports = resolvers;
