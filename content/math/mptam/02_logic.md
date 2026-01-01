---
title: Logic
weight: 2
type: docs
math: true
---

## The Statement

The central purpose of any mathematical endeavor is the pursuit of truth. We seek to understand the connections between concepts, the conditions under which an object possesses a certain property, and the answers to a host of other complex questions. However, discovering an answer is only half the task; we must also demonstrate its correctness with a certainty that is convincing to others. The framework that allows for this rigorous demonstration is logical reasoning. It provides the essential structure for building valid arguments, ensuring that the journey from known premises to new conclusions is sound, coherent, and can be communicated with clarity and conviction.

At the heart of mathematical logic lies its primary element, the statement, which serves as the atomic unit of truth. A statement is a declarative sentence that possesses a definitive truth value.

> [!NOTE] **The Statement**
>
> A **statement** is formally defined as a declarative sentence or assertion that is either true or false, but not both.

It is crucial to distinguish a statement's possession of a definitive truth value from our ability to determine that value. For a sentence to be a statement, it is not a requirement that we know whether it is true or false. Consider the sentence:

> "The $100$th digit in the decimal expansion of $\pi$ is $7$."

This is unambiguously a statement, as that digit is definitively one specific integer from $0$ to $9$, and thus the assertion is either true or false.

Not all sentences, however, qualify as statements. Sentences that lack a truth value, such as the following, fall outside the domain of logical analysis:

- Imperative (Commands): "Substitute the number $2$ for $x$."
- Interrogative (Questions): "Are these sets disjoint?"
- Exclamatory: "What an interesting question!"

> [!NOTE] **Open Sentence**
>
> An **open sentence** is a declarative sentence containing variables, which becomes a statement once values from a prescribed set, known as the domain, are substituted for these variables.

For example, consider the open sentence

$$
P(x): (x − 3)^2 \leq 1
$$

where the domain of the variable $x$ is the set of all integers, $\mathbb{Z}$. For any given integer substituted for $x$, $P(x)$ becomes a statement with a clear truth value. It is a true statement for any $x$ in the set $\\{2, 3, 4\\}$ and a false statement for all other integers.

> [!NOTE] **Truth Table**
>
> A **truth table** is an analytical tool used to systematically list all possible combinations of truth values for a set of statements.

The structure of a truth table is determined combinatorially. For $n$ distinct statements, the table must contain $2^n$ rows to account for every possible combination of their truth values. The table below illustrates this for two statements.

| P   | Q   | Statement |
| --- | --- | --------- |
| T   | T   | X         |
| T   | F   | X         |
| F   | T   | X         |
| F   | F   | X         |

## Logical Operators

The primary interest in mathematical logic arises not from analyzing individual statements in isolation, but from creating new, more complex statements from existing ones.

> [!NOTE] **Negation**
>
> The negation of a statement $P$, denoted by $\neg P$, is the statement "not $P$". It is the simplest logical operation, acting on a single statement to reverse its truth value.

The core rule of negation is straightforward: the negation of a true statement is false, and the negation of a false statement is true. This is summarized in its truth table.

| P   | \neq P |
| --- | ------ |
| T   | F      |
| F   | T      |

For example, consider the statements:

- $P1$: "The integer $3$ is odd." (True)
- $P2$: "The integer $57$ is prime." (False)

Their negations are:

- $\neg P1$: "The integer $3$ is even." (False)
- $\neg P2$: "The integer $57$ is not prime." (True)

> [!NOTE] **Disjection: The Inclusive "Or"**
>
> The disjunction of two statements $P$ and $Q$, denoted by $P \lor Q$, corresponds to the statement "$P$ or $Q$". The truth condition is that $P \lor Q$ is true if at least one of $P$ or $Q$ is true. It is only false when both $P$ and $Q$ are false.

Mathematical logic defaults to this inclusive "or" because it is more fundamental and flexible. It must be distinguished from the **exclusive or**, which implies that exactly one of the conditions can be true.

The disjection truth table is as follows:

| $P$ | $Q$ | $P \lor Q$ |
| --- | --- | ---------- |
| T   | T   | T          |
| T   | F   | T          |
| F   | T   | T          |
| F   | F   | F          |

> [!NOTE] **Conjunction: The Strict "And"**
>
> The conjunction of two statements $P$ and $Q$, denoted by $P \land Q$, is the statement "$P$ and $Q$". Its truth condition is strict: $P \land Q$ is true only when both $P$ and $Q$ are true. If either statement is false, the entire conjunction is false.

The injection truth table is as follows:

| $P$ | $Q$ | $P \land Q$ |
| --- | --- | ----------- |
| T   | T   | T           |
| T   | F   | F           |
| F   | T   | F           |
| F   | F   | F           |

> [!NOTE] **Implication: The Condition Statement**
>
> The **implication**, or **conditional** statement, denoted by $\P \rightarrow Q$, it is read as "If $P$, then $Q$." Its truth condition is that $P \rightarrow Q$ is false only in the specific case where $P$ is true and $Q$ is false. It is true in all other scenarios.

The implication truth table is as follows:

| $P$ | $Q$ | $P \rightarrow Q$ |
| --- | --- | ----------------- |
| T   | T   | T                 |
| T   | F   | F                 |
| F   | T   | T                 |
| F   | F   | T                 |

Of all the logical operators, the implication's truth table is often the most perplexing for newcomers. To demystify its logic, particularly the cases where the premise ($P$) is false, let us analyze a familiar, practical scenario. Imagine an instructor tells a student:

> "If you earn an A on the final exam, then you will receive an A for your final grade."

Let $P$ be "You earn an A on the final exam" and $Q$ be "You receive an A for your final grade." We analyze the instructor's statement in four cases:

- **Case 1**: $P$ is true, $Q$ is true. The student gets an A on the exam and an A in the course. The instructor's promise was fulfilled. The implication $P \rightarrow Q$ is true.
- **Case 2**: $P$ is true, $Q$ is false. The student gets an A on the exam but does not receive an A in the course. The instructor broke their promise. The implication $P \rightarrow Q$ is false.
- **Case 3**: $P$ is false, $Q$ is true. The student does not get an A on the exam but still receives an A in the course. The instructor did not lie. Their statement only specified what would happen if the student earned an A; it made no promises about other scenarios. The implication $P \rightarrow Q$ is true.
- **Case 4**: $P$ is false, $Q$ is false. The student does not get an A on the exam and does not get an A in the course. Again, the instructor's statement holds. No promise was broken. The implication $P \rightarrow Q$ is true.

### The Language of Implication

The conditional statement $P \rightarrow Q$ can be expressed in several equivalent ways, and familiarity with these is essential for interpreting mathematical arguments.

- If $P$, then $Q$.
- $Q$ if $P$.
- $P$ implies $Q$.
- $P$ only if $Q$.
- $P$ is sufficient for $Q$.
- $Q$ is necessary for $P$.

The phrase "$P$ only if $Q$" can be challenging, but it asserts that $P$ can be true only under the condition that $Q$ is also true—in other words, it is impossible for $P$ to be true while $Q$ is false. Similarly, "$Q$ is necessary for $P$" means that for $P$ to be true, $Q$ must be true, which again mirrors the logic of the implication.

### Extending Logical Operations to Open Sentences

The true power of logical operators is fully realized when they are applied not just to static statements but to open sentences containing variables. Consider the following open sentences, where the domain of x is the set of real numbers, $\mathbb{R}$:

$$P_1(x) : x = −3$$

$$P_2(x) : |x| = 3$$

We can construct new open sentences using the logical operators:

- **Negation**: $\neg P_1(x) : x \neq −3$
- **Disjunction**: $P_1(x) \lor P_2(x) : x = -3 \text{ or } |x| = 3$
- **Conjunction**: $P_1(x) \land P_2(x) : x = -3 \text{ and } |x| = 3$
- **Implication**: $P_1(x) \rightarrow P_2(x) : \text{If } x = −3, \text{ then } |x| = 3$
