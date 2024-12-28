---
title: Database and Authentication
weight: 6
type: docs
---

## MongoDB

### Intro

It is a `NoSQL` which is structured in collections, where each collection would be used to store a particular type of data in the form of documents:

| Blog Collection |
| Blog document |
| Blog document |
| Blog document |

Here each document represent a single item of data, for example, each `Blog document` represents one blog. The data is contained inside the documents in a very similar fashion to `JSON` objects, so the documents consist of key-value pairs like so:

```json
{
"id": ObjectId(12345),
"title": "Opening party",
"snippet": "All about...",
"body": "Lorem ipsum"
}
```

### Set Up

We can either install `MongoDB` locally or we can use a cloud database which is already hosted for us. For the latter we will use [MongoDB Atlas](https://www.mongodb.com/es/cloud/atlas).

There we create a cluster and inside this new cluster we create a new collection called `Blog`.

Then we create a user accessing the `Security -> Database Access` section.

Once we have our user created, we specify a way to connect to the database, by heading to `Clusters -> Connect your application`. We then copy the `Connection String` that we will use as the database `URI`. Observe that this `URI` needs you to input your password.

### Mongoose

Now we need to actually connect to the database, we could use the `MongoDB API` package and use the `MongoDB API`, however we will use `Mongoose` that makes it easier to interact with the database.

`Mongoose` is a `ODM` (Object Document Mapping) library, which means that it maps the standard `MongoDB API` providing a much easier way to connect to and interact with the database.

It does this by allowing us to create simple data models which have query methods to create, get, delete and update database documents.

For that we first have to create a `Schema` for the document which define the structure of a type of data or document. For example:

```
Blog Schema:
    - title(string), required
    - snippet(string), required
    - body(string), required
```

Next, what we do is to create a `Model` based on that `Schema`, the `Model` is what actually allows us to communicate with a particular database collection. Each `Model` has static methods `get`, `save`, `delete`, etc, that allow us to manage the data.

#### Installing

```bash
$ npm install mongoose
```

=== Connect to `MongoDB` ===

So, now, we import the `Mongoose` package and we use our database `URI` to connect to it, remember to change `password` and `cluster_name` to the values you specified for your database.

```javascript
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://user:<password>@test.mongodb.net/<cluster_name>

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
```

The `connect` method is an asynchronous function, so it will execute a callback function when it finished connecting, or an error if the connection failed. In our case, we proceed to start our server when the database is ready.

#### Create Models & Schemas

Once we have successfully connected to our database, we will create our `Blog Schema`. For that, we first create a folder called `models` and inside it we create `blog.js` that will contain the following code:

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
```

As you can see, we first import `mongoose` and the `Schema` object that we use to define the `Blog Schema`.

In order to create a new `Blog Schema` we create a new `Schema` object and we specify the different properties and restrictions. We also set and object of options, where we specify that we want `MongoDB` to save the timestamps of updates, creations, etc.

Next we created a model that is based in the `Schema` we just created with the function `model` and we pass it the `Model` name (this name is then pluralized, as to then look up the collection that matches it) and the `Schema` instance.

### Getting/Saving Data

In order to work we data, we must import the `Model` we just created.

```javascript
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://user:<password>@test.mongodb.net/<cluster_name>

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.get('/blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
```

Here we use the `find` and `findById` methods to interact with our database.

In order to create or delete new `Blogs`:

```javascript
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});
```

In the `POST` method we create a new `Blog` object using the objects from the request body, and then we save it in our database. On the other hand, in order to delete a `Blog` we pass the `id` as a parameter, we search for it on the database and we delete it.

## Mocking MongoDB

### `MongoMemoryServer`

As we have mentioned we need `MongoMemoryServer`, so we install it as a development depencendy. For that we head to our node app's root folder and we execute:

```console
$ npm install mongodb-memory-server-core --save-dev
```

### `Docker`

So, now we create our `Dockerfile`, which holds our app source code, and where we install mongodb:

```dockerfile
FROM alpine:latest
MAINTAINER albamr09

# Install dependencies
RUN apk add --no-cache nodejs npm

# Install mongodb
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb
RUN apk add mongodb-tools
RUN mkdir -p /data/db/
RUN chmod -R 777 /data/db

# Add common user
RUN adduser -D user
#RUN useradd --create-home --shell /bin/bash user

# Create app directory
WORKDIR /home/user/src/
# Change permissions
RUN chown -R user:user /home/user/src/
RUN chmod -R 755 /home/user/src/

USER user

# Copy with user as owner
COPY --chown=user:user ./package*.json ./

# Install app dependencies
RUN npm install

# Copy and override src folder
COPY . .
```

Note that this version of `MongoDB` is `3.4.4`, mainly because we are using the `alpine` image. This version may not coincide with our `MongoDB Docker` image, and is not desirable. So make sure (or force) that you are installing the save versions.

### `MongoMemoryServer` Configuration

Also, we only need to install it for those images that are not supported by `MongoDB`. Furthermore, if instead of the package `mongo-memory-server-core` we install `mongo-memory-server`, the latter will include a `post-install` hook that will install `MongoDB` if it is not already installed on the system.

In case of manually installing `MongoDB` we have to let know `MongoMemoryServer` where the binary lays. So, within our `package.json` file we add:

```json
    "config": {
        "mongodbMemoryServer": {
        "systemBinary": "/usr/bin/mongod",
        "version": "3.4.4"
    }
```

### Example of Usage

We, now, exemplify how to mock our database in our tests:

```javascript
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const mongoose = require('mongoose');

const UserModel = require('../../models/user');

const userData = { 'name': 'test', 'email': 'test@test.com', 'password': 'test1234', 'username': 'testname' };

describe('User Model Tests', ()=> {
    let mongoServer;

    beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).catch(error => console.log(error));
    });

    afterAll(async () => {
        await mongoServer.stop();
        await mongoose.connection.close();
    });

    afterEach(() => {
        mongoose.connection.collections['users'].drop( function() {});
    });

    it('Create a new user', async ()=> {
        const user = new UserModel(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.username).toBe(userData.username);
    })

    it('Create a user with invalid fields', async ()=> {
        var invalidUserData = {...userData};
        delete invalidUserData.email;
        const user = new UserModel(invalidUserData);

        let error;

        try{
            const savedUser = await user.save();
            error = savedUser;
        }catch(err){
            error = err;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.email).toBeDefined();
    })

    it('Create user that already exists', async ()=>{
        await new UserModel(userData).save();

        let error;

        try{
            const repeatedUser = new UserModel(userData);
            await repeatedUser.save();
        }catch(err){
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.code).toBe(11000);
    })

    it('Create user with undefined fields', async ()=>{
        var newUserData = {...userData};
        delete newUserData.name;
        const user = new UserModel(newUserData);
        await user.save();

        expect(user._id).toBeDefined();
        expect(user.name).toBeUndefined();
    })
}
```

## JSON Web Tokens

### Installation

```bash
$ npm install jsonwebtoken
```

### Example of Usage

We first create our `Express` application and so, we import `express` and `jsonwebtoken`. And then we start the server.

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.listen(3000, () => {
  console.log("nodejs app running...");
});
```

Now, we define two new endpoints: `/api` and `/api/login`.

```javascript
app.get("/api", (req, res) => {
  res.json({
    mensaje: "Nodejs and JWT",
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    nombre: "Henry",
    email: "henry@email.com",
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "32s" }, (err, token) => {
    res.json({
      token,
    });
  });
});
```

Where we use the `sign` method to create a new token.

So, if we want to define an endpoint that requires authentication we do:

```javascript
// Middleware
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "Post fue creado",
        authData,
      });
    }
  });
});
```

Where `verifyToken` is a middleware function that gets the token from the header, and then we use the `verify` method to check if the token is valid.
