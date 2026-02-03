---
title: Proofs in Group Theory
weight: 13
type: docs
math: true
---

## Binary Operations

On this chapter we generalize our inquiry to the underlying methods of association—the rules by which two elements of a set are combined to produce a third. This abstraction allows us to identify universal structural patterns that transcend specific numerical systems, focusing instead on the operations that govern mathematical behavior.

The fundamental constituent of this study is the **binary operation**.

> [!NOTE] **Binary Operation**
>
> A **binary operation** ($\ast$) on a non-empty set $S$ is defined as a function mapping the Cartesian product $S \times S$ into $S$. We express this mapping as:
>
> $$\ast : S \times S \to S$$
>
> For any ordered pair $(a, b) \in S \times S$, the image is denoted $a \ast b$.

![Binary Operation](./assets/binary_operation.png)

A binary operation must satisfy **closure** to be valid, that is the operation must map every possible pair of elements in $S$ to a unique, well-defined element that remains within $S$.

For example: addition on $\mathbb{Z}$ is a valid binary operation, as the sum of any two integers is invariably an integer.

### Algebraic Properties

We define four core properties that serve as the axiomatic foundation:

1. **G1 (Associative Law)**: The operation is invariant under alternative association.

$$
\forall a, b, c \in S, a \ast (b \ast c) = (a \ast b) \ast c
$$

2. **G2 (Existence of Identity)**: There exists an element $e \in S$ (the **identity**) such that

$$
a \ast e = e \ast a = a \forall a \in S
$$

3. **G3 (Existence of Inverses)**:

$$
\forall a \in S, \exists s \in S \text{ such that } a \ast s = s \ast a = e
$$

4. **G4 (Commutative Property)**:

$$
\forall a, b \in S, a \ast b = b \ast a.
$$

![Group Laws](./assets/group_laws.png)

The following table analyzes how different structures satisfy or fail these properties:

| Structure                           | G1  | G2          | G3             | G4  | Note                                                                        |
| ----------------------------------- | --- | ----------- | -------------- | --- | --------------------------------------------------------------------------- | -------------------------------------- |
| $(\mathbb{Z}, +)$                   | Yes | Yes ($0$)   | Yes ($-n$)     | Yes | A classic abelian structure.                                                |
| $(\mathbb{Z}, \cdot)$               | Yes | Yes ($1$)   | No             | Yes | Lacks multiplicative inverses for elements $\neq 1, -1$.                    |
| $(\mathbb{M}_2(\mathbb{R}), +)$     | Yes | Yes         | $(\mathbf{0})$ | Yes | Yes                                                                         | Standard $2 \times 2$ matrix addition. |
| $(\mathbb{M}_2(\mathbb{R}), \cdot)$ | Yes | Yes ($I$)   | No             | No  | Fails G3 as singular matrices (determinant zero) lack inverses.             |
| $(\mathbb{Z}_n, \cdot)$             | Yes | Yes ([$1$]) | No             | Yes | [$0$] lacks an inverse; composite $n$ may fail closure in $\mathbb{Z}_n^*$. |

The failure of a specific property often dictates the necessary restriction of a set to maintain algebraic utility. For instance, (\mathbb{R}, \cdot) fails G3 because the element zero possesses no multiplicative inverse. To satisfy G3, we must restrict the set to the non-zero real numbers, denoted \mathbb{R}^\*.

## Groups

> [!NOTE] **Group**
>
> A **Group** is an algebraic structure $(G, \ast)$ satisfying properties G1, G2, and G3.

![Groups](./assets/groups.png)

The Group structure is a necessity for the solution of linear equations of the form $a \ast x = b$. To ensure a unique solution $x$ exists within the set, the structure must provide the following mechanics:

1. **G1 (Associativity)**: Permits the regrouping of the expression:

$$
(s \ast a) \ast x = s \ast b
$$

2. **G3 (Inverse)**: Provides the "tool" $s$ (the inverse of $a$) to operate on both sides of the equation:

$$
s \ast (a \ast x) = s \ast b
$$

3. **G2 (Identity)**: Since $s \ast a = e$, the equation simplifies to $e \ast x = s \ast b$, and the identity ensures the result is $x = s \ast b$.

> [!TIP] **Types of Groups**
>
> - **Abelian Group**: A group that also satisfies G4, honoring the contributions of Niels Henrik Abel.
> - **Nonabelian Group**: A group that fails the commutative property G4.
> - **Order**: The cardinality of the group, denoted |G|. Groups may be Finite (e.g., \mathbb{Z}\_n) or Infinite (e.g., \mathbb{Z}).

> [!TIP] **Theorem 13.5**
>
> The set of non-zero residue classes $\mathbb{Z}_n^*$ is a group under multiplication if and only if $n$ is prime.

> **Proof**
>
> If $n$ is composite, there exist integers $a, b$ where $2 \le a, b \le n-1$ such that $ab = n$. In the context of $\mathbb{Z}_n^*$, this implies $[a][b] = [n] = [0]$. Since $[0] \notin \mathbb{Z}_n^*$, the operation fails closure, disqualifying it as a group.
>
> If $p$ is prime, closure is guaranteed because $p | ab$ implies $p | a$ or $p | b$ by primality, meaning the product of two non-zero residues remains non-zero.
>
> Regarding G3, for any $[r] \in \mathbb{Z}_p^*$, $\gcd(r, p) = 1$. According to the [Linear Combination Theorem](/math/mptam/04_more_direct_contrapositive_proof/#proofs-involving-divisibility-of-integers), there exist integers $x, y$ such that $rx + py = 1$. In residue notation, this becomes
>
> $$[r][x] + [p][y] = [1]$$
>
> Since $[p] = [0]$, we have $[r][x] = [1]$, proving that $[x]$ is the multiplicative inverse of $[r]$.

## Permutation Groups

> [!NOTE] **Permutation**
>
> A permutation of a set $A$ is defined as a bijective function
>
> $$f: A \to A$$

Under the operation of function composition ($\circ$), the set $S_A$ of all permutations forms a group, designated the **Symmetric Group**.
