const typeDefs = `#graphql
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  role: String!
  isActive: Boolean!
  createdAt: String!
  updatedAt: String!
}

# Input for registration - client only provides these fields
input RegisterInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
}

type AuthPayload {
  token: String!
  user: User!
}

type Query {
  hello: String!
}

type Mutation {
  register(input: RegisterInput!): AuthPayload!
}
`;

export default typeDefs;