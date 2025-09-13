---
title: Counting and Probability
weight: 9
type: docs
math: true
---

## Introduction to Probability

> [!TIP] **Random Process**
>
> To say that a process is **random** means that when it takes place, one outcome from some set of outcomes is sure to occur, but it is impossible to predict with certainty which outcome that will be.

> [!NOTE] **Sample Space**
>
> A **sample space** is the set of all possible outcomes of a random process or experiment. An **event** is a subset of a sample space.

In the case where an experiment has finitely many outcomes and all outcomes are equally likely to occur, the probability of an event (set of outcomes) is just the ratio of the number of outcomes in the event to the total number of outcomes.

> [!TIP] **Equally Likely Probability Formula**
>
> If $S$ is a finite sample space in which all outcomes are equally likely and $E$ is an event in $S$, then the **probability of $E$**, denoted $P(E)$, is
>
> $$P(E) = \frac{\text{ the number of outcomes in } E}{\text{the total number of outcomes in } S}$$

### Counting the Elements of a List

> [!NOTE] **The Number of Elements in a List**
>
> If $m$ and $n$ are integers and $m \leq n$, then there are $n - m + 1$ integers from $m$ to $n$ inclusive.

## Possibility Trees and the Multiplication Rule

### Multiplication Rule

> [!NOTE] **Multiplication Rule**
>
> If an operation consists of $k$ steps and
>
> - The first step can be performed in $n_1$ ways.
> - The second step can be performed in $n_2$ ways, regardless of how the first step was performed.
>
>   $\vdots$
>
> - The $k$th step can be performed in $n_k$ ways, regardless of how the previous steps was performed.
>
> Then the entire operation can be performed in $n_1 \cdot n_2 \cdots n_k$ ways.

### When the Multiplication Rule Is Difficult or Impossible to Apply

Consider the following problem:

> Three officers—a president, a treasurer, and a secretary—are to be chosen from among four people: Ann, Bob, Cyd, and Dan. Suppose that, for various reasons, Ann cannot be president and either Cyd or Dan must be secretary. How many ways can the officers be chosen?

It is natural to try to solve this problem using the multiplication rule. A person might answer as follows:

> There are three choices for president (all except Ann), three choices for treasurer (all except the one chosen as president), and two choices for secretary (Cyd or Dan). Therefore, by the multiplication rule, there are $3 \cdot 3 \cdot 2 = 18$ choices in all.

Unfortunately, this analysis is incorrect. The number of ways to choose the secretary varies depending on who is chosen for president and treasurer.

From the tree it is easy to see that there are only eight ways to choose a president, treasurer, and secretary so as to satisfy the given conditions

![Tree of Possibility](./assets/multiplication_rule_probability_tree.png)

### Permutations

A **permutation** of a set of objects is an ordering of the objects in a row.

> [!NOTE] **Number of Permutations of a Set**
>
> For any integer $n$, with $n \geq 1$, the number of permutations of a set with $n$ elements is $n!$.

> [!NOTE] **$r$-permutation**
>
> An **$r$-permutation** of a set of $n$ elements is an ordered selection of $r$ elements taken from the set of $n$ elements.

The number of $r$-permutations of a set of $n$ elements is denoted $P(n, r)$.

> [!NOTE] **Number of $r$-permutations**
>
> If $n$ and $r$ are integers $1 \leq r \leq n$, then the number of $r$-permutations of a set of $n$ elements is given by the formula
>
> $$P(n, r) = n(n -1)(n- 2) \cdots (n - r+ 1)$$
>
> or, equivalently
>
> $$P(n, r) = \frac{n!}{(n - r)!}$$

Alternative notations for the number of $r$-permutations are $P(n, r), P_{n ,r}$.

The idea of the proof is the following. Suppose a set of $n$ elements is given. Formulation of an $r$-permutation can be thought of as an $r$-step process:

1. Choose the element to be first. Since the set has $n$ elements, there are $n$ ways to perform step 1.
2. Choose the element to be second. Since the element selected on step 1 is no longer available, there are $n - 1$ ways to perform step 2.

This process is repeated $r$ times, as shown below.

![Number of r-permutations](./assets/number_of_r_permutations.png)

Step $r$ is to choose the element to be $r$th. At the point just before step $r$ is performed, $r - 1$ elements have already been chosen, and so there are

$$
n - (r - 1) n - r + 1
$$

left to choose from, hence there are $n - r + 1$ ways to perform step $r$. It follows by the multiplication rule that the number of ways to form an $r$-permutation is

$$
P(n, r) = n (n - 1)(n - 2) \cdots (n - r + 1)
$$

Note that

$$
\frac{n!}{(n - r)!} = \frac{n (n - 1)(n - 2) \cdots (n - r + 1) (n - r) (n - r - 1)\cdots 3 \cdot 2 \cdot 1}{(n - r)(n - r - 1) \cdots 3 \cdot 2 \cdot 1} \\ = n (n - 1)(n - 2) \cdots (n - r + 1)
$$

Thus

$$
P(n, r) = \frac{n!}{(n - r)!}
$$

## Counting Elements of Disjoint Sets: The Addition Rule

In this section we look at counting problems that can be solved by counting the number of elements in the union of two sets, the difference of two sets, or the intersection of two sets. The basic rule underlying the calculation of the number of elements in a union or difference or intersection is the addition rule.

> [!NOTE] **The Addition Rule**
>
> Suppose a finite set $A$ equals the union of $k$ distinct mutually disjoint subsets $A_1, A_2, \cdots, A_k$. Then
>
> $$N(A) = N(A_1) + N(A_2) + \cdots + N(A_k)$$

> [!NOTE] **The Difference Rule**
>
> If $A$ is a finite set and $B$ is a subset of $A$, then
>
> $$N(A - B) = N(A) - N(B)$$

![Difference Rule](./assets/difference_rule.png)

> [!TIP] **Probability of the Complement of an Event**
>
> If $S$ is a finite sample space and $A$ is an event in $S$, thenA
>
> $$P(A^C) = 1 - P(A)$$
>
> where $A^C = S - A$, the complement of $A$ in $S$.

### The Inclusion/Exclusion Rule

Now consider the question of how to determine the number of elements in a union of sets when some of the sets overlap.

![Inclusion Rule](./assets/inclusion_rule.png)

The simplest way to derive a formula for $N(A \cup B)$ is to reason as follows: The number $N(A)$ counts the elements that are in $A$ And not in $B$ as well as the elements that are in both $A$ and $B$. Similarly, the number $N(B)$ countes the elements that are in $B$ and not in $A$, as well as the elements that are both in $A$ and $B$. Hnece the elements that are in both $A$ And $B$ are counted twice.

> [!NOTE] **The Inclusion/Exclusion Rule for Two or Three Sets**
>
> If $A$, $B$ and $C$ are finite sets, then
>
> $$N(A \cup B) = N(A) + N(B) - N(A \cap B)$$
>
> and
>
> $$N(A \cup B \cup C) = N(A) + N(B) + N(C) - N(A \cap B) - N(A \cap C) - N(B \cap C) + N(A \cap B \cap C)$$

## The Pigeonhole Principle

The pigeonhole principle is sometimes called the **Dirichlet box principle** because it was first state formally by [J. P. G. L. Dirichlet](https://es.wikipedia.org/wiki/Peter_Gustav_Lejeune_Dirichlet).

> [!NOTE] **Pigeonhole Principle**
>
> A function from one finite set to a smaller finite set cannot be one-to-one: There must be at least two elements in the domain that have the same image in the co-domain.

The following illustration suggests the visual way to preent the principle.

![The Pigeonhole Principle](./assets/pigeonhole_principle.png)

Thus an arrow diagram for a function from a finite set to a smaller finite set must have at least two arrows from the domain that point to the same element of the co-domain.

**Proof**. Suppose $f$ is any function from a finite set $X$ with $n$ elements to a finite set $Y$ with $m$ elements where $n > m$. Denote the elements of $Y$ by $y_1, y_2, \cdots, y_m$. Recall that for each $y_i$ in $Y$, the inverse image set $f^{-1}(y_i) = \{x \in X | f(x) = y_i\}$ . Now consider the collection of all the inverse image sets for all the elements of $Y$:

$$
f^{-1}(y_1), f^{-1}(y_2), \cdots, f^{-1}(y_m)
$$

By definition of function, each element of $X$ is sent by $f$ to some element of $Y$. Hence each element of $X$ is in one of the inverse image sets, and so the union of all theset equals $X$. But also, by definition of function, no element of $X$ is sent by $f$ to more than one element of $Y$. Thus each element of $X$ is in only one of the inverse image sets, and so the inverse image sets are mutually disjoint. By the addition rule, therefore

$$
N(X) = N(f^{-1}(y_1)) + N(f^{-1}(y_2)) + \cdots + N(f^{-1}(y_m))
$$

Now suppose that $f$ is one-to-one. Then each set $f^{-1}(y_i)$ ahs at most one element, and so:

$$
N(f^{-1}(y_1)) + N(f^{-1}(y_2)) + \cdots + N(f^{-1}(y_m)) = 1 + 1 + \cdots + 1 = m
$$

Puttins the last two equations together gives that

$$
n = N(X) \leq m = N(Y)
$$

This contradicts the fact that $n > m$, and so the supposition that $f$ is one-to-one must be false. Hence $f$ is not one-to-one.

> [!NOTE] **Generizalized Pigeonhole Principle**
>
> For any function $f$, from a finite set $X$ with $n$ elements to a finite set $Y$ with $m$ elements and for any positive integer $k$, if $km < n$, then there is some $y \in Y$ such that $y$ is the image of at least $k + 1$ distinct elements of $X$.

![The Generalized Pigeonhole Principle](./assets/generalized_pigeonhole_principle.png)

> [!TIP] **Generizalized Pigeonhole Principle (Contrapositive Form)**
>
> For any function $f$ from a finite set $X$ with $n$ elements to a finite set $Y$ with $m$ elements and for any positive integer $k$, if for each $y \in Y$, $f^{-1}(y)$ has at most $k$ elements, then $X$ has at most $km$ elements; in other words, $n \leq km$.

> [!NOTE] **One-to-One and Onto for Finite Sets**
>
> Let $X$ and $Y$ be finite sets with the same number of elements and suppose $f$ is a function from $X$ to $Y$. Then $f$ is one-to-one if, and only if, $f$ is onto.

**Proof**. Suppose $f$ is a function from $X$ to $Y$, where $X$ and $Y$ are finite sets each with $m$ elements. Let $X = \\{x_1, x_2, \cdots, x_m\\}$ and $Y = \\{y_1, y_2, \cdots, y_m\\}$.

Let us prove that **if $f$ is one-to-one, then $f$ is onto**. Suppose $f$ is one-to-one. Then $f(x_1), f(x_2) \cdots, f(x_m)$ are all distinct. Consider the set $S$ of all elements of $Y$ that are not the image of any element of $X$. Then the sets

$$
\{f(x_1)\}, \{f(x_2)\}, \cdots, \{f(x_m)\} \text{ and } S
$$

are mutually disjoint. By the addition rule,

$$
N(Y) =N(\{f(x_1)\}) + N(\{f(x_2)\}) + \cdots, N(\{f(x_m)\}) + N(S)
$$

$$
= 1 + 1 + \cdots + 1 + N(S)
$$

$$
= m + N(S)
$$

Thus, given $N(Y) = m$

$$
N(Y) = m = m + N(S)
$$

and so

$$
N(S) = 0
$$

Hence $S$ is empty, and so there is no element of $Y$ that is not the image of some element of $X$. Consequently, $f$ is onto.

Let us prove that **if $f$ is onto, then $f$ is one-to-one**. Suppose $f$ is onto. Then, for each $i = 1, 2, \cdots, m$ $f^{-1}(y_i) \neq \emptyset$ and so $N(f^{-1}(y_i)) \geq 1$. As in the proof of the pigeonhole principle, $X$ is the union of the mutually disjoint sets $f^{-1}(y_1), f^{-1}(y_2), \cdots, f^{-1}(y_m)$. These sets are mutually disjoint by the definition of a function, no element on the domain of $f$ has two different images, thus it cannot be the pre-image of two different $y_i$, $y_j$.

By the addition principle, because each $N(f^{-1})(y_i) \geq 1$,

$$
N(X) = N(f^{-1}(y_1)) + N(f^{-1}(y_2)) + \cdots + N(f^{-1}(y_m)) =\geq m
$$

Now, if any of the sets $f^{-1}(y_i)$ has more than one element, then the sum of the $m$ terms is greater than $m$. But we know this is not the case because $N(X) = m$. Hence each set $f^{-1}(y_i)$ has exactly one element, and thus $f$ is one-to-one.

Thus a one-to-one function from a finite set to itself is onto, and an onto function from a finite set to itself is one-to-one.

## Counting Subsets of a Set: Combinations

> [!NOTE] **$r$-combination**
>
> Let $n$ and $r$ be nonnegative integers with $r \leq n$. An **$r$-combination** of a set of $n$ elements is a subset of $r$ of the $n$ elements.

> [!TIP] **$\binom{n}{r}$ Notation**
>
> The symbol $\binom{n}{r}$, read "$n$ choose $r$", denotes the number of subsets of size $r$ (or $r$-combinations) taht can be formed from a set of $n$ elements.

There are two distinct methods that can be used to select $r$ objects from a set of $n$ elements. In an **ordered selection**, it is not only what elements are chosen but also the order in which they are chosen that matters. An ordered selection of $r$ elements from a set of $n$ elements is an **$r$-permutation** of the set.

In an **unordered selection**, on the other hand, it is only the identity of the chosen elements that matters. This is called an **$r$-combination**.

The following reasoning can be used to **define the expresion for the computation of the number of $r$-combinations** on a set of $n$ elements.

1. Choose a subset of $r$ of the $n$ elements. There are $\binom{n}{r}$ ways to perform this step.
2. Choose and ordering of the $r$ elements. There are $r!$ ways to perform this step.

Thus the number of $r$-permutations is

$$
P(n, r) = \binom{n}{r} \cdot r!
$$

We solve for $\binom{n}{r}$

$$
\binom{n}{r} = \frac{P(n, r)}{r!}
$$

Given that $P(n, r) = \frac{n!}{(n - r)!}$

$$
\binom{n}{r} = \frac{n!}{(n - r)! \cdot r!}
$$

> [!TIP] **Permutations with Sets of Indistinguishable Objects**
>
> Suppose a collection consists of $n$ objects of which:
>
> - $n_1$ are of type $1$ and are indistinguishable from each other
> - $n_2$ are of type $2$ and are indistinguishable from each other
>
> $$\vdots$$
>
> - $n_k$ are of type $k$ and are indistinguishable from ech other
>
> and suppose that $n_1 + n_2 + \cdots + n_k = n$. Then the number of distinguishable permutations of the $n$ objects is
>
> $$\binom{n}{n_1} \binom{n - n_1}{n_2} \binom{n - n_1 - n_2}{n_3} \cdots \binom{n - n_1 - n_2 - \cdots n_{k - 1}}{n_k}$$
>
> $$ = \frac{n!}{n_1!n_2!n_3! \cdots n_k!}$$

## $r$-Combinations with Repetitions Allowed

In this section we ask: How many ways are there to choose $r$ elements without regard to order from a set of $n$ elements if repetition is allowed?

> [!TIP] **Notation for an $r$-combination with repetition allowed**
>
> An $r$-combination with repetition allowed, or multiset of size $r$, chosen from a set $X$ of $n$ elements is an unordered selection of elements taken from $X$ with repetition allowed.
>
> If $X = \\{x_1, x_2, \cdots, x_n\\}$, we write an $r$-combination with repetition allowed, or multiset of size $r$, as $[x_{i_1}, x_{i_2}, \cdots, x_{i_r}]$ where each $x_{i_j}$ is in $X$ and some of the $x_{i_j}$ my equal each other.

To count the number of rcombinations with repetition allowed, or multisets of size $r$, that can be selected from a set of $n$ elements, think of the elements of the set as categories. Then each $r$-combination with repetition allowed can be represented as a string of $n - 1$ vertical bars (to separate the $n$ categories) and $r$ crosses (to represent the $r$ elements to be chosen). The number of X's in each category represents the number of times the element represented by that category is repeated.

![r-Combinations with Repetitition](./assets/r_combinations_with_repetition.png)

The number of strings of $n - 1$ vertical bars and $r$ crosses is the number of ways to choose $r$ positions, into which to place the $r$ crosses, out of a total of $r + (n - 1)$ positions, leaving the remaining positions for the vertical bars. Thus the number of $r$-combinations with repetition allowed on a set of $n$ elements is given by

$$
\binom{r + n - 1}{r}
$$
