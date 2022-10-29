const { gql } = require('apollo-server');
const { addThirdPartySingularForm } = require('./servicelayer');

const typeDefs = gql`

type Tenses {
  id: Int
  present: String,
  past: String,
  future: String
}


type Query {
  getTenses(value: String): Tenses,
  addVerbForms(value: String): Boolean
}
  `;

const resolvers = {
    Query: {
      getTenses: (obj, {value}, context, info) => ({ id: 1, present: `I was ${value}`, past: `I was ${value}ed`, future: `I will ${value}`}),
      addVerbForms: (obj, {value}, context, info) => {
        console.log('value ', value);
        return addThirdPartySingularForm(value)
      }
    },
  };


  const { ApolloServer } = require('apollo-server');
  const server = new ApolloServer({ typeDefs, resolvers });
  server
  .listen({ port: 9000, url: '/testql' })
  .then(serverInfo => console.log(`Server running at ${serverInfo.url}`));
