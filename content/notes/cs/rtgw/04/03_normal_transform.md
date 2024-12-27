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
\begin{aligned}
<N, S> = 0
\end{aligned}
$$

Here, $S$ is the surface vector and can be calculated as the difference of two vertices. Let $M$ be the Model-View matrix. We can use $M$ to transform $S$ as follows:

$$
\begin{aligned}
S' = MS
\end{aligned}
$$

We want to find a matrix, $K$, that allows us to transform normals in a similar way. For the $N$ normal, we want the following:

$$
\begin{aligned}
N' = KN
\end{aligned}
$$

For the scene to be consistent after obtaining $N'$ and $S'$, these two need to keep the perpendicularity that the original vectors $N$ and $S$ had.

$$
\begin{aligned}
<N', S'> = 0
\end{aligned}
$$

Substituting $N'$ and $S'$:

$$
\begin{aligned}
<KN, MS> = 0
\end{aligned}
$$

$$
\begin{aligned}
(KN)^T(MS) = 0
\end{aligned}
$$

$$
\begin{aligned}
N^TK^TMS = 0
\end{aligned}
$$

$$
\begin{aligned}
N^T(K^TM)S = 0
\end{aligned}
$$

Now, remember that $<N, S> = 0$ so $N^TS = 0$. This means that in the previous equation, $(K^TM)$ needs to be the identity matrix, $I$, so the original condition of N and S being perpendicular holds:

$$
\begin{aligned}
K^TM = I
\end{aligned}
$$

$$
\begin{aligned}
K^TMM^{-1} = IM^{-1} = M^{-1}
\end{aligned}
$$

$$
\begin{aligned}
K^T = M^{-1}
\end{aligned}
$$

$$
\begin{aligned}
(K^T)^T = (M^{-1})^T
\end{aligned}
$$

$$
\begin{aligned}
K = (M^{-1})^T
\end{aligned}
$$

$K$ is obtained by transposing the inverse of the Model-View matrix ($M$, in this example). We need to use $K$ to multiply the normal vectors so that they keep being perpendicular to the surface when transformed.
