---
title: Basics
weight: 1
type: docs
---

## npm

It is the `Node Package Manager`:

Create `package.json` (manifest) file, with the list of dependencies

```bash
$ npm init
```

Install package locally and add it to package.json, under the keyword "dependencies"

```bash
$ npm install <package name>
```

Install package globally (requires sudo)

```bash
$ npm install -g <package name>
```

Install package only for development

```bash
$ npm install <package name> --save-dev
```

The packages installed with be saved under the file `node_modules`

To install all the dependencies listed in `package.json`, just run:

```bash
$ npm install
```

Where the `package.json` is.

## Create React App

You do not need [create-react-app](https://create-react-app.dev/) to create a `React` app, but it makes it way easier:

```bash

npx create-react-app <app-name>
cd <app-name>
npm start

```

## Babel

`Babel` is a `Javascript` compiler that converts `ES7`, `ES6` to `E5` so it can run smoothly in older browsers. This way we can use new features of `ES7` and `ES6` while maintaining compatibility.

## File Structure

- `node_modules`: folder that contains all of the dependencies
- `package.json`: is the manifest file for the project
  - `scripts`
    - `start`: runs the development server
    - `build`: creates a production version for the project inside a folder called `build`, where the optimized files resulting of the build are stored.

The rest of the files created by `create-react-app` are mostly useless:

- `App.js`
- `App.css`
- `App.test.js`
- `logo.svg`
- `serviceWorker.js`
- `setupTests.js`

Also all of the contents of `index.js` can be removed.

## Start in index.js

Keep in mind, `index.js` is the entry point:

First of all refer to [File Structure](#file-structure), and then basically remove everything from `index.js`, and replace it for:

```javascript
import React from "react";
import ReactDom from "react-dom";

// CSS
import "./index.css";
```

- We use the `ReactDom` module to make use of the `React DOM API`, which let's us render components, etc.

Next we call `ReactDom.render()` to output our `HTML`:

```javascript
import React from "react";
import ReactDom from "react-dom";

// CSS
import "./index.css";

function Component() {
  return <h4> HI! </h4>;
}

ReactDom.render(<Component />, document.getElementbyId("root"));
```

Note

- The function must start with a capital letter
- The tag that encloses the component must be closed, so either: `<Component/>` or `<Component></ Component>`
- We use `document.getElementbyId("root")`, this tells `React` where to place the component inside the `HTML`

## JSX Rules

- Always return something
- Always return a single element or `div`, `section`, `article` or `React.Fragment` (does not create a `div`) enclosing the element
- Use camelCase for `HTML` attribute
- Use `className` instead of `class`
- Close every element

## CSS in JSX

We can define the style inside `JSX`, for that we use the `prop` `style`. The first curly braces takes us back to `javascript`, and the second are to specify the creation of an object.

Also note that we do not write `font-size` but we use the `React` convention of writing `fontSize`

```javascript
const Author = () => <h4 style={{ fontSize: "1px" }}>Test</h4>;
```

This level has higher preference (overrides) than the `CSS` imported from a `CSS` file.

## Props

### Spread operator

Let's define an object `singleBook` that contains all of the book's properties and pass it to the `Book` component:

```javascript
import React from "react";
import ReactDom from "react-dom";

// CSS
import "./index.css";

import Book from "./Book";

const singleBook = {
  title: "Book title",
  author: "Book author",
};

ReactDom.render(
  // Use the spread operator
  <Book {...singleBook} />,
  document.getElementById("root")
);
```

## Children in Props

You can nest content inside your component. If we have the following:

```javascript
import React from "react";
import ReactDom from "react-dom";

// CSS
import "./index.css";

import Book from "./Book";

const singleBook = {
  title: "Book title",
  author: "Book author",
};

ReactDom.render(
  <Book {...singleBook}>
    <p> I am nested!</p>
  </Book>,
  document.getElementById("root")
);
```

You can access the nested object from your component:

```javascript
import React from "react";

// De-structure the children prop
const Book = ({ title, author, children }) => {
  return (
    <article className="book">
      <h1>{title}</h1>
      <h4>{author}</h4>
      {children}
    </article>
  );
};

export default Book;
```

## List of Components

React has one restriction for list of objects, and that is: **they have to have a key**. So, for example:

```javascript
import React from "react";
import ReactDom from "react-dom";

// CSS
import "./index.css";

import Book from "./Book";

// Data to create book object
const books = [
  {
    id: "1",
    title: "Book title",
    author: "Book author",
  },
  {
    id: "2",
    title: "Book title",
    author: "Book author",
  },
];

const bookList = books.map((book) => {
  // De-structure book object
  return <Book key={book.id} {...book} />;
});

ReactDom.render(<div>bookList</div>, document.getElementById("root"));
```

## Event Basics

- [List of all possible events](https://reactjs.org/docs/events.html#supported-events)

To define an event we have to specify:

\*_ \*\*attribute_: like `onClick`, `onMouseHover`, etc. \*_ \*\*eventHandler_: the function to apply. This can be specified as a reference or as an in-line function.

Next, we present an example:

```javascript
import React from 'react'

const Book = ({ title, author }) => {

  const clickHandler = () => {alert('Hello!!')}

  return (
   <article className='book'>
    <!-- Here we have the eventHandler as an in-line function -->
    <h1 onClick={() => alert('Hello!!')}>{title}</h1>
    <h4>{author}</h4>
    <!-- Here we have the eventHandler as a reference -->
    <button type="button" onClick={clickHandler}>This is a button</button>
   </article>
  );
};

export default Book
```

To pass an argument to the `eventHandler` we have to use a `lambda` function, else when we load the application will invoke the function `clickHandler(author)`

```javascript
import React from 'react'

const Book = ({ title, author }) => {

  const clickHandler = (author) => {alert(author)}

  return (
   <article className='book'>
    <h1 onClick={() => alert('Hello!!')}>{title}</h1>
    <h4>{author}</h4>
    <!-- Wrap function with an in-line function -->
    <button type="button" onClick={() => clickHandler(author)}>This is a button</button>
   </article>
  );
};

export default Book
```

We can also access the `event` object from within the function, like:

```javascript
import React from "react";

const Book = ({ title, author }) => {
  // You can always access the event object from an eventHandler
  const clickHandler = (author, e) => {
    console.log(e);
  };

  return (
    <article className="book">
      <h1 onClick={() => alert("Hello!!")}>{title}</h1>
      <h4>{author}</h4>
      <button type="button" onClick={() => clickHandler(author)}>
        This is a button
      </button>
    </article>
  );
};

export default Book;
```
