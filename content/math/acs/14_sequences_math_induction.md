---
title: Sequences and Mathematical Induction
weight: 13
type: docs
math: true
---

## Arithmetic Sequences

We say that the sequence

$$
a_1, a_2, \cdots, a_n, \cdots
$$

is an **arithmetic sequence** (also called an **arithmetic progression**) if and only if there is a real number \(d\) such that

$$
a_{k + 1} - a_k= d
$$

for every positive number \(k\). The number \(d\) is called the **common difference**.

Thus the **general term** of an arithmetic sequence is given by

$$
a_n = a_1 + (n - 1)d
$$

where \(a_1\) is the first term, and \(d\) is the common difference.

### Sum of Arithmetic Sequences

Consider an arithmetic sequence \(a_1, a_2, \cdots, a_n\) with a common difference \(d\). The sum of its elements is obtained as follows

$$
S_n = a_1 + (a_1 + d) + (a_1 + 2d) + \cdots + (a_n - 2d) + (a_n - d) + a_n
$$

We write this sum in reverse:

$$
S_n = a_n + (a_n - d) + (a_n - 2d) + \cdots + (a_1 + 2d) + (a_1 + d) + a_1
$$

Add the two equations to produce

$$
2S_n = (a_1 + a_n) + (a_1 + a_n) + (a_1 + a_n) + \cdots + \\ + (a_1 + a_n) + (a_1 + a_n) + (a_1 + a_n)
$$

That is

$$
2S_n = n(a_1 + a_n)
$$

from which we obtain a **sum formula**:

$$
S_n = \frac{n(a_1 + a_n)}{2}
$$

## Geomemtric Sequences

We say the sequence \(a_1, a_2, \cdots, a_n\) is a **geometric sequence** (or **geometric progression**) if and only if there is a nonzero real number \(r\ such that)

$$
a_{k + 1} = r a_k
$$

for every positive integer \(k\). The nonzero real number \(r\) is called the **common ratio** of the sequence.

Thus the **general term** of a geometric sequence is given b

$$
a_n = a_1 r^{n - 1}
$$

### Sum of Geomemtric Sequences

Consider a geometric sequence \(a_1, a_2, \cdots, a_n\) with a common ration \(r\). The sum of its elements is obtained as follows

$$
S_n = a_1 + a_1r + a_1r^2 + \cdots + a_1r^{n - 1}
$$

If we multiply by the common ratio \(r\):

$$
rS_n = a_1r + a_1r^2 + a_1r^3 + \cdots + a_1r^{n}
$$

We substract both equations

$$
rS_n - S_n = a_1r^n - a_1
$$

$$
S_n(r - 1) = a_1r^n - a_1
$$

$$
S_n = \frac{a_1r^n - a_1}{r - 1}, r \neq 1
$$

### The Sum of an Infinite Geomemtric Sequence

Given the formula for the sum of a geometric sequence

$$
S_n = \frac{a_1r^n - a_1}{r - 1}
$$

$$
S_n = \frac{-(a_1r^n - a_1)}{-(r - 1)}
$$

$$
S_n = \frac{a_1 - a_1r^n}{1 - r}
$$

$$
S_n = \frac{a_1}{1 - r} - \frac{a_1r^n}{1 - r}
$$

In general, for values of \(r\) such that \(|r| < 0\), the expression \(r^n\) approaches zero as \(n\) gets larger and larger. Therefore

$$
S_n = \frac{a_1}{1 - r} - 0
$$

We say that the **sum of the infinite geometric sequence** is given by

$$
S_n = \frac{a_1}{1 - r}, |r| < 0
$$

If \(|r| > 1\), the absolute value of \(r^n\) increases without bound as \(n\) increases, thus \(|S_n|\) also increases without bound. Therefore we say that the sum of any infinite geometric sequence where \(|r| \geq 1\) does not exist.

## Mathematical Induction

> [!TIP] **Principle of Mathematical Induction**
>
> Let $P_n$ be a statement in terms of \(n\), where \(n\) is a positive integer. If
>
> 1. $P_1$ is true, and
> 2. the truth of $P_k$ implies the truth of $P_{k + 1}$ for every positive integer \(k\),
>
> then $P_n$ is true for every positive integer \(n\).
