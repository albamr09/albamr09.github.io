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
