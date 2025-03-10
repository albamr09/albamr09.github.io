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

### Universal Conditional Statements

A reasonable argument can be made that the most important form of statement in mathematics is the **universal conditional statement**:

$$
\forall x, \text{ if } P(x) \text{ then } Q(x)
$$

### Equivalent Forms of Universal and Existential Statements

A statement of the form

$$
\forall x \in U, \text{ if } P(x) \text{ then } Q(x)
$$

can always be rewritten in the form

$$
\forall x \in D, Q(x)
$$

by narrowing $U$ to be the subset $D$ consisting of all the values of the variable $x$ that make $P(x)$ true. Conversely, a statement of the form

$$
\forall x \in D, Q(x)
$$

can be rewritten as

$$
\forall x, \text{ if } x \text{ is in } D \text{ then } Q(x)
$$

### Bound Variables and Scope

We say that the variable $x$ is **bound** by the quantifier that controls it and that its **scope** begins when the quantifier introduces it and ends at the end of the quantified statement.

### Implicit Quantification

Consider the statement

> If a number is an integer, then it is a rational number.

As shown earlier, this statement is equivalent to a universal statement. However, it does not contain the telltale word all or every or any or each. The only clue to indicate its universal quantification comes from the presence of the indefinite article _a_. This is an example of implicit universal quantification.

Existential quantification can also be implicit.

> [!NOTE] **Implicit Conditional Statements**
>
> Let $P(x)$ and $Q(x)$ be predicates and suppose the common domain of $x$ is $D$
>
> The notation $P(x) \Rightarrow Q(x)$ means that every element in the truth set of $P(x)$ is in the truth set of $Q(x)$, or, equivalently, $\forall x, P(x) \rightarrow Q(x)$.
>
> The notation $P(x) \Leftrightarrow Q(x)$ means that $P(x)$ and $Q(x)$ have identical truth sets, or, equivalently, $\forall x, P(x) \leftrightarrow Q(x)$

## Predicates and Quantified Statements II

> [!TIP] **Negation of a Universal Statement**
>
> The negation of a statement of the form
>
> $$\forall x \in D, Q(x)$$
>
> is logically equivalent to a statement of the form
>
> $$\exists x \in D, \text{ such that } \sim Q(x)$$
>
> Symbolically
>
> $$\sim(\forall x \in D, Q(x)) \equiv \exists x \in D \text{ such that } \sim Q(x)$$

Note that when we speak of **logical equivalence for quantified statements**, we mean that the statements always have identical truth values no matter what predicates are substituted for the predicate symbols and no matter what sets are used for the domains of the predicate variables.

> [!TIP] **Negation of an Existential Statement**
>
> The negation of a statement of the form
>
> $$\exists x \in D, \text{ such that } Q(x)$$
>
> is logically equivalent to a statement of the form
>
> $$\forall x \in D, \sim Q(x)$$
>
> Symbolically,
>
> $$\sim(\exists x \in D \text{ such that } Q(x)) \equiv \forall x \in D, \sim Q(x)$$

### Negations of Universal Conditional Statements

Negations of universal conditional statements are of special importance in mathematics. By definition of the negation of a _for all_ statement

$$
\sim(\forall x, P(x) \rightarrow Q(x)) \equiv \exists x \text{ such that } \sim (P(x) \rightarrow Q(x))
$$

But the negation of an if-then statement is logically equivalent to an and statement. More precisely,

$$
\sim(P(x) \rightarrow Q(x)) \equiv P(x) \wedge \sim Q(x)
$$

By substitution it gives

$$
\sim (\forall x, P(x) \rightarrow Q(x)) \equiv \exists x \text{ such that } (P(x) \wedge \sim Q(x))
$$

### The Relation among $\forall$, $\exists$, $\wedge$, and $\vee$

Similarly, if $Q(x)$ is a predicate and $D = \{x_1, x_2, \cdots, x_n\}$ then the statements

$$
\exists x \in D, \text{ such that } Q(x) \text{ and } Q(x_1) \vee Q(x_2) \vee \cdots \vee Q(x_n)
$$

are logically equivalent.

In general, a statement of the form

$$
\forall x \in D, \text{ if } P(x) \text{ then } Q(x)
$$

is called **vacuously true** or **true by default** if, and only if, $P(x)$ is false for every $x$ in $D$.

### Variants of Universal Conditional Statements

> [!NOTE] **Variants of Universal Conditional Statements**
>
> Consider a statement of the form $\forall x \in D, \text{ if } P(x) \text{ then } Q(x)$.
>
> 1. Its **contrapositive** is the statement $\forall x \in D, \text{ if } \sim Q(x) \text{ then } \sim P(x)$
> 2. Its **converse** is the statement $\forall x \in D, \text{ if } Q(x) \text{ then } P(x)$
> 3. Its **inverse** is the statement $\forall x \in D, \text{ if } \sim P(x) \text{ then } \sim Q(x)$

Let $P(x)$ and $Q(x)$ be any predicates, let $D$ be the domain of $x$, and consider the statement

$$
\forall x \in D, \text{ if } P(x) \text{ then } Q(x)
$$

and its contrapositive

$$
\forall x \in D, \text{ if } \sim Q(x) \text{ then } \sim P(x)
$$

Any particular $x$ in $D$ that makes "if $P(x)$ then $Q(x)$" true also makes "if $\sim Q(x)$ then $\sim P(x)$" true (by the logical equivalence between $p \rightarrow q$ and $\sim q \rightarrow \sim p$). It follows that the sentence "If $P(x)$ then $Q(x)$" is true for all $x$ in $D$ if, and only if, the sentence "If $\sim Q(x)$ then $\sim P(x)$" is true for all $x$ in D.

Thus we write the following and say that a universal conditional statement is logically equivalent to its contrapositive:

$$
\forall x \in D, \text{ if } P(x) \text{ then } Q(x) \equiv \forall x \in D, \text{ if } \sim Q(x) \text{ then } \sim P(x)
$$

A universal conditional statement is not logically equivalent to its converse.

$$
\forall x \in D, \text{ if } P(x) \text{ then } Q(x) \not\equiv \forall x \in D, \text{ if } Q(x) \text{ then } P(x)
$$

A universal conditional statement is not logically equivalent to its inverse

$$
\forall x \in D, \text{ if } P(x) \text{ then } Q(x) \not\equiv \forall x \in D, \text{ if } \sim P(x) \text{ then } \sim Q(x)
$$

### Necessary and Sufficient Conditions, Only If

> [!NOTE] **Sufficient Condition**
>
> $\forall x, r(x)$ is a **sufficient condition** for $s(x)$ means $\forall x, \text{ if } r(x) \text{ then } s(x)$.

> [!NOTE] **Necessary Condition**
>
> $\forall x, r(x)$ is a **necessary condition** for $s(x)$ means $\forall x, \text{ if } \sim r(x) \text{ then } \sim s(x)$.

> [!NOTE] **Sufficient and Necessary Condition**
>
> $\forall x, r(x)$ **only if** $s(x)$ means $\forall x, \text{ if } \sim s(x) \text{ then } \sim r(x)$ or, equivalently $\forall x, \text{ if } r(x) \text{ then } s(x)$.

## Statements with Multiple Quantifiers

Because many important technical statements contain both $\exists$ and $\forall$, a convention has developed for interpreting them uniformly. **When a statement contains more than one kind of quantifier, we imagine the actions suggested by the quantifiers as being performed in the order in which the quantifiers occur.**

> [!NOTE] **Interpreting Statements with Two Different Quantifiers**
>
> If you want to establish the truth of a statement of the form
>
> $$\forall x \in D, \exists y \in E \text{ such that } P(x, y)$$
>
> your challenge is to allow someone else to pick whatever element $x$ in $D$ they wish and then you must find an element $y$ in $E$ that “works” for that particular $x$.
>
> If you want to establish the truth of a statement of the form
>
> $$\exists x \in D, \text{ such that } \forall y \in E, P(x, y)$$
>
> your job is to find one particular $x$ in $D$ that will “work” no matter what $y$ in $E$ anyone might choose to challenge you with.

### Negations of Statements with More Than One Quantifier

You can use the same rules to negate statements with several quantifiers that you used to negate simpler quantified statements.

$$
\sim (\forall x \in D, \exists y \in E, \text{ such that } P(x, y)) \\ \equiv \exists x \in D, \text{ such that } \forall y \in E, \sim P(x, y)
$$

$$
\sim (\exists x \in D, \text{ such that } \forall y \in E, P(x, y)) \\ \equiv \forall x \in D, \exists y \in E \text{ such that } \sim P(x, y)
$$

### Order of Quantifiers

In a statement containing both $\exists$ and $\forall$, changing the order of the quantifiers can significantly change the meaning of the statement. Interestingly, however, if one quantifier immediately follows another quantifier of the same type, then the order of the quantifiers does not affect the meaning.

### Formal Logical Notation

In some areas of computer science, logical statements are expressed in purely symbolic notation. The notation involves using predicates to describe all properties of variables and omitting the words such that in existential statements.

$$
\forall x \in D, P(x) \leftrightarrow \forall x (x \in D \rightarrow P(x))
$$

$$
\exists x \in D \text{ such that } P(x) \leftrightarrow \exists x (x \in D \wedge P(x))
$$

The disadvantage of the fully formal notation is that because it is complex and somewhat remote from intuitive understanding. The advantage, however, is that operations, such as taking negations, can be made completely mechanical and programmed on a computer.

Taken together, the symbols for quantifiers, variables, predicates, and logical connectives make up what is known as the **language of first-order logic**.

## Arguments with Quantified Statements

> [!TIP] **Universal Instantiation**
>
> If a property is true of everything in a set, then it is true of any particular thing in the set.

### Universal Modus Ponens

The rule of universal instantiation can be combined with modus ponens to obtain the valid form of argument called universal modus ponens.

$$
\forall x, \text{ if } P(x) \text{ then } Q(x)
$$

$$
P(a) \text{ for a particular } a
$$

$$
\therefore Q(a)
$$

### Universal Modus Tollens

Another crucially important rule of inference is universal modus tollens. Its validity results from combining universal instantiation with modus tollens. Universal modus tollens is the heart of proof of contradiction.

$$
\forall x, \text{ if } P(x) \text{ then } Q(x)
$$

$$
\sim Q(a) \text{ for a particular } a
$$

$$
\therefore \sim P(a)
$$

### Proving Validity of Arguments with Quantified Statements

> [!TIP] **Valid Argument**
>
> To say that an argument form is **valid** means the following: No matter what particular predicates are substituted for the predicate symbols in its premises, if the resulting premise statements are all true, then the conclusion is also true. An argument is called **valid** if, and only if, its form is valid.

> [!TIP] **Sound Argument**
>
> It is called sound if, and only if, its form is valid and its premises are true.

### Converse Error

$$
\forall x, \text{ if } P(x) \text{ then } Q(x)
$$

$$
Q(a) \text{ for a particular } a
$$

$$
\therefore P(a)
$$

It would be valid if the major premise were replaced by its converse. But since a universal conditional statement is not logically equivalent to its converse, such a replacement cannot, in general, be made. We say that this argument exhibits the **converse error**.

### Inverse Error

The following form of argument would be valid if a conditional statement were logically equivalent to its inverse. But it is not, and the argument form is invalid. We say that it exhibits the **inverse error**.

$$
\forall x, \text{ if } P(x) \text{ then } Q(x)
$$

$$
\sim P(a) \text{ for a particular } a
$$

$$
\therefore \sim Q(a)
$$

### Creating Additional Forms of Argument

Universal modus ponens and modus tollens were obtained by combining universal instantiation with modus ponens and modus tollens. In the same way, additional forms of arguments involving universally quantified statements can be obtained by combining universal instantiation with other of the valid argument forms.

> [!NOTE] **Universa Transitivity**
>
> $$\forall x, P(x) \rightarrow Q(x)$$
>
> $$\forall x, Q(x) \rightarrow R(x)$$
>
> $$\therefore \forall x, P(x) \rightarrow R(x)$$

### Remark on the Converse and Inverse Errors

A variation of the converse error is a very useful reasoning tool, provided that it is used with caution. It is the type of reasoning that is used by doctors to make medical diagnoses and by auto mechanics to repair cars. It is the type of reasoning used to generate explanations for phenomena. It goes like this:

If a statement of the form

$$
\forall x, P(x) \rightarrow Q(x)
$$

is true and if

$$
Q(a) \text{ is true, for a particular } a
$$

then check out the statement $P(a)$, it just might be true.

This form of reasoning has been named **abduction** by researchers working in artificial intelligence.
