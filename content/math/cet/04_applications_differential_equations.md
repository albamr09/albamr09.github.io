---
title: Applications of Differentiation
weight: 4
type: docs
math: true
---

## Maximum and Minimum Values

Some of the most important applications of differential calculus are **optimization problems**, in which we are required to find the optimal (best) way of doing something.

### Absolute and Local Extreme Values

> [!TIP] **Absolute Values**
>
> Let $c$ bea a number in the domain $D$ of a function $f$. Then $f(c)$ is the
>
> - **absolute maximum** value of $f$ on $D$ if $f(c) \geq f(x)$ for all $x$ in $D$
> - **absolute minimum** value of $f$ on $D$ if $f(c) \leq f(x)$ for all $x$ in $D$

An absolute maximum or minimum is sometimes called a **global maximum or minimum**. The maximum and minimum values of $f$ are called **extreme values** of $f$.

> [!TIP] **The Extreme Value Theorem**
>
> If $f$ is continuous on a closed interval $[a, b]$, then $f$ attains an absolute maximum value $f(c)$ and an absolute minimum value $f(d)$ at some numbers $c$ and $d$ in $[a, b]$.

The Extreme Value Theorem is illustrated in Figure 8.

![Extreme Value Theorem](./assets/extreme_value_theorem.png)

### Critical Numbers and the Closed Interval Method

> [!TIP] **Fermat's Theorem**
>
> If $f$ has a local maximum or minimum at $c$, and if $f'(c)$ exists, then $f'(c) = 0$.

**PROOF**: Suppose that $f$ has a local maximum at $c$. Then accoding to the definition of a local maximum $f(c) \geq f(x)$ if $x$ is sufficiently close to $c$. This implies that if $h$ is sufficiently close to $0$, with $h$ being positive or negative, then:

$$
f(c) \geq f(c + h)
$$

and therefore

$$
f(c + h) - f(c) \leq 0
$$

We can divide both sides of an inequality by a positive number $h$, then

$$
\frac{f(c + h) - f(c)}{h} \leq 0
$$

Taking the right-hand limit of both sides we get

$$
\lim_{h \rightarrow 0^+} \frac{f(c + h) - f(c)}{h} \leq \lim_{h \rightarrow 0^+} = 0
$$

Since $f'(0)$ exists, we have

$$
 \lim_{h \rightarrow 0} \frac{f(c + h) - f(c)}{h} = \lim_{h \rightarrow 0^+} \frac{f(c + h) - f(c)}{h}
$$

and so we have shown that $f'(c) \leq 0$. If $h < 0$, then

$$
\frac{f(c + h) - f(c)}{h} \geq 0
$$

So taking the left-hand limit, we have

$$
 \lim_{h \rightarrow 0} \frac{f(c + h) - f(c)}{h} = \lim_{h \rightarrow 0^-} \frac{f(c + h) - f(c)}{h} \geq 0
$$

We have shown that $f'(c) \geq 0$ and $f'(c) \leq 0$ so the only possibility is that $f'(c) = 0$.

**We can't expect to locate extreme values simply by setting $f'(x) = 0$ and solving for $x$.** The fact that $f'(x) = 0$ simply means that the curve $f$ has a horizontal tangent at $(x, f(x))$. In other words, the converse of Fermat's Theorem is false in general. However, Fermat's Theorem does suggest that we should at least start looking for extreme values of $f$ at the number $c$ where $f'(c) = 0$ or where $f'(c)$ does not exist.

> [!TIP] **Critical Number**
>
> A **critical number** of a function $f$ is a number $c$ in the domain of $f$ such that either $f'(c) = 0$ or $f'(c)$ does not exist.

In terms of critical numbers, Fermat's Theorem can be rephared as follows:

> [!TIP] **Fermat's Theorem**
>
> If $f$ has a local maximum of minimum at $c$, then $c$ is a critical number of $f$.

> [!NOTE] **The Closed Interval Method**
>
> To find the absolute maximum and minimum values of a continuous function $f$ on a closed interval $[a, b]$:
>
> 1. Find the values of $f$ at the critical numbers of $f$ in $(a, b)$
> 2. Find the values of $f$ at the endpoints of the interval.
> 3. The largest of the values from Steps 1 and 2 is the absolute maximum value; the samllest of these values is the absolute minimum value.

## The Mean Value Theorem

### Rolle's Theorem

> [!TIP] **Rolle's Theorem**
>
> Let $f$ be a function that satisfies the following three hypotheses:
>
> 1. $f$ is continuous on the closed interval $[a, b]$
> 2. $f$ is differentiable on the open interval $(a, b)$
> 3. $f(a) = f(b)$
>
> The there is a number $c$ in $(a, b)$ such that $f'(c) = 0$

**PROOF**: There are three cases:

**Case 1** $f(x) = k$, a constant. Then $f'(x) = 0$, so the number $c$ can be taken to be any numer in $(a, b)$.

**Case 2** $f(x) > f(a)$ for some $x \in (a, b)$. Then, by the Extreme Value Theorem (which we can apply by hypothesis 1), $f$ has a maximum value somewhere in $[a, b]$. Since $f(a) = f(b)$ it must attain this maximum value at a number $c$ in the open interval $(a, b)$. Then $f$ has a local maximum at $c$, and by hypothesis 2, $f$ is differentiable at $c$. Therefore $f'(c) = 0$ by Fermat's Theorem.

**Case 3** $f(x) < f(a)$ for some $x \in (a, b)$. Then, by the Extreme Value Theorem (which we can apply by hypothesis 1), $f$ has a minimum value somewhere in $[a, b]$. Since $f(a) = f(b)$ it must attain this minimum value at a number $c$ in the open interval $(a, b)$. Then $f$ has a local minimum at $c$, and by hypothesis 2, $f$ is differentiable at $c$. Therefore $f'(c) = 0$ by Fermat's Theorem.

Figure 1 shows the graphs of four such functions.

![Rolle's Theorem](./assets/rolles_theorem.png)

### The Mean Value Theorem

> [!TIP] **The Mean Value Theorem**
>
> Let $f$ be a function that satisfies:
>
> 1. $f$ is continuous on the closed interval $[a, b]$
> 2. $f$ is differentiable on the open interval $(a, b)$
>
> The there is a number $c$ in $(a, b)$ such that
>
> $$f'(c) = \frac{f(b) - f(a)}{b - a}$$
>
> or equivalently
>
> $$f(b) - f(a) = f'(c)(b - a)$$

The Mean Value Theorem says that there is at least one point $P(c, f(c))$ on the graph where the slope of the tangent line is the same as the slope of the secant line $A, B$ (see Figures 3 and 4).

![Mean Value Theorem](./assets/mean_value_theorem.png)

**PROOF** We see the the equation of the line $AB$ can be written as:

$$
y - f(a) = m_{AB} (x - a)
$$

where $m_{AB} = \frac{f(b) - f(a)}{b - a}$, thus

$$
y = f(a) + \frac{f(b) - f(a)}{b - a}(x - a)
$$

![Mean Value Theorem Proof](./assets/mean_value_theorem_proof.png)

So, as we can see on Figure 5:

$$
h(x) = f(x) - y
$$

$$
h(x) = f(x) - f(a) - \frac{f(b) - f(a)}{b - a}(x - a)
$$

First, we must verify that $h$ satisfies the three hypotheses of [Rolle's Theorem](#rolles-theorem):

1. The function $h$ is continuous on $[a, b]$ because it is the sum of $f$ and a first-degree polynomial both of which are continuous.
2. The function $h$ is differentiable because both $f$ and the first degree polynomial are differentiable. Thus

$$
h'(x) = f'(x) - \frac{f(b) - f(a)}{b - a}
$$

3. We must show that $h(a) = h(b)$

$$
h(a) = f(a) - f(a) - \frac{f(b) - f(a)}{b - a}(a - a) = 0
$$

$$
h(b) = f(b) - f(a) - \frac{f(b) - f(a)}{b - a}(b - a)
$$

$$
= f(b) - f(a) - f(b) + f(a) = 0
$$

Which means $h(a) = h(b) = 0$.

Since $h$ satisfies all the hypotheses of [Rolle's Theorem](#rolles-theorem), there exists a number $c$ in $(a, b)$ such that $h'(c) = 0$. Therefore

$$
h'(c) = f'(c) - \frac{f(b) - f(a)}{b - a} = 0
$$

So

$$
f'(c) = \frac{f(b) - f(a)}{b - a}
$$

In general, the Mean Value Theorem can be interpreted as saying that there is a number at which the instantaneous rate of change is equal to the average rate of change over an interval.

The Mean Value Theorem can be used to establish some of the basic facts of differential calculus.

> [!TIP] **Theorem**
>
> If $f'(x) = 0$ for all $x$ in an interval $(a, b)$, then $f$ is constant on $(a, b)$

**PROOF**: Let $x_1$ and $x_2$ be any two numbers in $(a, b)$ with $x_1 < x_2$. Since $f$ is differentiable on $(a, b)$ it must be differentiable on $(x_1, x_2)$ and continuous on $[x_1, x_2]$. By applying the [Mean Value Theorem](#the-mean-value-theorem-1) to $f$ on the interval $[x_1, x_2]$, we get a number $c$ such that $x_1 < c < x_2$ and

$$
f(x_2) - f(x_1) = f'(c) (x_2 - x_1)
$$

Since $f'(x) = 0$ for all $x$, then $f'(c) = 0$ and therefore

$$
f(x_2) - f(x_1) = 0 \leftrightarrow f(x_2) = f(x_1)
$$

Thus $f$ has the same value at any two numbers $x_1$ and $x_2$ in $(a, b)$. This means that $f$ is constant on $(a, b)$.

> [!TIP] **Corollary**
>
> If $f'(x) = g'(x)$ for all $x$ in an interval $(a, b)$, then $f - g$ is constant on $(a, b)$; that is, $f(x) = g(x) + c$ where $c$ is a constant.

**PROOF**: Let $F(x) = f(x) - g(x)$. Then

$$
F'(x) = f'(x) - g'(x) = 0
$$

for all $x \in (a, b)$. Thus by the previous theorem $F$ is constant, that is $f - g$ is constant.

This corollary says that if two functions have the same derivatives on an interval, then their graphs must be vertical trasnlation of each other.

## What Derivatives Tell Us about the Shape of a Graph

### What Does $f'$ say about $f$?

> [!NOTE] **Increasing/Decreasing Test**
>
> If $f'(x) > 0$ on an interval, then $f$ is increasing on that interval
>
> If $f'(x) < 0$ on an interval, then $f$ is decreasin on that interval

See Figure 1 for a graphical representation.

![Increasing/Decreasing Test](./assets/increasing_decreasing_test.png)

**PROOF**: Without loss of generality we let $x_1$ and $x_2$ be any two numbers on the interval with $x_1 < x_2$. According to the [definition of an increasing function](../../agaa/02_graph_analysis#increasing-decreasing-and-constant-functions) we have to show that $f(x_1) < f(x_2)$.

Because we are given that $f'(x) > 0$, we know that $f$ is differentiable on $[x_1, x_2]$. So, by the [Mean Value Theorem](#the-mean-value-theorem-1), there is a number $c$ between $x_1$ and $x_2$ such that

$$
f(x_2) - f(x_1) = f'(c)(x_2 - x_1)
$$

We know that $f'(c) > 0$ by our initial assumption and $x_2 - x_1$ because $x_1 < x_2$, thus the right side of the previous equation must be positive:

$$
f(x_2) - f(x_1) > 0
$$

Which is equivalent to

$$
f(x_2) > f(x_1)
$$

This shows that $f$ is increasing.

### The First Derivative Test

> [!NOTE] **The First Derivative Test**
>
> Suppose $c$ is a critical number of a continuous function $f$.
>
> 1. If $f'$ changes from positive to negative at $c$, then $f$ has a local maximum at $c$
> 2. If $f'$ changes from negative to positive at $c$, then $f$ has a local minimum at $c$
> 3. If $f'$ is positive to the left and right of $c$, or negative to the left and right of $c$ then $f$ has no local maximum or minimum at $c$

The First Derivative Test is illustrated in Figure 4.

![The First Derivative Test](./assets/first_derivative_test.png)

### What does $f''$ say about $f'$?

> [!TIP] **Concavity of a Function**
>
> If the graph of $f$ lies above all of its tangents on an interval $I$, then $f$ is called **concave upward** on $I$.
>
> If the graph of $f$ lies below all of its tangents on an interval $I$, then $f$ is called **concave downward** on $I$.

See Figure 7 for an illustration on the concavity of a function.

![Concavity of a Function](./assets/concavity_of_function.png)

In Figure 7(a) we see that the slope of the tangent increases. This means that the derivative $f'$ is an increasing function and therefore its derivative $f''$ is positive. Likewise, in Figure 7(b) the slope of the tangent decreases, so $f'$ decreases and therefore $f''$ is negative.

> [!NOTE] **Concavity Test**
>
> 1. If $f''(x) > 0$ on an interval $I$, then the graph of $f$ is concave upward on $I$.
> 2. If $f''(x) < 0$ on an interval $I$, then the graph of $f$ is concave downward on $I$.

> [!TIP] **Inflection Point**
>
> A point $P$ on a curve $y = f(x)$ is called an **inflection point** if $f$ is continuous there and the curve changes from concave upward to concave downward or viceversa.

### The Second Derivative Test

> [!NOTE] **The Second Derivative Test**
>
> Suppose $f''$ is continuous near $c$
>
> 1. If $f'(c) = 0$ and $f''(c) > 0$, then $f$ has a local minimum at $c$
> 2. If $f'(c) = 0$ and $f''(c) < 0$, then $f$ has a local maximum at $c$

Note that The Second Derivative Test is inconclusive when $f''(c) = 0$ as there might be a maximum, a minimum or neither in that point. This test also fails when $f''(c)$ does not exist.
