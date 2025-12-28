---
title: Build Your Own React
type: docs
weight: 1
---

## Review

We’ll use this React app, just three lines of code. The first one defines a React element. The next one gets a node from the DOM. The last one renders the React element into the container.

```jsx
const element = <h1 title="foo">Hello</h1>;
const container = document.getElementById("root");
ReactDOM.render(element, container);
```

**Let’s remove all the React specific code and replace it with vanilla JavaScript.**

On the first line we have the element, defined with JSX. It isn’t even valid JavaScript, so in order to replace it with vanilla JS, first we need to replace it with valid JS.

JSX is transformed to JS by build tools like `Babel`. The transformation is usually simple: replace the code inside the tags with a call to `createElement`, passing the tag name, the props and the children as parameters.

`React.createElement` creates an object from its arguments. Besides some validations, that’s all it does. So we can safely replace the function call with its output.

```html
<html>
  <head>
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
  </head>
  <body>
    <script>
      const setup = () => {
        // Create an h1 element using Reacts API
        // This is equivalent to creating an element using JSX, and then having
        // whichever build tool compile it to javascript syntax, as follows:
        const element = React.createElement("h1", { title: "foo" }, "Hello");
        const root = document.getElementById("root");

        // Update the DOM
        ReactDOM.render(element, root);
      };
      window.onload = setup;
    </script>
    <div id="root"></div>
  </body>
</html>
```

![Render Output](./assets/0_review_1.png)

And this is what an element is, an object with two properties: type and props (well, it has more, but we only care about these two).

- The `type` is a string that specifies the type of the DOM node we want to create, it’s the `tagName` you pass to `document.createElement` when you want to create an HTML element. It can also be a function.
- `props` is another object, it has all the keys and values from the `JSX` attributes. It also has a special property: `children`.
- `children` in this case is a string, namely `Hello`, but it’s usually an array with more elements. That’s why elements are also trees.

The other piece of React code we need to replace is the call to `ReactDOM.render`. `render` is where React changes the DOM, so let’s do the updates ourselves.

We can re-implement this same logic without using React.

```html
<html>
  <head>
    <title>Reakt Review</title>
  </head>
  <body>
    <script>
      const setup = () => {
        // Create an h1 element using only the DOMs API
        const element = {
          type: "h1",
          props: {
            title: "foo",
            children: "Hello",
          },
        };
        const root = document.getElementById("root");

        // We follow the same pattern
        // 1. Create the h1 element
        const h1Node = document.createElement(element.type);

        // 2. Add the props to the node
        h1Node["title"] = element.props.title;

        // 3. Add the children to the node, in this case a simple text element
        const textNode = document.createTextNode("");
        textNode["nodeValue"] = element.props.children;

        // 4. Update the DOM by adding each element to the DOM
        h1Node.appendChild(textNode);
        root.appendChild(h1Node);
      };
      window.onload = setup;
    </script>
    <div id="root"></div>
  </body>
</html>
```

First we create a node\* using the element type, in this case `h1`. Then we assign all the element props to that node. Here it’s just the title.

_\* To avoid confusion, I’ll use “element” to refer to React elements and “node” for DOM elements._

Then we create the nodes for the children. We only have a string as a child so we create a text node.

Using textNode instead of setting `innerText` will allow us to treat all elements in the same way later. Note also how we set the `nodeValue` like we did it with the `h1` title, it’s almost as if the string had props: `{nodeValue: "hello"}`.

Finally, we append the `textNode` to the `h1` and the `h1` to the `root`.

![Render Output](./assets/0_review_1.png)
