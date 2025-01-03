---
title: Speaking Mathematically
weight: 1
type: docs
math: true
---

## Variables

A variable is as a placeholder when you want to talk about something but either (1) you imagine that it has one or more values but you don’t know what they are, or (2) you want whatever you say about it to be equally true for all elements in a given set, and so you don’t want to be restricted to considering only a particular, concrete value for it.

To illustrate the first use, consider asking

> Is there a number with the following property: doubling it and adding 3 gives the same result as squaring it?

In this sentence you can introduce a variable to replace the potentially ambiguous word “it”:

> Is there a number x with the property that \(2x + 3 = x^2\)?

To illustrate the second use of variables, consider the statement

> No matter what number might be chosen, if it is greater than \(2\), then its square is greater than \(4\).

In this case introducing a variable to give a temporary name to the (arbitrary) number you might choose enables you to maintain the generality of the statement.

> No matter what number \(n\) might be chosen, if \(n\) is greater than \(2\), then \(n^2\) is greater than \(4\).

### Some Important Kinds of Mathematical Statements

> [!TIP] **Universal Statement**
>
> A **universal statement** says that a certain property is true for all elements in a set.
>
> _All positive numbers are greater than zero_

> [!TIP] **Conditional Statement**
>
> A **conditional statement** says that if one thing is true then some other thing also has to be true.
> _If 378 is divisible by 18, then 378 is divisible by 6_

> [!TIP] **Existential Statement**
>
> Given a property that may or may not be true, an **existential statement** says that there is at least one thing for which the property is true.
>
> _There is a prime number that is even_

### Universal Conditional Statements

A **universal conditional statement** is a statement that is both universal and conditional

> For every animal \(a\), if \(a\) is a dog, then \(a\) is a mammal

They can be rewritten in ways that make them appear to be purely universal or purely conditional. For example, the previous statement can be rewritten in a way that makes its conditional nature explicit but its universal nature implicit:

> If \(a\) is a dog, then \(a\) is a mammal.

The statement can also be expressed so as to make its universal nature explicit and its conditional nature implicit:

> For every dog \(a\), \(a\) is a mammal.

### Universal Existential Statements

A **universal existential statement** is a statement that is universal because its first part says that a certain property is true for all objects of a given type, and it is existential because its second part asserts the existence of something

> Every real number has an additive inverse.

### Existential Universal Statements

An **existential universal statement** is a statement that is existential because its first part asserts that a certain object exists and is universal because its second part says that the object satisfies a certain property for all things of a certain kind

> There is a positive integer that is less than or equal to every positive integer.

## The Language of Sets

> [!TIP] **Set-Roster Notation**
>
> If \(S\) is a set the notation \(x \in S\) means that \(x\) is an element of \(S\). The notation \(x \notin S\) means that \(x\) is not al element of \(S\).
>
> A set may be specified using the **set-roster notation** by writing all of its elements between braces (e.g. \(\{1, 2, 3\}\)).

> [!NOTE] **Axiom of Extension**
>
> The **axiom of extension** says that a set is completely determined by what its elements are—not the order in which they might be listed or the fact that some elements might be listed more than once.
