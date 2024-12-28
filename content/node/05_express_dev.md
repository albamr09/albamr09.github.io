---
title: API Development and Middleware
weight: 5
type: docs
---

## API vs SSR

In `Express` when we talk about `API`s we are talking about `HTTP` interfaces to interact our data.

The main differences between `API`s and Server Side Rendering (`SSR`) are:

|              | API          | SSR            |
| ------------ | ------------ | -------------- |
| Content type | JSON         | Template       |
| What is sent | Send data    | Send template  |
| Method       | `res.json()` | `res.render()` |

## Middleware

### Apply Middleware with `app.use`

In order to apply a certain middleware to all the routes we first save the logger on a separate file named `logger.js`, then we import it into our main app, and we specify its usage as a middleware by `app.use`.

```javascript
const express = require("express");
const logger = require("./logger");
const app = express();

app.use(logger);
```

With this our logger will be executed every time the user accesses our server. We can also specify an argument like so:

```javascript
const express = require("express");
const logger = require("./logger");
const app = express();

app.use("/api/", logger);
```

This tells `Express` to only use the middleware for the `/api` route and all its subdomains (i.e. `/api/*`).

#### Apply Multiple Middleware

We now define a new middleware function, that goes by the name of `authorize.js`, we import it into our `app.js` and we add it as middleware by using an array.

```javascript
const express = require("express");
const logger = require("./logger");
const authorize = require("./authorize");
const app = express();

app.use([logger, authorize]);
```

Note that the order matters, meaning the first middleware executed is `logger`, in this instance, and then the control flow is passed to `authorize`.

We can also define more than one middleware function on one concrete end-point:

```javascript
app.get("/api", [logger, authorize], (req, res) => {
  res.send("API Home Page");
});
```

As we can see, we have specified two middleware functions, namely `logger` and `authorize` by using an array.

#### Example

```javascript
const authorize = (req, res, next) => {
  // De-structure user object
  const { user } = req.query;
  if (user == "alice") {
    req.user = { name: "alice", id: 3 };
    // Yield control flow
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
```

As you can see the `authorize` middleware function creates a new object within the request object, which can be accessed from the next middleware, or from the server.

## JSON

The method `res.json()` allows us to return a array of objects as the body of the `HTTP` response:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json([{ name: "john" }, { name: "susan" }]);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
```

We can also pass a `JSON` file to `res.json()`:

```javascript
const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
```

Where `data.js` contains:

```javascript
const products = [
  {
    id: 1,
    name: "albany sofa",
    image: "product-3.jpg",
    price: 39.95,
    desc: `I'm baby direct trade farm-to-table hell of`,
  },
];

module.exports = products;
```

## View Engines

### EJS

#### Installing

We will use `EJS` in this example. First we download it:

```bash
$ npm install ejs
```

#### Set Up

Now we specify in our application that we want to use it:

```javascript
const express = require("express");
const app = express();

// Specify view engine and settings
app.set("view engine", "ejs");
app.set("views", "./views");
```

We use the function `set()` that is used to specify app settings. There we define `ejs` as our `view engine` and then we indicate that the folder where our views are located is `/views`, which is the default folder. This means we could have omitted that last line and the functionality would remain the same.

#### Rendering

Inside our root folder, we create the folder `views` and the file `index.ejs` which has the same syntax as `HTML`:

```ejs
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Ninja | <%= title %></title>
</head>
<body>

  <div class="blogs content">
    <h2>All Blogs</h2>

    <% if (blogs.length > 0) { %>
      <% blogs.forEach(blog => { %>
        <h3 class="title"><%= blog.title %></h3>
        <p class="snippet"><%= blog.snippet %></p>
      <% }) %>
    <% } else { %>
      <p>There are no blogs to display...</p>
    <% } %>

  </div>
</body>
</html>
```

So in order to send this template as a response we do:

```javascript
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});
```

Note that we define an array of blog objects, and we pass them as an argument to the template. Which then iterates over them to visualize each item.

## Environment Variables

### Installing

In order to pass environment variables, like `MongoDB` credentials, to our app we can use a third party package called `cross-env`:

```bash
$ npm install --save-dev cross-env
```

And then we can pass environment variables as arguments to our node application like so:

```bash
npx cross-env NODE_ENV=development node app.js
```

And the environment variables can be accessed from our app as follows:

```javascript
console.log(process.env.NODE_ENV);
```

### Command

To make it easier we can modify our `package.json` scripts to pass these variables for us:

```JSON
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "dev": "npx cross-env NODE_ENV=development node app"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

And we start the application with:

```bash
$ npm dev
```

### File

Another way to do it is using a `.env` file:

```text
NODE_ENV=development
PORT=3000
HOST=localhost
```

To pass those variables to `Node.js` we use the `eval` command:

```bash
$ eval $(cat .env) node app
```

And we can also include it to `package.json`.

```json
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "dev": "eval $(cat .env) node app"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### `dotenv`

In case of not wanting to use commands that are exclusive to our operative system, we can use the package `dotenv`

```
$ npm install --save-dev dotenv
```

And in our app we do:

```javascript
require("dotenv").config();
```
