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

## Proofs Involving Real Numbers

Proofs in real analysis, the branch of mathematics concerning real numbers, often rely on foundational axioms and well-established properties, such as the behavior of inequalities and the zero-product property.

> [!TIP] **The Zero-Product Property**
>
> Let $x, y \in \mathbb{R}$. If $xy = 0$, then $x = 0$ or $y = 0$.

> **Proof**
>
> Assume that $xy = 0$. We consider two cases.
>
> Case 1: $x = 0$. In this case, the conclusion ($x = 0$ or $y = 0$) is true.
>
> Case 2: $x \neq 0$. Since $x$ is a non-zero real number, its reciprocal $\frac{1}{x}$ exists. Multiplying the equation $xy = 0$ by $\frac{1}{x}$, we obtain:
>
> $$\frac{1}{x} xy = \frac{1}{x} 0$$
>
> $$\frac{x}{x} y = 0$$
>
> $$y = 0$$
>
> In this case, we have shown that $y = 0$, and the conclusion holds.

> [!NOTE] **Absolute Value**
>
> The absolute value $|x|$ for a real number $x$ is defined as:
>
> $$|x| = \begin{cases}x & \text{if } x \geq 0 \\ -x & \text{if } x < 0\end{cases}$$

> [!TIP] **The Triangle Inequality**
>
> For every two real numbers $x$ and $y$,
>
> $$|x + y| \leq |x| + |y|$$

> **Proof**
>
> Since $|x + y| = |x| + |y|$ if either $x$ or $y$ is $0$, we can assume that $x$ and $y$ are nonzero.
>
> **Case 1**: $x > 0$ and $y > 0$. In this case, $x + y > 0$. By definition, $|x + y| = x + y$. Also, $|x| = x$ and $|y| = y$. Thus, $|x + y| = |x| + |y|$.
>
> **Case 2**: $x < 0$ and $y < 0$. Here, $x + y < 0$. By definition, $|x + y| = −(x + y) = (−x) + (−y)$. Since $x$ and $y$ are negative, $|x| = −x$ and $|y| = −y$. Thus, $|x + y| = |x| + |y|$.
>
> **Case 3**: One of $x$ and $y$ is positive and the other is negative. Without loss of generality, assume $x > 0$ and $y < 0$. We consider two subcases.
>
> **Subcase 3.1**: $x + y \geq 0$. Then $|x + y| = x + y$. The right side of the inequality is $|x| + |y| = x + (−y) = x − y$. Since $y$ is negative, $−y$ is positive, so $x − y > x + y$. Therefore, $|x + y| < |x| + |y|$.
>
> **Subcase 3.2.**: $x + y < 0$. Then $|x + y| = −(x + y) = −x − y$. The right side is again $|x| + |y| = x − y$. Since $x > 0$, it follows that $x > -x$, and so $x − y > −x − y$. This gives us the inequality $|x| + |y| = x − y > −x − y = −(x + y)$. Therefore, $|x| + |y| > |x + y|$.
>
> In all cases, $|x + y| \leq |x| + |y|$.

## Proofs Involving Sets

Proofs in set theory adhere to their own established conventions, which are built upon the foundational rules of logic.

> [!NOTE] **Proving Set Equality**
>
> To prove that two sets, $C$ and $D$, are equal ($C = D$), one must complete two independent proofs:
>
> 1. Prove $C \subseteq D$: Show that every element of $C$ is also an element of $D$. This is typically done by taking an arbitrary element $x \in C$ and showing through a series of logical steps that $x$ must also be in $D$.
> 2. Prove $D \subseteq C$: Show that every element of $D$ is also an element of $C$.

> [!TIP] **Relation between the Set Difference and the Intersection**
>
> For every two sets $A$ and $B$, $A − B = A \cap \overline{B}$.

> **Proof**
>
> **Part 1 (Proving $A − B \subseteq A \cap \overline{B}$)**: Let $x$ be an arbitrary element of $A − B$. By the definition of set difference, this means $x \in A$ and $x \notin B$. Since $x \notin B$, it follows by the definition of a complement that $x \in \overline{B}$. We now have that $x \in A$ and $x \notin \overline{B}$. By the definition of set intersection, this implies $x \in A ∩ \overline{B}$. Therefore, $A − B \subseteq A \cap \overline{B}$.
>
> **Part 2 (Proving $A \cap \overline{B} \subseteq A − B$)**: Let $y$ be an arbitrary element of $A \cap \overline{B}$. By the definition of intersection, $y \in A$ and $y \notin \overline{B}$. Since $y \in \overline{B}$, it follows that $y \notin B$. We now have that $y \in A$ and $y \notin B$. By the definition of set difference, this implies $y \in A − B$. Therefore, $A \cap \overline{B} \subseteq A − B$.
>
> Since we have shown inclusion in both directions, we conclude that the two sets are equal.

> [!TIP] **Result 4.21**
>
> Let $A$ and $B$ be sets. Then $A \cup B = A$ if and only if $B \subseteq A$.

> **Proof**
>
> **Part 1**: If $A \cup B = A$, then $B \subseteq A$.
>
> We assume that $B$ is not a subset of $A$. This means there exists an element $x \in B$ such that $x \notin A$. Because $x \in B$, it must be that $x \in A \cup B$. However, since $x \notin A$, this shows that the sets $A \cup B$ and $A$ are not identical. This completes the proof by contrapositive.
>
> **Part 2**: If $B \subseteq A$, then $A \cup B = A$.
>
> We assume $B \subseteq A$. To show $A \cup B = A$, we must show mutual inclusion.
>
> The inclusion $A \subseteq A \cup B$ is true by definition.
>
> To show $A \cup B \subseteq A$, let $y \in A \cup B$. This means $y \in A$ or $y \in B$. If $y \in A$, the condition is met. If $y \in B$, then since we assumed $B \subseteq A$, it follows that $y \in A$. In either case, $y \in A$. Thus, $A \cup B \subseteq A$.
>
> Since both implications have been proven, the biconditional statement is true.
