const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    getAllUsers: [User!]!
    getAllPosts: [Post!]!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String
    date: String
  }

  type Post {
    _id: ID!
    title: String
    author: User
    body: String
    date: String
  }
`;

module.exports = typeDefs;
