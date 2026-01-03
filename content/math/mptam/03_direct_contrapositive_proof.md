---
title: Direct Proof and Proof by Contrapositive
weight: 3
type: docs
math: true
---

## Trivial and Vacuous Proofs

In the discipline of mathematics, precision in language is the foundation upon which all logical reasoning is built. Before one can construct or analyze a mathematical proof, it is critical to understand the formal classification of mathematical statements: from foundational axioms to consequential corollaries. Understanding this structure is the first step toward appreciating the logical architecture of proof.

> [!NOTE] **Axiom**
>
> An **axiom** is a true mathematical statement that is accepted without proof. These are the foundational assumptions from which other truths are derived.

For example, Euclid's axiom states that for every line $l$ and a point $P$ not on $l$, there exists a unique line containing $P$ that is parallel to $l$.

> [!NOTE] **Theorem**
>
> A **theorem** is a true mathematical statement whose truth can be verified. The term is often reserved for statements that are particularly significant or interesting within their field.

> [!NOTE] **Result**
>
> A **result** is general term for a true and verifiable mathematical statement. This term is used to illustrate proof techniques without necessarily implying the major significance associated with a theorem.

> [!NOTE] **Corollary**
>
> A **corollary** is a mathematical result that can be deduced from, and is thereby a consequence of, some previously established result.

> [!NOTE] **Lemma**
>
> A **lemma** is a mathematical result that serves primarily as a tool for proving another, more significant result. It is often considered a "helping theorem," valued for its utility in a larger proof rather than for its own intrinsic importance.

### Trivial and Vacuous Proofs

The most direct, albeit less common, proof techniques are those that rely on the fundamental truth table of a logical implication. These methods, known as **trivial and vacuous proofs**, arise from special cases where the truth value of the entire implication $P \rightarrow Q$ can be determined by analyzing the conclusion ($Q$) or the hypothesis ($P$) in isolation.

![Implication Truth Table](./assets/implication_truth_table.png)

The validity of trivial and vacuous proofs stems directly from the definition of a logical implication. An implication is only false when a true hypothesis, $P$, leads to a false conclusion, $Q$; in all other cases, it is true.

> [!NOTE] **Trivial Proof**
>
> A **trivial proof** is a method used to prove an implication $\forall x \in S, P(x) \rightarrow Q(x)$ by demonstrating that the conclusion, $Q(x)$, is true for all elements $x$ in the domain $S$.

![Trivial Proof](./assets/trivial_proof.png)

The trivial proof holds because if $Q(x)$ is always true, the implication $P(x) \rightarrow Q(x)$ is true regardless of the truth value of the hypothesis $P(x)$. For example:

> Let $x \in \mathbb{R}$. If $x < 0$, then $x^2 + 1 > 0$.
>
> The proof begins by observing that for any real number $x$, the expression $x^2$ is always greater than or equal to zero. From this known property, it directly follows that $x^2 + 1$ must be strictly greater than zero.
>
> This constitutes a trivial proof because the conclusion, $x^2 + 1 > 0$, is true for all real numbers.

> [!NOTE] **Vacuous Proof**
>
> A **vacuous proof** is a technique used to prove an implication $\forall x \in S, P(x) \leftarrow Q(x)$ by demonstrating that the hypothesis, $P(x)$, is false for all elements $x$ in the domain $S$.

![Vacuous Proof](./assets/vacuous_proof.png)

According to the [truth table of the implication](/math/mptam/02_logic/#logical-operators), if $P(x)$ is always false, the implication $P(x) \leftarrow Q(x)$ is automatically true, irrespective of the truth value of the conclusion $Q(x)$. For example:

> Let $x \in \mathbb{R}$. If $x^2 − 2x + 2 \leq 0$, then $x^3 \geq 8$
>
> The expression $x^2 − 2x + 2$ is rewritten as $(x − 1)^2 + 1$. Since $(x − 1)^2$ is the square of a real number, it must be greater than or equal to zero. Therefore, $(x − 1)^2 + 1 \geq 1$.
>
> This manipulation demonstrates that the hypothesis, $x^2 − 2x + 2 ≤ 0$, can never be true for any real number $x$. Because the hypothesis is universally false for the entire domain, the implication is true by definition.

## Direct Proof

The direct proof is the most common and intuitive technique in mathematics. Its strategy is straightforward and constructive: to demonstrate that an implication $P \rightarrow Q$ is true by assuming the hypothesis $P$ is true and building a direct, logical bridge of justified steps that inevitably leads to the conclusion $Q$.

> [!NOTE] **Methodology of a Direct Proof**
>
> The formal procedure for a **direct proof** of the statement $\forall x \in S, P(x) \rightarrow Q(x)$ is as follows:
>
> 1. Assume that $P(x)$ is a true statement for an arbitrary element $x$ from the domain $S$.
> 2. Using this assumption, along with established definitions, axioms, and previously proven results, construct a sequence of logical deductions.
> 3. Show that this sequence of deductions necessarily leads to the conclusion that $Q(x)$ is also a true statement.

![Direct Proof](./assets/direct_proof.png)

For example:

> If $n$ is an odd integer, then $3n + 7$ is an even integer.
>
> Assume that $n$ is an odd integer. Since $n$ is odd, by definition, we can write $n = 2k + 1$ for some integer $k$. Now
>
> $$3n + 7 = 3(2k + 1) + 7 = 6k + 3 + 7 = 6k + 10 = 2(3k + 5)$$
>
> Since $3k + 5$ is an integer, $3n + 7$ is even by definition.

> [!NOTE] **Proof by Exhaustion**
>
> When the domain of a variable is a small, finite set, a direct proof can be conducted by individually testing every element that satisfies the hypothesis. This is known as **proof by exhaustion**.

For example:

> Let $S = \\{1, 2, 3\\}$ and let $n \in S$. If $\frac{n(n + 3)}{2}$ is even, then $\frac{(n + 2)(n − 5)}{2}$ is even.
>
> Let's proceeds by first identifying which elements in the domain $S = \\{1, 2, 3\\}$ satisfy the hypothesis, $P(n): \frac{n(n + 3)}{2}$ is even.
>
> - For $n = 1, \frac{n(n + 3)}{2} = 2$, which is even.
> - For $n = 2, \frac{n(n + 3)}{2} = 5$, which is odd.
> - For $n = 3, \frac{n(n + 3)}{2} = 9$, which is odd.
>
> We only need to consider the cases where the hypothesis is true. In this domain, only $n = 1$ satisfies the condition.
>
> We then verify the conclusion, $Q(n): \frac{(n + 2)(n − 5)}{2}$ is even, for $n = 1$. When $n = 1$, the conclusion is
>
> $$\frac{(1 + 2)(1 − 5)}{2} = -6$$
>
> which is an even integer. Since the conclusion holds for the only element that satisfies the hypothesis, the implication is proven to be true for the entire domain $S$.
