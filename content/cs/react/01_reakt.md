---
title: Build Your Own React (Reakt)
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

## The `createElement` Function

Let’s start again with another app. This time we’ll replace React code with our own version of React. We’ll start by writing our own `createElement`.

As we saw in the previous step, an element is an object with `type` and `props`. The only thing that our function needs to do is create that object.

````typescript
/**
 * Creates a virtual DOM element with the specified type, props, and children.
 *
 * @template T - The type of the props object
 * @param type - The element type (e.g., "div", "span", or a component)
 * @param props - The properties/attributes to apply to the element
 * @param children - Variable number of child elements (strings are automatically converted to text elements)
 * @returns An element object with the specified type, props, and children
 *
 * @example
 * ```ts
 * createElement("div", { id: "container" }, "Hello", "World")
 * createElement("span", { className: "text" }, createElement("strong", {}, "Bold"))
 * ```
 */
export const createElement = <T extends ReaktElementProps>(
  type: ReaktElement<T>["type"],
  props: ReaktElement<T>["props"],
  // Children is always an array
  ...children: ReaktElement[]
): ReaktElement<T> => {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
};
````

We use the spread operator for the `props` and the rest parameter syntax for the `children`, this way the children prop will always be an array.

For example, `createElement("div")` returns:

```json
{
  "type": "div",
  "props": { "children": [] }
}
```

The children array could also contain primitive values like strings or numbers. So we’ll wrap everything that isn’t an object inside its own element and create a special type for them: `TEXT_ELEMENT`.

_React doesn’t wrap primitive values or create empty arrays when there aren’t children, but we do it because it will simplify our code_

```typescript
/**
 * Creates a text element from a string value.
 *
 * @param value - The text content to convert into an element
 * @returns An element object with type "PRIMITIVE_ELEMENT_TYPE" and the value as nodeValue
 */
const createPrimitiveElement = (value: string): PrimitiveReaktElement => {
  return {
    type: PRIMITIVE_ELEMENT_TYPE,
    props: {
      nodeValue: value,
      children: [],
    },
  };
};
```

Now, if we were to create a typical `React` component within our example app as follows:

```tsx
// index.js
import * as Reakt from "reakt";

const Element = (
  <div id="foo">
    <a href="https://github.com/albamr09">bar</a>
    <b />
  </div>
);

// This outputs the result from calling Reakt.createElement!!
console.log(Element);
```

```html
// index.html
<html>
  <head>
    <title>Create Element</title>
    <script src="index.js" type="module"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

We would see the following when we open `index.html`

![Visualization Example](./assets/01_create_element_0.png)

## The `render` Function

Next, we need to write our version of the `ReactDOM.render` function. For now, we only care about adding stuff to the DOM. We’ll handle updating and deleting later. The entry point for this function will look as follows:

```typescript
/**
 * Renders a virtual DOM element to the actual DOM.
 *
 * @param container - The DOM container where the element should be rendered
 * @param element - The virtual DOM element to render
 */
export const render = (container: HTMLElement, element: ReaktElement): void => {
  if (isPrimitiveElement(element)) {
    const domNode = createPrimitiveNode({ element });
    container.appendChild(domNode);
    return;
  }

  const domNode = createNode({ element });
  container.appendChild(domNode);
};
```

As you can see this function calls `createPrimitiveNode` and `createNode`. The first one, `createPrimitiveNode` has the responsibility of creating a `DOM` node that only stores text, that is:

```typescript
/**
 * Creates a text node from a primitive element.
 *
 * @param element - The primitive element to create a text node from
 * @returns The created text node
 */
const createPrimitiveNode = ({
  element,
}: {
  element: PrimitiveReaktElement;
}) => {
  const { nodeValue } = element.props;
  const domNode = document.createTextNode(nodeValue);
  return domNode;
};
```

While `createNode` processes a full fleshed `DOM` node, which may be of any arbitrary type and might have any number and type of children:

```typescript
/**
 * Creates a DOM node from a virtual element.
 *
 * @param element - The virtual element to create a DOM node from
 * @returns The created DOM node
 */
const createNode = ({ element }: { element: ReaktElement }) => {
  const { children, ...props } = element.props;

  const domNode = document.createElement(element.type);
  addProps({ node: domNode, props });
  children.forEach((child) => {
    render(domNode, child);
  });
  return domNode;
};
```

On the previous function we have to take care of two main things:

1. Adding the element `props` to the `DOM` node.
2. Processing every child present on the element. **Note how this step calls `render` again**, making the `render` function **recursive**. That is the `render` process is applied as many times as elements there are on the Virtual `DOM`.

Once all of this is implemented we can now use `Reakt.render(root, element);` to render any `Reakt` component we want (not really, for now we can only handle native `HTML` tags):

```html
// index.html
<html>
  <head>
    <title>Render Function Time!</title>
    <script src="index.js" type="module"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```typescript
// index.ts
import * as Reakt from "reakt";

// Look at how we have defined this using Reakt syntax
// The transpiler is calling Reakt.createElement internally, thus generating
// Element = { type: "div", props: { id: "foo", children: [...] } }
const Element = (
	<div id="foo">
		<a href="https://github.com/albamr09">OMG!!</a>
		<b />
	</div>
);

const root = document.getElementById("root");
// We use our render function to append Element to the root div on the index.html
Reakt.render(root!, Element);
```

![Render Function Example](./assets/02_render_function_0.png)

## Concurrent Mode

But… before we start adding more code we need a refactor.

There’s a problem with this recursive call.

Once we start rendering, we won’t stop until we have rendered the complete element tree. If the element tree is big, it may block the main thread for too long. And if the browser needs to do high priority stuff like handling user input or keeping an animation smooth, it will have to wait until the render finishes.

So we are going to break the work into small units, and after we finish each unit we’ll let the browser interrupt the rendering if there’s anything else that needs to be done.

```typescript
/**
 * Renders a virtual DOM element to the actual DOM.
 *
 * @param container - The DOM container where the element should be rendered
 * @param element - The virtual DOM element to render
 */
export const render = (container: HTMLElement, element: ReaktElement): void => {
  const rootFiber = createRootFiber({ container, element });
  startWorkLoop(rootFiber);
};
```

We use [`requestIdleCallback`](https://developer.mozilla.org/es/docs/Web/API/Window/requestIdleCallback) to make a loop. You can think of requestIdleCallback as a setTimeout, but instead of us telling it when to run, the browser will run the callback when the main thread is idle.

_React doesn’t use requestIdleCallback anymore. But for this use case it’s conceptually the same._

To organize the units of work we’ll need a data structure: a **fiber tree**. We’ll have one fiber for each element and each fiber will be a unit of work.

![Fiber Tree](./assets/05_fiber_tree_0.png)

In the render we’ll create the root fiber and set it as the `currentFiber`. The rest of the work will happen on the `performUnitOfWork` function, there we will do three things for each fiber:

1. Add the element to the DOM (`commitFiberToDOM`)
2. Create the fibers for the element’s children (`createChildFibers`)
3. Select the next unit of work (`findNextFiberInTraversal`)

```typescript
/**
 * Starts the work loop to process fibers and render them to the DOM.
 *
 * Begins processing the fiber tree using requestIdleCallback for incremental rendering.
 * The work loop will continue until all fibers have been processed or the browser
 * needs to yield control for other tasks.
 *
 * @param rootFiber - The root fiber to start processing from. Should be created using
 *                    `createRootFiber` before calling this function.
 */
export const startWorkLoop = (rootFiber: Fiber): void => {
  let currentFiber: Fiber | undefined = rootFiber;

  const workLoop: IdleRequestCallback = (deadline) => {
    let shouldYield = false;
    while (currentFiber !== undefined && !shouldYield) {
      currentFiber = performUnitOfWork(currentFiber);
      shouldYield = deadline.timeRemaining() < 1;
    }

    // If there are still fibers to process, schedule the next work loop
    if (currentFiber !== undefined) {
      requestIdleCallback(workLoop);
    }
  };

  requestIdleCallback(workLoop);
};
```

To start using the work loop we’ll need to set the first unit of work, and then write a `performUnitOfWork` function that not only performs the work but also returns the next unit of work.

One of the goals of this data structure is to make it easy to find the next unit of work. That’s why each fiber has a link to its first child, its next sibling and its parent.

![Fiber Tree](./assets/05_fiber_tree_1.png)

When we finish performing work on a fiber, if it has a `child` that fiber will be the next unit of work. If the fiber doesn’t have a `child`, we use the `sibling` as the next unit of work.

And if the fiber doesn’t have a `child` nor a `sibling` we go to the “uncle”: the `sibling` of the `parent`.

```typescript
/**
 * Performs a unit of work on a fiber: commits it to the DOM, creates child fibers, and returns the next fiber to process.
 *
 * This function processes a single fiber in the work loop by:
 * 1. Validating that the fiber has a valid parent with a DOM node
 * 2. Creating and appending the fiber's DOM node to its parent
 * 3. Creating child fibers from the element's children
 * 4. Returning the next fiber to process in the depth-first traversal
 *
 * @param fiber - The fiber to process. Must have a valid parent with a DOM node (HTMLElement, not Text).
 * @returns The next fiber to process in the traversal, or `undefined` if the fiber has an invalid parent.
 * @throws {Error} If the fiber structure is invalid and cannot be recovered from.
 */
const performUnitOfWork = (fiber: Fiber): Fiber | undefined => {
  if (!doesFiberHaveValidParent(fiber)) {
    // Some error handling code
    return undefined;
  }

  fiber = commitFiberToDOM(fiber);
  fiber = createChildFibers(fiber);
  return findNextFiberInTraversal(fiber);
};
```
