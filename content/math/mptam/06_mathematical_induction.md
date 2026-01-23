---
title: Mathematical Induction
weight: 6
type: docs
math: true
---

## The Principle of Mathematical Induction

In the study of discrete mathematics and formal logic, we frequently encounter propositions that assert a property for an infinite sequence of cases—most commonly for every natural number $n \in \mathbb{N}$. While proof techniques such as direct derivation, contraposition, or contradiction are indispensable, they are often insufficient for statements that possess a recursive or "step-by-step" structure.

The validity of any mathematical proof technique rests upon the underlying properties of the set under investigation. In the realm of natural numbers, we must establish a "ground floor" of logic.

> [!NOTE] **Least Element**
>
> A number $m \in A$ is defined as a **least element** (or minimum) if $x \geq m$ for every $x \in A$.

> [!NOTE] **Well-Ordered Sets**
>
> A set is considered **well-ordered** if every nonempty subset of that set contains a least element.

> [!TIP] **Uniqueness of Least Element**
>
> If a set possesses a least element, that element must be unique.

> **Proof**
>
> Assume $m_1$ and $m_2$ are both least elements of a set $A$. Because $m_1$ is a least element, it must be less than or equal to any element in $A$; thus, $m_2 \geq m_1$. Conversely, because $m_2$ is a least element, $m_1 \geq m_2$. From the antisymmetric property of the $\geq$ relation, it follows that $m_1 = m_2$.

The Well-Ordering Principle is the logical "safety net" for the integers. It ensures that if a property fails for any natural numbers, there must exist a first (minimum) number where it fails.

The Principle of Mathematical Induction (PMI) provides a dynamic strategy for moving from the finite to the infinite. It allows us to transition from verifying individual cases to proving quantified statements over the entire set $\mathbb{N}$.

> [!NOTE] **The Principle of Mathematical Induction**
>
> For each positive integer $n$, let $P(n)$ be a statement. The Principle of Mathematical Induction states:
>
> $$P(1) \land (\forall k \in \mathbb{N}, P(k) \rightarrow P(k + 1)) \rightarrow \forall n \in \mathbb{N}, P(n)$$

> **Synthesis of the Proof**
>
> The proof utilizes the Well-Ordering Principle through a contradiction.
>
> We assume there exists a nonempty set $S$ of integers for which $P(n)$ is false. By the Well-Ordering Principle, $S$ must contain a least element $s$, representing the "minimum counterexample."
>
> Since $P(1)$ is true, $s$ must be greater than $1$, meaning $s−1$ is a natural number. Because s is the least element of the set of counterexamples, $s−1$ cannot be in $S$.
>
> Therefore, $P(s−1)$ must be true. However, our inductive condition ($P(k) \rightarrow P(k+1)$) dictates that if $P(s−1)$ is true, then $P(s)$ must also be true. This contradicts the definition of s as a counterexample, thus proving $S$ must be empty.

Components of an Induction Proof

1. **Base Step (or Anchor)**: Verification that the statement $P(1)$ holds.
2. **Inductive Hypothesis**: The assumption that $P(k)$ is true for an arbitrary positive integer $k$.
3. **Inductive Step**: The logical deduction showing that if $P(k)$ is true, then $P(k+1)$ is necessarily true.

## A More General Principle of Mathematical Induction

Mathematical truths do not always commence at $n=1$. the **Generalized Principle of Mathematical Induction**, allows the domain to begin at any fixed integer $m$.

> [!NOTE] **Generalized Principle of Mathematical Induction**
>
> For each positive integers $n, m$, let $P(n)$ be a statement. The **Generalized Principle of Mathematical Induction** states:
>
> $$P(m) \land (\forall k \in \mathbb{N}, k \geq m, P(k) \rightarrow P(k + 1)) \rightarrow \forall n \in \mathbb{N}, P(n)$$

As an alternative to standard induction, we employ Proof by Minimum Counterexample. This is a proof by contradiction that utilizes the Well-Ordering Principle directly. We assume a statement is false, let m be the smallest integer for which it fails, and then demonstrate that if $P(m−1)$ is true, $P(m)$ must also be true, thereby contradicting the existence of a "first" failure.

Ultimately, the Principle of Mathematical Induction and the Proof by Minimum Counterexample are two sides of the same logical coin. One uses the Well-Ordering Principle indirectly to build a tower of truth, while the other uses it directly to collapse a house of lies.
