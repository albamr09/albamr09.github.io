---
title: Sets
weight: 2
type: docs
math: true
---

## Sets and Subsets

The objects in a set are called **elements**. We use the notation $a \in A$ to express that the object $a$ is an element of the set $A$, and often simply say "$a$ is in $A$."

Special notation is sometimes used for very common sets. We use $\mathbb{R}$ for the set of **real numbers**, and $\mathbb{Z}$ (from the German "Zahlen," meaning "numbers") for **the set of all integers**. The set consisting of just the **positive integers** is denoted $\mathbb{Z}^+$ The **set of rational numbers**, those of the form $\frac{m}{n}$, where $m$ and $n$ are integers with $n \neq 0$, is denoted $\mathbb{Q}$ (for "quotient").

In many discussions, we will be dealing only with elements of a certain, fixed set, say $U$. Such a set $U$ provides a context, or a "universal set" for the discussion.

In general, if $S$ is a given set, $A = \\{x \in S | P(x)\\}$ denotes the set of all elements $x$ in $S$ such that the open sentence $P(x)$ is a true statement. We say that $A$ is the **truth set** of the open sentence $P(x)$.

One particular class of such sets are **intervals**.

> [!NOTE] **Interval**
>
> A subset $I$ of the set of real numbers $\mathbb{R}$ is called an interval if $I \neq \emptyset$, $I$ contains more than one element, and for every $x$ and $y$ in $I$ such that $x < y$, $[x, y] \subseteq I$.

$$
[a, b] = \{x \in \mathbb{R} | a \leq x \leq b\}, \text{ called the closed interval from a to b}
$$

$$
(a, b) = \{x \in \mathbb{R} | a < x < b\}, \text{ called the open interval from a to b}
$$

$$
(a, b] = \{x \in \mathbb{R} | a < x \leq b\}
$$

$$
[a, b) = \{x \in \mathbb{R} | a \leq x < b\}
$$

$$
[a, \infty) = \{x \in \mathbb{R} | x \geq a\}
$$

$$
(a, \infty) = \{x \in \mathbb{R} | x > a\}
$$

$$
(-\infty, a] = \{x \in \mathbb{R} | x \leq a\}
$$

$$
(-\infty, a) = \{x \in \mathbb{R} | x < a\}
$$

$$
(-\infty, \infty) = \mathbb{R}
$$

The first four types of intervals are called **bounded intervals** and the last five are called **unbounded intervals**. Types 3 and 4 are called **half-open**, **half-closed** intervals. Note that the symbol $\infty$ is not a real number but is only used as a convenient notation for unbounded intervals.

Some of the sets we've seen are **infinite**, that is, contain infinitely many elements. The others are said to be **finite**, and we denote the number of elements in such a set, called **the cardinality of $A$**, by $|A|$.

### Subsets

Usually the elements of a set belong to another, bigger set. For instance, all of the elements of the set of integers $\mathbb{Z}$ belong to the set $\mathbb{R}$ of real numbers.

> [!NOTE] **Subset**
>
> Let $A$ and $B$ be sets. We say that $A$ is a **subset** of $B$, and write $A \subseteq B$, if every element of $A$ is also an element of $B$.

> [!NOTE] **Proper Subset**
>
> If $A$ is a subset of $B$ and $A \neq B$, we write $A \subset $ and say that $A$ is a **proper subset** of $B$.

Note: If $A$ is a subset of a set $B$, we will usually write $A \subseteq B$ even if $A \neq B$ unless we wish to make particular note of the fact that $A$ is a proper subset of $B$.

To prove the statement $A \subseteq B$, it is usually necessary to take an arbitrary element of $A$ and show that it is an element of $B$. This means letting the variable $x$ be assigned a value, say $x = a$, and then proving the implication "$a \in A$" $\rightarrow$ "$a \in B$." So we start the proof by saying: let $a \in A$, and then we prove that $a \in B$.

> [!NOTE] **Set Equality**
>
> We say two sets $A$ and $B$ are **equal**, written $A = B$, if they have the same elements.

Two sets $A$ and $B$ are equal if and only if every element of $A$ is an element of $B$ and every element of $B$ is an element of $A$. In other words, $A = B \Leftrightarrow (A \subseteq B \land B \subseteq A)$. So proving that two sets are equal often requires two proofs.

### Complements

We often want to determine if a given element is not in some set. We introduce the following definition.

> [!NOTE] **Complement**
>
> Let $A$, $B$ be sets. The **complement of $A$ in $B$**, denoted $B - A$, is $\\{b \in B | b \notin A\\}$.

For convenience, if $U$ is a universal set, we will write $U - A = \bar{A}$, called simply the **complement of $A$**.

We call a set with no elements **the empty set**, and we denote it $\emptyset$. Note that if $U$ is a universal set, then $\bar{U} = \emptyset$ and $\emptyset = \bar{U}$.
