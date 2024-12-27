---
title: Backend
weight: 1
type: docs
---

## Intro

### Difference with APIs

Whenever we use REST APIs and we hit specific endpoints, more often than not, we are going to retrieve some data that we have no use for. This is what is called `overfetching`.

For example when you access `https://my-rest-api/animals` you get an object with a list of animal objects, and you may not need all of the information of every animal.

`GraphQL` solves this problem by:

1. Only having one endpoint.
2. From this endpoint we use the graph query language to select whatever data that we want.

For example, to retrieve the same information stated above:

```graphql
query {
  animals {
    title
    ratings
    img
    price
  }
}
```

Which gets only the specified attributes for each animal.

`GraphQL` also solves `underfetching`, which is the situation where you cannot get enough data with a call to only one endpoint, forcing you to call a second endpoint.

For example, if you want information about the animals and the categories you have to access `https://my-rest-api/animals`, and `https://my-rest-api/categories`, however with `GraphQL`:

```graphql
query {
  animals {
    title
    ratings
    img
    price
  }
  categories {
    id
    title
    img
  }
}
```

## Terminology

### Schema

It defines the data associated with an Entity:

```
type Person {
  id: ID!
  name: String!
  email: String!
  age: Int!
  phone: String
  gender: Boolean!
}
```

That is to say, it defines the type definitions of the data that conforms a given Entity.

### Resolver

The data that we get back is dependent on the resolvers. They are functions that return data that follow a certain schema, it does not need to follow the schema, but then when querying it, it may throw and error.

```
people(parent, args, ctx, info){
  return[
    {
      id: "1",
      name: "Laith",
      email: "email@email.com",
      age: 23,
      phone: "623198135",
      gender: true
    }
  ]
}

```

## GraphQL Server

`GraphQL` supports several languages, and has several servers that do mainly the same. Consult the [official](https://graphql.org/code/#javascript-server) page for the one that suits your needs.

We are going to use `apollo-server` to demonstrate how to use `GraphQL` in a `node.js` application:

So, first, we install the `apollo-server` along with `graphql` dependency with `npm`:

```console
$ npm install apollo-server graphql
```

Now we use `graphql` to define our type definitions:

```javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

```

And we also create our resolvers:

```
const resolvers = {
  Query: {
    books: () => books,
  }
}

```

Where `books` is an already defined array of books.

Finally we create the actual server:

```
const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

```

## Queries TypeDefs and Resolvers

### Data Specification

- Arrays: to define an array on `TypeDefs` or `Queries` you use `[]`.

```
type Book {
  author: [String]
}
```

- Non nullable field: to specify that an attribute cannot be null you use `!`.

```
type Book {
  author: String!
  author: [String]! // the array must not be null
  author: [String!]! // the elements of the array and the array must not be null
}
```

### Queries

- Parameters: on the query object you add an argument between brackets (the `!` specifies the argument must be provided).

```
type Animal {
  id: ID!
  name: String!
  description: [String!]!
}

type Query {
  animals: [Animal!]!
  animal(id: String!): Animal
}
```

On the resolver we use the `arg` parameter to retrieve the parameter passed:

```
const resolvers = {
  Query: {
    animals: () => animals,
    animal: (parent, args, ctx) => {
      let animal = animals.find((animal) => {
        retunr animal.id === args.id
      })
      return animal
    }
  }
}
```

## Relationships

### One To Many

We are now going to illustrate the situation where an animal belongs to only one category whilst a category contains several animals:

```
type Animal {
  id: ID!
  category: Category!
  name: String!
  parameter: String!
}

type Category {
  id: ID!
  name: String!
  animals: [Animal!]!
  parameter: String!
}
```

Where we have stored in our database the id of the category as a foreign key of the `Animal` entity.

In order to query for animals from a category we create a new resolver:

```
const resolvers = {
  Query: {
    animals: () => animals,
    animal: (parent, args, ctx) => {
      let animal = animals.find((animal) => {
        return animal.paramenter === args.id
      })
      return animal
    }
  }
  Category: {
    animals: (parent, args, ctx) => {
      return animals.filter((animal) >= {
        return animal.category == parent.id
      })
    }
  }
}
```

So if we query for:

```
{
  category(parameter: "mammal"){
    category
    animals {
      name
    }
  }
}
```

We get all the names of the animals that are mammals.

The `parent` object symbolizes the object resulting from `category(parameter: "mammal")`, this object will be a `Category` object and will have an `id`, that we will use in our resolver to filter the animals.

Observe that the animals have a attribute called `category`, which is **_not_** the same as the type definition we have made for our `Animal` object, this attribute is defined on the database.

Note that we have created a `Category` resolver that acts as the query resolver but for queries within the `category` object.

We, now, do the same for the animals, meaning we want to get the `Category` object that we specified in the `Animal` object, for that we create a new resolver:

```
Animal: {
  category: (parent, args, ctx) => {
    return categories.find((category) => {
      return category.id === parent.category
    })
  }
}
```

So what we do is go through all of the categories until we find the one that has the same id.

```
{
  animal(parameter: "cat"){
    name
    category {
      name
    }
}
```

And with this query we retrieve the name and the category name of a cat.

## File Structure

What is best practice is to separate the type definitions and the resolvers:

- `TypeDefs`: stored in `schema.js` for example.
- `Resolvers`: stored in a folder called `resolvers`, and then for each `Resolver` we create a file, for example for the `Query` resolver:

```javascript
const Category = {
  animals: (parent, args, { animals }) => {
    return animals.filter((animal) => {
      return animal.category === parent.id;
    });
  },
};

module.exports = Category;
```

Then we create an `index.js` inside the `resolvers` folder where we can import and export all of our `Resolvers` together:

```javascript
const Query = require("./query");
const Category = require("./category");
const Animal = require("./animal");

module.exports = {
  Query,
  Category,
  Animal,
};
```

And we put everything together in our `index.js` inside the root folder:

```javascript
const { ApolloServer } = require("apollo-server");
const { mainCards, animals, categories } = require("./db");
const typeDefs = require("./schema");
const { Query, Category, Animal } = require("./resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Animal,
    Category,
  },
  context: {
    mainCards,
    animals,
    categories,
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`>  Server ready at ${url}`);
});
```

We now use the `context` object in order to make our "database" available to all of the resolvers through `ctx`. (Note that we de-structure the object to the get `animal` object).

## Mutations

### TypeDef

We create the type definition for the `Mutation` object (which is reserved in `GraphQL` to modify/add data, much like the `Query` object). In it, we define all the modifying functions we want, along with the data that must be provided to execute the modification, and also the type of object that is returned.

```typescript
type Mutation {
      addAnimal(
        name: String!
        description: [String!]!
        parameter: String!
        category: String!
      ): Animal
      removeAnimal(id: ID!): Boolean!
  }
```

With this we have defined the `addAnimal` method, which creates and animal by specifying the name, description, URL parameter and the category. This function will return an `Animal` object.

We have also defined the `removeAnimal` method, that only takes an `id` as a parameter and returns a `Boolean`.

### Resolvers

We now define the logic behind both of these methods, so we create a `Mutation.js` file as follows:

```javascript
const { v4 } = require("uuid");

const Mutation = {
  addAnimal: (
    parent,
    { name, description, parameter, category },
    { animals }
  ) => {
    let newAnimal = {
      id: v4(),
      name,
      description,
      parameter,
      category,
    };

    // Only because this is an object: here we would create in the database
    animals.push(newAnimal);

    return newAnimal;
  },

  removeAnimal: (parent, { id }, { animals }) => {
    // Here we would delete in the database
    let index = animals.findIndex((animal) => {
      return animal.id === id;
    });

    animals.splice(index, 1);

    return true;
  },
};

module.exports = Mutation;
```

Note that we de-structure the parameters from the `args` object for readability sake.
