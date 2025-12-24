---
title: Infinite Sets
weight: 6
type: docs
math: true
---

## Introduction

Most of the interesting sets we have looked at have an infinite number of elements, the sets $\mathbb{Z}$, $\mathbb{Q}$, and $\mathbb{R}$ being the most important examples.

In the 19th century, mathematicians attempted to introduce rigor into calculus. In doing so, they undertook a comprehensive study of the properties of the real numbers. As the theory advanced, it soon became clear that infinite sets in general had to be studied.But the very idea of a set with an infinite number of elements was resisted for a long time, mainly because it seemed to lead to contradictions.

There is a way to show that two finite sets $A$ and $B$ have the same number of elements: find a bijective function with domain $A$ and codomain $B$.

Consider the set $\mathbb{Z}$ of integers and the set $\mathbb{E}$ of even integers. The function $f: \mathbb{Z} \to \mathbb{E}$ defined by $f(n) = 2n$ is a bijection between $\mathbb{Z}$ and $\mathbb{E}$.

Where we have the seeming contradiction of a set having the same size as one of its proper subsets.

Gradually, as the 19th century came to a close, these examples came to be seen as **paradoxes** rather than actual mathematical contradictions. **Paradoxes**, in this context, are seemingly contradictory statements that are actually true. In the last example, if we accept the fact that two sets having the same size means that there is a bijection between them, then it is a true statement to say that $\mathbb{Z}$ and $\mathbb{E}$ have the same size.

## Countable Sets

### Numerically Equivalent Sets

Cantor distinguished infinite sets by their "size" in the same way we discussed.

> [!NOTE] **Numerically Equivalent Sets**
>
> Let $A$ and $B$ be sets contained in some universal set $U$. We say that $A$ and $B$ are **numerically equivalent** if there exists a bijection $f: A \to B$. We say that $A$ and $B$ have the same **cardinality**.

If $A$ and $B$ are numerically equivalent, we write $A \approx B$.

The definition of numerical equivalence actually defines an equivalence relation on the power set of $U$. Specifically, we have the following:

1. **Reflectivity**: For every set $A, A \approx A$
2. **Symmetry**: For all sets $A$ and $B$, if $A \approx B$, then $B \approx A$.
3. **Transitivity**: For all sets, $A, B$ and $C$, if $A \approx B$ and $B \approx C$ then $A \approx C$.

> [!NOTE] **Finite Set**
>
> Let, $A$ be a set contained in a universal set $U$. We say that $A$ is a finite set if $A = \emptyset$ or if $A = \\{1, 2, \cdots, n\\}$ for some positive integer $n$. The integer $n$ is the number of elements of $A$ and is denoted by $|A|$.

A set that is not finite is called an **infinite set**. The cardinality of a set is a measure of the size of a set. The cardinality or **cardinal number** of a finite set is the number of elements in the set. Every nonnegative integer then is a cardinal number.

### Countable Sets

The most natural example of an infinite set, the one we first encounter in arithmetic, is the set $\mathbb{Z}^+$ of positive integers.

> [!NOTE] **Countably Inifinite Sets**
>
> Any set $A$ that is numerically equivalent to $\mathbb{Z}^+$ is called a **countably infinite** set.

> [!NOTE] **Countable Sets**
>
> Any set $A$ that is either finite or countably finite is called **countable**.

A set that is not countable is called **uncountable**.

Any two countably infinite sets then have the same cardinality. We denote this cardinality by $\aleph_0$ (read "aleph zero" or "aleph naught"). $\mathcal{N}_0$ is our first example of an infinite cardinal number.

> [!TIP] **Theorem 6.1.4**
>
> Let $A$ be a countably infinite set and let $B$ be an infinite subset of $A$. Then $B$ is countably infinite.

**Proof**

Since $A$ is countably infinite, there exists a bijection $f: \mathbb{Z}^+ \to A$. To prove that $B$ is countably infinite, we will define a bijective function $g: \mathbb{Z}^+ \to B$. To do this, we first inductively define a collection of nonempty subsets of $\mathbb{Z}^+$.

Let $S_1 = \\{i \in \mathbb{Z}^+|f(i) \in B\\}$. $S_1$ is the set of positive integers that get mapped to $B$ by the function $f$. Since $f$ is surjective, $S_1$ is an infinite subset of $\mathbb{Z}^+$. Next we define $S_2$ as follows: by the Well-Ordering Principle, $S_1$ has a smallest element that we will call $k_1$. So we let $S_2 = S_1 - {k_1}$.

Now suppose that we have defined $n - 1$ nonempty subsets of $\mathbb{Z}^+$, $S_1, S_2, \cdots, S_{n - 1}$. By the Well-Ordering Principle, each $S_i$ has a smallest element. Call it $k_i$ We define $S_n = S_1 - \\{k_1, k_2, \cdots, k_{n - 1}\\}$. Then $S_n$ is nonempty since $B$ is an infinite set. Let $k_n$ be the smallest element of $S_n$. Now we define $g: \mathbb{Z}^+ \to B$ by $g(n) = f( k_n)$.

Note that the sequence of integers $k_1, k_2, \cdots$ has the property that if $n < m$, then $k_n < k_m$. We now show that $g$ is a bijective function. To see that $g$ is injective, let $n, m \in \mathbb{Z}^+$ and suppose that $g(n) = g(m)$. Then $f(k_n) = f(k_m)$. Since $f$ is injective, we have $k_n = k_m$. It now follows from the above remark that $n = m$. Therefore, $g$ is injective.

To prove that $g$ is surjective, let $b \in B$. We must find $n \in \mathbb{Z}^+$ such that $g(n) = b$. Since $f$ is surjective, there exists $t \in \mathbb{Z}^+$ such that $f(t) = b$. Note that $t \in S_1$ since $f(t) \in B$. Let $m$ be the number of integers in $S_1$ that are less than $t$. If there are no such integers, that is, if $m = 0$, then $t = k_1$. Otherwise the integers that are less than $t$ are $k_1, k_2, \cdots, k_m$. Since $S_{m+1} =S_1 - \\{k_1, k_2, \cdots, k_m\\}$, $t$ must be the smallest element of $S_{m + 1}$ and hence $t =k_{m+1}$. Thus if $m = 0$ or not, $g(m + 1) = f(t) = b$. This proves that $g$ is surjective.

Since $g$ is a bijection, it follows that $B$ is countably infinite.

> [!TIP] **Corollary 6.1.5**
>
> Every subset of $\mathbb{Z}$ is countable.

We have seen that a set $A$ is countably infinite if there is a bijection from $\mathbb{Z}^+$ to $A$. Sometimes it may be difficult or cumbersome to define such a function.

In our next result, we prove that we only have to find a surjective function from $\mathbb{Z}^+$ to $A$.

> [!TIP] **Theorem 6.1.6.**
>
> Let $A$ be an infinite set. Suppose there exists a surjection $f: \mathbb{Z}^+ \to A$. Then $A$ is countably infinite.

**Proof**

We will inductively define a bijective function $g: \mathbb{Z}^+ \to A$.

Let $g(1) = f(1)$. Let $n_2$ be the smallest positive integer such that $f(n_2) \neq g(1)$. Let $g(2) = f(n_2)$. Now suppose that $k \in \mathbb{Z}^+$ and $g(1), g(2), \cdots, g(k - 1)$ have been defined. Let $n_k$ be the smallest positive integer such that $f(n_k) \in A - \\{g(1), g(2), \cdots, g(k - 1)\\}$. We define $g(k) = f(n_k)$. This definition gives a function from $\mathbb{Z}^+$ to $A$. From the definition of $g$, $g(k) \neq g(i)$ for any $i = 1, 2, \cdots, k - 1$. Thus $g$ is injective.

We now prove that $g$ is surjective. Let $a \in A$. Since $f$ is surjective, $a$ is in the image of $f$. Let $t$ be the smallest positive integer such that $f(t) = a$. Then $f(t) \neq f(i)$ for any $i = 1, 2, \cdots, t - 1$. Let $r$ be the number of distinct elements from among $f(1), f(2), \cdots, f(t - 1)$. Then $g(1), g(2), \cdots, g(r)$ are equal to $f(1), f(2), \cdots, f(t - 1)$ in some order.

Hence $t$ is the smallest positive integer such that $f(t) \in A - \\{g(1), g(2), \cdots, g(r)\\}$. It follows from the definition of $g$ that $g(r + 1) = f(t) = a$, proving that $g$ is surjective.

We have thus constructed a bijection from $\mathbb{Z}^+$ to $A$ and so $A$ is countably infinite.

> [!NOTE] **Sequence of Elements**
>
> Let $U$ be some universal set. A sequence of elements of $U$ is a function $f: \mathbb{Z}^+ \to U$.

If $f: \mathbb{Z}^+ \to U$ is a sequence and we write $a_n = f(n)$ for each $n \in \mathbb{Z}^+$, then the sequence can be expressed in the form $\\{a_1, a_2, a_3, \cdots\\}$ or more simply $\\{a_n\\}^{\infty}_{n=1}$. Note that the elements of the sequence are not necessarily distinct. In fact, they would all assume the same value if $f$ is a constant function.

### Unions of Countable Sets

We now consider the question of whether there are "bigger" sets than $\mathbb{Z}$ that are countable.

> [!TIP] **Theorem 6.1.8**
>
> Let $A_1, A_2, \cdots, A_k$ be a finite collection of countably infinite sets, all contained in some universal set $U$. Then $A_1 \cup A_2 \cup \cdots \cup A_k$ is a countably infinite set.

**Proof**

Since each $A_i$ is countably infinite, there is a bijection $f_i: \mathbb{Z}^+ \to A_i$ for each $i = 1, 2, \cdots k$. Let $A = A_1 \cup A_2 \cup \cdots \cup A_k$. We will define a surjective function $f: \mathbb{Z}^+ \to A$. Such that $A$ is countably finite. We let

$$
f(1) = f_1(1) \\
f(2) = f_2(1) \\
\vdots \\
f(k) = f_k(1) \\
f(k + 1) = f_{k + 1}(1) \\
\vdots \\
f(2k) = f_{k}(2) \\
\vdots
$$

An explicit formula for $f$ can be given as follows. Let $n \in \mathbb{Z}^+$. Using a modification of the Division Algorithm, we can write $n = mk + r$ where $m$ is a nonnegative integer and $r$ is an integer such that $1 \leq r \leq k$. Moreover, $r$ and $m$ are unique. Then $f(n) = f(mk + r) = f_r(m + 1)$.

Now $f$ is not necessarily injective but it is surjective. To see this, let $a \in A$. Then $a \in A_i$ for some $i$. Since $f_i$ is surjective, there exists $n \in \mathbb{Z}^+$ such that $f_i(n) = a$. Then $f((n - 1)k + i) = f_i(n) = a$. Therefore $f$ is surjective and our proof is complete.

### The Rationals Are Countable

We now consider the set $\mathbb{Q}$ of rational numbers. At first glance it seems to be a "much bigger" set than $\mathbb{Z}$. This means that any interval on the real line, no matter how small, will contain infinitely many rational numbers. Despite this fact, the rational numbers do form a countable set.

> [!TIP] **Theorem 6.1.9**
>
> The set of $\mathbb{Q}$ of rational numbers is countably infinite.

**Proof**

We will show that the set $\mathbb{Q}^+$ of positive rationals is countably infinite. Since it is easy to define a bijection from $\mathbb{Q}^+ to \mathbb{Q}^-$, it will follow that the set $\mathbb{Q}^-$ of negative rationals is also countably infinite. Since $\mathbb{Q} = \mathbb{Q}^+ \cup \mathbb{Q}^- \cup \\{0\\}$, Theorem 6.1.8 implies that $\mathbb{Q}$ is countably infinite.

Any element of $\mathbb{Q}^+$ can be written as $a/b$ where $a, b \in \mathbb{Z}^+$. So we can write the elements of $\mathbb{Q}^+$ in a rectangular array where the elements in a given row all have the same denominator; that is, the numbers in row $1$ have denominator $1$, the numbers in row $2$ have denominator $2$, the numbers in row $3$ have denominator $3$, and so on. It will look like this:

![Rational Numbers as a Matrix](assets/matrix_rational_numbers.png)

Note that elements of $\mathbb{Q}^+$ appear more than once in this listing. In fact each element appears an infinite number of times. We define $f: \mathbb{Z}^+ \to \mathbb{Q}^+$ by going through this array diagonally:

![Rational Numbers as a Matrix](assets/matrix_rational_numbers_1.png)

That is, we can define:

$$
\begin{matrix}
f(1) = \frac{1}{1} & f(2) = \frac{1}{2} & f(3) = \frac{2}{1} & f(4) = \frac{3}{1} & f(5) = \frac{2}{2} \\[12pt]
f(6) = \frac{1}{3} & f(7) = \frac{1}{4} & f(8) = \frac{2}{3} & \cdots
\end{matrix}
$$

We will forego giving an explicit formula for $f$ since it is complicated. But it is clear from the construction of $f$ that every positive rational is in the image of $f$. It is now a consequence of Theorem 6.1.6 that $\mathbb{Q}^+$ is countably infinite. We can now conclude that $\mathbb{Q}$ is a countably infinite set.

### Cartesian Products of Countable Sets

Another set that is "bigger" than $\mathbb{Z}$ is the Cartesian product $\mathbb{Z} \times \mathbb{Z}$, the set of all ordered pairs of integers.

> [!TIP] **Theorem 6.1.11**
>
> Let $A$ and $B$ be countably infinite sets contained in some universal set $U$. Then $A \times B$ is countably infinite.

> [!TIP] **Theorem 6.1.12**
>
> Let $A_1, A_2, \cdots, A_k$ be a finite collection of countably infinite sets, all contained in some universal set $U$. Then the Cartesian product $A_1 \times A_2 \times \cdots \times A_k$ is a countably infinite set.

So far we have only looked at in finite sets that are countable. There are indeed in finite sets that are not countable: the set $\mathbb{R}$ of real numbers is the outstanding example.

## Uncontable Sets, Cantor's Theorem and the Schroeder-Bernstein Theorem

Before beginning, though, we must recall some simple facts about the decimal expansion of real numbers. We will assume that any nonnegative real number $x$ can be written in decimal form

$$
x = a_0.a_1a_2a_3 \cdots = a_0 + \frac{a_1}{10} + \frac{a_2}{10^2} + \frac{a_3}{1000}
$$

where $a_0, a_1, a_2, a_3, \cdots$ are nonnegative integers and $a_1, a_2, a_3, \cdots$ are between $0$ and $9$.

Every such expansion in fact represents a real number. Such an expansion is unique except for expansions like

$$
\frac{1}{2} = 0.5000 \cdots = 0.4999 \cdots
$$

That is, the decimal representation is unique unless the expansion ends in an infinite string of $9$s.

### Uncountable Sets

> [!TIP] **Theorem 6.2.1**
>
> The interval $[0, 1)$ is uncountable.

**Proof**

The proof is by contradiction. We assume that $[0, 1)$ is countable and derive a contradiction. If $[0, 1)$ is countable, then there is a bijection $f: \mathbb{Z}^+ \to [0, 1)$. For each $i \in \mathbb{Z}^+$ let $x_i = f(i)$. Now by the previous remarks, each $x_i$ has a decimal expansion of the form

$$
x_i = 0.a_1^ia_2^i \cdots
$$

where $a_1^i, a_2^i$ are integers between $0$ and $9$.

We will derive our contradiction by constructing a real number $x$ in $[0 , 1)$ that is not equal to any $x_i$.

Let $x = 0.b_1b_2b_3 \cdots$ where $b_i = 0$ if $a_i^i = 1$ and $b_i = 1$ if $a_i^i \neq 1$. This
means that $x$ differs from $x_i$ in the first decimal place, differs from $x_2$ in the second decimal place, differs from $x_3$ in the third decimal place, and so on.

Hence $x \neq x_i$ for all $i$. In other words, $x \neq f(i)$ for any $i \in \mathbb{Z}^+$. But this contradicts the fact that $f$ is surjective. Thus $[0, 1)$ cannot be countable and therefore must be uncountable.

Since we now know that there are subsets of $\mathbb{R}$ that are uncountable, we will consider the question of the numerical equivalence of such sets. For example, it is not hard to prove that every closed interval $[a, b]$ is numerically equivalent to $[0, 1]$. It follows that any two closed intervals $[a, b]$ and $[e, d]$ are numerically equivalent. Similarly, any two bounded open intervals are numerically equivalent.

Any two sets that are numerically equivalent to $\mathbb{R}$ have the same cardinality. We denote this cardinality by $c$, called the **power of the continuum**. $c$ is our second example of an infinite cardinal number. It follows from the previous remarks that every open or closed interval of real numbers has cardinality $c$.

### Cantor's Theorem

Since there is a natural ordering of the positive integers, it is possible to determine the larger of two finite cardinal numbers. What about the infinite cardinals? Since $\aleph_0$ is the cardinality of $\mathbb{Z}$ and $c$ is the cardinality of $\mathbb{R}$, it makes sense that $\aleph_0$ be a "smaller" cardinal number than $c$ because $\mathbb{Z}$ is a "smaller" set than $\mathbb{R}$: $\mathbb{Z}$ is a subset of $\mathbb{R}$ and $\mathbb{Z}$ is not numerically equivalent to $\mathbb{R}$. We are led to the following definition of what it means for one set to be "smaller" than another.

> [!NOTE] **Cardinality Inequality**
>
> Let $A$ And $B$ be sets contained in some universal set $U$. We say that $A \prec B$ if there is an injection $f: A \to B$ but not bijection from $A$ to $B$.
>
> We say that $A \preceq B$ if $A \prec B$ or if $A$ is numerically equivalent to $B$.

Now if we have two cardinal numbers, say $\textbf{x}$ and $\textbf{y}$, we will say that $\textbf{x} \prec \textbf{y}$ if $\textbf{x}$ is the cardinality of set $X$, $\textbf{y}$ is the cardinality of a set $Y$, and $X \prec Y$.

Similarly, we will say that $\textbf{x} \preceq \textbf{y}$ if $\textbf{x}$ is the cardinality of set $X$, $\textbf{y}$ is the cardinality of a set $Y$, and $X \preceq Y$.

> [!TIP] **Lemma 6.2.4**
>
> Let $A, B, C, D$ be sets contained in a universal set $U$. Suppose that $A \approx B$, $C \approx D$. If $A \prec C$, then $B \prec D$. If $A \preceq C$, then $B \preceq D$.

So we can now say that $\aleph_0 \prec c$.

We might ask if there are any infinite cardinal numbers $\textbf{x}$ such that $\textbf{x} \prec \aleph_0$. The answer is no since it can be shown, although it is difficult, that every infinite set contains a countably infinite subset.

Are there other infinite cardinal numbers besides $\aleph_0$ and $c$? The answer is yes, and in fact there are an infinite number of infinite cardinals. The following result, known as Cantor's Theorem, explains why.

> [!NOTE] **Cantor's Theorem**
>
> Let $A$ be a set contained in a universal set $U$. Let $\mathcal{P}(A)$ denote the power set of $A$. Then $A \prec \mathcal{P}(A)$.

**Proof**

We first need to show that there is an injection $f: A \to \mathcal{P}(A)$. Such an injection must map elements of $A$ to subsets of $A$. There is a natural way to do this. Let $a \in A$ and map a to the subset $\\{a\\}$; that is, $f(a) = \\{a\\}$. It is easy to see that $f$ is injective: for if $f(a) = f(b)$ for some $a, b \in A$, then $\\{a\\} = \\{b\\}$ and hence $a = b$.

Now we will show that there is no surjective function from $A$ to $\mathcal{P}(A)$. Suppose, on the contrary, that there is a surjective function $g: A \to \mathcal{P}(A)$. We will derive a contradiction.

If $a \in A$, then $g(a)$ is a subset of $A$. Now the element $a$ may or may not be an element of this subset; that is, for some $a$, we may have $a \in g(a)$ and for some $a$, we may have $a \notin g(a)$.

Let $B = \\{a \in A | a \notin g(a)\\}$. $B$ is the set of elements a of $A$ that get mapped to a subset of $A$ that does not contain $a$.

Since $g$ is surjective and $B$ is a subset of $A$, $B$ must be in the image of $g$. This will be true even if $B$ is the empty set. So there exists an element $a_0$ in $A$ such that $g(a_0) = B$. Now we consider the question: is $a_o \in B$ or not? Here is where we will derive a contradiction by showing that either possibility leads to an absurdity.

Suppose $a_o \in B$. Then, by definition of $B$, $ao \notin g(a_o)$. But $g(a_o) = B$, so we are led to the contradictory statement that if $a_o \in B$, then $a_o \notin B$.

Now suppose that $a_0 \notin B$. Then it follows that $a_o \in g(a_o) = B$. So if $a_o \notin B$, then $a_o \in B$! There is no way out of this contradiction except to conclude that $B$ is not in the image of $g$, contradicting the fact that $g$ is surjective. Therefore, no such surjective function can exist.

We have thus proved that $A \prec \mathcal{P}(A)$.

### The Continuum Hypothesis

Question: Is there an infinite cardinal $\textbf{x}$ such that $\aleph_0 \prec \textbf{x} \prec c$? This problem has a long and interesting history. [Cantor](https://en.wikipedia.org/wiki/Georg_Cantor) conjectured that no such infinite cardinal $\textbf{x}$ exists. His conjecture has come to be known as **the Continuum Hypothesis**.

The first real progress on the Continuum Hypothesis was made by [Kurt Godel](https://en.wikipedia.org/wiki/Kurt_G%c3%b6del) (1906-1978) in the 1930s when he proved that the Continuum Hypoth­esis was consistent with the axioms of set theory. In other words, using the commonly accepted
axioms on which the theory of sets is based, it is impossible to disprove the
Continuum Hypothesis.

However, in 1963, [Paul Cohen](https://wikipedia.org/wiki/Paul_Cohen) (1934-2007) proved that the negation of the Continuum Hypothesis is also consistent with the axioms of set theory. Thus the Continuum Hypothesis is independent of the axioms of set theory and can be neither proved nor disproved from those axioms!

### The Schroeder-Bernstein Theorem

Note that $\preceq$ is a relation on $\mathcal{P}(U)$, where $U$ is a universal set. But what kind of a relation is it?

> [!NOTE] **Schroeder-Bernstein Theorem**
>
> Let $A$ and $B$ bet sets, and suppose that $A \preceq B$ and $B \preceq A$. Then $A \approx B$.

**Proof**

Let $f: A \to B$ and $g: B \to A$ be injections. We need to construct a bijection $h: A \to B$, so let $a \in A$. The key is to trace a back as far as possible through $f$ and $g$. That is, if $a = a_1 \in g(B)$, let $b_1$ be the unique element of $B$ such that $a_1 = g(b_1)$; if $b_1 \in f(A)$, let $a_2$ be the unique element of $A$ such that $b_1 = f(a_2)$; if $a_2 \in g(B)$, let $b_2$ be the unique element of $B$ such that $a_2 = g(b_2)$; and so on. We might call this tracing the ancestry of $a$, and we can visualize it as follows:

![Numerically Equivalency Tracing](./assets/numerically_equivalent_proof.png)

We thus construct a set $\\{a = a_1, b_1, a_2, b_2, a_3, b_3\\}$ of ancestors of $a$. Now this may be a finite set: we may reach an oldest ancestor $a_i \notin g(B)$ or $b_i \notin f(A)$. Or the process may not stop, yielding an infinite set of ancestors. So let us define the following subsets of $A$:

$$
A_A = \{a \in A | a \text{ has an oldest ancestor } a_i \in A\}
$$

$$
A_B = \{a \in A | a \text{ has an oldest ancestor } b_i \in B\}
$$

$$
A_{\infty} = \{a \in A | a \text{ has no oldest ancestor }\}
$$

These sets are clearly pairwise disjoint and $A_A \cup A_B \cup A_{\infty} = A$; that is, every element of $A$ must satisfy exactly one of the three conditions.

Finally, notice that we could perform the same analysis on $B$, and arrive at analogous subsets $B_B, B_A$, and $B_{\infty}$ of B. In fact, $f$ maps $A_A$ bijectively to $B_A$ and $A_{\infty}$, to $B_{\infty}$; similarly, $g$ maps $B_B$ bijectively to $A_B$.

Thus we may construct the bijection $h$ as follows:

$$
h(a) = \begin{cases}
f(a) & \text{ if } a \in A_A \cup A_{\infty} \\
b & \text{ where } a = g(b), \text{ if } a \in A_B \\
\end{cases}
$$
