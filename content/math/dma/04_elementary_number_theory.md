---
title: Elementary Number Theory and Methods of Proof
weight: 4
type: docs
math: true
---

## Direct Proof and Counterexample I: Introduction

### Even, Odd, Prime, and Composite Integers

> [!TIP] **Even number**
>
> An integer $n$ is **even** if, and only if, $n$ equals twice some integer.
>
> $$n \text{ is even } \Leftrightarrow n = 2k \text{ for some integer } k$$

> [!TIP] **Odd number**
>
> An integer $n$ is **odd** if, and only if, $n$ equals twice some integer plus $1$.
>
> $$n \text{ is odd } \Leftrightarrow n = 2k + 1\text{ for some integer } k$$

> [!TIP] **Prime number**
>
> An integer $n$ is **prime** if, and only if, $n > 1$ and for all positive integers $r$ and $s$, if $n = rs$, then either $r$ or s equals $n$.
>
> $$n \text{ is prime } \Leftrightarrow \forall \text{ positive integers } r \text{ and } s, \\ \text{ if } n = rs \text{ then either } r = 1 \text{ and } s = n \text{ or } r = n \text{ and } s = 1$$

> [!TIP] **Composite number**
>
> An integer n is composite if, and only if, $n > 1$ and $n = rs$ for some integers $r$ and $s$ with $1 < r < n$ and $1 < s < n$.
>
> $$n \text{ is composite } \Leftrightarrow \exists \text{ positive integers } r \text{ and } s \text{ such that } \\ n = rs \text{ and } 1 < r < n \text{ and } 1 < s < n$$

### Proving Existential Statements

Given the statement

$$
\exists x \in D, \text{ such that } Q(x)
$$

One way to prove this is to find an $x$ in $D$ that makes $Q(x)$ true. Another way is to give a set of directions for finding such an $x$. Both of these methods are called **constructive proofs of existence**. The logical principle underlying such a proof is called **existential generalization**.

> [!TIP] **Existencial Generalization**
>
> If you know a certain property is true for a particular object, then you may conclude that “there exists an object for which the property is true.”
