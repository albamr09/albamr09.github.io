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

## Equivalence Relations

One of the most basic concepts of mathematics, one that we are all familiar with from our earliest days in a math class, is equality. But this very strict idea of two objects being equal is often not what we mean when we use the word in everyday life. For example, baseball fans throughout America can be classified by their team allegiance: there are Red Sox fans, Cubs fans, and so on. From the point of view of a team trying to sell tickets, any two of its fans (with money!) can be considered equivalent, although they are certainly not the same person. This "equality" is a generalization of the strict notion, considering two objects equivalent because they share some property, or are in some relation to each other. In this section we try to capture this generalization mathematically.

> [!NOTE] **Relation**
>
> A **relation** $R$ on a set $A$ is a subset of $A \times A$. If $(a, b) \in R$, we write $aRb$.

### Properties of Relations

> [!TIP] **Properties of Relations**
>
> Let $R$ be a relation on a set $A$. We say:
>
> 1. $R$ is **reflexive** if $a R a, \forall a \in A$
> 2. $R$ is **symmetric** if for all $a, b \in A$, if $a R B$ then $b R a$.
> 3. $R$ is **transitive** if for all $a, b, c \in A$, if $a R B$ and $b R c$ then $a R c$.
> 4. $R$ is **antisymmetric** if for all $a, b \in A$, if $a R B$ and $b R a$ then $a = b$.

### Equivalence Relations

Relations that have the properties of being reflexive, symmetric, and transitive are particularly important.

> [!NOTE] **Equivalence Relation**
>
> A relation $R$ on a set $A$ is called an **equivalence relation** if it is reflexive, symmetric, and transitive.

When $R$ is an equivalence relation, it is common to write $a \sim b$ instead of $a R b$, read as "a is equivalent to b."

### Equivalence Class

As we mentioned before, we want to generalize equality and view two elements related by an equivalence relation as "equivalent." If we group related elements together, we get what is known as an equivalence class.

> [!NOTE] **Equivalence Class**
>
> If $R$ is an equivalence relation on $A$, and $a \in A$, the set $[a] = \{\{x \in A | x \sim a\}\}$ is called the **equivalence class** of $a$. Elements of the same class are said to be **equivalent**.

You may have sensed that an equivalence relation divides the set in question into classes; we have distinct collections of Cubs fans, of Dodgers fans, and so on. In fact, the set of baseball fans is partitioned into sets with allegiance to different teams, as the following theorem shows.

> [!TIP] **Theorem 4.2.5**
>
> If $R$ is an equivalence relation on a nonempty set $A$, then the set of equivalence classes of $R$ forms a partition of $A$.

**Proof**

Since each equivalence class is a subset of $A$, so is the union of these equivalence classes. To prove that the union of the equivalence classes equals $A$, we must show that every element of $A$ is in some equivalence class. But if $a \in A$, then $a \sim a$ since $R$ is reflexive, so $a \in [a]$. Note that this also shows that every equivalence class is a nonempty set.

Now we must also show that different equivalence classes do not intersect. Suppose, on the contrary, that there exist distinct equivalence classes $[a]$ and $[b]$ such that $[a] \cap [b] \neq \emptyset$. Let $x \in [a] \cap [b]$. Then, in particular $x \sim a$, and since $R$ is symmetric, $a \sim x$. But also $x\sim b$ since $x \sim [b]$. Since $R$ is transitive, it follows that $a \sim b$. Therefore $a \in [b]$. Now take an arbitrary $y \in [a]$, and notice that since $y \sim a$ and $a \sim b$, we have $y \sim b$ and hence $y \in [b]$. We have shown that in fact $[a] \subseteq [b]$. However, we could start this same argument with $y \in [b]$ and conclude that $[b] \subseteq [a]$, and so $[a] = [b]$.

This is a contradiction to our assumption that $[a] \neq [b]$, so we can conclude that $[a] \cap [b] = \emptyset$.

The previous theorem shows that any equivalence relation on a set $A$ leads to a partition of $A$. The next theorem shows that any partition of a set $A$ gives rise to an equivalence relation on $A$.

> [!TIP] **Theorem 4.2.6**
>
> Let $\mathcal{P}$ be a partition of a nonempty set $A$. Define a relation $R_1$ on $A$ by $aR_1b$ if $a$ and $b$ are in the same element of the partition. Then $R_1$ is an equivalence relation on $A$.

**Proof**

If $a \in A$, then $a \in X$ for some $X \in \mathcal{P}$; so clearly $a R_1 a$.

It's equally obvious that if $a R_1 b$, so that $a, b \in X$, for some $X \in \mathcal{P}$: then we can just as well say $b, a \in X$, and $bR_1a$.

Finally, if $aR_1b$ and $bR_1c$, we have $a, b \in X$ and $b, c \in Y$, for some $X, Y \in \mathcal{P}$. But since $\mathcal{P}$ is a partition of $A$ and $b \in X \cap Y \neq \emptyset$, we must have $X = Y$. Therefore $a, c \in X$, and $a R_1 c$.

Thus $R_1$ is reflexive, symmetric, and transitive, and hence an equivalence relation.

Theorems 4.2.5 and 4.2.6 are related in the following way. Let $R$ be an equivalence relation on the nonempty set $A$. Theorem 4.2.5 says that the set $\mathcal{P}$ of equivalence classes of $R$ is a partition of $A$. Theorem 4.2.6 says that this partition gives rise to an equivalence relation $R_1$ of $A$. From the definition of this equivalence relation given in the proof of Theorem 4.2.6, it follows that $R_1 = R$.

Similarly, if we start with a partition $\mathcal{P}$ of $A$, then there is a corresponding equivalence relation $R_1$ by Theorem 4.2.6. Theorem 4.2.5 says that there is a partition determined by this equivalence relation, namely, the set of equivalence classes of $R_1$ But this set is just the partition $\mathcal{P}$ that we started with.

These remarks tell us that there is a bijection between the set of all equivalence relations of $A$ and the set of all partitions of $A$.

### Partial Linear Orderings

The relation $R$ on the real numbers $R$ defined by $aRb$ if $a \leq b$ is not an equivalence relation because it is not symmetric. However, $R$ is reflexive, transitive, and antisymmetric. It is an important relation because it gives an ordering of the real numbers: it defines what it means for one number to be "less than" another. The notion of partial ordering is a generalization of this example.

> [!NOTE] **Partial Ordering**
>
> A relation $R$ on a set $A$ is called a partial ordering on $A$ if $R$ is reflexive, transitive and antisymmetric.

> [!NOTE] **Partially Ordered Set**
>
> If $A$ is a set and there exists a partial ordering on $A$, then we say that $A$ is a **partially ordered set**.

The partial ordering $\leq$ on $\mathbb{R}$ has the property that for all $a, b \in \mathbb{R}$, either $a \leq b$ or $b \leq a$. Any partial ordering with this property is called a linear ordering.

> [!NOTE] **Linear Ordering**
>
> Let $A$ be a set and $R$ be a partial ordering on $A$. We say that $R$ is a **linear ordering** on $A$ if for all $a, b \in A$, either $aRb$ or $bRa$.

> [!NOTE] **Linearly Ordered Set**
>
> If $A$ is a set and there exists a linear ordering on $A$, then we say that $A$ is a **linearly ordered set**.
