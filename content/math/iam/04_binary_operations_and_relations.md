---
title: Binary Operations and Relations
weight: 4
type: docs
math: true
---

## Binary Operations

Addition is an operation that takes two integers and produces a third; $2$ and $3$ produce $5$, for example. We can think of addition then as a function from $\mathbb{Z} \times \mathbb{Z}$ to $\mathbb{Z}$. This function would map $(2, 3)$ to $5$, $(7, -6)$ to $1$, and so on.

> [!NOTE] **Binary Operation**
>
> A **binary operation** on a nonempty set $A$ is a function from $A \times A$ to $A$.

Strictly speaking, we should use functional notation, say $f(a, b)$, to denote that element, but that's a bit cumbersome. It's much more common to introduce an operation symbol analogous to $+$ or $\times$, such as $\*$, to denote the binary operation and write $a * b$ instead of using the functional notation $*(a, b)$.

### Associative and Commutative Laws

> [!NOTE] **Associative Law**
>
> A binary operation $*$ on $A$ is **associative** if $(a * b) * c = a * (b * c), \forall a, b, c \in A$.

> [!NOTE] **Commutative Law**
>
> A binary operation $*$ on $A$ is **commutative** if $a * b = b * a, \forall a, b \in A$.

Note that the definitions of associative and commutative binary operations contain universal quantifiers. Proving a binary operation associative or commutative requires proving the appropriate property for all elements of $A$. On the other hand, to prove that a binary operation is not associative or not commutative requires only that the definition break down for some elements of $A$. Thus a single counterexample will suffice.

### Identities

> [!NOTE] **Identity Element**
>
> If $\*$ is a binary operation of $A$, an element $e$ of $A$ is an **identity element** of $A$ with respect to $*$ if $a * e = e * a = a, \forall a \in A$.

If a set $A$ has an identity element with respect to a binary operation $\*$, we will sometimes just say that $\*$ has an identity element if it is clear from the context what the underlying set $A$ is. Strictly speaking, of course, it is the set $A$ together with its binary operation that has the identity element.

> [!TIP] **Proposition 4.1.4**
>
> If $*$ is a binary operation on $A$ with identity element $e$, then $e$ is unique.

**Proof**

Suppose that $e'$ is also an identity element. Then $e * e' = e$, since $e \in A$. But on the other hand, $e$ is an identity element, so we also have $e * e' = e'$. Hence $e = e'$.

### Inverses

Another important concept associated with a binary operation is the notion of the inverse of an element.

> [!NOTE] **Invertible element and Inverse**
>
> Suppose that $\*$ is a binary operation on $A$ with identity $e$, and let $a \in A$. We say that $a$ is Invertible. with respect to $*$ if there exists $b \in A$ such that $a * b = b * a = e$.
>
> If $b$ exists, we say thal $b$ is an **inverse** of $a$ with respect to $*$.

> [!TIP] **Proposition 4.1.6**
>
> Let $\*$ be an associative binary operation on a set $A$ with identity element $e$. If $a \in A$ has an inverse with respect to $\*$, then that inverse is unique.

### Closure

A subset of a set with a binary operation "inherits" a way to combine pairs of elements: they are, after all, elements of the larger set, and the operation can be applied. But where is the result? There is no guarantee that it is in the subset. We single out the case when in fact we have an operation on the subset.

> [!NOTE] **Closure of an Operation**
>
> Let $\*$ be a binary operation on the set $A$, and suppose that $X \subseteq A$. If $\*$ is also a binary operation on $X$, then $X$ is said to be **closed in $A$ under $\*$**.
