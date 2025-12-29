---
title: Polynomials
weight: 8
type: docs
math: true
---

## Polynomials

This section conducts a systematic study of the set of polynomials whose coefficients are drawn from a general field, $F$. This set, denoted as $F[x]$, forms a fundamental object of study in abstract algebra.

By formalizing the definitions and operations within $F[x]$, we can rigorously investigate its properties, which in turn provides a powerful framework for solving polynomial equations.

This document will proceed by first establishing a formal definition for the set $F[x]$, then detailing the algebraic operations that give it structure, and culminating in an exploration of the Division Algorithm and its consequences for understanding polynomial roots and factors.

### The Polynomial Ring $F[x]$

> [!NOTE] **Polynomial Ring**
>
> A polynomial $f(x)$ over a field $F$ is an expression of the form:
>
> $$f(x) = a_0 + a_1x + a_2x^2 + \cdots + a_nx^n$$
>
> where $n$ is a non-negative integer and the coefficients are elements of the field $F$.

![Set of Polynomials](./assets/definition_set_of_polynomials.png)

The following terms are essential for describing the components and characteristics of a polynomial:

- **Coefficients**: The elements $a_0, a_1, a_1, \cdots, a_n$ from the field $F$.
- **Leading Coefficient**: The coefficient $a_n$ associated with the highest power of $x$, provided that $a_n \neq 0$.
- **Constant Term**: The coefficient $a_0$.
- **Degree**: The highest power of $x$ that has a non-zero coefficient. The degree of $f(x)$ is denoted $\text{deg} f(x)$. A nonzero constant polynomial $f(x) = a_0$ where $a_0 \neq 0$ has a degree of $0$.
- **Zero Polynomial**: The polynomial $f(x) = 0$. By convention, the zero polynomial is not assigned a degree.

The set encompassing all polynomials with coefficients in the field $F$ is formally denoted as $F[x]$.

### Binary Operations in $F[x]$

The set F[x] is an algebraic structure defined by two fundamental binary operations: addition and multiplication.

To formalize these definitions, if two polynomials have different degrees, we can consider the polynomial of lesser degree to have zero coefficients for all powers of $x$ up to the higher degree. This allows for a direct, term-by-term operation.

Let $f(x) = a_0 + a_1x + \cdots + a_nx^n$ and $g(x) = b_0 + b_1x + \cdots + b_mx^m$ be two polynomials in $F[x]$.

The **addition** of these two polynomials is defined as:

$$
f(x) + g(x) = (a_0 + b_0) + (a_1 + b_1)x + (a_2 + b_2)x^2 + \cdots
$$

The **multiplication** of $f(x)$ and $g(x)$ is defined as:

$$
f(x)g(x) = a_0b_0 + (a_0b_1 + a_1b_0)x + (a_0b_2 + a_1b_1 + a_2b_0)x^ + \cdots + a_nb_mx^{n + m}
$$

More generally, the coefficient $c_i$ of the term $x^i$ in the product $f(x)g(x)$ is given by the formula:

$$
c_i = a_0b_i + a_1b_{i - 1} + a_2b_{i - 2} + \cdots + a_ib_0
$$

For this formula, it is understood that $a_j = 0$ for $j > n$ and $b_k = 0$ for $k > m$.

### Algebraic Properties of $F[x]$

The verification of fundamental properties such as associativity, commutativity, and the existence of identity and inverse elements is crucial for classifying this structure. These properties collectively establish that $F[x]$ is a **commutative ring**, one of the most important structures in abstract algebra.

Both addition and multiplication in $F[x]$ are associative and commutative. Furthermore, $F[x]$ contains the necessary identity and inverse elements for a ring structure:

- **Additive Identity**: The zero polynomial, $f(x) = 0$, serves as the additive identity, as $f(x) + 0 = f(x)$ for any polynomial $f(x)$.
- **Additive Inverse**: For any polynomial $f(x) = a_0 + a_1x + \cdots + a_nx^n$, its additive inverse is $-f(x) = (-a_0) + (-a_1)x + \cdots + (-a_n)x^n$.
- **Multiplicative Identity**: The constant polynomial $f(x) = 1$ is the multiplicative identity. This exists because $F$ is a field and therefore contains a multiplicative identity $1$.

The behavior of the degree under these operations provides crucial insights:

> [!TIP] **Degree of a Sum**
>
> The following inequality
>
> $$\text{deg}(f(x) + g(x)) \leq max{\text{deg} f(x), \text{deg} g(x)}$$
>
> holds if $\text{deg} f(x) \neq \text{deg} g(x)$. If the degrees are equal, the leading terms might cancel, resulting in a sum with a strictly smaller degree.

> [!TIP] **Degree of a Product**
>
> $$deg(f(x)g(x)) = deg f(x) + deg g(x)$$

![Degree of Polynomials](./assets/polynomial_degree.png)

A crucial consequence arises from the degree of products. For a polynomial $f(x)$ to have a multiplicative inverse $g(x)$, their product $f(x)g(x)$ must be the multiplicative identity, $1$, which has a degree of $0$. This implies $\text{deg} f(x) + \text{deg} g(x) = 0$.

Since degrees are non-negative, this is only possible if both $\text{deg} f(x)$ and $\text{deg} g(x)$ are $0$. Therefore, the only elements in $F[x]$ with multiplicative inverses are the nonzero constant polynomials. This proves that **$F[x]$ is not a field**.

### The Division Algorithm for Polynomials

A parallel exists between the algebraic structure of the polynomial ring $F[x]$ and the set of integers, $\mathbb{Z}$. The Division Algorithm for Polynomials is a direct analogue to the Division Algorithm for Integers.

> [!NOTE] **Division Algorithm for Polynomials**
>
> Let $f(x), g(x) \in F[x], g(x) \neq 0$. Then there exist unique polynomials $q(x)$ and $r(x)$ in $F[x]$ such that $f(x) = g(x)q(x) + r(x)$, where $r(x) = 0$ or $0 \leq \text{deg} r(x) < \text{deg} g(x)$.

The logic of the existence proof for this theorem begins by defining a set $S$ that contains all polynomials of the form $f(x) - g(x)q(x)$ for some $q(x)$ in $F[x]$.

If the zero polynomial is in $S$, the theorem holds with $r(x) = 0$.

Otherwise, by the Well-Ordering Principle, there must be a polynomial $r(x)$ in $S$ with the smallest possible non-negative degree. The proof then uses contradiction to show that this minimal degree must be less than the degree of $g(x)$. As, if $\text{deg} r(x) \geq \text{deg} g(x)$, one could construct another polynomial in $S$ with an even smaller degree, contradicting the minimality of $r(x)$. Thus, the condition $\text{deg} r(x) < \text{deg} g(x)$ must hold.

> [!TIP] **The Remainder Theorem**
>
> When a polynomial $f(x) \in F[x]$ is divided by $(x - c)$ for some $c \in F$, the remainder is the constant polynomial $f(c)$.

This follows directly from the Division Algorithm by setting $g(x) = x - c$. The algorithm guarantees that $f(x) = (x - c)q(x) + r(x)$, where the remainder $r(x)$ must either be zero or have a degree less than $\text{deg}(x - c) = 1$.

In either case, $r(x)$ is a constant. Evaluating both sides at $x = c$ yields $f(c) = (c - c)q(c) + r(c)$, which simplifies to $f(c) = r(c)$.

> [!NOTE] **Root of a Polynomial**
>
> An element $c \in F$ is called a **zero** (or **root**) of a polynomial $f(x) \in F[x]$ if $f(c) = 0$.

This leads to the second major consequence, the Factor Theorem, which establishes a definitive relationship between the roots of a polynomial and its linear factors.

> [!TIP] **The Factor Theorem**
>
> An element $c \in F$ is a zero of $f(x)$ if and only if $(x - c)$ is a factor of $f(x)$.

This is an immediate result of the Remainder Theorem: $c$ is a zero means $f(c) = 0$. Since the remainder upon division by $(x - c)$ is $f(c)$, a remainder of $0$ means that $(x - c)$ divides $f(x)$ , making it a factor.

### Conclusion

In summary, the set of polynomials over a field, $F[x]$, forms a commutative ring. This section has shown the analogy between the polynomial ring $F[x]$ and the integers $\mathbb{Z}$, a relationship anchored by the Division Algorithm.

### Polynomials: TL;DR

{{< youtube TXnYXfkfuAQ >}}
