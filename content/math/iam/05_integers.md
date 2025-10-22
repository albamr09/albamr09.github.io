---
title: The Integers
weight: 5
type: docs
math: true
---

## Axioms and Basic Properties

In this chapter we study some of the most important properties of the set $\mathbb{Z}$ of integers. The study of the integers, called number theory, has held a fascination throughout history for both the professional and the amateur mathematician.

### The Axioms of the Integers

Our starting point will be the familiar properties of addition and multiplication in $\mathbb{Z}$.

> [!TIP] **Axioms of the Integers**
>
> The set $\mathbb{Z}$ has two binary operations: **addition**, denoted by $+$, and **multiplication**, denoted by $\cdot$, with the following properties:
>
> 1. Addition is **associative**: $(x + y) + z = x + (y + z), \forall x, y, z \in \mathbb{Z}$.
> 2. Addition is **commutative**: $x + y = y + x, \forall x, y \in \mathbb{Z}$.
> 3. $\mathbb{Z}$ has an **identity with repect to addition**, namely, the integer $0$.
> 4. Every integer $x$ in $\mathbb{Z}$ has an **inverse with respect to addition**, namely its negative $-x$
> 5. Multiplication is **associative**: $(x \cdot y) \cdot z = x \cdot (y \cdot z), \forall x, y, z \in \mathbb{Z}$.
> 6. Multiplication is **commutative**: $x \cdot y = y \cdot x, \forall x, y \in \mathbb{Z}$
> 7. $\mathbb{Z}$ has an **identity with respect to multiplication**, namely, the integer $1$ and $1 \neq 0$.
> 8. The **distributive laws** hold: $x \cdot (y + z) = x \cdot y + x \cdot z, \forall x, y, z \in \mathbb{Z}$.

We do not prove these properties of $\mathbb{Z}$; rather we take them as **axioms**: statements we assume to be true about the integers.

Note that $0$ is the only additive identity of $\mathbb{Z]$ and that $1$ is the only multiplicative identity.

Note also that no mention is made in these properties of inverses with respect to multiplication. The reason as we have noted, is that only $1$ and $-1$ have multiplicative inverses in the set of integers.

> [!TIP] **Proposition 5.5.1**
>
> Let $a, b, c \in \mathbb{Z}$
>
> 1. If $a + b = a + c$, then $b = c$
> 2. $a0 = 0a = 0$
> 3. $(-a)b = a(-b) = -(ab)$
> 4. $-(-a) = a$

**Proof (1)**

Suppose that $a + b = a + c$. Then, by first adding -a to both sides of this equation, we get the following sequence of steps:

$$
(-a) + (a + b) = (-a) + (a + c)
$$

$$
(-a + a) + b = (-a + a) + c
$$

$$
0 + b = 0 + c
$$

$$
b = c
$$

**Proof (2)**

Applying **axiom 8** and the fact that $0 + 0 = 0$, we get:

$$
a0 = a(0 + 0) = a0 + a0
$$

Therefore, $a0 + 0 = a0 + a0$. Now we can apply **Property 1** to conclude that $a0 = 0$. Since multiplication in $\mathbb{Z}$ is commutative, we also get $0a = 0$.

**Proof (3)**

We will prove that $(-a)b = -(ab)$.

Notice that the left- and right-hand sides of this equation are conceptually different. The left-hand side is the additive inverse of $a$ multiplied on the right by $b$. The right-hand side is the additive inverse of $ab$. Now

$$
ab + (-a)b = (a + (-a))b =
$$

$$
(a + (-a))b = 0b = 0
$$

We conclude that $(-a)b$ is the additive inverse of $ab$. Therefore,

$$
(-a)b = -(ab)
$$

> [!TIP] **Proposition 5.1.2**
>
> Let $a, b, c \in \mathbb{Z}$
>
> 1. $(-a)(-b) = ab$
> 2. $a(b - c) = ab - ac$
> 3. $(-1)a = -a$
> 4. $(-1)(-1) = 1$
> 5. **Closure Property** $\mathbb{Z}^+$ is closed with respect to addition and multiplication: if $x, y \in \mathbb{Z}^+$, then $x + y \in \mathbb{Z}^+$ and $xy \in \mathbb{Z}^+$.
> 6. **Trichotomy Law**: For every integer $x$, exactly one of the following statements is true $x \in \mathbb{Z}^+$, $-x \in \mathbb{Z}^+$, or $x = 0$.

### Inequalities

In the set $\mathbb{Z}$ of integers, there is a notion of one element being "smaller" than another. A formal definition of this notion is the following.

> [!NOTE] **Integer inequality**
>
> Let $x, y \in \mathbb{Z}$. We say $x < y$ if $y - x \in \mathbb{Z}^+$.

If $x < y$, we can also write $y > x$. We also write $x \leq y$ if $x < y$ or $x = y$. Similarly, $y \geq x$ if $y > x$ or $y = x$.

Note also that the symbols $<$ and $\leq$ define relations on $\mathbb{Z}$ and that the symbol $\leq$ defines a linear ordering on $\mathbb{Z}$.

It follows from the previous definition that for every integer $n$, the statement $n > 0$ is equivalent to the statement $n \in \mathbb{Z}^+$ and the statement $n < 0$ is equivalent to the statement $-n \in \mathbb{Z}^+$. Therefore, we can say: $\mathbb{Z}^+ = {n \in \mathbb{Z} | n > O}$.

### The Well-Ordering Principle

Our final axiom of $\mathbb{Z}$ is known as the **Well-Ordering Principle** and is another property of $\mathbb{Z}^+$.

> [!NOTE] **Well-Ordering Principle**
>
> Every nonempty subset of $\mathbb{Z}^+$ has a smallest element; that is, if $S$ is a nonempty subset of $\mathbb{Z}^+$, then there exists $a \in S$ such that $a \leq x$ for all $x \in S$.

Despite its apparent simplicity, the Well-Ordering Principle is an impotant tool for proving properties of the integers.

> [!TIP] **Corollary 5.1.8**
>
> The only integers having multiplicative inverses in Z are $\pm 1$.

**Proof**

It can be restated as:

> For all $a \in \mathbb{Z}$, $a$ has a multiplicative inverse in $\mathbb{Z} \Leftrightarrow a = \pm 1$

To prove the first implication, suppose $a \in \mathbb{Z}$ has a multiplicative inverse in $\mathbb{Z}$. Then there exists $x \in \mathbb{Z}$ such that $ax = 1$. Clearly $a \neq 0$, so $a \in \mathbb{Z}^+$ or $-a \in \mathbb{Z}^+$.

Suppose $a \in \mathbb{Z}^+$ and $a \neq 1$. Then $a > 1$, and since $ax = 1 \in \mathbb{Z}^+$, $x \in \mathbb{Z}^+$ also.

Now since $x \neq 0$, $x \geq 1$. Multiplying both sides of the inequality $a > 1$ by $x$, we get $1 = ax > 1x \geq 1$, a contradiction. Therefore $a = 1$.

If $- a \in \mathbb{Z}^+$, a similar proof shows that $a = - 1$. It now follows that if a has a multiplicative inverse in $\mathbb{Z}$, then $a = \pm 1$.

Conversely, if $a = \pm 1$, then $a$ has a multiplicative inverse in $\mathbb{Z}$ since $(1)(1) = 1$ and $(-1)(- 1) = 1$.

## Induction

### Induction: A Method of Proof

Induction is a method for proving statements about the positive integers. Let $P(n)$ be such a statement. $P(n)$ may be a formula, such as "the sum of the first $n$ positive integers is $n(n + 1)/2$" or "the sum of the first $n$ odd positive integers is a perfect square."

The purpose of an induction proof is to show that a statement $P(n)$ is true for every positive integer $n$. The first step is to verify that $P(1)$ is true; that is, that the statement is true when $n = 1$. Once $P(1)$ is established to be true, we want to verify $P(2)$, $P(3)$, $P(4)$, and so on. Since there are an infinite number of these statements, they cannot all be verified separately.

In an induction proof, we show that, given a positive integer $k$ for which $P(k)$ is true, it follows that the statement $P(k + 1)$ is true.

Thus in an induction proof, there are two steps required: first, prove that $P(1)$ is true; and second, assuming $P(k)$ is true for a positive integer $k$, prove that $P(k + 1)$ is true.

What follows is a formal proof of the induction principle, called the First Principle of Mathematical Induction.

> [!NOTE] **First Principle of Mathematical Indcution**
>
> Let $P(n)$ be a statement about the positive integer $n$. Suppose that
>
> 1. $P(1)$ is true
> 2. Whenever $k$ is a positive integer for which $P(k)$ is true, then $P(k + 1)$ is also true.
>
> Then $P(n)$ is true for every positive integer $n$.

The assumption that $P(k)$ is true in condition 2 is called the **induction hypothesis**.

**Proof**

Let $S$ be the set of all positive integers for which $P(n)$ is false. If we can show that $S = \emptyset$, it will follow that $P(n)$ is true for all positive integers $n$. We will assume that $S \neq \emptyset$ and derive a contradiction.

Since $S \neq \emptyset$, by the [Well-Ordering Principle](#the-well-ordering-principle), $S$ has a smallest element. Call it $k_0$. Now $1$ is not in $S$ since $P(1)$ is true, so $k_0 > 1$. Therefore $k_0 - 1$ is a positive integer and is not in $S$ by the choice of $k_0$ as the smallest element of $S$. Therefore $P(k_0 - 1)$ is true. But then by condition 2, $P(k_0 - 1 + 1) = P(k_0)$ is true. But $P(k_0)$ must be false since $k_0$ is in $S$.

This gives us our contradiction and so $S = \emptyset$.

### Some Other Forms of Induction

Sometimes a statement $P(n)$ may be true not for all positive integers $n$ but rather for all integers beyond a certain point, say for all integers $n > 5$.

> [!NOTE] **First Principle of Mathematical Induction, Modified Form**
>
> Let $P(n)$ be a statement about the integer $n$. Suppose there is an integer $n_0$ such that
>
> 1. $P(n_0)$ is true.
> 2. Whenever $k \geq n_0$ is an integer for which $P(k)$ is true, then $P(k + 1)$ is also true.
>
> Then $P(n)$ is true for every integer $n \geq n_0$.

Sometimes, in order to do a proof by induction, it is necessary to modify the induction hypothesis and assume more than just that $P(k)$ is true for a given $k$ but rather that $P(i)$ is true for all positive integers $i \leq k$ and then prove that $P(k + 1)$ is true. This stronger induction hypothesis is still sufficient to prove that $P(n)$ is true for all positive integers $n$.

> [!NOTE] **Second Principle of Mathematical Induction**
>
> Let $P(n)$ be a statement about the positive integer $n$. Suppose that
>
> 1. $P(1)$ is true.
> 2. If $k \in \mathbb{Z}^+$ and $P(i)$ is true for every positive integer $i \leq k$, then $P(k + 1)$ is true.
>
> Then $P(n)$ is true for every positive integer $n$.

The Principle of Induction is often stated in the language of sets. The theorem that follows is a restatement of the First Principle of Mathematical Induction in set theory language. The other forms of induction may be restated in a similar way.

> [!NOTE] **Theorem 5.2.4**
>
> Let $S$ be a subset of $\mathbb{Z}^+$. Suppose that
>
> 1. $1 \in S$
> 2. If $k$ is a positive integer for which $k \in S$, then $k + 1 \in S$.
>
> Then $S = \mathbb{Z}^+$

### The Binomial Theorem

An important application of mathematical induction is the Binomial Theorem.

> [!NOTE] **The Binomial Theorem**
>
> Let $n \in \mathbb{Z}^+$ and $r \in \mathbb{Z}$ such that $0 \leq r \leq n$. The **binomial coefficient** $binom{n}{r}$ is defined as
>
> $$\binom{n}{r} = \frac{n!}{r!(n - r)!}$$

> [!NOTE] **Theorem 5.2.7**
>
> Let $a, b \in \mathbb{Z}$ and let $n \in \mathbb{Z}^+$. Then
>
> $$(a + b)^n = \sum_{k=0}^n \binom{n}{k} a^{n - k} b^k$$

**Proof**

We'll assume $a$ and $b$ are given and that, for each $n \in \mathbb{Z}^+$, $P(n)$ is the statement $(a + b)^n = \sum_{k=0}^n \binom{n}{k} a^{n - k}b^k$.

It is easy to see that $P(1)$ is true. Now suppose that $n$ is a given positive integer and that $P(n)$ is true. We will prove that $P(n + 1)$ is true.

$$
(a + b)^{n + 1} = (a + b)(a + b)^n
$$

$$
= a(a + b)^n + b(a + b)^n
$$

$$
= a \left[\sum_{k = 0}^n \binom{n}{k} a^{n - k}b^k\right] + b\left[\sum_{k = 0}^n \binom{n}{k} a^{n - k}b^k\right]
$$

$$
= \sum_{k = 0}^n \binom{n}{k} a^{n + 1 - k}b^k + \sum_{k = 0}^n \binom{n}{k} a^{n - k}b^{k + 1}
$$

$$
= a^{n + 1}\sum_{k = 1}^n \binom{n}{k} a^{n + 1 - k}b^k + \sum_{k = 0}^{n - 1} \binom{n}{k} a^{n - k}b^{k + 1} + b^{n + 1}
$$

Now by a change of index, we can write

$$
\sum_{k = 0}^{n - 1} \binom{n}{k} a^{n - k}b^{k + 1} = \sum_{k = 1}^n \binom{n}{k - 1} a^{n + 1 - k}b^{k}
$$

Hence we have

$$
= a^{n + 1}\sum_{k = 1}^n \left[\binom{n}{k} + \binom{n}{k - 1}\right] a^{n + 1 - k}b^k + b^{n + 1}
$$

$$
= a^{n + 1}\sum_{k = 1}^n \binom{n + 1}{k} a^{n + 1 - k}b^k + b^{n + 1}
$$

$$
= \sum_{k = 0}^{n + 1} \binom{n + 1}{k} a^{n + 1 - k}b^k
$$

This proves $P(n + 1)$ and by induction it follows that $P(n)$ is true for all positive integers $n$.

The Binomial Theorem is also true when $a$ and $b$ are real numbers. The reason is that the axioms of addition and multiplication that hold in $\mathbb{Z}$ (Axioms 1-8) also hold in $\mathbb{R}$.
