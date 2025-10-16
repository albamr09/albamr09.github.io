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
