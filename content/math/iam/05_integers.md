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

Note that $0$ is the only additive identity of $\mathbb{Z}$ and that $1$ is the only multiplicative identity.

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

## The Division Algorithms and Greatest Common Divisors

> [!NOTE] **Division Algorithm**
>
> Let $a$, $b$ be integers with $b > 0$. Then, there exist unique integers $q$ and $r$ such that $a = bq + r$ where $0 \leq r < b$.

**Proof**. Let $S = \\{n \in \mathbb{Z} | n = a - bx, \text{ for some } x \in \mathbb{Z}\\}$ and let $S_0 = \\{n \in S | n \geq 0\\}$; that is $S_0$ is the set of nonnegative elements of $S$.

We claim that $S_0$ is nonempty. Note that $a \in S$ since $a = a - b \cdot 0$. So if:

1. $a \geq 0$, $a \in S_0$.
2. $a < 0$, then $a - ba \in S$. But $a - ba = a(1 - b) \geq 0$ since $a < 0$ and $1 - b \geq 0$. Hence $a - ba \in S_0$.

In any case $S_0$ is nonempty.

Now let $r$ be the smallest element of $S_0$. If $0 \in S_0$, then $r = 0$. If $0 \not \in S_0$, then $r$ exists by the Well-Ordering Principle.

We have $r = a - bq$ for some $q \in \mathbb{Z}$ and $r \geq 0$. Suppose that $r \geq b$. Then $r - b = a - b(q + 1) \in S_0$. But this contradicts the fact that $r$ is the least element of $S_0$. Hence $0 \leq r < b$.

To prove uniqueness, suppose there also exist $q_1$ and $r_1$ in $\mathbb{Z}$ such that $a = bq_1 + r_1$ where $0 \leq r_1 < b$. Without loss of generality, we can assume that $r \geq r_1$.

Since $a = bq + r$, we have

$$
b(q_1 - q) = r - r_1 \geq 0
$$

Therefore, $q_1 - q \geq 0$. If $q_1 -q \neq 0$, then $r - r_1 \geq b$, a contradiction since $0 \leq r < b$ and $0 \leq r_1 < b$. It follows inmmediately that $q_1 = q$ and $r_1 = r$.

### Divisors and Greatest Common Divisors

When the remainder in the Division Algorithm is zero, we say that $a$ is divisible by $b$ or $b$ divides $a$. More formally, we have:

> [!NOTE] **Divisibility**
>
> Let $a, b$ be integers. We say $b$ **divides** $a$, written $b | a$, if there is an integer $c$ such that $bc = a$. We say that $b$ and $c$ are **factors** of $a$ or that $a$ is **divisible** by $b$ and $c$.

> [!TIP] **Proposition 5.3.3**
>
> Let $a, b, c \in \mathbb{Z}$
>
> 1. If $a | 1$ then $a = \pm 1$
> 2. If $a | b$ and $b | a$, then $a = \pm b$
> 3. If $a | b$ and $a | c$, then $a | bx + cy$ for any $x, y \in \mathbb{Z}$
> 4. If $a | b$ and $b | c$, then $a | c$

**Proof of 1**. If $a | 1$ then there exists $x \in \mathbb{Z}$ such that $ax = 1$. Hence $a$ has a multiplicative inverse in $\mathbb{Z}$. Thus $a = \pm 1$.

> [!NOTE] **Greatest Common Divisor**
>
> Let $a, b$ be integers, not both zero. A positive integer $d$ is called a **greatest common divisor** of $a$ and $b$ if
>
> 1. $d$ divides $a$ and $d$ divides $b$; that is, $d$ is a **common divisor** of $a$ and $b$
> 2. whenever an integer $c$ divides both $a$ and $b$, then $c$ divides $d$

The next theorem shows that every pair of integers $a$ and $b$ (not both zero) has a greatest common divisor and that it is unique.

> [!TIP] **Theorem 5.3.5**
>
> Let $a, b \in \mathbb{Z}$, not both zero. Then a greatest common divisor $d$ of $a$ and $b$ exists and is unique. Moreover, there exist integers $x$ and $y$ such that $d = ax+ by$.

**Proof**. Let $S = \\{n \in \mathbb{Z} | n = ax + by, \text{ for some } x, y \in \mathbb{Z}\\}$. $S$ is a subset of $\mathbb{Z}$ that contains both $a$ and $b$ sin $a = a \cdot 1 + b \cdot 0$. and $b = a \cdot 0 + b \cdot 1$.

Similarly $-a$ and $-b$ are in $S$, so $S$ must contain positive integers. By the Well-Ordering Principle, $S$ has a smallest positive element. Call it $d$. We now show that $d$ is a greatest common divisor of $a$ and $b$.

First, notice that $d \in S$, so there exist integers $x$ and $y$ such that $d = ax + by$. This proves the second statement of the theorem. Next, applying the Division Algorithm to $a$ and $d$, there exist $q, r \in \mathbb{Z}$, such that $a = dq + r$ where $0 \leq r < d$.

But

$$
r = a - dq = a - (ax + by) q = a(1 - xq) + b(-yq)
$$

which implies that $r \in S$.

Since $d$ is the least positive integer in $S$, we must have $r = O$. Therefore $d | a$. Similarly, we can show that $d | b$.

Finally, suppose that $c$ is a common divisor of $a$ and $b$. Then there exist integers $u$ and $v$ such that $cu = a$ and $cv = b$. Therefore,

$$
d = ax + by = c(ux + vy),
$$

and we have that $c | d$. This proves that $d$ is a greatest common divisor of $a$ and $b$.

### Euclidean Algorithm

We now give a procedure, using the Division Algorithm, for computing the g.c.d. of two integers.

> [!TIP] **Lemma 5.3.6**
>
> Let $a, b \in \mathbb{Z}$, not both zero. Suppose that there exist integers $q$ and $r$ such that $a = bq + r$. Then $gcd(a, b) = gcd(b, r)$.

> [!NOTE] **Euclidean Algorithm**
>
> Let $a, b$ be two positive integers with $a > b$. By repeated application of the Division Algorithm, we get
>
> $$a = bq_1 + r_1, \text{ where } q_1, r_1 \in \mathbb{Z}, 0 \leq r_1 < b$$
>
> $$b = r_1q_2 + r_2, \text{ where } q_2, r_2 \in \mathbb{Z}, 0 \leq r_2 < r_1$$
>
> $$r_1 = r_2q_3 + r_3, \text{ where } q_3, r_3 \in \mathbb{Z}, 0 \leq r_3 < r_2$$
>
> Because each remainder is strictly less than the previous one, we eventually get
>
> $$r_{n - 2} = r_{n - 1}q_{n} + r_n, \text{ where } q_n, r_n \in \mathbb{Z}, 0 \leq r_n < r_{n - 1}$$
>
> $$r_{n - 1} = r_{n}q_{n + 1} + r_{n + 1}, \text{ where } q_{n + 1} \in \mathbb{Z} \text{ and } r_{n + 1} = 0$$
>
> By Lemma 5.3.6, we have
>
> $gcd(a, b) = gcd(b, r_1) = gcd(r_1, r_2) = gcd(r_2, r_3) = \cdots = gcd(r_{n - 1}, r_n) = gcd(r_n, 0) = r_n$

Thus the g.c.d. of $a$ and $b$ is the last nonzero remainder that occurs in this procedure.

### Relatively Prime Integers

Often a pair of integers will have no common divisors except for the obvious ones of $1$ and $-1$.

> [!NOTE] **Relative Primes**
>
> Two integers $a$ and $b$, not both zero, are said to be relatively prime if $gcd(a, b) = 1$.

> [!TIP] **Theorem 5.3.8**
>
> Let $a, b \in \mathbb{Z}$. Then $a$ and $b$ are relatively prime if and only if there exist integers $x$ and $y$ such that $ax + by = 1$.

**Proof**. Suppose $a$ and $b$ are relatively prime. Then

$$
1 = gcd(a, b) = ax + by \text{ for some } x, y \in \mathbb{Z}
$$

Conversely, suppose there exist $x, y \in \mathbb{Z}$ such that $ax + by = 1$. Let $d = gcd(a, b)$. Since $d$ divides both $a$ and $b$, $d$ also divides $ax + by$.

Therefore $d | 1$, and $d = 1$.

> [!TIP] **Theorem 5.3.9**
>
> Let $a, b, c \in \mathbb{Z}$. Suppose $a | bc$ and $gcd(a, b) = 1$. Then $a | c$.

**Proof**. Since $a | bc$, there is a $z$ in $\mathbb{Z}$ such that $az = bc$. Also, by Theorem 5.3.8, there are $x, y$ in $\mathbb{Z}$ such that $ax + by = 1$. Then

$$
c = c(ax + by) = cax + cby = cax + azy = a(cx + zy)
$$

Hence $a | c$.

## Primes and Unique Factorization

### Prime Numbers

Every positive integer greater than $1$ has at least two positive divisors: itself and $1$. Some positive integers greater than $1$ have the property that these are the only positive divisors.

> [!NOTE] **Prime Numbers**
>
> An integer $p$ greater than $1$ is called a **prime** number if the only divisors of $p$ are $\pm 1$ and $\pm p$.

If an integer greater than $1$ is not prime, it is called **composite**.

Prime numbers are the building blocks of the integers since every positive integer can be written as a product of primes in an essentially unique way. This important fact, called the Unique Factorization Theorem.

> [!TIP] **Lemma 5.4.2**
>
> Let $n \in \mathbb{Z}^+, n > 1$. Then $n$ is composite if and only if there exist integers $a$ and $b$ such that $n = ab$ where $1 < a < n$ and $1 < b < n$.

> [!TIP] **Proposition 5.4.3**
>
> Every integer greater than $1$ is divisible by a prime number.

**Proof**. Let $T = \\{n \in \mathbb{Z}^+ | n > 1 \text{ and } n \text{ is not divisible by a prime number}\\}$. It suffices to prove that $T = \emptyset$. Suppose, on the contrary, that $T \neq \emptyset$. Then by the Well-Ordering Principle, $T$ has a smallest element. Call it $n_0$.

Now $n_0$ itself cannot be prime, otherwise it would be divisible by a prime, namely itself. So by Lemma 5.4.2, there exist integers $a$ and $b$ such that

$$
n_o = ab \text{ where } 1 < a < n_0 \text{ and } 1 < b < n_0
$$

Since $a$ is smaller than $n_0$, $a$ is not in $T$. Hence $a$ is divisible by some prime $p$. Since $p$ divides $a$ and clearly $a$ divides $n_0$, by the transitivity of divisibility, $p$ divides $n_0$. This is a contradiction to the fact that $n_0$ is in $T$. Thus $T = \emptyset$.

> [!TIP] **Proposition 5.4.4**
>
> If a prime number $p$ divides a product $ab$, where $a, b \in \mathbb{Z}$, then $p$ divides $a$ or $p$ divides $b$.

**Proof**. Suppose $p$ does not divide $a$. Then $a \neq 0$ and so $(p, a) = 1$, since the only positive divisors of $p$ are $1$ and $p$. It now follows from Theorem 5.3.9 that $p$ divides $b$.

> [!TIP] **Corollary 5.4.5**
>
> Let $p$ be a prime and let $a_1, a_2, \cdots a_m \in \mathbb{Z}$.If $p$ divides the product $a_1 \cdot a_2 \cdot ... \cdot a_m$, then $p$ divides $a_i$ for some $i = 1 , 2, ..., m$.

> [!TIP] **Corollary 5.4.6**
>
> Let $p$ be a prime and let $a \in \mathbb{Z}$.If $p$ divides $a^m$ for some positive integer $m$, then $p$ divides $a$.

### Unique Factorization

We are now in a position to prove one of the most important theorems about the integers, the **Unique Factorization Theorem**. The theorem has two parts: an existence part, which says that every integer greater than $1$ is a product of primes, and a uniqueness part, which states that this product is unique except for the order in which the primes occur.

> [!NOTE] **Unique Factorization Theorem**
>
> Let $n \in \mathbb{Z}, n > 1$. Then $n$ is a prime number or can be written as a product of prime numbers. Moreover, the product is unique, except for the order in which the factors appear.

**Proof of existence**. Let $P(n)$ be the statement: $n = 1$, $n$ is prime or $n$ is a product of primes. Trivially, $P(1)$ is true.

Suppose that $k \in \mathbb{Z}^+$ and that $P(i)$ is true for all $i$ such that $1 \leq i \leq k$. We will show that $P(k + 1)$ is true.

If $k = 1$, then $P(k + 1) = P(2)$ is true since $2$ is prime.

Now suppose that $k > 1$. The induction hypothesis tells us that every integer $i$ such that $1 < i \leq k$ is prime or a product of primes. If $k + 1$ is prime, then clearly $P(k + 1)$ is true. If $k + 1$ is not prime, then by Lemma 5.4.2, $k + 1 = ab$, where $1 < a < k + 1$ and $1 < b < k + 1$.

By the induction hypothesis, both $a$ and $b$ are primes or products of primes. Therefore $k + 1 = ab$ is a product of primes, again implying $P(k + 1)$ is true. It now follows by induction that $P(n)$ is true for all integers $n \geq 1$. Therefore, every integer $n > 1$ is a prime or a product of primes.

> [!TIP] **Euclid's Theorem**
>
> There are infinitely many prime numbers.

**Proof**. Suppose that, on the contrary, there are only finitely many primes $p_1, p_2, \cdots, p_r$. Let $m = p_1 \cdot p_2 \cdot ... \cdot p_r + 1$.

Let $p$ be a prime that divides $m$. (Why must such a prime exist?) Because $p = p_i$ for some $i = 1, 2, \cdots, r$, $p$ also divides $p_1 \cdot p_2 \cdot ... \cdot p_r$. Therefore, $p$ divides

$$
m - p_1 \cdot p_2 \cdot ... \cdot p_r = 1,
$$

a contradiction. Thus there must in fact be infinitely many primes.

Some deceptively simple problems concerning primes remain unsolved, even after centuries of effort by mathematicians. For example, two primes that differ by 2 are called **twin primes**: 3 and 5, 5 and 7, 11 and 13, and 17 and 1 9 are such pairs. Remarkably, it is unknown whether there are infinitely many pairs of twin primes.

Another unsolved problem involving primes is the assertion, known as **the Goldbach Conjecture**, that every even integer greater than 4 is the sum of two odd prime numbers.

## Congruences

### Congruences and Their Properties

In this section we introduce the language of congruences.

> [!TIP] **Proposition 5.5.1**
>
> Let $a, b, c \in Z$ and let $n \in \mathbb{Z}^+$.
>
> 1. $a \equiv a \mod n$
> 2. If $a \equiv b \mod n$, then $b \equiv a \mod n$
> 3. If $a \equiv b \mod n$ and $b \equiv c \mod n$, then $a \equiv c \mod n$

> [!TIP] **Proposition 5.5.2**
>
> Let $a, b, c \in Z$ and let $n \in \mathbb{Z}^+$.
>
> 1. If $a \equiv b \mod n$ and $c \equiv d \mod n$, then $a + c \equiv b + d \mod n$ and $ac \equiv ac \mod n$.
> 2. If $ab \equiv ac \mod n$ and $\text{gcd}(a, n) = 1$, then $b \equiv c \mod n$.

Notice that the cancellation property in 2 of Proposition 5.5.2 does not necessarily hold if $a$ and $n$ are not relatively prime.

> [!TIP] **Corollary 5.5.3**
>
> If $a \equiv b \mod n$, then $a^k \equiv b^k \mod n$ for every positive integer $k$.

The following proposition is very useful for doing problems involving congruences.

> [!TIP] **Proposition 5.5.4**
>
> Let $n \in \mathbb{Z}$, $n > 1$. If $a \in \mathbb{Z}$, then $a$ is congruent mod $n$ to exactly one of the integers $0, 1, 2, \cdots, n - 1$.

**Proof**. Let $a \in \mathbb{Z}$. By the [Division Algorithm](#the-division-algorithms-and-greatest-common-divisors), there exist $q$, $r$ in $\mathbb{Z}$ such that $a = nq + r$, where $0 \leq r < n$.

Thus $a - r$ is divisible by $n$, so $a \equiv r \mod n$. Hence $a$ is congruent to one of the integers $0, 1, 2, \cdots, n - 1$.

If $a$ is also congruent to some $s$ where $0 \leq s < n$, then $r \equiv s \mod n$. But since $r$ and $s$ are both less than $n$, their difference cannot be divisible by $n$ unless $r = s$. Therefore $a$ is congruent mod $n$ to exactly one of the integers $0, 1, 2, \cdots, n - 1$.

> [!NOTE] **Congruence Class**
>
> For each $a \in \mathbb{Z}$, we let $[a]$ be the equivalence class of a with respect to the equivalence relation of congruence $\mod n$:
>
> $$[a] = \{x \in \mathbb{Z} | x \equiv a \mod n\}$$
>
> We will call $[a]$ the **congruence class** of $a \mod n$.

By Proposition 5.5.4, if $a \in \mathbb{Z}$, then $a \equiv r$ for exactly one integer $r$ such that $0 \leq r \leq n - 1$. Therefore $a \in [r]$. Thus there are exactly $n$ distinct congruence classes; namely, $[0], [1], [2], \cdots , [n - 1]$. To see which equivalence class a given integer $a$ is in, we just compute the remainder when $a$ is divided by $n$.

In general, for congruences $\mod n$, $[a] = [b]$ if and only if $a \equiv b \mod n$.

### The Set of Congruence Classes

For $n \in \mathbb{Z}, n > 1$, we will let $\mathbb{Z}_n$ denote the set of congruence classes $\mod n$. Thus $\mathbb{Z}_n = {[0], [1], [2] , \cdots, [n - 1]}$.

First we define addition on $\mathbb{Z}_n$ using the symbol $+$ as follows: if $[a], [b] \in Z_n$, then $[a] + [b] = [a + b]$, for any $a, b \in \mathbb{Z}$.

If this definition gives a real binary operation, then the sum of the classes $[a]$ and $[b]$ should be the same if $a$ and $b$ are replaced by other integers representing the same classes. In that case we can say that addition is **well defined**.

We must show that if $[a] = [a']$ and $[b] = [b']$, then $[a + b] = [a' + b']$. But if $[a] = [a ']$ and $[b] = [b']$, then $a \equiv a'$ and $b \equiv b' \mod n$. Now applying Proposition 5.5.2, we get that $a + b \equiv a' + b' \mod n$, which implies that $[a + b] = [a' + b']$. We have now proved that addition on $\mathbb{Z}_n$ is well defined.

> [!TIP] **Theorem 5.5.5**
>
> Let $n \in \mathbb{Z}, n > 1$
>
> 1. Addition in $\mathbb{Z}_n$ is commutative: $[a] + [b] = [b] + [a]$ for all $a, b \in \mathbb{Z}$.
> 2. Addition in $\mathbb{Z}_n$ is associative: $([a] + [b]) + [c] = [a] + ([b] + [c])$ for all $a, b, c \in \mathbb{Z}$.
> 3. $[0]$ is the identity element of $\mathbb{Z}_n$ with respect to addition: $[a] + [0] = [a] = [0] + [a]$ for all $a \in \mathbb{Z}$.
> 4. Every element of $\mathbb{Z}_n$ has an inverse with respect to addition. For any $a$ in $\mathbb{Z}$, the additive inverse of $[a]$ is $[-a]$.

Next we define multiplication on $\mathbb{Z}_n$ by letting $[a][b] = [ab]$, for all $a, b \in \mathbb{Z}$.

> [!TIP] **Theorem 5.5.6**
>
> Let $n \in \mathbb{Z}, n > 1$
>
> 1. Multiplication in $\mathbb{Z}_n$ is commutative: $[a][b] = [b][a]$ for all $a, b \in \mathbb{Z}$.
> 2. Multiplication in $\mathbb{Z}_n$ is associative: $([a][b])[c] = [a]([b][c])$ for all $a, b,
e \in \mathbb{Z}$.
> 3. $[1]$ is the multiplicative identity of $\mathbb{Z}_n$: $[a][1] = [a] = [1][a]$ for all $a \in \mathbb{Z}$.
> 4. The following distributive laws hold: $[a]([b] + [c]) = [a][b] + [a][c]$ and $([a] + [b])[c] = [a][c] + [b][c]$ for all $a, b, c \in \mathbb{Z}$.

The following theorem gives an explicit criterion for an element of $\mathbb{Z}_n$ to have a multiplicative inverse.

> [!TIP] **Theorem 5.5.7**
>
> Let $[a] \in \mathbb{Z}_n$. Then $[a]$ has a multiplicative inverse if and only if $a$ and $n$ are relatively prime.

**Proof**

If $[a]$ has a multiplicative inverse, then there exists an element $[x] \in \mathbb{Z}_n$ such that $[a][x] = [1]$. It follows that $[ax] = [1]$ and hence $ax \equiv 1 \mod n$.

This implies that $n$ divides $ax - 1$, which means that $ax - 1 = nt$ for some $t \in \mathbb{Z}$. Hence $ax + n(-t) = 1$. By Theorem 5.3.8, $a$ and $n$ are relatively prime.

Conversely, if $a$ and $n$ are relatively prime, there exist integers $x$ and $y$ such that $ax + ny = 1$. Hence $[1] = [ax + ny] = [ax] + [ny] = [a] [x] + [n] [y]$.

But $[n] = [0]$, so we have $[a][x] = [1]$, and therefore $[x]$ is the multiplicative inverse of $[a]$.

> [!TIP] **Theorem 5.5.8**
>
> Let $a, b, n \in \mathbb{Z}, n > 1$, and suppose that $\text{gcd}(a, n) = 1$. Then the congruence $ax \equiv b \mod n$ has a unique solution $\mod n$; that is, there is an integer $x$ such that $ax \mod b \mod n$, and if $y$ is another integer such that $ay \equiv b \mod n$, then $y \equiv x \mod n$.

**Proof**. Since $\text{gcd}(a, n) = 1$, there are integers $t$ and $s$ such that $as + nt = 1$. Multiplying by $b$, we get $asb + ntb = b$. Letting $x = sb$, we have $ax \equiv b \mod n$. If $ay \equiv b \mod n$ for some $y$ in $\mathbb{Z}$, then $ax \equiv ay \mod n$, and $x \equiv y \mod n$.

Notice that if $x$ is a solution to the congruence $ax \equiv b \mod n$, then the set of all solutions to the congruence is the congruence class $[x]$.

> [!NOTE] **Fermat's Little Theorem**
>
> If $n$ is any integer and $p$ is a prime number, then $n^p - n$ is divisible by $p$. In congruence notation
>
> $$n^p \equiv n \mod p$$

A corollary of Fermat's Little Theorem is that if $n$ is relatively prime to $p$, then $n^{p - 1} \equiv \mod p$.

## Generalizing a Theorem

One way that mathematicians have been able to discover new facts is by extending or generalizing the results of a known theorem by conjecturing and then proving a result that verifies more cases of the known theorem or that proves a theorem of which the known theorem is a special case.

In this section, we illustrate this approach to discovering new facts by look at a theorem that says that for every integer $n$, $n$ is even if and only if $n^2$ is even. One way to extend this result would be to consider other exponents.

> [!TIP] **Theorem 5.6.2**
>
> Let $k$ be a positive integer. Then for every integer $n$, $n$ is even if and only if $n^k$ is even.

In proving the original theorem, we needed to use only simple algebraic properties of the integers. But in proving the more general result in Theorem 5.6.2, we needed to use [the Binomial Theorem](/math/agaa/11_further_topics/#the-binomial-theorem). It is usually the case in mathematics that extending a theorem often requires using more sophisticated methods or additional theorems and lemmas.

There is another way to extend the result of the original theorem. To say that an integer $n$ is even is equivalent to saying that it is divisible by $2$. So it is natural to ask whether it can be extended to divisibility by $3$; that is, is it true that for every integer $n$, $n$ is divisible by $3$ if and only if $n^2$ is divisible by $3$?

> [!TIP] **Proposition 5.6.3**
>
> For every integer $n$, $n$ is divisible by $3$ if, and only if, $n^2$ is divisible by $3$.

The next case to consider is divisibility by $4$. A quick look at examples and we see that the statement

> "For every integer $n$, $n$ is divisible by $4$ if and only if $n^2$ is divisible by $4$

is false. Let $n = 2$. Then $n^2 = 4$ is divisible by $n2 = 4$ but $n$ is not.

So we are led to the following question: For what positive integers $k$ is it true that for every integer $n$, $n$ is divisible by $k$ if and only if $n^2$ is divisible by $k$?

It is easy to see that one of the implications is true for every positive integer $k$; namely, for every integer $n$, if n is divisible by $k$, then $n^2$ is divisible by $k$.

It is the converse that is interesting. Let $S(k)$ be the statement

> For every integer $n$, if $n^2$ is divisible by $k$, then $n$ is divisible by $k$.

We would like to know for which positive integers $k$ the statement $S(k)$ is true.

We know that $S(k)$ is true for $k = 1$, for $k = 2$, and for $k = 3$. It is false for $k = 4$. Since $2$ and $3$ are primes, we might conjecture that $S(k)$ is true if $k$ is prime and false if $k$ is not prime.

> [!TIP] **Proposition 5.6.4**
>
> If $k$ is a primer number, the for every integer $n$, $n^2$ is divisible by $k$, then $n$ is divisible by $k$.

Now what about composite values of $k$?

> [!TIP] **Proposition 5.6.6**
>
> Let $p$ and $q$ be distinct primes and let $k = pq$. For every integer $n$, if $n^2$ is divisible by $k$, then $n$ is divisible by $k$.

Next, let's consider how we may generalize Proposition 5.6.6 even more. A reasonable generalization would be to look at the product of more than two distinct primes. In fact, $S(k)$ is true whenever $k$ is a product of distinct primes.

> [!TIP] **Proposition 5.6.9**
>
> Let $p_1, p_2, \cdots, p_m$ be distinct prime numbers. Let $k =  p_1 \cdot p_2 \cdots p_m$. For every integer $n$, if $n^2$ is divisible by $k$, then $n$ is divisible by $k$.

Is it possible that $S(k)$ is true for other $k$ besides those $k$ that are the product of distinct primes?

> [!TIP] **Proposition 5.6.10**
>
> $S(k)$ is false if $k$ is not the product of distinct primes.

We summarize these results in the following theorem.

> [!NOTE] **Theorem 5.6.11**
>
> If $k \geq 2$, then $S(k)$ is true if, and only if, $k$ is a product of distinct primes.
