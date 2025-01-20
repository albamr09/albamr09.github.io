---
title: Elementary Number Theory and Methods of Proof
weight: 4
type: docs
math: true
---

## Direct Proof and Counterexample I: Introduction

### Even, Odd, Prime, and Composite Integers

> [!TIP] **Even number**
>
> An integer $n$ is **even** if, and only if, $n$ equals twice some integer.
>
> $$n \text{ is even } \Leftrightarrow n = 2k \text{ for some integer } k$$

> [!TIP] **Odd number**
>
> An integer $n$ is **odd** if, and only if, $n$ equals twice some integer plus $1$.
>
> $$n \text{ is odd } \Leftrightarrow n = 2k + 1\text{ for some integer } k$$

> [!TIP] **Prime number**
>
> An integer $n$ is **prime** if, and only if, $n > 1$ and for all positive integers $r$ and $s$, if $n = rs$, then either $r$ or s equals $n$.
>
> $$n \text{ is prime } \Leftrightarrow \forall \text{ positive integers } r \text{ and } s, \\ \text{ if } n = rs \text{ then either } r = 1 \text{ and } s = n \text{ or } r = n \text{ and } s = 1$$

> [!TIP] **Composite number**
>
> An integer n is composite if, and only if, $n > 1$ and $n = rs$ for some integers $r$ and $s$ with $1 < r < n$ and $1 < s < n$.
>
> $$n \text{ is composite } \Leftrightarrow \exists \text{ positive integers } r \text{ and } s \text{ such that } \\ n = rs \text{ and } 1 < r < n \text{ and } 1 < s < n$$

### Proving Existential Statements

Given the statement

$$
\exists x \in D, \text{ such that } Q(x)
$$

One way to prove this is to find an $x$ in $D$ that makes $Q(x)$ true. Another way is to give a set of directions for finding such an $x$. Both of these methods are called **constructive proofs of existence**. The logical principle underlying such a proof is called **existential generalization**.

> [!TIP] **Existencial Generalization**
>
> If you know a certain property is true for a particular object, then you may conclude that “there exists an object for which the property is true.”

A **nonconstructive proof of existence** involves showing either (a) that the existence of a value of $x$ that makes $Q(x)$ true is guaranteed by an axiom or a previously proved theorem or (b) that the assumption that there is no such $x$ leads to a contradiction.

### Disproving Universal Statements by Counterexample

To disprove a statement means to show that it is false. Consider the question of disproving a statement of the form

$$
\forall x \in D, P(x) \rightarrow Q(x)
$$

Showing that this statement is false is equivalent to showing that its negation is true.

$$
\exists x \in D, \text{ such that } P(x) \wedge \sim Q(x)
$$

> [!TIP] **Disproff by Counterexample**
>
> To disprove a statement of the form $\forall x \in D, P(x) \rightarrow Q(x)$ find a value of $x$ in $D$ for which the hypothesis $P(x)$ is true and the conclusion $Q(x)$ is false. Such an $x$ is called a **counterexample**.

### Proving Universal Statements

The vast majority of mathematical statements to be proved are universal. In discussing how to prove such statements, it is helpful to imagine them in a standard form:

$$
\forall x \in D, P(x) \rightarrow Q(x)
$$

When $D$ is finite or when only a finite number of elements satisfy $P(x)$, such a statement can be proved by **the method of exhaustion**, that is by showing for each element that the property is satisfied.

Even when the domain is finite, it may be infeasible to use the method of exhaustion. The most powerful technique for proving a universal statement is one that works regardless of the size of the domain over which the statement is quantified. It is based on a logical principle sometimes called **universal generalization** or **generalizing from the generic particular**.

> [!TIP] **Generalizing from the Generic Particular**
>
> To show that every element of a set satisfies a certain property, suppose $x$ is a particular but arbitrarily chosen element of the set, and show that $x$ satisfies the property.

The point of having $x$ be arbitrarily chosen (or generic) is to make a proof that can be generalized to all elements of the domain. By choosing $x$ arbitrarily, you are making no special assumptions about $x$ that are not also true of all other elements of the domain. Thus everything you deduce about a generic element $x$ of the domain is equally true of any other element of the domain.

When the method of generalizing from the generic particular is applied to a property of the form "If $P(x)$ then $Q(x)$," the result is the method of **direct proof**.

> [!NOTE] **Method of Direct Proff**
>
> 1. Express the statement to be proved in the form "For every $x \in D$, if $P(x)$ then $Q(x)$.
> 2. Start the proof by supposing $x$ is a particular but arbitrarily chosen element of $D$ for which the hypothesis $P(x)$ is true.
> 3. Show that the conclusion $Q(x)$ is true by using definitions, previously established results, and the rules for logical inference.

> [!TIP] **Existential Instantiation**
>
> If the existence of a certain kind of object is assumed or has been deduced, then it can be given a name, as long as that name is not currently being used to refer to something else in the same discussion.

## Direct Proof and Counterexample II: writing Advice

### Directions for Writing Proofs of Universal Statements

1. Copy the statement of the theorem to be proved on your paper.
2. Clearly mark the beginning of your proof with the word Proof.
3. Make your proof self-contained: you should explain the meaning of each variable used in your proof in the body of the proof. Thus you will begin proofs by introducing the initial variables.
4. Write your proof in complete, grammatically correct sentences: Write your proof in complete, grammatically correct sentences.
5. Keep your reader informed about the status of each statement in your proof: If something is assumed, preface it with a word like _Suppose_ or _Assume_. If it is still to be shown, preface it with words like, _We must show that_ or _In other words, we must show that_.
6. Give a reason for each assertion in your proof.
7. Include the “little words and phrases” that make the logic of your arguments clear.
8. Display equations and inequalities: The convention is to display equations and inequalities on separate lines to increase readability.

### Common Mistakes

#### Arguing from examples

It is a mistake to think that a general statement can be proved by showing it to be true for some individual cases.

#### Using the same letter to mean two different things.

Consider the following “proof” fragment:

> Suppose $m$ and $n$ are any odd integers. Then by definition of odd, $m = 2k + 1$ and $n = 2k + 1$, where $k$ is an integer.

You might think of a variable in a mathematical proof as similar to a global variable in a computer program: once introduced, it has the same meaning throughout the program.

#### Jumping to a conclusion

To jump to a conclusion means to allege the truth of something without giving an adequate reason. Consider the following “proof” that the sum of any two even integers is even.

> Suppose $m$ and $n$ are any even integers. By definition of even, $m = 2r$ and $n = 2s$ for some integers $r$ and $s$. Then $m+ n = 2r + 2s$. So $m + n$ is even.

The problem with this "proof" is that to show an integer is even one needs to show that it equals twice some integer.

#### Assuming what is to be proved

To assume what is to be proved is a variation of jumping to a conclusion. For example:

> Suppose $m$ and $n$ are any odd integers. When any odd integers are multiplied, their product is odd. Hence $mn$ is odd.

#### Confusion between what is known and what is still to be shown.

A more subtle way to jump to a conclusion occurs when the conclusion is restated using a variable. For example:

> Suppose $m$ and $n$ are any odd integers. We must show that $mn$ is odd. This means that there exists an integer $s$ such that
>
> $$mn = 2s + 1$$
>
> Also by definition of odd, there exist integers $a$ and $b$ such that
>
> $$m = 2a + 1 \text{ and } n = 2b + 1$$
>
> Then
>
> $$mn = (2a + 1)(2b + 1) = 2s + 1$$
>
> So, since $s$ is an integer, $mn$ is odd by definition of odd.

In this example, when the author restated the conclusion to be shown (that $mn$ is odd), the author wrote "there exists an integer $s$ such that $mn = 2s + 1$." But we only know that the integer $s$ exists if we know that $mn$ is odd, which is what the author is trying to show.

#### Use of any when the correct word is some.

There are a few situations in which the words any and some can be used interchangeably. In
most situations, however, the words any and some are not interchangeable.

> Suppose $m$ is a particular but arbitrarily chosen odd integer. By definition of odd, $m = 2a + 1$ for any integer $a$.

In the second sentence it is incorrect to say that "$m = 2a + 1$ for any integer $a$" because a cannot be just "any" integer.

#### Misuse of the word "if"

Another common error is not serious in itself, but it reflects imprecise thinking that sometimes leads to problems later in a proof. This error involves using the word if when the word because is really meant.

> Suppose $p$ is a prime number. If $p$ is prime, then $p$ cannot be written as a product of two smaller positive integers.

## Direct Proff and Counterexample III: Rational Numbers

> [!TIP] **Rational and Irrational Number**
>
> A real number $r$ is **rational** if, and only if, it can be expressed as a quotient of two integers with a nonzero denominator. A real number that is not rational is **irrational**. More formally, if $r$ is a real number, then
>
> $$r \text{ is rational } \Leftrightarrow \exists \text{ integers } a \text{ and } b \text{ siuch that } r = \frac{a}{b} \text{ and } b \neq 0$$

**Every integer is a rational number.**

> [!NOTE] **Zero Product Property**
>
> If neither of two real numbers is zero, then their product is also not zero.

### Proving Properties of Rational Numbers

> [!NOTE] **Theorem**: The sum of any two rational numbers is rational.
>
> Suppose $r$ and $s$ are any rational numbers. Then, by definition of rational, $r = \frac{a}{b}$ and $s = \frac{c}{d}$ for some integers $a$, $b$, $c$, and $d$ with $b \neq 0$ and $d \neq 0$. Thus
>
> $$r + s = \frac{a}{b} + \frac{c}{d}$$
>
> $$= \frac{ad + bc}{bd}$$
>
> Let $p = ad + bc$ and $q = bd$. Then $p$ and $q$ are integers because products and sums of integers are integers and because $a$, $b$, $c$, and $d$ are all integers. Also $q \neq 0$ by the zero product property. Thus
>
> $$r + s = \frac{p}{q}, \text{ where } p \text{ and } q \text{ are integers and } q \neq 0$$
>
> Therefore, $r + s$ is rational by definition of a rational number.

### Deriving New Mathematics from Old

Once a collection of statements has been proved directly from the definitions, another method of proof becomes possible. The statements in the collection can be used to derive additional results

> [!TIP] **Corollary**
>
> A **corollary** is a statement whose truth can be immediately deduced from a theorem that has already been proved.

## Direct Proff and Counterexample IV: Divisibility

The notion of divisibility is the central concept of one of the most beautiful subjects in advanced mathematics: **number theory**, the study of properties of integers.

> [!TIP] **Divisility**
>
> If $n$ and $d$ are integers then $n$ is **divisible by** $d$ if, and only if, $n$ equals $d$ times some integer and $d \neq 0$
>
> The notation $d | n$ is read "$d$ divides $n$." Symbolically, if $n$ and $d$ are integers:
>
> $$d | n \Leftrightarrow \exists \text{ and integer, say } k, \text{ such that } n = dk \text{ and } d \neq 0$$
>
> The notation $d \nmid n$ is read "$d$ does not divide $n$".

> [!NOTE] **Theorem:** A Positive Divisor of a Positive Integer
>
> For all integers $a$ and $b$, if $a$ and $b$ are positive and $a$ divides $b$ then $a \leq b$.
>
> Suppose $a$ and $b$ are any positive integers such that $a$ divides $b$. By definition of divisibility, there exists an integer $k$ so that $b = ak$. $k$ must be positive because both $a$ and $b$ are positive. It follows that
>
> $$1 \leq k$$
>
> because every positive integer is greater than or equal to $1$. Multiplying both sides by $a$ gives
>
> $$a \leq ka = b$$
>
> because multiplying both sides of an inequality by a positive number preserves the inequality. Thus $a \leq b$.

> [!NOTE] **Theorem:** Divisors of 1
>
> Since $1 \cdot 1 = 1$ and $(-1)(-1) = 1$, both $1$ and $-1$ are divisors of $1$. Now suppose $m$ is any integer that divides $1$. Then there exists an integer $n$ such that $1 = mn$. Either both $m$ and $n$ are positive or both $m$ and $n$ are negative. If both $m$ and $n$ are positive, then $m$ is a positive integer divisor of $1$. $m \leq 1$, and, since the only positive integer that is less than or equal to $1$ is $1$ itself, it follows that $m = 1$. On the other hand, if both $m$ and $n$ are negative, then, $(-m)(-n) = mn = 1$. In this case $-m$ is a positive integer divisor of $1$, and so, by the same reasoning, $-m = 1$ and thus $m = -1$. Therefore there are only two possibilities: either $m = 1$ or $m = -1$. So the only divisors of $1$ are $1$ and $-1$.

Since the negation of an existential statement is universal, it follows that $d$ does not divide
n (denoted $d \nmid n$) if, and only if, $\forall \text{ integer } k, n \neq dk, \text{ or } d = 0$; in other words, the quotient $\frac{n}{d}$ is not an integer.

### Proving Properties of Divisibility

One of the most useful properties of divisibility is that it is transitive.

> [!NOTE] **Theorem:** Transitivity of Divisibility
>
> For all integers $a$, $b$, and $c$, if $a$ divides $b$ and $b$ divides $c$, then $a$ divides $c$.
>
> Suppose $a$, $b$, and $c$ are any integers such that $a$ divides $b$ and $b$ divides $c$. By definition of divisibility,
>
> $$b = ar \text{ and } c = bs \text{ for some integers } r \text{ and } s$$
>
> By substitution
>
> $$c = bs$$
>
> $$= (ar)s$$
>
> $$= a(rs)$$
>
> Let $k = rs$. Then $k$ is an integer since it is a product of integers, and therefore
>
> $$c = ak \text{ where } k \text{ is an integer }$$
>
> Thus $a$ divides $c$ by definition of divisibility.

It would appear from the definition of prime that to show that an integer is prime you would need to show that it is not divisible by any integer greater than 1 and less than itself. In fact, you need only check whether it is divisible by a prime number less than or equal to itself.

> [!NOTE] **Theorem:** Divisibility
>
> Any integer $n > 1$ is divisible by a prime number

### Counterexamples and Divisibility

To show that a proposed divisibility property is not universally true, you need only find one pair of integers for which it is false.

> [!NOTE] **Theorem:** Unique Factorization of Integers Theorem (Fundamental Theorem of Arithmetic)
>
> Given any integer $n > 1$, there exist a positive integer $k$, distinct prime numbers $p_1, p_2, \cdots, p_k$, and positive integers $e_1, e_2, \cdots, e_k$ such that
>
> $$n = p_1^{e_1}p_2^{e_2} \cdots p_k^{e_k}$$
>
> and any other expression for $n$ as a product of prime numbers is identical to this except, perhaps, for the order in which the factors are written.

> [!TIP] **Standard Factored Form**
>
> Given any integer $n > 1$, the standard factored form of $n$ is an expression of the form
>
> $$n = p_1^{e_1}p_2^{e_2} \cdots p_k^{e_k}$$
>
> where $k$ is a positive integer, $p_1, p_2, \cdots, p_k$ are prime numbers, $e_1, e_2, \cdots, e_k$ are positive integers, and $p_1 < p_2 < \cdots < p_k$.

## Direct Proof and Counterexample V: Division into Cases and the Quotient-Remainder Theorem

> [!NOTE] **Theorem:** The Quotient-Remainder Theorem
>
> Given any integer $n$ and positive integer $d$, there exist unique integers $q$ and $r$ such that
>
> $$n = dq + r, \text{ and } 0 \leq r < d$$

### div and mod

> [!TIP] **div and mod**
>
> Given an integer $n$ and a positive integer $d$
>
> $n \text{ div } d = $ the integer quotient obtained when $n$ is divided $d$ and
>
> $n \text{ mod } d = $ the nonnegative integer remainder obtained when $n$ is divided $d$
>
> Symbolically, if $n$ and $d$ are integers and $d > 0$, then
>
> $n \text{ div } d = q$ text $n \text{ mod } d = r \Leftrightarrow n = dq + r$
>
> where $q$ and $r$ are integers and $0 \leq r < d$

Also a necessary and sufficient condition for an integer $n$ to be divisible by an integer $d$ is that $n \text{ mod } d = 0$.
