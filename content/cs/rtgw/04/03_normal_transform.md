---
title: Normal Transform
type: docs
weight: 3
math: true
prev: notes/cs/rtgw/04/02_model_view
---

### Calculating the Normal Matrix

Two vectors are perpendicular if their dot product is $0$. In our example

$$
<N, S> = 0
$$

Here, $S$ is the surface vector and can be calculated as the difference of two vertices. Let $M$ be the Model-View matrix. We can use $M$ to transform $S$ as follows:

$$
S' = MS
$$

We want to find a matrix, $K$, that allows us to transform normals in a similar way. For the $N$ normal, we want the following:

$$
N' = KN
$$

For the scene to be consistent after obtaining $N'$ and $S'$, these two need to keep the perpendicularity that the original vectors $N$ and $S$ had.

$$
<N', S'> = 0
$$

Substituting $N'$ and $S'$:

$$
<KN, MS> = 0
$$

$$
(KN)^T(MS) = 0
$$

$$
N^TK^TMS = 0
$$

$$
N^T(K^TM)S = 0
$$

Now, remember that $<N, S> = 0$ so $N^TS = 0$. This means that in the previous equation, $(K^TM)$ needs to be the identity matrix, $I$, so the original condition of N and S being perpendicular holds:

$$
K^TM = I
$$

$$
K^TMM^{-1} = IM^{-1} = M^{-1}
$$

$$
K^T = M^{-1}
(K^T)^T = (M^{-1})^T
$$

$$
K = (M^{-1})^T
$$

$K$ is obtained by transposing the inverse of the Model-View matrix ($M$, in this example). We need to use $K$ to multiply the normal vectors so that they keep being perpendicular to the surface when transformed.
