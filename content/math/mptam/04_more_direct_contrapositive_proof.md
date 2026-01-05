---
title: More on Direct Proof and Proof by Contrapositive
weight: 4
type: docs
math: true
---

## Proofs Involving Divisibility of Integers

> [!NOTE] **Divisibility**
>
> For integers $a$ and $b$ where $a \neq 0$, we say that $a$ **divides** $b$ if there exists an integer $c$ such that $b = ac$. The standard notation for this relationship is $a | b$. If a does not divide $b$, we write $a \not | b$.

Associated with this definition are two key terms. If $a | b$, we say that $b$ is a **multiple** of $a$, and that $a$ is a **divisor** of $b$.

The abstract properties of divisibility are not merely asserted; they are formally established through logical proof. This section demonstrates the application of the direct proof method to establish three foundational theorems of divisibility.

> [!TIP] **The Transitive Property**
>
> Let $a, b$ and $c$ be integers with $a \neq 0$ and $b \neq 0$. If $a | b$ and $b | c$, then $a | c$.

> **Proof**
>
> Assume that $a | b$ and $b | c$. By the definition of divisibility, there exist integers $x$ and $y$ such that $b = ax$ and $c = by$.
>
> By substituting the expression for $b$ into the equation for $c$, we obtain:
>
> $$c = by = (ax)y = a(xy)$$
>
> Since $x$ and $y$ are integers, their product $xy$ is also an integer. Therefore, $c$ can be expressed as the product of $a$ and an integer, which satisfies the definition of $a | c$.

> [!TIP] **Divisibility of Products**
>
> Let $a, b, c$ and $d$ be integers with $a \neq 0$ and $b \neq 0$. If $a | c$ and $b | d$, then $ab | cd$.

> **Proof**
>
> Assume that $a | c$ and $b | d$. By definition, this means $c = ax$ and $d = by$ for some integers $x$ and $y$.
>
> We then consider the product $cd$:
>
> $$cd = (ax)(by) = (ab)(xy)$$
>
> Since $x$ and $y$ are integers, $xy$ is also an integer. Thus, the product $cd$ is a multiple of $ab$, which means $ab | cd$.

> [!TIP] **The Property of Linear Combinations**
>
> Let $a, b, c, x, y \in \mathbb{Z}$, where $a \neq 0$. If $a | b$ and $a | c$, then $a | (bx + cy)$.

> **Proof**
>
> Assume that $a | b$ and $a | c$. This implies that $b = ar$ and $c = as$ for some integers $r$ and $s$.
>
> We examine the linear combination $bx + cy$:
>
> $$bx + cy = (ar)x + (as)y = a(rx + sy)$$
>
> Since $r, s, x$, and $y$ are all integers, the expression $rx + sy$ is also an integer. Therefore, $a$ divides the linear combination $bx + cy$.

## Proofs Involving Congruence of Integers

The concept of congruence formalizes the idea that different integers can be equivalent with respect to a divisor.

> [!NOTE] **Congruence modulo $n$**
>
> For integers $a, b$, and $n$ where $n \geq 2$, we say $a$ is congruent to $b$ modulo $n$, written $a \equiv b (\text{mod } n)$, if $n | (a − b)$.

Congruence is fundamentally linked to remainders. For any integer $x$ and any modulus $n \geq 2$, $x$ must be congruent to its remainder upon division by $n$. Consequently, for any integer $x$, exactly one of the following statements holds true:

$$
x \equiv 0 (\text{mod } n) \\[10pt]
x \equiv 1 (\text{mod } n) \\[10pt]
\vdots \\[10pt]
x \equiv n -1 (\text{mod } n) \\
$$

This structure partitions the set of all integers into $n$ distinct equivalence classes.

A primary reason for the utility of congruence is that it behaves in many ways like ordinary equality, particularly with respect to arithmetic operations such as addition and multiplication.

> [!TIP] **Conguence Multiplication by a Constant**
>
> Let $a, b, k$ and $n$ be integers where $n \geq 2$. If $a \equiv b (\text{mod } n)$, then $ka \equiv kb (\text{mod } n)$.

> **Proof**
>
> Assume that $a \equiv b (\text{mod } n)$. By definition, $n | (a − b)$, which means $a − b = nx$ for some integer $x$.
>
> Multiplying both sides by $k$, we get:
>
> $$k(a − b) = k(nx)$$
>
> $$ka − kb = n(kx)$$
>
> Since $k$ and $x$ are integers, their product $kx$ is also an integer. Therefore, $n | (ka − kb)$, which means $ka \equiv kb (\text{mod } n)$.

> [!TIP] **Addition of Congruences**
>
> Let $a, b, c, d, n \in \mathbb{Z}$ where $n \geq 2$. If $a \equiv b (\text{mod } n)$ and $c \equiv d (\text{mod } n)$, then $a + c \equiv b + d (\text{mod } n)$.

> **Proof**
>
> Assume that $a \equiv b (\text{mod } n)$ and $c \equiv d (\text{mod } n)$. This implies that $a − b = nx$ and $c − d = ny$ for some integers $x$ and $y$. Adding these two equations gives:
>
> $$(a − b) + (c − d) = nx + ny$$
>
> $$(a + c) − (b + d) = n(x + y)$$
>
> Since $x + y$ is an integer, $n$ divides $(a + c) − (b + d)$. Therefore, $a + c \equiv b + d (\text{mod } n)$.

> [!TIP] **Multiplication of Congruences**
>
> Let $a, b, c, d, n \in \mathbb{Z}$ where $n \geq 2$. If $a \equiv b (\text{mod } n)$ and $c \equiv d (\text{mod } n)$, then $ac \equiv bd (\text{mod } n)$.

> **Proof**
>
> Assume that $a \equiv b (\text{mod } n)$ and $c \equiv d (\text{mod } n)$. This gives us $a − b = nx$ and $c − d = ny$, where $x, y \in \mathbb{Z}$. We can rewrite these as $a = b + nx$ and $c = d + ny$.
>
> Multiplying these two equations, we obtain:
>
> $$ac = (b + nx)(d + ny) = bd + bny + dnx + n^2xy$$
>
> Rearranging the terms to isolate $ac − bd$:
>
> $$ac − bd = n(by + dx + nxy)$$
>
> Since $b, d, n, x$, and $y$ are all integers, the expression $by + dx + nxy$ is also an integer. Thus, $n | (ac − bd)$, and it follows that $ac \equiv bd (\text{mod } n)$.
