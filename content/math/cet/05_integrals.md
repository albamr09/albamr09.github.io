---
title: Integrals
weight: 5
type: docs
math: true
---

## The Area and Distance Problems

### The Area Problem

We begin by attempting to solve the **area problem**: Find the area of the region $S$ that lies under the curve $y = f(x)$ from $a$ to $b$.

![The Area Problem](./assets/area_problem_intro.png)

It isn’t easy, to find the area of a region with curved sides. To do so, we first approximate the region $S$ by rectangles, and then we take the limit of the sum of the areas of the approximating rectangles as we increase the number of rectangles.

We begin approximating each strip by a rectangle that has the same base as the strip and whose height is the same as the right edge of the strip [see Figure 4(b)]. In other words, the heights of these rectangles are the values of the function $f(x)$.

![The Area Problem](./assets/area_problem_1.png)

If we let $R_n$ be the sum of the areas of these approximating rectangles, we get

$$
R_n = \sum_{i = 1}^n \Delta x f(x_i)
$$

where $\Delta x$ is the constant width of the strips, and $f(x_i)$ is the height of the rectangle at the right-side point of the rectangle for the $i$-th strip. We can also compute the sum of the areas by taking $x_i$ to be the left-side point of the rectangle for the $i$-the strip:

$$
L_n = \sum_{i = 0}^{n - 1} \Delta x f(x_i)
$$

We could obtain better estimates by increasing the number of strips, that is, by increasing $n$.

From Figures 8 and 9 it appears that as $n$ increases, both $L_n$ and $R_n$ become better and better approximations to the area of $S$. Therefore, we define the area $A$ to be the limit of the sums of the areas of the approximating rectangles, that is,

$$
A = \lim_{n \to \infty} L_n = \lim_{n \to \infty} R_n
$$

![The Area Problem](./assets/area_problem_2.png)

> [!NOTE] **Area under a Region $S$**
>
> The area $A$ of the region $S$ that lies under the graph of the continuous function $f$ is the limit of the sum of the areas of approximating rectangles:
>
> $$A = \lim_{n \to \infty} R_n = \lim_{n \to \infty} [\Delta x f(x_1) + \Delta x f(x_2) + \cdots + \Delta x f(x_n)]$$

It can be proved that the previous limit always exists, since we are assuming that $f$ is continuous. It can also be shown that we get the same value if we use left endpoints

$$
A = \lim_{n \to \infty} L_n = \lim_{n \to \infty} [\Delta x f(x_0) + \Delta x f(x_1) + \cdots + \Delta x f(x_{n - 1})]
$$

In fact, instead of using left endpoints or right endpoints, we could take the height of the $i$th rectangle to be the value of f at any number $x_i*$ in the $i$-th subinterval $[x_{i -1}, x_i]$. We call the numbers $[x_1*, x_2*, \cdots, x_n*]$ the sample points. Figure 13 shows approximating rectangles when"the sample points are not chosen to be endpoints. So a more general expression for the area of $S$ is

$$
A = \lim_{n \to \infty} [\Delta x f(x_1^*) + \Delta x f(x_2^*) + \cdots + \Delta x f(x_n^*)]
$$

![The Area Problem](./assets/area_problem_3.png)

**NOTE** To approximate the area under the graph of $f$ we can form lower sums (or upper sums) by choosing the sample points $x_i*$ so that $f(x_i*)$ is the minimum (or maximum) value of $f$ on the $i$-th subinterval (see Figure 14).

![The Area Problem](./assets/area_problem_4.png)

### The Distance Problem

Now let’s consider the **distance problem**: find the distance traveled by an object during a certain time period if the velocity of the object is known at all times. If the velocity remains constant, then the distance problem is easy to solve by means of the formula

$$
\text{distance} = \text{velocity} \cdot \text{time}
$$

Let's sketch an approximate graph of the velocity function along with rectangles whose heights are the initial velocities for each time interval [see Figure 17(a)]

![The Distance Problem](./assets/distance_problem_1.png)

The area of each rectangle can be interpreted as a distance because the height represents velocity and the width represents time. The sum of the areas of the rectangles in Figure 17(a) is our initial estimate for the total distance traveled.

If we want a more accurate estimate, we could take velocity readings more often, as illustrated in Figure 17(b). You can see that the more velocity readings we take, the closer the sum of the areas of the rectangles gets to the exact area under the velocity curve [see Figure 17(c)]. This suggests that the total distance traveled is equal to the area under the velocity graph.

In general, suppose an object moves with velocity $v = f(t)$, where $a \leq t \leq b$ and $f(t) \geq 0$ (so the object always moves in the positive direction). We take velocity readings at times $t_0 (=a), t_1, \cdots, t_n(=b)$ so that the velocity is approximately constant on each subinterval. If these times are equally spaced, then the time between consecutive readings is $\Delta t = \frac{b - a}{n}$. The total distance traveled during the time interval $[a, b]$ is approximately:

$$
f(t_0) \Delta t + f(t_1) \Delta t + \cdots + f(t_{n - 1}) \Delta t = \sum_{i = 1}^{n} f(t_{i - 1}) \Delta t
$$

If we use the velocity at right endpoints instead of left endpoints, our estimate for the total distance becomes

$$
f(t_1) \Delta t + f(t_1) \Delta t + \cdots + f(t_n) \Delta t = \sum_{i = 1}^n f(t_i) \Delta t
$$

The more frequently we measure the velocity, the more accurate our estimates become, so it seems plausible that the exact distance d traveled is the limit of such expressions:

$$
d = \lim_{n \to \infty} \sum_{i=1}^n \Delta t f(t_{i - 1}) = \lim_{n \to \infty} \sum_{i=1}^n \Delta t f(t_i)
$$

Because the previous equation has the same form as our expressions for the area under a region $S$, it follows that the distance traveled is equal to the area under the graph of the velocity function.

## The Definite Integral

> [!NOTE] **Definite Integral**
>
> If $f$ is a function defined for $a \leq x \leq b$, we divide the interval $[a, b]$ into $n$ subintervals of equal width $\Delta x = \frac{b - a}{n}$. We let
>
> - $x_0 (=a), x_1, x_2, \cdots, x_n(=b)$ be the endpoints of these subintervals and
> - $x_1^\*, x_2^\*, \cdots, x_n^\*$ be any **sample points** in these subintervals, so $x_i^*$ lies in the $i$th subinterval $[x_{i-1}, x_i]$.
>
> Then the **definite integral of $f$ from $a$ to $b$** is
>
> $$\int_{a}^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$$
>
> provided that this limit exists and gives the same value for all possible choices of sample points. If it does exist, we say that $f$ is **integrable** on $[a, b]$.

The precise meaning of the limit for the definite integral is as follows:

> For every number $\epsilon > 0$, there is an integer $N$ such that
>
> $$|\int_{a}^b f(x) dx - \sum_{i=1}^{n} f(x_i^*) \Delta x| < \epsilon$$
>
> for every integer $n > N$ and for every choice of $x_i^*$ in $[x_{i - 1}, x_i]$.

This follows from the [definition of limits on the infinite](/math/cet/02_limits/#precise-definition-of-a-limit-at-infinity).

> [!TIP] **Integral Notation**
>
> The symbol $\int$ was introduced by [Leibniz](https://wikipedia.org/wiki/Gottfried_Leibniz) and is called an **integral sign**. It was chosen becase an integral is a limit of sums.
>
> In the notation $\int_a^b f(x) dx$, $f(x)$ is called the **integrand** and $a$ and $b$ are called the **limits of integration**, where $a$ is the **lower limit** and $b$ is the **upper limit**. While the $dx$ simply indicates that the independent variable is $x$.
>
> The procedure of calculating an integral is called **integration**.

**Note** that the definite integral $\int_a^b f(x) dx$ is a number, that is, it does not depend on $x$. In fact we could use any letter in place of $x$ without changin the value of the integral.

**Also note** that the sum

$$
\sum_{i = 1}^n f(x_i^*) \Delta x
$$

is called a **Riemann sum** after the German mathematician [Berhard Riemann](https://wikipedia.org/wiki/Bernhard_Riemann). So the Definition of a Definite Integral says that the definite integral of an integrable function ca be approximated to within any desired degree of accuracy by a Riemann sum.

We know that if $f$ happes to be positive, then the Riemann sum can be interpreted as the sum of areas of approximating rectangles (see Figure 1).

![Riemann Sum](./assets/riemann_sum.png)

If $f$ takes on both positive and negative values, as in Figure 3, then the Riemann sum is the sum of the areas of the rectangles that lie above the $x$-axis and the negatives of the areas of the rectangles that lie below the $x$-axis.

![Riemann Sum](./assets/riemann_sum_negative.png)

So, a definite integral can be interpreted as a **net area**, that is, a difference of areas:

$$
\int_a^b f(x) dx = A_1 - A_2
$$

where $A_1$ is the area of the region above the $x$-axis and below the graph of $f$, and $A_2$ is the area of the region below the $x$-axis and above the graph of $f$.

Although we have defined $\int_a^b f(x) dx$ by dividing $[a, b]$ into subintervals of equal width, there are situations in which it is advantageous to work with subintervals of unequal width. If the subinterval widths are $\Delta x_1, \Delta x_2, \cdots, \Delta x_n$ we have to ensure that all these widths approach $0$ in the limiting process.

This happens if the largest width, $\max \Delta x_i$, approaches $0$. **Why?** For the limit of the sums of rectangle areas to converge to the value of the integral, **we need the rectangles to be arbitrarily thin**. Imagine some subintervals stay wide, then the sum does not approximate necessarily the real area (the value of the integral). Because in this case, **a wide subinterval might enclose great variations on $f(x)$**, and so the rectangle defined by this subinterval does not "represent" $f(x)$ well enough. So the following must hold:

$$
\max_i \Delta x_i \to 0
$$

That is, the width of the widest subinterval tends to zero.

So in this case the definition of a definite integral becomes

$$
\int_{a}^b f(x) dx = \lim_{\max \Delta x_i \to 0} \sum_{i = 1}^n f(x_i^*) \Delta x_i
$$

We have defined the definite integral for an integrable function, but not all functions are integrable.

> [!TIP] **Condition for Integrability**
>
> If $f$ is continuous on $[a, b]$ or if $f$ has only a finite number of jump discontinuities, then $f$ is integrable on $[a, b]$; that is the definite integral $\int_a^b f(x) dx$ exists.
