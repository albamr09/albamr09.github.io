---
title: Core Concepts and Patterns
weight: 2
type: docs
---

## Event Loop

It is what allows `Node.js` to perform non-blocking I/O operations, despite the fact that `JavaScript` is single-threaded- by offloading operations to the system kernel whenever possible.

The `Event Loop` follows the next steps:

1. An asynchronous request is made by a user
2. The `Event Loop` registers the callback of the request
3. When the request is completed and we are ready to execute the callback the `Event Loop` stores the callback at the end of the execution line, meaning, once the immediate tasks are done (i.e. synchronous code) the callback is executed

For example, we have the following code:

```javascript
const { readFile, writeFile } = require("fs");

console.log("started a first task");
readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log("completed first task");
});
console.log("starting next task");
```

Which outputs:

```bash
started first task
starting next task
Hello this is first text file
Completed first task
```

So we can see that the synchronous code is run first, and then the callback of the asynchronous function `readFile` is called upon finishing reading the file. In the next example:

```javascript
// started operating system process
console.log("first");
setTimeout(() => {
  console.log("second");
}, 0);
console.log("third");
// completed and exited operating system process
```

Which outputs:

```bash
first
third
second
```

So even though the timeout is initialized to 0, because it is an asynchronous function it is offloaded and so it is put to the end of the execution line, and then it is executed after the synchronous code. It is important to note that the listen function of the `http` module is also asynchronous.

## Asynchronous Patterns

### Blocking Code

Imagine we have the following piece of code:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home Page");
  }
  if (req.url === "/about") {
    // blocking code
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i} ${j}`);
      }
    }
    res.end("About Page");
  }
  res.end("Error Page");
});

server.listen(5000, () => {
  console.log("Server listening on port : 5000....");
});
```

Because inside the second conditional we have a nested for loop which is computationally expensive, when a user accesses the `about` page, the server is blocked, and so it prevents other users from loading any other page. That is essentially because `JavaScript` is single threaded, so by running the nested conditional, the thread is occupied for a period of time, during which the server will not be able to answer to any other request until it is freed.

### Promises

A `Promise` is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. So, we can wrap the asynchronous `readFile` function with a `Promise`:

```javascript
const { readFile, writeFile } = require("fs");

const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
```

The result of a `Promise` can be accessed as follows:

```javascript
getText("./content/first.txt")
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

And then, we can define an asynchronous function `start` that will wait for the execution of `getText`:

```javascript
const start = async () => {
  try {
    const first = await getText("./content/first.txt");
    const second = await getText("./content/second.txt");
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};
```

Where you can see that we surround the call with a `try-catch` statement, which allows us to have more control over the execution flow

### Node's Native Promises

We can use the `utils` module in order to wrap functions with the `Promise` object:

```javascript
const { readFile, writeFile } = require("fs");
const util = require("util");
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

const start = async () => {
  try {
    const first = await readFilePromise("./content/first.txt", "utf8");
    const second = await readFilePromise("./content/second.txt", "utf8");
    await writeFilePromise(
      "./content/result-mind-grenade.txt",
      `THIS IS AWESOME : ${first} ${second}`,
      { flag: "a" }
    );
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};
```

But, we can also avoid importing the `utils` module, by adding `.promises` when importing the asynchronous functions:

```javascript
const { readFile, writeFile } = require("fs").promises;

const start = async () => {
  try {
    const first = await readFile("./content/first.txt", "utf8");
    const second = await readFile("./content/second.txt", "utf8");
    await writeFile(
      "./content/result-mind-grenade.txt",
      `THIS IS AWESOME : ${first} ${second}`,
      { flag: "a" }
    );
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};

start();
```

## Events

### Event Emitter

All objects which emit events are instances of `EventEmitter`, which is accessible from the `events` module:

```javascript
const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("response", () => {
  console.log("some other logic here");
});

customEmitter.emit("response");
```

Here we can see that we create an `EventEmitter` object and we listen for the `response` event with `customEmitter.on()`. The latter function takes the name of the event as its first argument and the callback as its second. In order to emit a concrete event we use `customEmitter.emit()`, which takes the event name as its argument.

#### More Listeners

We can have more than one listener:

```javascript
const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("response", (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`);
});

customEmitter.on("response", () => {
  console.log("some other logic here");
});

customEmitter.emit("response", "john", 34);
```

Where the second listener define a callback that takes `name` and `id` as arguments. So when emitting the event we can pass those arguments to the `emit` function.

Take into account that the functions' order matter, if you emit and event before you listen for it, the event will never be registered.

### HTTP Events

Because `http.Server` extends `net.Server` which then extends `EventEmitter`, we can use the methods discussed above. So we can listen for the event `request` to handle requests from the browser.

```javascript
const http = require("http");

// Using Event Emitter API
const server = http.createServer();
// emits request event
// subcribe to it / listen for it / respond to it
server.on("request", (req, res) => {
  res.end("Welcome");
});

server.listen(5000);
```

## Streams

### Streams on the Web

When reading and writing files on servers, it is highly advisable to use chunks instead of the hole file, like so:

```javascript
var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    const text = fs.readFileSync("./content/big.txt", "utf8");
    res.end(text);
  })
  .listen(5000);
```

Instead of this approach, we use streams, both for reading and for writing:

```javascript
var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    const fileStream = fs.createReadStream("./content/big.txt", "utf8");
    fileStream.on("open", () => {
      fileStream.pipe(res);
    });
    fileStream.on("error", (err) => {
      res.end(err);
    });
  })
  .listen(5000);
```

Here, we see that we use the `on` method to listen for the `open` event. And then, we use `pipe` to write on the stream.
