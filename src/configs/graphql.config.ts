// graphql.config.ts
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PubSub } from "graphql-subscriptions";
import typeDefs from "../graphql/schema/schema";
import resolvers from "../graphql/resolvers/resolvers";

// PubSub for subscriptions
export const pubsub = new PubSub();

// Executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create Apollo Server (v4 - context is NOT passed here)
export const createGraphQLServer = () => {
  return new ApolloServer({
    schema,
    introspection: true,
    // ✅ v4 way to suppress stack traces in production
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== "production",
    // ✅ v4 formatError signature
    formatError: (formattedError, error) => {
      if (process.env.NODE_ENV === "production") {
        return { message: "Something went wrong" };
      }
      return formattedError;
    },
  });
};

export { schema };