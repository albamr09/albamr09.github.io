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
