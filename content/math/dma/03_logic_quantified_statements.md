---
title: The Logic of Quantified Statements
weight: 3
type: docs
math: true
---

## Predicates and Quantified Statements I

> [!TIP] **Predicate**
>
> A **predicate** is a sentence that contains a finite number of variables and becomes a statement when specific values are substituted for the variables.

The **domain of a predicate variable** is the set of all values that may be substituted in place of the variable.

> [!TIP] **Truth Set**
>
> If $P(x)$ is a predicate and $x$ has domain $D$, the **truth set** of $P(x)$ is the set of all elements of $D$ that make $P(x)$ true when they are substituted for $x$. The truth set of P(x) is denoted
>
> $$\{x \in D| P(x)\}$$

### The Universal Quantifier: $\forall$

The formal concept of quantifier was introduced into symbolic logic in the late nineteenth century by the American philosopher, logician, and engineer [Charles Sanders Peirce](https://en.wikipedia.org/wiki/Charles_Sanders_Peirce) and, independently, by the German logician [Gottlob Frege](https://es.wikipedia.org/wiki/Gottlob_Frege).

The symbol $\forall$ is called the **universal quantifier**.

> [!TIP] **Universal Statement**
>
> Let $Q(x)$ be a predicate and $D$ the domain of $x$. A universal statement is a statement of the form $\forall x \in D, Q(x)$. It is defined to be true if, and only if, $Q(x)$ is true for each individual $x$ in $D$. It is defined to be false if, and only if, $Q(x)$ is false for at least one $x$ in $D$.

> [!TIP] **Counterexmaple**
>
> A value for $x$ for which $Q(x)$ is false is called a **counterexample** to the universal statement $\forall x \in D, Q(x)$.

The **method of exhaustion** consists of showing the truth of the predicate separately for each individual element of the domain. This method can, in theory, be used whenever the domain of the predicate variable is finite.

### The Existential Quantifier: $\exists$

The symbol $\exists$ denotes “there exists” and is called the **existential quantifier**.

> [!TIP] **Existential Statement**
>
> Let $Q(x)$ be a predicate and $D$ the domain of $x$. An existential statement is a statement of the form $\exists x \in D, \text{ such that } Q(x)$. It is defined to be true if, and only if, $Q(x)$ is true for at least one $x$ in $D$. It is false if, and only if, $Q(x)$ is false for all $x$ in $D$.
