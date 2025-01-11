---
title: Logic of Compound Statements
weight: 2
type: docs
math: true
---

## Logic Form and Logic Equivalence

An **argument** is a sequence of **statements** aimed at demonstrating the truth of an assertion. The assertion at the end of the sequence is called the **conclusion**, and the preceding statements are called **premises**. The following shows an example of an argument:

![Argument Example](./assets/argument_example.png)

It common form is as follows

![Common Form of an Argument](./assets/argument_common_form.png)

### Statements

> [!TIP] **Statement**
>
> A **statement** (or **proposition**) is a sentence that is true or false but not both

### Compound Statements

We now introduce three symbols that are used to build more complicated logical expressions out of simpler ones.

1. The symbol $\sim$ denotes not
2. The symbol $\wedge$ denotes and
3. The symbol $\vee$ denotes or

Its order of preference is:

1. The not operation $\sim$
2. The $\wedge$ and $\vee$ operation are considered equal.

### Truth Values

> [!TIP] **Negation**
>
> If $p$ is a statement variable, the **negation** of $p$ is "not $p$" or "It is not the case that $p$" and is denoted $\sim p$. It has opposite truth value from $p$.

![Negation Truth Table](./assets/negation_truth_table.png)

> [!TIP] **Conjunction**
>
> If $p$ and $q$ are statement variables, the **conjunction** of $p$ and $q$ is "$p$ and $q$", denoted $p \wedge q$. It is true when, and only when, both $p$ and $q$ are true. If either $p$ or $q$ is false, or if both are false, $p \wedge q$ is false.

![Conjunction Truth Table](./assets/conjunction_truth_table.png)

> [!TIP] **Disjunction**
>
> If $p$ and $q$ are statement variables, the **disjunction** of $p$ and $q$ is "$p$ or $q$", denoted $p \vee q$. It is true when either $p$ is true, or $q$ is true, or both are true. It is false when both $p$ and $q$ are false.

![Disjunction Truth Table](./assets/disjunction_truth_table.png)

### Evaluating the Truth of More General Compound Statements

> [!TIP] **Statement Form**
>
> A **statement form** (or **propositional form**) is an expression made up of statement variables (such as $p$, $q$, and $r$) and logical connectives (such as , $\sim$, $\wedge$, and $\vee$) that becomes a statement when actual statements are substituted for the component statement variables.

The **truth table** for a given statement form displays the truth values that correspond to all possible combinations of truth values for its component statement variables.

Logic does not help you determine the truth or falsity of the component statements. Rather, logic helps link these separate pieces of information together into a coherent whole.

### Logical Equivalence

> [!NOTE] **Logical Equivalence**
>
> Two statement forms are called **logically equivalent** if, and only if, they have identical truth values for each possible substitution of statements for their statement variables. The logical equivalence of statement forms $P$ and $Q$ is denoted by writing $P \equiv Q$.

> [!NOTE] **Logical Equivalence**
>
> Two statements are called **logically equivalent** if, and only if, they have logically equivalent forms when identical component statement variables are used to replace identical component statements.

To test whether two statement forms p and q are logically equivalent:

1. Construct a truth table with one column for the truth values of $P$ and another column for the truth values of $Q$.
2. Check each combination of truth values of the statement variables to see whether the truth value of $P$ is the same as the truth value of $Q$.
   - If in each row the truth value of $P$ is the same as the truth value of $Q$, then $P$ and $Q$ are logically equivalent
   - If in some row $P$ has a different truth value from $Q$, then $P$ and $Q$ are not logically equivalent

There are two ways to show that statement forms $P$ and $Q$ are not logically equivalent. As indicated previously, one is to use a truth table to find rows for which their truth values differ. The other way is to find concrete statements for each of the two forms, one of which is true and the other of which is false

> [!TIP] **De Morgan's Laws**
>
> The negation of an and statement is logically equivalent to the or statement in which each component is negated.
>
> $$\sim(p \wedge q) \equiv \sim p \vee \sim q$$
>
> The negation of an or statement is logically equivalent to the and statement in which each component is negated.
>
> $$\sim(p \vee q) \equiv \sim p \wedge \sim q$$

### Tautologies and Contradictions

> [!TIP] **Tautology**
>
> A **tautology** is a statement form that is always true regardless of the truth values of the individual statements substituted for its statement variables.

A statement whose form is a tautology is a **tautological statement**.

> [!TIP] **Contradiction**
>
> A **contradication** is a statement form that is always false regardless of the truth values of the individual statements substituted for its statement variables.

A statement whose form is a contradiction is a **contradictory statement**.

> [!NOTE] **Logical Equivalences**
>
> Given any statement variables $p$, $q$, and $r$, a tautology $t$ and a contradiction $c$, the following logical equivalences hold.
>
> - Commutative laws:
>
>   $$p \wedge q \equiv q \wedge p$$
>
>   $$p \vee q \equiv q \vee p$$
>
> - Associative laws:
>
>   $$(p \wedge q) \wedge r \equiv p \wedge (q \wedge r)$$
>
>   $$(p \vee q) \wedge r \equiv p \wedge (q \vee r)$$
>
> - Distributive laws:
>
>   $$p \wedge (q \vee r) \equiv (p \wedge q) \vee (p \wedge r)$$
>
>   $$p \vee (q \wedge r) \equiv (p \vee q) \wedge (p \vee r)$$
>
> - Identity laws:
>
>   $$p \wedge t \equiv p$$
>
>   $$p \vee c \equiv p$$
>
> - Negation laws:
>
>   $$p \wedge \sim p \equiv c$$
>
>   $$p \vee \sim p \equiv t$$
>
> - Double negative laws:
>
>   $$\sim(\sim p) \equiv p$$
>
> - Idempotent laws:
>
>   $$p \wedge p \equiv p$$
>
>   $$p \vee p \equiv p$$
>
> - Universal bound laws:
>
>   $$p \vee t \equiv t$$
>
>   $$p \wedge c \equiv c$$
>
> - De Morgan's laws:
>
>   $$\sim(p \wedge q) \equiv \sim p \vee \sim q$$
>
>   $$\sim(p \vee q) \equiv \sim p \wedge \sim q$$
>
> - Absorption laws:
>
>   $$p \vee (p \wedge q) \equiv p$$
>
>   $$p \wedge (p \vee q) \equiv p$$
>
> - Negations of t and c laws:
>
>   $$\sim t \equiv c$$
>
>   $$\sim c \equiv t$$

The first five laws are the axioms for a mathematical structure known as a Boolean algebra

Although these properties can be used to prove the logical equivalence of two statement forms, they cannot be used to prove that statement forms are not logically equivalent

## Conditional Statements

> [!TIP] **Conditional**
>
> If $p$ and $q$ are statement variables, the conditional of $q$ by $p$ is "If $p$ then $q$" or "$p$ implies $q$" and is denoted $p \rightarrow q$. It is false when $p$ is true and $q$ is false; otherwise it is true.

We call $p$ the **hypothesis** (or **antecedent**) of the conditional and $q$ the **conclusion** (or **consequent**).

A conditional statement that is true by virtue of the fact that its hypothesis is false is often called **vacuously true** or **true by default**.

### Representation of If-Then as Or

The following equivalences can be proved using a truth table:

$$
p \rightarrow q \equiv \sim p \vee q
$$

$$
\sim (p \rightarrow q) \equiv p \wedge \sim q
$$

### The Contrapositive of a Conditional Statement

> [!TIP] **Contrapositive**
>
> The contrapositive of a conditional statement of the form "If $p$ then $q$" is
>
> $$\text{If } \sim q \text{ then } \sim p$$
>
> Symbollically the contrapositive of
>
> $$p \rightarrow q$$
>
> is
>
> $$\sim q \rightarrow \sim p$$

**A conditional statement is logically equivalent to its contrapositive.**

### The Converse and Inverse of a Conditional Statement

> [!TIP] **Converse**
>
> The **converse** of
>
> $$p \rightarrow q$$
>
> is
>
> $$q \rightarrow p$$

> [!TIP] **Inverse**
>
> The **inverse** of
>
> $$p \rightarrow q$$
>
> is
>
> $$\sim p \rightarrow \sim q$$

1. A conditional statement and its converse are not logically equivalent.
2. A conditional statement and its inverse are not logically equivalent.
3. The converse and the inverse of a conditional statement are logically equivalent to each other.

### Only If and the Biconditional

If $p$ and $q$ are statements, $p$ **only if** $q$ means "if not $q$ then not $p$" or equivalently "if $p$ then $q$".

> [!TIP] **Biconditional**
>
> Given statement variables $p$ and $q$, the **biconditional** of $p$ and $q$ is "$p$ if, and only if, $q$" and is denoted $p \leftrightarrow q$. It is true if both $p$ and $q$ have the same truth values and is false if $p$ and $q$ have opposite truth values.

The words if and only if are sometimes abbreviated **iff**.

According to the separate definitions of if and only if, saying "$p$ if, and only if, "q" should mean the same as saying both "$p$ if $q$" and "$p$ only if $q$."

#### Order of Operations for Logical Operators

1. $\sim $ Evaluate negations first
2. $\wedge, \vee$ Evaluate $\wedge$ and $\vee$ second. When both are present, parentheses may be needed.
3. $\rightarrow, \leftrightarrow$ Evaluate $\rightarrow$ and $\leftrightarrow$ third. When both are present, parentheses may be needed.

### Necessary and Sufficient Conditions

If $r$ and $s$ are statements:

- $r$ is a **sufficient condition** for $s$ means "if $r$ then $s$."
- $r$ is a **necessary condition** for $s$ means "if not $r$ then not $s$."

Consequently,

$r$ is a necessary and sufficient condition for $s$ means "$r$ if, and only if, $s$."

### Remarks

In mathematics it often happens that a carefully formulated definition that successfully covers the situations for which it was primarily intended is later seen to be satisfied by some extreme cases that the formulator did not have in mind. But those are the breaks, and it is important to get into the habit of exploring definitions fully to seek out and understand all their instances, even the unusual ones.

Since we often (correctly) interpret conditional statements as biconditionals, it is not surprising that we may come to believe (mistakenly) that conditional statements are always logically equivalent to their inverses and converses. In formal settings, however, statements must have unambiguous interpretations. If-then statements can’t sometimes mean “if-then” and other times mean “if and only if.” When using language in mathematics, science, or other situations where precision is important, it is essential to interpret if-then statements according to the formal definition and not to confuse them with their converses and inverses

## Valid and Invalid Arguments

> [!TIP] **Argument Form**
>
> An argument is a sequence of statements, and an **argument form** is a sequence of statement forms.

All statements in an argument and all statement forms in an argument form, except for the final one, are called **premises** (or assumptions or **hypotheses**). The final statement or statement form is called the **conclusion**. The symbol $\therefore$, which is read "therefore," is normally placed just before the conclusion.

> [!TIP] **Valid Argument**
>
> To say that an argument form is **valid** means that no matter what particular statements are substituted for the statement variables in its premises, if the resulting premises are all true, then the conclusion is also true. To say that an argument is valid means that its form is **valid**.

> [!TIP] **Critical Row**
>
> A row of the truth table in which all the premises are true is called a **critical row**.

When an argument is valid and its premises are true, the truth of the conclusion is said to be inferred or deduced from the truth of the premises.

> [!NOTE] **Testing an Argument for Validity**
>
> 1. Identify the premises and conclusion of the argument form
> 2. Construct a truth table showing the truth values of all the premises and the conclusion.
> 3. If there is a critical row in which the conclusion is false, then it is possible for an argument of the given form to have true premises and a false conclusion, and so the argument form is invalid. If the conclusion in every critical row is true, then the argument form is valid.

### Modus Ponens and Modus Tollens

An argument form consisting of two premises and a conclusion is called a **syllogism**. The first and second premises are called the **major premise** and **minor premise**, respectively. The most famous form of syllogism in logic is called **modus ponens**. It has the following form:

$$
\text{ If } p \text{ then } q
$$

$$
p
$$

$$
\therefore q
$$

The **modus tollens** has the following form:

$$
\text{ If } p \text{ then } q
$$

$$
\sim q
$$

$$
\therefore \sim p
$$

The validity of modus tollens can be shown to follow from modus ponens together with the fact that a conditional statement is logically equivalent to its contrapositive.

### Additional Valid Argument Forms: Rules of Inference

A **rule of inference** is a form of argument that is valid.

#### Generalization

The following argument forms are valid:

$$
p
$$

$$
\therefore p \vee q
$$

$$
q
$$

$$
\therefore p \vee q
$$

#### Specialization

The following argument forms are valid:

$$
p \wedge q
$$

$$
\therefore p
$$

$$
p \wedge q
$$

$$
\therefore q
$$

#### Elimination

The following argument forms are valid:

$$
p \vee q
$$

$$
\sim q
$$

$$
\therefore p
$$

$$
p \vee q
$$

$$
\sim p
$$

$$
\therefore q
$$

These argument forms say that when you have only two possibilities and you can rule one out, the other must be the case.

#### Transitivity

The following argument form is valid:

$$
p \rightarrow q
$$

$$
q \rightarrow r
$$

$$
\therefore p \rightarrow r
$$

#### Proof by Division into Cases

The following argument form is valid:

$$
p \vee q
$$

$$
p \rightarrow r
$$

$$
q \rightarrow r
$$

$$
\therefore r
$$

### Fallacies

> [!TIP] **Fallacy**
>
> A **fallacy** is an error in reasoning that results in an invalid argument.

Three common fallacies are:

- **Using ambiguous premises**, and treating them as if they were unambiguous
- **Circular reasoning**, assuming what is to be proved without having derived it from the premises.
- **Jumping to a conclusion** without adequate grounds.

#### Converse error

The fallacy underlying this invalid argument form is called the **converse error**

$$
p \rightarrow q
$$

$$
q
$$

$$
\therefore p
$$

The conclusion of the argument would follow from the premises if the premise $p \rightarrow q$ were replaced by its converse. Such a replacement is not allowed, however, because a conditional statement is not logically equivalent to its converse.

Converse error is also known as the fallacy of affirming the consequent.

#### Inverse error

The fallacy underlying this invalid argument form is called the **inverse error**

$$
p \rightarrow q
$$

$$
\sim p
$$

$$
\therefore \sim q
$$

The conclusion of the argument would follow from the premises if the premise $p \rightarrow q$ were replaced by its inverse. Such a replacement is not allowed, however, because a conditional statement is not logically equivalent to its inverse.

Inverse error is also known as the fallacy of denying the antecedent.

> [!TIP] **Sound Argument**
>
> An argument is called **sound** if, and only if, it is valid and all its premises are true. An argument that is not sound is called **unsound**.

The bottom line is that we can only be sure that the conclusion of an argument is true when we know that the argument is sound, that is, when we know both that the argument is valid and that it has all true premises

### Contradictions and Valid Arguments

> [!NOTE] **Contradiction Rule**
>
> If you can show that the supposition that statement $p$ is false leads logically to a contradiction, then you can conclude that $p$ is true.

$$
\sim p \rightarrow c, \text{ where } c \text{ is a contradiction}
$$

$$
\therefore p
$$

The contradiction rule is the logical heart of the method of proof by contradiction. A slight variation also provides the basis for solving many logical puzzles by eliminating contradictory answers: If an assumption leads to a contradiction, then that assumption must be false.

## Application: Digital Logic Circuits

In the late 1930s, a young M.I.T. graduate student named [Claude Shannon](https://en.wikipedia.org/wiki/Claude_Shannon) noticed an analogy between the operations of switching devices, such as telephone switching circuits, and the operations of logical connectives.

Now consider the more complicated circuits of Figures 2.4.2(a) and 2.4.2(b).

![Switches](./assets/switches.png)

In the circuit of Figure 2.4.2(a) current flows and the light bulb turns on if, and only if, both switches P and Q are closed. The switches in this circuit are said to be **in series**. In the circuit of Figure 2.4.2(b) current flows and the light bulb turns on if, and only if, at least one of the switches P or Q is closed. The switches in this circuit are said to be **in parallel**. All possible behaviors of these circuits are described by Table 2.4.1.

![Switches Truth Table](./assets/switches_truth_table.png)
