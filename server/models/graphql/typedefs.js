const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    getAllUsers: [User!]!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String
    date: String
  }
`;

module.exports = typeDefs;
