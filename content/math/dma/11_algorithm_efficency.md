---
title: Analysis of Algorithm Efficency
weight: 11
type: docs
math: true
---

## Real-Valued Functions of a Real Variable and Their Graphs

A **Cartesian plane** or **two-dimensional Cartesian coordinate system** is a pictorial representation of $\mathbb{R} \times \mathbb{R}$, obtained by setting up a one-to-one correspondence between ordered pairs of real numbers and points in a Euclidean plane. To obtain it, two perpendicular lines, called the **horizontal and vertical axes**, are drawn in the plane. Their point of intersection is called the origin, and a unit of distance is chosen for each axis.

An ordered pair $(x, y)$ of real numbers corresponds to the point $P$ that lies $|x|$ units to the right or left of the vertical axis and $|y|$ units above or below the horizontal axis.

> [!NOTE] **Real-Valued Function of a Real Variable**
>
> A real-valued function of a real variable is a function from one set of real numbers to another. If $f$ is a real-valued function of a real variable, then for each real number $x$ in the domain of $f$ there is a unique corresponding real number $f(x)$.

> [!NOTE] **Graph of a Real Function**
>
> The graph of $f$ is the set of all points $(x, y)$ in the Cartesian coordinate plane with the property that $x$ is in the domain of $f$ and $y = f(x)$.

The example of the graph of a function $f$ is shown in the following figure:

![Graph of a Function](./assets/graph_of_function.png)

### Power Functions

A function that sends a real number $x$ to a particular power, $x^a$, is called a power function.

> [!NOTE] **Power Function**
>
> Let $a$ be any nonnegative real number. Define $p_a$, the **power function** with exponent $a$, as follows:
>
> $$p_a(x) = x^a, \text{ for each nonnegative real number } x$$

![Power Function Graph](./assets/power_function_graph.png)

### Increasing and Decreasing Function

> [!NOTE] **Increasing Function**
>
> Let $f$ be a real-valued function defined on a set of real numbers, and suppose the domain of $f$ contains a set $S$. We say that $f$ is **increasing on the set $S$** if, and only if,
>
> $$\text{for all real numbers } x_1 \text{ and } x_2 \text{ in } S, \text{ if } x_1 < x_2 \text{ then } f(x_1) < f(x_2)$$

> [!NOTE] **Decreasing Function**
>
> Let $f$ be a real-valued function defined on a set of real numbers, and suppose the domain of $f$ contains a set $S$. We say that $f$ is **decreasing on the set $S$** if, and only if,
>
> $$\text{for all real numbers } x_1 \text{ and } x_2 \text{ in } S, \text{ if } x_1 < x_2 \text{ then } f(x_1) > f(x_2)$$

We say that $f$ is an increasing (or decreasing) function if, and only if, $f$ is increasing (or decreasing) on its entire domain.

The following image shows examples of increasing (left) and decreasing (right) functions:

![Increasing and Decreasing Functions](./assets/increasing_decreasing_functions.png)

## Big-O, Big-Omega, and Big-Theta Notations

Understanding the relative efficiencies of computer algorithms is of much more than academic interest. In industrial and scientific settings, the choice of an efficient over an inefficient algorithm can save a great deal of money or even make the difference between being able or not being able to do a project at all.

**The cost and feasibility of implementing a computer algorithm are most affected by the length of computer time and the amount of computer memory the algorithm requires**. While both are important, this chapter concentrates on basic techniques for calculating time efficiency, which is usually the more significant of the two. Occasionally, however, one algorithm may make more efficient use of time but less efficient use of memory than another, forcing a trade-off based on the resources available to the user.

The main objects of analysis in this chapter will be algorithms that take a data array and either search it to find a particular element or sort it into ascending or descending order.

As a simple example, imagine running an algorithm to search an array of data for a particular element. In the best case the algorithm might happen to find the element in its very first step; in the worst case it might have to check every element before ending.

The best and worst cases cannot be predicted in advance because they depend on the nature of the data being processed, so, when comparing two algorithms, **it is reasonable to want control over worst-case situations**.

For example, the graph in the following figure gives a range of worst-case execution times for two algorithms used to sort sets of data: insertion sort and merge sort. As the length of the data set becomes larger and larger, the difference between the ranges becomes dramatically greater.

![Time Efficency](./assets/time_efficency_example.png)

When they were originally defined, the order notations referred to functions defined on continuous intervals of real numbers rather than to functions defined on sets of integers. However, the important variable in the analysis of algorithm efficiency is the size of the problem the algorithm is designed to solve, which is an integer.

> [!NOTE] **The Order of a Function**
>
> Let $f$ and $g$ be real-valued functions defined on the same set of nonnegative integers, with $g(n) \geq 0$ for every integer $n \geq r$, where $r$ is a positive real number. Then
>
> - $f$ is of order at least $g$, written $f(n)$ is $\Omega(g(n))$, if, and only if, there exist positive real numbers $A$ and $a \geq r$ such that
>
> $$Ag(n) \leq f(n) \text{ for every integer } n \geq a$$
>
> - $f$ is of order at most $g$, written $f(n)$ is $O(g(n))$, if, and only if, there exist positive real numbers $B$ and $b \geq r$ such that
>
> $$0 \leq f(n) \leq Bg(n) \text{ for every integer } n \geq b$$
>
> - $f$ is of order $g$, written $f(n)$ is $\Theta(g(n))$, if, and only if, there exist positive real numbers $A$, $B$, and $k \geq r$ such that
>
> $$Ag(n) \leq f(n) \leq Bg(n) \text{ for every integer } n \geq k$$

The concept of the order of a function is illustrated on the following graphs:

![Order of a Function](./assets/order_of_a_function.png)

> [!TIP] **Relationship among $O-$, $\Omega-$ and $\Theta-$ Notations**
>
> If $f$ and $g$ are real-valued functions defined on the same set of nonnegative integers, and if $f(n) \geq 0$ and $g(n) \geq 0$ for every integer $n \geq r$, where $r$ is a positive real number, then
>
> $$f(n) \text{ is } \Theta(g(n)) \text{ if, and only if, } f(n) \text{ is } \Omega(g(n)) \text{ and } f(n) \text{ is } O(g(n))$$

### Order of Power Functions

The functions that are most commonly used for comparing algorithm efficiencies are power functions, such as $n^{\frac{1}{2}}$, $n$, $n^2$, and $n^3$.

> [!TIP] **Order of Power Functions**
>
> For any positive rational numbers $r$ and $s$ and any integer $n \geq 1$,
>
> $$\text{ if } r \leq s, \text{ then } n^r \leq n^s$$

### Order of Polynomial Functions

> [!TIP] **A Limit on What can be inferred from Big-O**
>
> For any function f and positive real numbers $r$ and s with $r < s$,
>
> $$\text{ if } f(n) \text{ is } O(n^r) \text{ then } f(n) \text{ is } O(n^s)$$

**Proof**. Suppose $r$ and $s$ are real numbers with $r < s$ and $f$ is a function such that $f(n)$ is $O(n^r)$. By definition of O-notation, there exist positive real numbers $B$ and $b$ such that

$$
0 \leq f(n) \leq Bn^r \texxt{ for every integer } n \geq b
$$

Now as $r < s$, we know that

$$
n^r \leq n^s, \text{ for every integer } n \geq 1
$$

thus

$$
Bn^r \leq Bn^s \text{ for every integer } n \geq 1
$$

Let $b_1$ be the larger of $b$ and $1$. Then

$$
0 \leq f(n) \leq Bn^s \text{ for every integer } n \geq b_1
$$

and thus $f(n)$ is $O(n^s)$

> [!NOTE] **Showing that a Big-O Relationship does not hold**
>
> If $f$ is a real-valued function defined on a set of nonnegative integers and $f(n)$ is $\Omega(n^m)$, where $m$ is a positive integer, then $f(n)$ is not $O(n^p)$ for any positive real number $p < m$.

> [!TIP] **Order of a Polynomial**
>
> If $m$ is any integer with $m \geq 0$ and $a_0, a_1, \cdots, a_m$ are real numbers with $a_m > 0$, then $a_mn^m + a_{m - 1}n^{m - 1} + \cdots + a_1 n + a_0$ is $\Theta(n^m)$.

**Proof**. Suppose $m$ is an integer with $m > 0$ and suppose $a_0, a_1, cdots, a_m$ are real numbers with $a_m > 0$. Because $\lim_{n \to \infty} \frac{1}{n^1} = 0$ for every integer $i \geq 1$

$$
\lim_{n \to \infty} \left(\frac{a_mn^m + \cdots + a_1n + a_0}{n^m}\right)
$$

$$
= \lim_{n \to \infty} \left(a_m + \frac{a_{m-1}}{n} + \cdots + \frac{a_1}{n^{m - 1}} + \frac{a_0}{n^m}\right)
$$

As all rational expressions tend to $0$ when $n$ becomes larger and larger, then:

$$
= a^m
$$

By definition of limit, this implies that for any real number $\epsilon > 0$, there exists an integer $K$ such that

$$
a_m - \epsilon < a_m + \frac{a_{m-1}}{n} + \cdots + \frac{a_1}{n^{m - 1}} + \frac{a_0}{n^m} < a_m + \epsilon \text{ for every integer } n > K
$$

In particular, when $\epsilon = \frac{a_m}{2}$, there is an integer $k$ such that

$$
a_m - \frac{a_m}{2} < a_m + \frac{a_{m-1}}{n} + \cdots + \frac{a_1}{n^{m - 1}} + \frac{a_0}{n^m} < a_m + \frac{a_m}{2} \text{ for every integer } n > k
$$

Combining like terms and multiplying all parts of the inequality by $n^m$ gives that

$$
\frac{a_m}{2}n^m < a_mn^m + a_{m-1}n^{m - 1} + \cdots + a_1n + a_0 < \frac{3a_m}{2}n^m \text{ for every integer } n > k
$$

Therefore, by definition of $\Omega$-notation:

$$
a_mn^m + a_{m-1}n^{m - 1} + \cdots + a_1n + a_0 \text{ is } \Theta(n^m)
$$

We end this section by stating some theorems that give useful properties of order notations.

> [!NOTE] **Reciprocal Relationship between $\Omega$ and O-notations**
>
> Let $f$ and $g$ be real-valued functions defined on the same set of nonnegative integers, and suppose there is a positive real number $r$ such that $f(n) \geq 0$ and $g(n) \geq 0$ for every integer $n \geq r$. Then:
>
> - If $f(n)$ is $\Omega(g(n))$, then $g(n)$ is $O(f(n))$.
> - If $g(n)$ is $O(f(n))$, then $f(n) is \Omega(g(n))$.

> [!NOTE] **Reflexive, Symmetric, and Transitive Properties of $\Theta$-notation**
>
> Let $f$, $g$, and $h$ be real-valued functions defined on the same set of nonnegative integers, and suppose there is a positive real number $r$ such that $f(n) \geq 0$, $g(n) \geq 0$ and $h(n) \geq 0$, for every integer $n \geq r$. Then:
>
> - **Reflexivity**: $f(n)$ is $\Theta(f(n))$
> - **Symmetry**: If $f(n)$ is $\Theta(g(n))$, then $g(n)$ is $\Theta(f(n))$.
> - **Transitivity**: If $f(n)$ is $\Theta(g(n))$ and $g(n)$ is $\Theta(h(n))$, then $f(n)$ is $\Theta(h(n))$.

> [!NOTE] **Effect of Constants on Order Notations**
>
> Let $f$ and $g$ be real-valued functions defined on the same set of nonnegative integers, and suppose there is a positive real number $r$ such that $f(n) \geq 0$ and $g(n) \geq 0$ for every integer $n \geq r$. Then for every positive real number $c$:
>
> - If $f(n)$ is $\Omega(g(n))$, then $cf(n)$ is $\Omega(g(n))$;
> - If $f(n)$ is $O(g(n))$, then $cf(n)$ is $O(g(n))$;
> - If $f(n)$ is $\Theta(g(n))$, then $cf(n)$ is $\Theta(g(n))$.

> [!NOTE] **Orders of Sums and Products of Functions**
>
> Let $f_1$, $f_2$, $g_1$, and $g_2$ be real-valued functions defined on the same set of nonnegative integers, and suppose there is a positive real number $r$ such that $f_1(n) \geq 0$, $f_2(n) \geq 0$, $g_1(n) \geq 0$, and $g_2(n) \geq 0$ for every integer $n \geq r$. Then:
>
> - If $f_1(n)$ is $\Theta(g(n))$ and $f_2(n)$ is $\Theta(g(n))$, then $(f_1(n) + f_2(n))$ is $\Theta(g(n))$.
> - If $f_1(n)$ is $\Theta(g_1(n))$ and $f_2(n)$ is $\Theta(g_2(n))$, then $(f_1(n)f_2(n))$ is $\Theta(g_1(n)g_2(n))$.
> - If $f_1(n)$ is $\Theta(g_1(n))$ and $f_2(n)$ is $\Theta(g_2(n))$ and if there is a real number $s$ so that $g_1(n) \leq g_2(n)$ for every integer $n \geq s$, then $(f_1(n) + f_2(n))$ is $\Theta(g_2(n))$.
