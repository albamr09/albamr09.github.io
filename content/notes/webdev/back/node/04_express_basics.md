---
title: HTTP and Express Basics
weight: 4
type: docs
---

## HTTP Basics

### Headers

If we want to provide the metadata about the response we have to provide headers:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>home page</h1>");
  res.end();
});

server.listen(5000);
```

With `writeHead` we specify the headers, in our case we specify the status code (`200: OK`) and the content type of the response (`text/html`). The later are called MIME-types or media types.

Then we specify the body of the response with `write` and finally we finalize the message with `end`.

### Request Object

The request object that is an argument of the `createServer` method has several attributes:

- `req.method`: Allows you to obtain the method of the user's request, i.e. `GET`, `POST`, `PUT`, etc.
- `req.url`: Contains the url of the user's request.

### HTML File

As we have seen the method `write` allows us to define the content of the body as HTML. However we do not need to write the HTML code inside the method we can also pass a file as input and the method will serve it's content to the response.

```javascript
const http = require("http");
const { readFileSync } = require("fs");

const homePage = readFileSync("./index.html");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.write(homePage);
  res.end();
});

server.listen(5000);
```

Observe that we user `readFileSync`, we do so because, for one this is an example, and also the file is only read once when the server is created, not every time the user hits the server.

#### External resources

When adding external resources to a given HTML file we also need to handle the request to those resources in our server.

```javascript
const http = require("http");
const { readFileSync } = require("fs");

const homePage = readFileSync("./index.html");
const homeStyles = readFileSync("./styles.css");
const homeImage = readFileSync("./logo.svg");

const server = http.createServer((req, res) => {
  // home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  }
  // styles
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  }
  // image/logo
  else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
    res.end();
  }
});
```

Note that the content types differ every time, with css we use `text/css`, with images we use `image/svg+xml`.

## Express

### Initializing Express App

In order to do so we import the `express` module, and the we create the instance, more or less like we did with our HTTP servers:

```javascript
const express = require("express");
const app = express();
```

#### App Methods

The `app` instance we just created has several methods, we now list the most common:

- `app.get`: HTTP method to read data.

```javascript
app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});
```

- `app.post`: HTTP method to insert data.
- `app.put`: HTTP method to update data.
- `app.delete`: HTTP method to delete data.
- `app.all`: Usually used to respond when we cannot locate a resource on the server.

```javascript
app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});
```

- `app.use`: It is responsible for the middleware.
- `app.listen`: This method listens for any requests made to the server.

```javascript
app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
```

#### Send HTML files

To send HTML files as a response instead of plain text we have to use the `sendFile` method:

```javascript
const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
```

Now, we have to import the external resources needed by the HTML file:

```javascript
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
```

So we invoke `app.use` as to tell the server that there are static resources stored in the `public` folder.

However, because in this case `index.html` is also a static file we can remove the `sendFile` method if we store `index.html` inside the `public` folder:

```javascript
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./public"));

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
```

## HTTP Methods

### GET

```javascript
app.get("/api/people", (res, req) => {
  res.status(200).json({ success: true, data: people });
});
```

### POST

Observe that we use a middleware provided by `Express` that lets us parse incoming requests with `urlencoded` payload, and another middleware function to parse `json`.

```javascript
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/people", (res, req) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide a name" });
  }

  // Send array of people adding the new person (this is not permanent)
  res.status(201).json({
    success: true,
    data: [...data, { name, id: data.length + 1 }],
  });
});
```

### PUT

```javascript
app.put("/api/people/:id", (res, req) => {
  // De-structure params
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  // The person does not exist
  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: `no person with id: ${id}` });
  }
  // Update the person data
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});
```

### DELETE

```javascript
app.delete("/api/people/:id", (res, req) => {
  // De-structure params
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  // The person does not exist
  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: `no person with id: ${id}` });
  }
  // Filter the person data
  const newPeople = people.filter((person) => person.id !== id);
  res.status(200).json({ success: true, data: newPeople });
});
```

## Routes

### Set Up

In order to set up the routes for our project, we first create a folder called `routes` that will contain all the `javascript` files that control routing functionality. In this example we create two files within `routes`, `people.js` and `auth.js`.

Once we have created them, we include them as middleware to the specific endpoints (`/api/people` for `people.js` and `/login` for `auth.js`), as follows:

```javascript
const express = require("express");
const app = express();

const people = require("./routes/people");
const auth = require("./routes/auth");

app.use("/api/people", people);
app.use("/login", auth);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
```

### Router

Let's focus now on `people.js` than controls the routing of `/api/people`. For that we import the controller of this endpoint and we specify the functions to execute for the different `HTTP` methods and for the different routes.

- `/`: This is the default endpoint `/api/people` there we specify that the logic for a get request is contained in the `getPeople` function.
- `/:d`: This endpoint allows for specifying an id as a parameter.

```javascript
const express = require("express");
const router = express.Router();

const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

router.route("/").get(getPeople).post(createPerson);
router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = router;
```

### Controller

The people controller contains:

```javascript
let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).send({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).send({ success: true, data: [...people, name] });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
};
```

## Route Params

If, for example, we have a list of products, and we want to get a certain product by its id, we use `route params`. They can have any name, and are specified by `:param`. This is then stored in the `request` object.

```javascript
app.get("/api/products/:productID", (req, res) => {
  // De-structure param
  const { productID } = req.params;

  // Filter products by id
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  // If it does not exist
  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist");
  }

  return res.json(singleProduct);
});
```

Note that the `route params` are always strings, in our case we had to convert it to a `Number`. We can also have more that one `route parameter` like so:

```javascript
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  res.send("hello world");
});
```

Where we define `productID` and `reviewID` as route parameters, and can, therefore, filter by them.

## Query Strings

We can use the `query` attribute from the `request` object in order to further filter our data. So whenever the user types `localhost:5000/whateverendpoint?name=john`, the `request` object passed as an argument of the callback defined for `whateverendpoint` will have the object `{name: 'john'}` stored in `request.query`.

```javascript
app.get("/whateverendpoint", (req, res) => {
  console.log(req.query);
});
```

Now we code the way to filter by the keywords `search` and `limit`:

```javascript
app.get("/api/v1/query", (req, res) => {
  // De-structure keys
  const { search, limit } = req.query;
  // Get a copy of the products
  let sortedProducts = [...products];

  // If search was specified
  if (search) {
    // Return only the products whose name start with
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  // If limit was specified
  if (limit) {
    // Return as many products as the limit specified
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  // If no product matched the search
  if (sortedProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] });
  }

  // Return the products filtered
  res.status(200).json(sortedProducts);
});
```

So now, if we go to `localhost:5000/api/v1/query?search=a&limit=2` the server will return a `JSON` object that contains at most 2 products whose name start with an "a".

Observe, that in order to avoid error for sending more than one response (note that we have two `res.json()` in our function), we must add the `return` keyword after sending each response, then the method exits.
