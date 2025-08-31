---
title: Properties of Functions
weight: 7
type: docs
math: true
---

## Functions Defined on General Sets

> [!NOTE] **Function**
>
> A **function $f$ from a set $X$ to a set $Y$**, denoted by $f: X \rightarrow Y$, is a relation from $X$, the **domain** of $f$, to $Y$, the **co-domain** of $f$, that satisfies two properties:
>
> 1. Every element in $X$ is related to some element in $Y$
> 2. No element in $X$ is related to more than one element in $Y$.

The set of all values of a function $f$ taken together is called the **range** of $f$ or the **image** of $X$ under $f$. Symbolically:

$$
\text{range of } f = \text{image of } X \text{ under } f = \{y \in Y | y = f(x), \text{ for some } x \text{ in } X\}
$$

When $x$ is an element such that $f(x) = y$, then $x$ is called a **preimage of $y$** or **an inverse image of $y$**. The set of all inverse images of $y$ is called the **inverse image of $y$**. Symbolically:

$$
\text{the inverse image of } y = \{x \in X| f(x) = y\}
$$

### Arrow Diagrams

Inf $X$ and $Y$ are finite sets, you can define a function $f$ from $X$ to $Y$ by drawing an **arrow diagram**.

![Arrow Diagram](./assets/arrow_diagram.png)

> [!NOTE] **Test for Function Equality**
>
> If $F: X \rightarrow Y$ and $G: X \rightarrow Y$ are functions, then $F = G$ if, and only if, $F(x) = G(x)$ for every $x \in X$.
>
> **Proof**: Suppose $F: X \rightarrow Y$ and $G: X \rightarrow Y$ are functions. Then $F$ and $G$ are subsets of $X \times Y$ by the definition of a function, and for $(x, y)$ to be in $F$ means that $y$ is the unique element related to $x$ by F. Similarly, for $(x, y)$ to be in $G$ means that $y$ is the unique element related to $x$ by $G$.
>
> Now, suppose that $F(x) = G(x)$ for every $x \in X$. Then if $x$ is any element of $X$
>
> $$(x, y) \in F \leftrightarrow y = F(x) \leftrightarrow y = G(x) \leftrightarrow (x, y) \in G$$
>
> So $F$ and $G$ consist of exactly the same elements and hence $F = G$.
>
> Conversely, if $F = G$, then for every $x \in X$,
>
> $$y = F(x) \leftrightarrow (x, y) \in F \leftrightarrow (x, y) \in G \leftrightarrow y = G(x)$$
>
> Thus, since both $F(x)$ and $G(x)$ equal $y$, we have that
>
> $$F(x) = G(x)$$

### Examples of Functions

> [!NOTE] **Identitity Function**
>
> Given a set $X$, define a function $I_X$ from $X$ to $X$ by
>
> $$I_X(x) = x, \forall x \in X$$
>
> The function $I_X$ is called the **identity function on $X$**.

> [!NOTE] **Logarithmic Functions**
>
> Let $b$ be a positive real number with $b \neq 1$. For each positive real number $x$, the **logarithm with base $b$ of $x$**, written $\log_b x$, is the exponent to which $b$ must be raised to obtain $x$. Symbolically:
>
> $$\log_b x = y \leftrightarrow b^y = x$$
>
> The **logarithmic function with base $b$** is the function from $\mathbb{R}^+$ to $\mathbb{R}$ that takes each positive real number $x$ to $\log_b x$.

> [!TIP] **The Hamming Distance Function**
>
> The **Hamming Distance Function** gives a measure of the "difference" between two strings of $0$'s and $1$'s that have the same length and is defined as:
>
> $$H(s, t) = \text{ the number of positions in which } s \text{ and } t \text{ have different values.}$$

### Boolean Functions

Given an input/output table for a digital logic circuit, we can define it as a function as follows: the elements in the input column can be regarded as ordered tuples of $0$'s and $1$'s and the elements in the output column is taken to be the co-domain of the function.

More generally, the input/output table corresponding to a circuit with $n$ input wires has $n$ input columns. Such table defines a function from the set of all $n$-tuples of $0$'s and $1$'s to the set $\{0, 1\}$.

![Boolean Functions for Digital Circuits](./assets/boolean_function.png)

> [!NOTE] **$n$-place Boolean Functions**
>
> An **($n$-place) Boolean Function** $f$ is a function whose domain is the set of all ordered $n$-tuples of $0$'s and $1$'s and whose co-domain is the set $\{0, 1\}$. More formally, the domain of a Boolean function ca be described as the Cartesian product of $n$ copies of the set $\{0, 1\}$, which is deoned $\{0, 1\}^n$. Thus $f: \{0, 1\}^n \rightarrow \{0, 1\}$.

### Checking whether a Function is Well Defined

In general, we say that a "function" is **not well defined** if it fails to satisfy at least one of the requirements for being a function.

### Functions Acting on Sets

> [!NOTE] **Image and Inverse Image of a Function**
>
> If $f: X \rightarrow Y$ is a function and $A \subseteq X$ and $C \subseteq Y$, then
>
> $$f(A) = \{y \in Y | y = f(x) \text{ for some } x \in A\}$$
>
> and
>
> $$f^{-1}(C) = \{x \in X | f(x) \in C\}$$
>
> $f(A)$ is called the **image of $A$**, and $f^{-1}(C)$ is called the **inverse image of $C$**.

## One-to-One, Onto, and Inverse Functions

### One-to-One Functions

> [!NOTE] **One-to-One Functions**
>
> Let $F$ be a function from a set $X$ to a set $Y$. $F$ is **one-to-one** (or **injective**) if, and only if, for all elements in $x_1$ and $x_2$ in $X$,
>
> $$F(x_1) = F(x_2) \rightarrow x_1 = x_2$$
>
> or equivalently
>
> $$x_1 \neq x_2 \rightarrow F(x_1) \neq F(x_2)$$

Similarly, a function is not one-to-one if:

$$
\exists x_1, x_2 \in X, \text{ such that } F(x_1) = F(x_2) \text{ and } x_1 \neq x_2
$$

That is, if elements $x_1$ and $x_2$ can be found that have the same function value but are not equal, then $F$ is not one-to-one.

![One to One Functions](./assets/one_to_one_functions.png)

### One-to-One Functions on Infinite Sets

Now suppose $f$ is a function defined on an infinite set $X$. By definition, $f$ is one-to-one if, and only if, the following universal statement is true:

$$
\forall x_1, x_2 \in X, f(x_1) = f(x_2) \rightarrow x_1 = x_2
$$

Thus, to prove $f$ is one-to-one, you will generally use the method of direct proof:

Suppose $x_1$ and $x_2$ are elements of $X$ such that $f(x_1) = f(x_2)$ and show that $x_1 = x_2$.

To show that $f$ is not one-to-one, you will find elements $x_1$ and $x_2$ in $X$ so that $f(x_1) = f(x_2)$ but $x_1 \neq x_2$.

### Application: Hash Function

> [!NOTE] **Hash Function**
>
> A **hash function** is a function defined from a larger, possible infinite, set of data to a smaller fixed-size set of integers.

To make a hash function more efficient it should satisfy:

1. Is one-to-one
2. Has a co-domain that is very much smaller than one billion.

Most hash functions are modifications of $mod$ functions using prime numbers to increase the change that their values will be scattered. Nonetheless, two input values may **collide** (i.e. have the same output value), and various method can be used to avoid such **collision** (**collision resolution method**).

A special class of hash function are **cryptographic hash functions**. These are designed to satisfy the following conditions:

1. It is a function from bit strings to bit string of a fixed length.
2. It is close to being a one-to-one: the probability of collisions is very small.
3. It is close to being a one-way function: given any bit string in its range, finding the inverse image of the string is computationally very difficult.
4. Its values can be quickly computed.
5. A very sligth change in an input string results in an extensive change in the output string.

### Onto Functions

> [!NOTE] **Onto Function**
>
> Let $F$ be a function from a set $X$ to a set $Y$. $F$ is **onto** (or **surjective**) if, and only if, given any element $y$ in $Y$, it is possible to find an element $x$ in $X$ with the property that $y = F(x)$. Symbolically:
>
> $$F: X \rightarrow Y \text{ is onto} \leftrightarrow \forall y \in Y, \exists x \in X \text{ such that } F(x) = y$$

Similarly, to show that a function is **not onto**, then we must show that:

$$
\exists y \in Y, \text{ such that } \forall x \in X, F(x) \neq y
$$

That is, there is some element in $Y$ that is not the image of any element in $X$.

![Onto Functions](./assets/onto_functions.png)

### Onto Functions on Infinite Sets

To prove that $F: X \rightarrow Y$, where $X$ is an infinite set, you will use the method of **generalizing from the generic particular**:

Suppose that $y$ is an element of $Y$, show that there is an element $x$ in $X$ with $F(x) = y$.

And, to prove $F$ is **not onto**, you will usually find an element $y$ of $Y$ such that $y \neq F(x)$ for any $x$ in $X$.

### Relations between Exponential and Logarithmic Functions

> [!TIP] **Laws of Exponents**
>
> If $b$ and $c$ are any positive real numbers and $u$ and $v$ are any real number numbers, the following laws of exponents hold true:
>
> $$b^ub^v = b^{u + v}$$
>
> $$(b^u)^v = b^{u \cdot v}$$
>
> $$\frac{b^u}{b^v} = b^{u - v}$$
>
> $$(bc)^u = b^uc^u$$

> [!TIP] **Properties of Logarithms**
>
> For any positive real numbers $b, c, x$ and $y$ with $b \neq 1$ and $c \neq 1$ and for every real number $a$:
>
> $$\log_b (xy) = \log_b x + \log_b y$$
>
> $$\log_b(\frac{x}{y}) = \log_b x - \log_b y$$
>
> $$\log_b(x^a) = a \log_b x$$
>
> $$\log_c x = \frac{\log_b x}{\log_b c}$$

### One-to-One Correspondences

> [!NOTE] **One-to-One Correspondence**
>
> A **one-to-one correspondence** (or **bijection**) from a set $X$ to a set $Y$ is a function $F: X \rightarrow Y$ that is both one-to-one and onto.

![One to One Correspondence](./assets/one_to_one_correspondence.png)

### Inverse Functions

> [!NOTE] **Inverse Functions**
>
> Suppose $F: X \rightarrow Y$ is a one-to-one correspondence. Then there is a function $F^{-1}: Y \rightarrow X$ that is defined as follows: Given any element $y \in Y$,
>
> $$F^{-1}(y) = \text{ that unique element } x \in X \text{ such that } F(x) = y$$
>
> Or equivalently,
>
> $$F^{-1}(y) = x \leftrightarrow y = F(x)$$
>
> where $F^{-1}$ is called the **inverse function** for $F$.
