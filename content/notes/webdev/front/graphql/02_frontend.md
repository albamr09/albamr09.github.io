---
title: Frontend
weight: 2
type: docs
---

## Client

As well as with the server there are several clients for `GraphQL` within different languages and frameworks, visit the [official](https://graphql.org/code/#javascript-client) page to check them out.

We are going to use `Apollo Client` so for that we need to install `apollo` and `graphql` on the client side of our application:

```console
$ npm install @apollo/client graphql
```

In our case we are going to connect our client to `React` ([Reference](https://www.apollographql.com/docs/react/get-started/#3-connect-your-client-to-react)). So, first we import the necessary modules.

```javascript
import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    {" "}
    <App />{" "}
  </ApolloProvider>,
  document.getElementById("root")
);
```

We tell `apollo` that our `GraphQL` server is listening for request on our `localhost` on the port 4000.

Where `apollo` allows us to cache our queries, with the `InMemoryCache` module. That way we do not need to make the same request twice, because the data is cached in memory.

And then, we wrap our app with the `ApolloProvider`, so all of our components have access to our client. Note that we pass our client as a `prop`.

## Fetch Data

### Variables

In order to make a query by passing parameters we do:

```javascript
const ANIMAL_QUERY = gql`
  query ($slug: String!) {
    animal(slug: $slug) {
      title
      image
      stock
      description
      price
    }
  }
`;
```

Where `$string` is the variable we want to pass in, and we specify its type and the fact that it is required with `String!`.

Now to make the query we do:

```javascript
function AnimalPage() {

  const { slug } = useParameters()

  const { loading, data, error } = useQuery(
    variables: {
      slug: 'cat'
    }
  )
}
```

With `variables` we pass in all of the parameters needed in the query.

## Mutations

In order to execute a mutation from the client side we create a mutation request:

```javascript
const ADD_ANIMAL_MUTATION = gql`
  mutation (
    $name: String!
    $description: [String!]
    $parameter: String!
    $category: String!
  ) {
    addAnimal(
      name: $name
      description: $description
      parameter: $parameter
      category: $category
    )
  }
`;
```

And now we use the `useMutation` hook to obtain the function that will be called in order to update our animal:

```javascript
import { useMutation, gql } from "@apollo/client";

function Animal() {
  const [addAnimal] = useMutation(ADD_ANIMAL_MUTATION);

  return (
    <div>
      <button
        onClick={() =>
          addAnimal({
            variables: {
              name: "cat",
              description: ["This is a description"],
              parameter: "cat",
              category: "mammal",
            },
          })
        }
      />
    </div>
  );
}
```

With this we get the function `addAnimal` with the `useMutation` hook and we use it in our button, so when it is clicked we add a cat to our animal collection.
