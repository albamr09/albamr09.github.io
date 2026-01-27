---
title: Equivalence Relations
weight: 8
type: docs
math: true
---

## Relations

In the pursuit of mathematical rigor, relations serve as a strategic framework for comparing and associating elements across disparate domains.

> [!NOTE] **Relation**
>
> A relation $R$ from set $A$ to set $B$ is defined as a subset of the Cartesian product $A \times B$.

It is essentially a collection of ordered pairs where the first element originates in $A$ and the second in $B$. We employ a specific notation to describe these associations:

- $a \text{ } R \text{ } b$ indicates that $(a, b) \in R$, that is $a$ is related to $b$.
- $a \text{ } \not R \text{ } b$ indicates that $(a, b) \not \in R$, that is $a$ is not related to $b$.

This abstract set-theoretic definition manifests in concrete mathematical objects. In geometry, we might relate a line $\mathcal{l}$ to a plane $\beta$ based on whether the line lies on the plane, is parallel to it, or intersects it at exactly one point. In arithmetic, we can relate integers $a$ and $b$ by divisibility ($a∣b$) or parity.

To analyze the internal structure of any given relation, we define three fundamental components:

- **Domain**
- **Range**
- **Inverse Relation**

> [!NOTE] **Domain**
>
> Given a relation $R$ defined over the sets $A$ and $B$, the **domain** of $R$ is defined as
>
> $$dom(R) = \{a \in A: (a, b) \in R \text{, for some } b \in B\}$$

> [!NOTE] **Range**
>
> Given a relation $R$ defined over the sets $A$ and $B$, the **range** of $R$ is defined as
>
> $$range(R) = \{b \in B: (a, b) \in R \text{, for some } a \in A\}$$

> [!NOTE] **Inverse Relation**
>
> Given a relation $R$ defined over the sets $A$ and $B$, the **inverse relation** of $R$, $R^{-1}$ is defined as
>
> $$\{(b, a): (a, b) \in R\}$$

![Relations Concepts](./assets/relations_concepts.png)

## Properties of Relations

While relations can bridge two different sets, the most profound mathematical insights often emerge from the specialized study of relations defined on a single set, where $A=B$.

> [!TIP] **Properties of Relations**
>
> The three primary properties of relations are defined as follows:
>
> - **Reflexivity**: A relation $R$ is reflexive if for every $x \in A, xRx$.
> - **Symmetry**: A relation $R$ is symmetric if whenever $xRy$, then $yRx$ for all $x, y \in A$.
> - **Transitivity**: A relation $R$ is transitive if whenever $xRy$ and $yRz$, then $xRz$ for all $x,y,z \in A$.

![Relations Reflexivity](./assets/relation_reflexive.png)

![Relations Symmetry](./assets/relation_symmetric.png)

![Relations Transitivity](./assets/relation_transitive.png)

> **Example: The Distance Relation**
>
> The "Distance Relation" on real numbers, defined by $aRb$ if $∣a−b∣ \leq 1$, demonstrates a relation that possesses **reflexivity** (as $∣a−a∣=0 \leq 1$) and **symmetry** (as $∣a−b∣=∣b−a∣$).
>
> However, **it fails the transitivity test** due to the nature of cumulative distance. Consider the values $3$, $2$, and $1$:
>
> 1. $3R2$ because $∣3−2∣=1\leq 1$.
> 2. $2R1$ because $∣2−1∣=1 \leq 1$.
>
> $3 \not R 1$ because $∣3−1∣=2$, which is not $\leq 1$. The cumulative distance across the chain of relations exceeds the defined threshold.

## Equivalence Relations

The equivalence relation acts as the mathematical generalization of equality. While strict equality (a=b) is the most fundamental form, equivalence relations allow us to group distinct elements together based on shared characteristics.

> [!NOTE] **Equivalence Relation**
>
> An **Equivalence Relation** is any relation that is simultaneously **reflexive**, **symmetric**, and **transitive**.

The importance of equivalence relations lies in their ability to partition a set into disjoint, meaningful subsets known as equivalence classes. This process simplifies complex sets by grouping "relatives" together.

> [!NOTE] **Equivalence Class**
>
> For an equivalence relation $R$ on set $A$, the **Equivalence Class** of an element $a$, denoted by $[a]$, is defined as:
>
> $$[a] = \{x \in A: x R a\}$$
>
> This set contains all elements $x$ in $A$ that are related to $a$. Because the relation is reflexive, a is always a member of its own class ($a \in [a]$).

A formal theorem is required to determine when two different elements represent the same equivalence class, preventing the redundant treatment of identical subsets.

![Equivalence Class Example](./assets/equivalence_classes.png)

> [!TIP] **The Equality of Classes**
>
> Let $R$ be an equivalence relation on a nonempty set $A$. For any $a,b \in A$:
>
> $$[a] = [b] \Leftrightarrow a R b$$

> **Proof**
>
> We must prove this biconditional statement in both directions.
>
> **I. The "if" direction ($\Leftarrow$)**
>
> Assume $aRb$. We must show $[a]=[b]$ by showing mutual inclusion.
>
> 1. Showing $[a]\subseteq [b]$: Let $x \in [a]$. Then $xRa$. Since we assume $aRb$, by transitivity, $xRb$. Thus $x \in [b]$.
> 2. Showing $[b] \subseteq [a]$: Let $y \in [b]$, so $yRb$. Since $aRb$ and $R$ is symmetric, $bRa$. By transitivity, $yRb$ and $bRa$ imply $yRa$. Thus $y \in [a]$.
>
> Since both inclusions hold, $[a]=[b]$.
>
> **II. The "only if" direction ($\Rightarrow$)**
>
> Assume $[a]=[b]$.
>
> By the reflexive property, we know $a \in [a]$. Since $[a]=[b]$, it must be that $a \in [b]$. By the definition of an equivalence class, $a\in[b]$ implies $aRb$.
