---
title: Advanced
weight: 2
type: docs
---

## Properties of Hooks

All the `hooks` have the following properties:

- They start with the word `use`
- The component where they are created must be named in uppercase
- They cannot be invoked inside a function/component body.
- You cannot call hooks conditionally

## useState

### Error

In the next piece of code we show how, if we change the value of a variable in `React`, it does not change in our web app because it is not re-rendered:

```javascript
import React from "react";

const ErrorExample = () => {
  let title = "random title";

  const handleClick = () => {
    title = "hello people";
    console.log(title);
  };
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <button type="button" onClick={handleClick}>
        change title
      </button>
    </React.Fragment>
  );
};

export default ErrorExample;
```

That is why we will need to use the hook `useState`, so we change handle state changes.

```javascript
import React, { useState } from "react";

const UseStateBasics = () => {
  const [text, setText] = useState("random title");
  const handleClick = () => {
    if (text === "random title") {
      setText("hello world");
    } else {
      setText("random title");
    }
  };

  return (
    <React.Fragment>
      <h1>{text}</h1>
      <button type="button" onClick={handleClick}>
        change title
      </button>
    </React.Fragment>
  );
};

export default UseStateBasics;
```

When we invoke `useState` we have to pass as an argument the initial value of the state variable. `useState` is a function that returns an array:

- The first element: the state variable
- The second element: the handler that controls the value of the state value

When using `useState` with objects, whenever you update one property of the object, you have to pass the object to the handler (with the spread operator), and then override the property you want to update:

```javascript
import React, { useState } from "react";

const UseStateObject = () => {
  // Object
  const [person, setPerson] = useState({
    name: "peter",
    age: 24,
    message: "random message",
  });

  const changeMessage = () => {
    // Pass the person object with the spread operator
    // and override the message property
    setPerson({ ...person, message: "hello world" });
  };

  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h4>{person.message}</h4>
      <button className="btn" onClick={changeMessage}>
        change message
      </button>
    </>
  );
};

export default UseStateObject;
```

### Asynchronous functions

If we want to update a value asynchronally, and fetch the value of the state variable when the change happens, and not when the function is defined, then:

```javascript
import React, { useState } from "react";

const UseStateCounter = () => {
  const [value, setValue] = useState(0);

  const reset = () => {
    setValue(0);
  };

  const complexIncrease = () => {
    setTimeout(() => {
      // value is the value of the state variable when the timeout is defined
      // if you call it multiple times consecutively you get the same value, because they all get value = 0
      // setValue(value + 1);
      // prevState is the value of the state variable when the timeout finished
      // if you call it multiple times consecutively you get different values, because value has already been updated
      // by another setTimeout.
      // if you call it multiple times
      setValue((prevState) => {
        return prevState + 1;
      });
    }, 2000);
  };

  return (
    <>
      <section style={{ margin: "4rem 0" }}>
        <h2>more complex counter</h2>
        <h1>{value}</h1>
        <button className="btn" onClick={complexIncrease}>
          increase later
        </button>
      </section>
    </>
  );
};

export default UseStateCounter;
```

## useEffect

### Dependencies

The `useEffect` definition allows you to pass an array of dependencies:

- If it is specified as `[]`: `useEffect` will only be triggered in the first render
- If it is an array of state variables: it will be triggered every time the state variable is updated.

```javascript
import React, { useState, useEffect } from 'react';

const UseEffectBasics = () => {

  const [value, setValue] = useState(0);
  // Only trigger on first render
  // useEffect(() => {
  //   document.title = `New Messages(${value})`;
  // }, []);
  // Call whenever value is updated
  useEffect(() => {
    document.title = `New Messages(${value})`;
  }, [value]);

  return (
    <>
      <h1>{value}</h1>
      <button className='btn'}>
        click me
      </button>
    </>
  );
};

export default UseEffectBasics;
```

### Clean up Function

`useEffect` lets us define a function that is invoked once we exit the function:

```javascript
import React, { useState, useEffect } from "react";

const UseEffectCleanup = () => {
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    console.log("useEffect");
    window.addEventListener("resize", checkSize);
    // Clean up function
    return () => {
      console.log("cleanup");
      window.removeEventListener("resize", checkSize);
    };
  }, []);
  console.log("render");
  return (
    <>
      <h1>window</h1>
      <h2>{size} PX</h2>
    </>
  );
};

export default UseEffectCleanup;
```

### Fetch Data

Up next we will show how to get data using `useEffect`.

Note, if we do not specify the restriction of only triggering on the first render:

1. `useEffect` calls getUsers
2. `getUsers` updates the state, and so the component re-renders
3. Because there is a re-render, `useEffect` is called again
   Thus, we end in an infinite loop

```javascript
import React, { useState, useEffect } from "react";

const url = "https://api.github.com/users";

const UseEffectFetchData = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
    // Specify [] so we only run useEffect on the first render.
  }, []);
  return (
    <>
      <h3>github users</h3>
      <ul className="users">
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          return (
            <li key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h4>{login}</h4>
                <a href={html_url}>profile</a>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UseEffectFetchData;
```

## Conditional Rendering

### Short Circuit Evaluation

Now, let's see an example of `Short Circuit Evaluation` in action:

```javascript
import React, { useState } from "react";

const ShortCircuit = () => {
  const [text, setText] = useState("");
  const [isError, setIsError] = useState(false);
  // If text is falsy, then return 'hello world'
  // else return text
  // const firstValue = text || 'hello world';
  // If text is true, then return 'hello world'
  // else return text
  // const secondValue = text && 'hello world';

  return (
    <>
      {/**If text is false, return h1 with 'john doe value'**/}
      <h1>{text || "john doe"}</h1>
      {/**If text is true, return h1 with 'john doe value'**/}
      {text && <h1>'john doe'</h1>}
    </>
  );
};

export default ShortCircuit;
```

### Ternary operators

We can also use `ternary operators` to render conditionally in `React`.

```javascript
import React, { useState } from "react";

const ShortCircuit = () => {
  const [isError, setIsError] = useState(false);

  return (
    <>
      <button className="btn" onClick={() => setIsError(!isError)}>
        toggle error
      </button>
      {/*Check the value of isError, if is error is true, return the first value after the ?
        else return the second value*/}
      {isError ? (
        <p>there is an error...</p>
      ) : (
        <div>
          <h2>there is no error</h2>
        </div>
      )}
    </>
  );
};

export default ShortCircuit;
```

## Controlled Inputs

### Multiple inputs

How can we define an event handler for the `OnChange` event that is generic, instead of defining one for each input? To showcase this scenario, we will use the same code as before, but with two new inputs. All of the inputs have the same `OnChange` event handler.

```javascript
import React, { useState } from "react";

const ControlledInputs = () => {
  // Create a new state variable person, that holds the properties of the person we are currently creating
  const [person, setPerson] = useState({ firstName: "", email: "", age: "" });
  // Array of people we have already created
  const [people, setPeople] = useState([]);

  // Generic event handler
  const handleChange = (e) => {
    // Obtain the name of the input/state variable
    const name = e.target.name;
    // Obtain the new value for the input
    const value = e.target.value;
    // Update the value of the property for the current person
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.firstName && person.email && person.age) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      setPerson({ firstName: "", email: "", age: "" });
    }
  };
  return (
    <>
      <article className="form">
        <form>
          <div className="form-control">
            <label htmlFor="firstName">Name : </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              // Access the firstName of the person object
              value={person.firstName}
              // Generic event handler
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              // Access the email of the person object
              value={person.email}
              // Generic event handler
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="age">Age : </label>
            <input
              type="number"
              id="age"
              name="age"
              // Access the age of the person object
              value={person.age}
              // Generic event handler
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            add person
          </button>
        </form>
      </article>
      <article>
        {people.map((person) => {
          const { id, firstName, email, age } = person;
          return (
            <div key={id} className="item">
              <h4>{firstName}</h4>
              <p>{email}</p>
              <p>{age}</p>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default ControlledInputs;
```

## useRef

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument. Some properties:

- Preserves the value of the object
- Does not trigger re-render
- Assigned to `DOM nodes/elements`

```javascript
import React, { useEffect, useRef } from "react";

const UseRefBasics = () => {
  // Create the container
  const refContainer = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Print the value inside the input
    console.log(refContainer.current.value);
  };

  useEffect(() => {
    // Focus on the input element whenever we render the application
    refContainer.current.focus();
  });

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          {/**The refContainer points to the input element**/}
          <input type="text" ref={refContainer} />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default UseRefBasics;
```

## useReducer

An alternative to `useState`. Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a dispatch method.

`useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. `useReducer` also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

For example:

```javascript
import React, { useState, useReducer } from "react";

// Components
import Modal from "./Modal";

// Data
import { data } from "../../../data";

// Reducer dispatch function
import { reducer } from "./reducer";

// Initial state for the reducer
const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: "",
};

const Index = () => {
  // Define state variables
  const [name, setName] = useState("");
  // Define reducer: (dispatch fuction, initial state)
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    // Avoid the re-rendering caused by the submit event
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      // Call reducer to update state
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setName("");
    } else {
      // Call reducer to update state
      dispatch({ type: "NO_VALUE" });
    }
  };

  const closeModal = () => {
    // Call reducer to update state
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      {/**Render Modal component conditionally **/}
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      {/** Form to add a new person to the reducer state variable **/}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">add </button>
      </form>
      {/** Show the people stored in the reducer state variable **/}
      {state.people.map((person) => {
        return (
          <div key={person.id} className="item">
            <h4>{person.name}</h4>
            <button
              onClick={() =>
                // Call reducer to update state
                dispatch({ type: "REMOVE_ITEM", payload: person.id })
              }
            >
              remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Index;
```

Now, let's see the `reducer` function:

```javascript
/** Reducer function **/
export const reducer = (state, action) => {
  // Define logic for each type of action
  if (action.type === "ADD_ITEM") {
    // Add new person (action.payload) to existing people array (state.people)
    const newPeople = [...state.people, action.payload];
    return {
      // Always copy the value from the previous state
      ...state,
      // Update the people array
      people: newPeople,
      isModalOpen: true,
      modalContent: "item added",
    };
  }
  if (action.type === "NO_VALUE") {
    // Always copy the value from the previous state
    return { ...state, isModalOpen: true, modalContent: "please enter value" };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }
  if (action.type === "REMOVE_ITEM") {
    // Filter people array, by removing the person
    const newPeople = state.people.filter(
      (person) => person.id !== action.payload
    );
    // Copy the previous state (...state) and update the people the array (newPeople)
    return { ...state, people: newPeople };
  }
  throw new Error("no matching action type");
};
```

## Prop Drilling

Prop Drilling refers to the scenario where we have to pass `props` to anidated components recursively. Next up, we show and example

```javascript
import React, { useState } from "react";

// Data
import { data } from "../../../data";

// Outer component
const PropDrilling = () => {
  // State passed as a prop
  const [people, setPeople] = useState(data);

  // Event handler passed as a prop
  const removePerson = (id) => {
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };
  return (
    <section>
      <h3>prop drilling</h3>
      {/** Pass props to the list elements **/}
      <List people={people} removePerson={removePerson} />
    </section>
  );
};

// Middle component
const List = ({ people, removePerson }) => {
  return (
    <>
      {people.map((person) => {
        {
          /** Pass props to the SinglePerson elements **/
        }
        return (
          <SinglePerson
            key={person.id}
            {...person}
            removePerson={removePerson}
          />
        );
      })}
    </>
  );
};

// Inner component
const SinglePerson = ({ id, name, removePerson }) => {
  return (
    <div className="item">
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};

export default PropDrilling;
```

In these cases we can use the [Context API](#context-api)

## Context API

`Context API` and `useContext` allows us to resolve the issue of the [prop drilling](#prop-drilling). The context has two components:

- The provider: works as a distributer
- The consumer

We use them as follows:

```javascript
import React, { useState, useContext } from 'react';
import { data } from '../../../data';

// Create context object
const PersonContext = React.createContext();

const ContextAPI = () => {
  // State saved in the context
  const [people, setPeople] = useState(data);
  // Event handler saved in the context
  const removePerson = (id) => {
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };

  return (
    {/*Wrap the components in the context provider, so all the nested components
      have access to the variables defined in the context object*/}
    <PersonContext.Provider value={{ removePerson, people }}>
      <h3>Context API / useContext</h3>
      <List />
    </PersonContext.Provider>
  );
};

const List = () => {
  // Obtain data from the context with the useContext hook
  const mainData = useContext(PersonContext);
  return (
    <>
      {mainData.people.map((person) => {
        return <SinglePerson key={person.id} {...person} />;
      })}
    </>
  );
};

const SinglePerson = ({ id, name }) => {
  // Obtain data from the context with the useContext hook
  const { removePerson } = useContext(PersonContext);
  return (
    <div className='item'>
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};

export default ContextAPI;
```

## Custom Hooks

Customs hooks allow us to avoid duplicating code that uses hooks and essentially in different places of your code. For example, the fetching function is very common, so we create a `useFetch` hook.

When you define a custom hook, that is, if you define a function outside a component that uses hooks, you will have to name it `use<FunctionName>`, else you will get an error.

```javascript
import React, { useState, useEffect } from "react";

// Import custom hook
import { useFetch } from "./2-useFetch";

const url = "https://course-api.com/javascript-store-products";

const Example = () => {
  // Values returned by useFetch
  const { loading, products } = useFetch(url);
  return (
    <div>
      <h2>{loading ? "loading..." : "data"}</h2>
    </div>
  );
};

export default Example;
```

```javascript
import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
  // State within the hook
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Functionality of the hook
  const getProducts = useCallback(async () => {
    const response = await fetch(url);
    const products = await response.json();
    setProducts(products);
    setLoading(false);
  }, [url]);

  // Run whenever the url or the getProducts function changes
  useEffect(() => {
    getProducts();
  }, [url, getProducts]);

  // Values returned by the custom hook
  return { loading, products };
};
```

Note we are using the hook `useCallback` (refer to [Performance Optimization](../03_performance_optimization)), we do this because we are specifying `getProducts` as a dependency for `useEffect`. However `getProducts` is created every time the state changes.

So when we call `useEffect`, we change the state, and therefore create the function `getProducts`, which triggers `useEffect`, thus the state changes, and we create `getProducts`, and so on and so forth.

To avoid this, we use `useCallback`, which will create the function whenever any of the dependencies in the list change. So this means, now `getProducts` is only created when the `url` changes. This allows us to avoid the infinite loop we ran into before.

## PropTypes

### Default Props

In this other `Product` component, we show how to use `defaultProps` instead of conditional rendering.

```javascript
import React from "react";
import PropTypes from "prop-types";
import defaultImage from "./assets/default-image.jpeg";

const Product = ({ image, name, price }) => {
  return (
    <article className="product">
      {/**Use conditional rendering in case the data does not exist **/}
      <img src={image.url} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
    </article>
  );
};

// Define the propTypes for the object
Product.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

Product.defaultProps = {
  name: "default name",
  price: 3.99,
  image: defaultImage,
};

export default Product;
```

## React Router

### Links

How do we navigate through our application, well by using `Links`. So, for example, in the `Navbar`:

```javascript
import React from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <!-- Specify the path -->
          <Link to='/'>Home</Link>
        </li>
        <li>
          <!-- Specify the path -->
          <Link to='/about'>About</Link>
        </li>
        <li>
          <!-- Specify the path -->
          <Link to='/people'>People</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

To pass a parameter to the link we can do the following:

```javascript
import React, { useState } from 'react';

import { data } from '../../../data';

import { Link } from 'react-router-dom';

const People = () => {
  // List of people
  const [people, setPeople] = useState(data);
  return (
    <div>
      <h1>People Page</h1>
      {people.map((person) => {
        return (
          <div key={person.id} className='item'>
            <h4>{person.name}</h4>
            <!-- Specify the path and pass the id of the current person as a parameter -->
            <Link to={`/person/${person.id}`}>Learn More</Link>
          </div>
        );
      })}
    </div>
  );
};

export default People;
```

Now in the `Person` component, we can fetch the parameter:

```javascript
import React, { useState, useEffect } from 'react';

import { data } from '../../../data';

import { Link, useParams } from 'react-router-dom';

const Person = () => {
  // State
  const [name, setName] = useState('default name');

  // useParams hook to fetch the parameter
  // the name of the parameter (id), is specified in the "Route" component
  // in our case the path to person was: /person/:id
  const { id } = useParams();

  useEffect(() => {
    const newPerson = data.find((person) => person.id === parseInt(id));
    setName(newPerson.name);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <!-- Go to the previous page of the list of people -->
      <Link to='/people' className='btn'>
        Back To People
      </Link>
    </div>
  );
};

export default Person;
```
