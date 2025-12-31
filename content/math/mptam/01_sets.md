---
title: Sets
weight: 1
type: docs
math: true
---

## Describing a Set

At its core, the concept of a set is one of the most foundational ideas in mathematics, from which nearly all other mathematical structures are built. A **set** is simply a collection of objects. The objects that make up a set are called its **elements** or **members**.

![Examples of Sets](./assets/sets_examples.png)

### Standard Notation

To discuss sets with precision, mathematicians use a standard symbolic language. The most essential notations are summarized below.

| Concept                             | Symbolic Representation                               |
| ----------------------------------- | ----------------------------------------------------- |
| Designating a set                   | Capital letters (e.g., $A, B, C$)                     |
| Representing an element             | Lower-case letters (e.g., $a, b, c$)                  |
| An element belongs to a set         | $a \in A$ (read as "$a$ is an element of $A$")        |
| An element does not belong to a set | $a \notin A$ (read as "$a$ is not an element of $A$") |

![Sets and Elements](./assets/sets_elements.png)

A critical requirement when describing a set is that the description must make it perfectly clear which elements belong to it. There are several standard methods for achieving this clarity.

### Roster Method

For sets with a small number of elements, the most straightforward method is to list them explicitly between braces $\\{\\}$.

For example, the set $S$ containing the first three positive integers is written as:

$$
S = \{1, 2, 3\}
$$

A key insight is that **the order in which elements are listed does not change the set**.

### Ellipsis Notation

When a set contains too many elements to list conveniently, the ellipsis ($\dots$) notation is used. It has two primary applications:

1. **"And so on up to"**: For a finite set with a clear pattern, the ellipsis indicates continuation up to a final element.

$$
X = \{1, 3, 5, \dots, 49\}
$$

represents the set of positive odd integers less than $50$.

2. **"And so on" indefinitely**: For an infinite set, the ellipsis indicates that the pattern continues without end.

$$
Y = \{2, 4, 6, \dots\}
$$

represents the set of all positive even integers.

### Set-Builder Notation

A powerful method for defining a set is to describe the property that all its elements must satisfy. This is known as **set-builder notation**. The general format is:

$$
S = \{x : p(x)\}
$$

This is read as "$S$ is the set of all elements $x$ such that the property $p(x)$ is true."

### The Special Case of the Empty Set

A set is not required to contain any elements. The unique set that contains no elements is called **the empty set**. It is denoted by one of two symbols:

$$
\emptyset
$$

or

$$
\{\}
$$

### Commonly Used Number Sets

Several sets of numbers are so frequently used in mathematics that they are given their own special symbols.

| Symbol       | Set Name         | Description/Example                                                                                    |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------ |
| $\mathbb{N}$ | Natural Numbers  | The set of positive integers                                                                           |
| $\mathbb{Z}$ | Integers         | The set of positive, negative, and zero integers                                                       |
| $\mathbb{Q}$ | Rational Numbers | Numbers that can be expressed as a fraction $\frac{m}{n}$, where $m, n \in \mathbb{Z}$ and $n \neq 0$. |
| $\mathbb{R}$ | Real Numbers     | The set of all rational and irrational numbers.                                                        |
| $\mathbb{C}$ | Complex Numbers  | Numbers of the form $a + bi$, where $a, b \in \mathbb{R}$ and $i = \sqrt{-1}$.                         |

![Number Sets](./assets/number_sets.png)

## Subsets

> [!NOTE] **Subset**
>
> A set $A$ is a subset of a set $B$ if every element of $A$ is also an element of $B$. This relationship is written as $A \subseteq B$.

![Subsets](./assets/subsets.png)

> [!TIP] **Proper Subset**
>
> A proper subset, written $A \subset B$, is a subset that is not equal to the other set. This means that $A \subseteq B$ but $A \neq B$. For this to be true, set $B$ must contain at least one element that is not in $A$.

> [!NOTE] **Set Equality**
>
> Two sets $A$ and $B$ are equal if and only if they have exactly the same elements. The formal way to prove that $A = B$ is to demonstrate a two-way subset relationship:
>
> 1. Show that $A$ is a subset of $B$ ($A \subseteq B$).
> 2. Show that $B$ is a subset of $A$ ($B \subseteq A$).
>
> If both of these conditions are met, the sets are equal.

> [!NOTE] **Power Set**
>
> For any given set $A$, the power set of $A$, denoted $\mathcal{P}(A)$, is the set containing all possible subsets of $A$.

For example, if $A = \\{1, 2, 3\\}$, its power set is: $\mathcal{P}(A) = \\{\emptyset, \\{1\\}, \\{2\\}, \\{3\\}, \\{1, 2\\}, \\{1, 3\\}, \\{2, 3\\}, \\{1, 2, 3\\}\\}$

![Power Set](./assets/power_set.png)

A crucial property of power sets is related to their size, or cardinality. For any finite set $A$, the number of elements in its power set is given by the formula:

$$
|\mathcal{P}(A)| = 2^{|A|}
$$

In the example above, $|A| = 3$, so $|\mathcal{P}(A)| = 2^3 = 8$.

### Combining and Creating New Set

Just as numbers can be combined with operations like addition and multiplication, sets can be combined using operations to create new sets. The two most fundamental operations are **union** and **intersection**.

> [!NOTE] **Union of Sets**
>
> The union of two sets $A$ and $B$, denoted $A \cup B$, is the set of all elements belonging to $A$ or $B$ (or both). The "or" is inclusive. That is:
>
> $$A \cup B = \{x : x \in A \text{ or } x \in B\}$$

> [!NOTE] **Intersection of Sets**
>
> The intersection of two sets $A$ and $B$, denoted $A \cap B$, is the set of all elements belonging to $A$ and $B$. That is:
>
> $$A \cap B = \{x : x \in A \text{ and } x \in B\}$$

## Describing Sets and Subsets: TL;DR

{{< youtube pWItjY4eOfM >}}
