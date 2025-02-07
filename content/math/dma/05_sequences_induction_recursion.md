---
title: Sequences, Mathematical Induction, and Recursion
weight: 5
type: docs
math: true
---

## Sequences

> [!TIP] **Sequence**
>
> A **sequence** is a function whose domain is either all the integers between two given integers or all the integers greater than or equal to a given integer.

We represent a sequence as follows:

$$
a_m, a_{m + 1}, a_{m + 2}, \cdots, a_n
$$

where each element $a_k$ is a **term**. The $k$ in $a_k$ is called a **subscript** or **index**, $m$, is the subscript of the **initial term** and $n$ is the subscript of the **final term**.

The notation

$$
a_m, a_{m + 1}, a_{m + 2}, \cdots
$$

denotes an **infinite sequence**. An **explicit formula** or **general formula** for a sequence is a rule that shows how the values of $a_k$ depend on $k$.

### Summation Notation

In 1772 the French mathematician Joseph Louis Lagrange introduced the capital Greek letter sigma, $\Sigma$, to denote the word sum.

> [!TIP] **Summation Notation**
>
> If $m$ and $n$ are integers and $m \leq n$ the symbol $\sum_{k=m}^n a_k$, read the **summation from** $k$ **equals** $m$ **to** $n$ **of** $a$ **sub** $k$ is the sum of all the terms $a_m, a_{m + 1}, a_{m + 2}, \cdots, a_n$.
>
> We say $a_{m} + a_{m + 1} + a_{m + 2} + \cdots + a_n$ is the **expanded form** of the sum. We write
>
> $$\sum_{k = m}^n a_k = a_m + a_{m + 1} + a_{m + 2} + \cdots + a_n$$
>
> We call $k$ the **index** of the summarion, $m$ the **lower limit** of the summation and $n$ the **upper limit** of the summation.

A more mathematically precise definition of summarion, called **recursive definition** is the following. If $m$ is any integer, then:

$$
\sum_{k = m}^m a_k = a_m \text{ and } \sum_{k = m}^n a_k = \left(\sum_{k = m}^{n - 1} a_k\right) + a_n \text{ for every integer } n > m
$$

### Product Notation

> [!TIP] **Product Notation**
>
> If $m$ and $n$ are integers and $m \leq n$, the symbol $\prod_{k=m}^n a_k$, read the **product from $k$ equals $m$ to $n$ of $a$-sub-$k$**, is the product of all the terms $a_m, a_{m + 1}, a_{m + 2}, \cdots, a_n$. We write:
>
> $$\prod_{k=m}^n a_k = a_m \cdot a_{m + 1} \cdot a_{m + 2} \cdots a_n$$

A recursive **definition for the product notation** is the following: If $m$ is any integer

$$
\prod_{k = m}^m a_k = a_m \text{ and } \prod_{k = m}^n a_k = \left(\prod_{k=m}^{n - 1} a_k\right) a_n \text{ for every integer } n > m
$$

### Properties of Summations and Products

If $a_m, a_{m + 1}, \cdots$ and $b_m, b_{m + 1}, \cdots$ are sequences of real numbers and $c$ is a real number, then the following equations hold for any integer $n \geq m$:

$$
\sum_{k = m}^n a_k + \sum_{k = m}^n b_k = \sum_{k = m}^n (a_k + b_k)
$$

$$
c \sum_{k = m}^n a_k = \sum_{k = m}^n c \cdot a_k
$$

$$
\left(\prod_{k=m}^n a_k\right) \cdot \left(\prod_{k=m}^n b_k\right) = \prod_{k=m}^n (a_k \cdot b_k)
$$

The symbol used to represent an index of a summation is called a **dummy variable** and it can be replaced by any other symbol. A general procedure to change the variable on the index of a summation is as follows

Consider the following example

> Summation $\sum_{k = 0}^6 \frac{1}{k + 1}$, change of variable $j = k + 1$

1. Calculate the lower and upper limits

> When $k = 0$, $j = k + 1 = 1$
> When $k = 6$, $j = k + 1 = 7$

2. Calculate the general term of the new summation

> Since $j = k + 1$, then $k = j - 1$, hence
>
> $$\frac{1}{k + 1} = \frac{1}{(j - 1) + 1} = \frac{1}{j}$$

3. Rewrite the summation using the new upper limits and the new general term

> So all put together gives
>
> $$\sum_{k = 0}^6 \frac{1}{k + 1} = \sum_{j = 1}^7 \frac{1}{j}$$

### Factorial and $n$ Choose $r$ Notation

> [!TIP] **Factorial**
>
> For each positive integer $n$, the quantity $n$ **factorial**, denoted $n!$, is defined to be the product of all the integers from $1$ to $n$.
>
> $$n! = n \cdot (n - 1) \cdots 3 \cdot 2 \cdot 1$$

**Zero factorial**, denoted $0!$, is defined to be $1$ just because it is convenient.

A **recursive definition for factorial** is: Given any nonnegative integer $n$,

$$
n! = \begin{cases}
1 & \text{ if } n = 0 \\
n \cdot (n - 1) & \text{ if } n \geq 1
\end{cases}
$$

> [!TIP] **$n$ Choose $r$**
>
> Let $n$ and $r$ be integers with $0 \leq r \leq n$, the symbol
>
> $$\binom{n}{r}$$
>
> is read **$n$ choose $r$** and represents the number of subsets of size $r$ that can be chosed from a set of $n$ elements. It is computed as follows
>
> $$\binom{n}{r} = \frac{n!}{r!(n - r)!}$$

### Binary Division

In general, if a nonnegative integer $a$ is repeatedly divided by $2$ until a quotient of zero is obtained and the remainders are found to be $r[0], r[1], \cdots, r[k]$, then by the quotient remainder theorem each $r[i]$ equals $0$ or $1$ and by repeated substitution from the theorem

$$
a = 2^k r[k] + 2^{k - 1}r[k - 1] + \cdots + 2^2 r[2] + 2^1 r[1] + 2^{0} r[0]
$$

Thus the binary representation for $a$ is

$$
a_{10} = (r[k]r[k - 1]\cdots r[2]r[1]r[0])
$$

## Mathematical Induction I: Proving Formulas

In natural science courses, **deduction** and **induction** are presented as alternative modes of thought. **Deduction** being to infer a conclusion from general principles using the laws of logical reasoning. **Induction** being to enunciate a general principle after observing it to hold in a large number of specific instances.

**Mathematical induction as a proof technique is not inductive but deductive**.

> [!TIP] **Principle of Mathematical Induction**
>
> Let $P(n)$ be a property that is defined for integers $n$, and let $a$ be a fixed integer. Suppose the following two statements are true:
>
> 1. $P(a)$ is true
> 2. For every integer $k \geq a$, if $P(k)$ is true then $P(k + 1)$ is true.
>
> Then the statement
>
> $$\text{ for every integer } n \geq a, P(n)$$
>
> is true.

The validity of proof by mathematical induction is generally taken as an axiom. That is why it is referred to as the principle of mathematical induction rather than as a theorem.
