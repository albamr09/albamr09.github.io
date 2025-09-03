---
title: Properties of Relations
weight: 8
type: docs
math: true
---

## Relations on Sets

### The Inverse of a Relation

> [!NOTE] **Inverse of a Relation**
>
> Let $R$ be a relation from $A$ to $B$. Define the inverse relation $R^{-1}$ from $B$ to $A$ as follows:
>
> $$R^{-1} = \\{(y, x) \in B \times A | (x, y) \in R\\}$$

### Directed Graph of a Relation

> [!TIP] **Relation on a Set**
>
> A **relation on a set $A$** is a relation from $A$ to $A$.

When a relation $R$ is defined on a set $A$, the arrow diagram of the relation can be defined so it becomes a **directed graph**. Instead of representing $A$ as two separate sets of points, represent $A$ only once, and draw an arrow from each point of $A$ to each related point.

![Arrow Diagram](./assets/arrow_diagram_relation_on_set.png)

### $N$-ary Relations and Relational Databases

A special group of relations, called $n$-ary relations, form the mathematical foundation for relational database theory. Just as a binary relation is a subset of a Cartesian product of two sets, an $n$-ary relation is a subset of a Cartesian product of $n$ sets.

> [!NOTE] **$N$-ary Relation**
>
> Given sets $A_1, A_2, \cdots, A_n$ an **$n$-ary relation** $R$ on $A_1 \times A_2 \times \cdots \times A_n$ is a subset of $A_1 \times A_2 \times \cdots \times A_n$.
>
> The special cases of $2$-ary, $3$-ary and $4$-ary relations are called **binary**, **ternary** and **quartenary relations**, repectively.

The following is a radically simplified version of a database that might be used in a hospital.

Let $A_1$ bet a set of positive integers, $A_2$ a set of alphabetic character strings, $A_3$ a set of numeric character strings, and $A_4$ a set of alphabetic character strings.

Define a quartenary relation $R$ on $A_1 \times A_2 \times A_3 \times A_4$ as follows:

$$
(a_1, a_2, a_3, a_4) \Leftrightarrow \text{ a patient with patient ID } a_1, \text{ named } a_2, \\ \text{ was admitted on date } a_3, \text{ with primary diagnosis } a_4.
$$

At a particular hospital, this relation might contain the following 4-tuples:

- (011985, John Schmidt, 020719, asthma)
- (574329, Tak Kurosawa, 011419, pneumonia)
- (466581, Mary Lazars, 010319, appendicitis

In discussions of relational databases, the $n$-tuples are normally thought of as being written in tables. Each row of the table corresponds to one $n$-tuple, and the header for each column gives the descriptive attribute for the elements in the column.

For example, in the database language SQL, if the above database is denoted $S$, the result of the query:

```sql
SELECT Patient_ID#, Name
FROM S
WHERE Admission_Date = 010319
```

Is obtained by taking the intersection of the set $A_1 \times A_2 \times \\{010319\\} \times A_4$ with the database and then projecting onto the first two coordinates.

## Reflecivity, Symmetry and Transitivity

> [!TIP] **Properties of a Relation**
>
> Let $R$ be a relation on a set $A$
>
> 1. $R$ is **reflexive** if, and only if, for every $x \in A, x R x$.
> 2. $R$ is **symmetric** if, and only if, for every $x, y \in A, x R y \rightarrow y R x$.
> 3. $R$ is **transitive** if, and only if, for every $x, y, z \in A, x R y \text{ and } y R z \rightarrow x R z$.

Now consider what it means for a relation not to have one of the properties defined previously.

1. $R$ is **not reflexive**: there is an element $x$ in $A$, such that $x \not R x$
2. $R$ is **not symmetric**: there are elements $x$ and $y$ in $A$, such that $x R y$ but $y \not x$.
3. $R$ is **not transitive**: there are elements $x$, $y$ and $z$ in $A$, such that $x R y$ and $y R z$ but $x \not z$.

So you can show that a relation does not have one of the properties by finding a counterexample.

### Properties of Relations on Infinite Sets

Suppose a relation $R$ is defined on an infinite set $A$. To prove the relation is reflexive, symmetric, or transitive use the definitions of $A$ and $R$. For instance, for the symmetry on the equality relation on the set of real numbers:

$$
\forall x, y \in \mathbb{R}, x = y \rightarrow y = x
$$

Sometimes a property is "universally false" in the sense that it is false for every element of its domain. It follows immediately, of course, that the property is false for each particular element of the domain and hence counterexamples abound. In such a case, it may seem more natural to prove the universal falseness of the property rather than to give a single counterexample.

### The Transitive Closure of a Relation

Generally speaking, a relation fails to be transitive because it fails to contain certain ordered pairs. For example, if $(1, 3)$ and $(3, 4)$ are in a relation $R$, then the pair $(1, 4)$ must be in $R$ if $R$ is to be transitive.

Roughly speaking, the relation obtained by adding the least number of ordered pairs to ensure transitivity is called the transitive closure of the relation. More precisely, the transitive closure of a relation is the smallest transitive relation that contains the relation.

> [!NOTE] **Transitive Closure**
>
> Let $A$ be a set and $R$ a relation on $A$. The **transitive closure** of $R$ is the relation $R^t$ on $A$ that satisfies the following three properties:
>
> 1. $R^t$ is transitive
> 2. $R \subseteq R^{t}$
> 3. If $S$ is any other transitive relation that contains $R$, then $R^{t} \subseteq S$.

Given a relation $R$ on a set $A$ whose directed graph is:

![Transitive Closure](./assets/arrow_diagram_transitive_clouse_1.png)

Then the directed graph for the transitive closure $R^{t}$ would be:

![Transitive Closure](./assets/arrow_diagram_transitive_clouse_2.png)

## Equivalence Relations

The idea of grouping together things that "look different but are really the same" is the central idea of equivalence relations.

### The Relation Induced by a Partition

> [!NOTE] **Partition of a Set**
>
> A **partition** of a set $A$ is a finite or infinit collection of nonempty, mutually disjoint subsets whose union is $A$.

![Partition Set](./assets/partition_set.png)

> [!NOTE] **Relation Induced By a Partition**
>
> Given a partition of a set $A$, the **relation induced by the partition**, denoted by $R$, is defined on $A$ as follows. For every $x, y \in A$:
>
> $$x R y \Leftrightarrow \text{ there is a subset } A_i \text{ of the partition such that both } \\ x \text{ and } y \text{ are in } A_i$$

> [!TIP] **Properties of the Relation Induced By a Partition**
>
> Let $A$ be a set with a partition and let $R$ be the relation induced by the partition. Then $R$ is reflextive, symmetric and transitive.

**Proof that $R$ is reflextive**: Suppose $x \in A$. Since $A_1, A_2, \cdots, A_n$ is a partition of $A$, it follows that $x \in A_i$ for some $i$, and so the statement:

> There is a set $A_i$ of the partition such that $x \in A_i$ and $x \in A_i$

is true. Thus, by definition of $R$, $x R x$.

**Proof that $R$ is symmetric**: Suppose that $x$ and $y$ are elements of $A$ such that $x R y$. Then

> There is a subset $A_i$ of the partition such that $x \in A_i$ and $y \in A_i$

by definition of $R$. It follows that the statement

> There is a subset $A_i$ of the partition such taht $y \in A_i$ and $x \in A_i$

is also true. Hence, by definition of $R$, $y R x$.

**Proof that $R$ is transitive**: Suppose $x$, $y$ and $z$ are in $A$ and $x R y$ and $y R z$. By definition of $R$, there are subsets $A_i$ and $A_j$ of the partition such that:

$$
x \text{ and } y \text{ are in } A_i \text{ and } y \text{ and } z \text{ are in } A_j
$$

Suppose $A_i \neq A_j$. Then $A_i \cap A_j = \emptyset$ since $\\{A_1, A_2 \cdots, A_n\\}$ is a partition of $A$. But $y$ is in $A_i$ and $y$ is in $A_j$ also. Hence $A_i \cap A_j \neq \emptyset$. Thus $A_i = A_j$. It follows that $x, y$ and $z$ are all in $A_i$, and so, in particular

$$
x \text{ and } z \text{ are in } A_i
$$

Thus $x R z$ by definition of $R$.

### Equivalence Relations

> [!NOTE] **Equivalence Relation**
>
> Let $A$ bet a set and $R$ a relation on $A$. $R$ is an **equivalence relation** if, and only if $R$ is reflexive, symmetric and transitive.

> [!NOTE] **Equivalence Class**
>
> Suppose $A$ is a set and $R$ is an equivalence relation on $A$. For each element $a$ in $A$, the **equivalence class of** $a$, denote $[a]$ and called **class of $a$** for short, is the set of all elements $x$ in $A$ such that $x$ is related to $a$ by $R$
>
> $$[a] = \{x \in A | x R A\}$$

When several equivalence relations on a set are under discussion, the notation $[a]_R$ may be used to denote the equivalence class of $a$ for the relation $R$.

> [!TIP]
>
> Suppose $A$ is a set, $R$ is an equivalence relation on $A$, and $a$ and $b$ are elements of $A$. If $a R b$, then $[a] = [b]$.

**Proof that $[a] \subseteq [b]$**. Let $x \in [a]$. Then

$$
x R a
$$

by definition of class. But

$$
a R b
$$

by hypothesis. Thus, by transitivity of $R$

$$
x R b
$$

Hence

$$
x \in [b]
$$

by definition of class

**Proof that $[b] \subseteq [a]$**. Let $x \in [b]$. Then

$$
x R b
$$

by definition of class. But

$$
a R b
$$

by hypothesis. Since $R$ is symmetric

$$
b R a
$$

Thus, by transitivity of $R$, given $x R b$ and $b R a$

$$
x R a
$$

Hence

$$
x \in [a]
$$

by definition of class

Since $[a] \subseteq [b]$ and $[a] \subseteq [b]$, it follows that $[a] = [b]$.

> [!TIP]
>
> If $A$ is a set, $R$ is an equivalence relation on $A$, and $a$ and $b$ are elements of $A$, theneither
>
> $$[a] \cup [b] = \emptyset$$
>
> or
>
> $$[a] = [b]$$
