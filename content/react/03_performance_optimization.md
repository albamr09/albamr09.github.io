---
title: Performance Optimization
weight: 3
type: docs
---

## React.memo

`React.memo` stores a component, and only re-renders if the `props` of the component change (it `memoizes` the component). In the next example, that means that we only re-render `BigList` if `products` change, thus, we do not re-render any `SingleProduct` component unless `products` change.

```javascript
import React, { useState, useCallback, useMemo } from "react";

// Custom hook
import { useFetch } from "useFetch";

const url = "https://course-api.com/javascript-store-products";

const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <BigList products={products} />
    </>
  );
};

// Each time a prop or the state changes, the component re-renders, so all
// the elements of the list are processed again.
// However if we use React.memo we only re-render the component if products change

const BigList = React.memo(({ products }) => {
  return (
    <section className="products">
      {products.map((product) => {
        return <SingleProduct key={product.id} {...product}></SingleProduct>;
      })}
    </section>
  );
});

const SingleProduct = ({ fields }) => {
  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
    </article>
  );
};

export default Index;
```

## useCallback

What happens if we pass a function to `BigList`, well if the state changes (whichever variable of the state) then the function is created again, and so the function is different. Which means the `props` of `BigList` list changes, and causes `React.memo` to re-render the entire component. That is why we use `useCallback`.

`useCallback` allows us to define when to create a function, by specifying the dependencies like we did with `useEffect`:

- If the dependency is `[]`: then only create in the first render
- If there are variables in the `[]`: create whenever those variables change
- If there is nothing: create always.

Refer to [Customs Hooks](../02_advanced#custom-hooks) for an use case of `useCallback` inside the custom hook `useFetch`.

```javascript
import React, { useState, useCallback, useMemo } from "react";

// Custom hook
import { useFetch } from "useFetch";

const url = "https://course-api.com/javascript-store-products";

const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  // We only create this function when we update the cart value
  // That is we memoize the function
  const addToCart = useCallback(() => {
    setCart(cart + 1);
  }, [cart]);

  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

// Each time a prop or the state changes, the component re-renders. Because now
// addToCart is define with useCallback, the re-render is not triggered

const BigList = React.memo(({ products, addToCart }) => {
  return (
    <section className="products">
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};

export default Index;
```

## useMemo

Note that this `hook` deals with values (which is the traditional functionality of the idea of memoizing), whilst `React.memo` look for changes in the `props`.

In the next example we create a function that returns a value, and we memoize the function, so it only computes the value whenever the products change (the argument of the function), else it returns the value stored before:

```javascript
import React, { useState, useCallback, useMemo } from 'react'

// Custom hook
import { useFetch } from 'useFetch'

const url = 'https://course-api.com/javascript-store-products'

// Define the function we are going to memoize
const calculateMostExpensive = (data) => {
  return (
    data.reduce((total, item) => {
      const price = item.fields.price
      if (price >= total) {
        total = price
      }
      return total
    }, 0) / 100
  )
}

const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    setCart(cart + 1)
  }, [cart])

  // Memoize the function with useMemo
  const mostExpensive = useMemo(() => calculateMostExpensive(products), [
    products,
  ])

  return (
    <>
      <h1>Count : {count}</h1>
      <button className='btn' onClick={() => setCount(count + 1)}>
        click me
      </button>
      <!-- Show most expensive product -->
      <h1>Most Expensive : ${mostExpensive}</h1>
      <BigList products={products} addToCart={addToCart}/>
    </>
  )
}

const BigList = React.memo(({ products, addToCart }) => {

  return (
    <section className='products'>
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        )
      })}
    </section>
  )
})

const SingleProduct = ({ fields, addToCart }) => {
  let { name, price } = fields
  price = price / 100
  const image = fields.image[0].url

  return (
    <article className='product'>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  )
}

export default Index;
```
