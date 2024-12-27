---
title: Orthografic Matrix
type: docs
weight: 2
math: true
next: notes/cs/rtgw/04/03_normal_transform
---

## Intro

In this chapter, we will explore how to construct a matrix that projects a point from camera space onto the image plane of an orthographic camera.

The aim of the orthographic projection matrix is to remap all coordinates within a specific 3D space bounding box to the **canonical viewing volume**. For that we need to know the scene's bounding box, that is the bounding box that encompasses all the objects on the scene. The orthographic matrix then aims to remap this box to a canonical view volume, defined by minimum and maximum extents of $(-1, -1, -1)$ and $(1, 1, 1)$.

![Bounding Boxes](../../../assets/orthographic_perspective_bounding_box.png)

Once we have computed the scene bounding box, we need to project the minimum and maximum extents of this bounding box onto the image plane of the camera. The $x$- and $y$-coordinates of any point expressed in camera space and the $x$- and $y$-coordinates of the same points projected onto the image plane remain identical. It may be necessary to adjust the projection of the bounding box's minimum and maximum extents onto the screen to ensure the screen window is either square or maintains the same aspect ratio as the image.

![Camera Coordinates' Mapping to Image Coordinates'](../../../assets/camera_to_image_mapping.png)

## Derivation

We will refer to these screen coordinates as $l$, $r$, $t$, and $b$, which stand for left, right, top, and bottom, respectively.

### Projection of $x$

Now, we need to remap the left and right screen coordinates $(l, r)$ to $-1$ and $1$, and apply the same remapping to the top and bottom coordinates $(t, b)$. Assuming $x$ is any point within the range $[l ,r]$, we can state:

$$
\begin{aligned}
l \leq x \leq r
\end{aligned}
$$

$$
\begin{aligned}
0 \leq x - l \leq r - l
\end{aligned}
$$

$$
\begin{aligned}
0 \leq \frac{x - l}{r - l} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
0 \leq 2\frac{x - l}{r - l} \leq 2
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq 2\frac{x - l}{r - l} -1 \leq 1
\end{aligned}
$$

Now, the middle term falls within the range $[-1, 1]$, successfully remapping it. To further develop this formula:

$$
\begin{aligned}
-1 \leq \frac{2x - 2l - r + l}{r - l} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq \frac{2x - l - r}{r - l} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq \frac{2x}{r - l} - \frac{r + l}{r - l} \leq 1
\end{aligned}
$$

This yields the transformation formula for $x$:

$$
\begin{aligned}
x' = \frac{2x}{r - l} - \frac{r + l}{r - l}
\end{aligned}
$$

To represent this transformation in matrix form:

$$
\begin{aligned}
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & -\frac{r + l}{r - l} \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{pmatrix}
\end{aligned}
$$

So:

$$
\begin{aligned}
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & -\frac{r + l}{r - l} \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{pmatrix} \cdot
\begin{pmatrix}
x \\
y \\
z \\
1 \\
\end{pmatrix} =
\begin{pmatrix}
\frac{2x}{r - l} - \frac{r + l}{r - l} \\
y \\
z \\
1 \\
\end{pmatrix}
\end{aligned}
$$

### Projection of $y$

The process for the y-coordinate is the same. You just need to replace $r$ and $l$ with $t$ and $b$ (top and bottom).

$$
\begin{aligned}
b \leq y \leq t
\end{aligned}
$$

$$
\begin{aligned}
0 \leq y - b \leq t - b
\end{aligned}
$$

$$
\begin{aligned}
0 \leq \frac{y - b}{t - b} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
0 \leq 2\frac{y - b}{t - b} \leq 2
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq 2\frac{y - b}{t - b} - 1 \leq 1
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq \frac{2y - 2b - t + b}{t - b} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq \frac{2y - b - t}{t - b} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq \frac{2y}{t - b} - \frac{t + b}{t - b} \leq 1
\end{aligned}
$$

So the transformation formula for $y$ is as follows:

$$
\begin{aligned}
y' = \frac{2y}{t - b} - \frac{t + b}{t - b}
\end{aligned}
$$

Which yields the following transformation matrix:

$$
\begin{aligned}
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & -\frac{r + l}{r - l} \\
0 & \frac{2}{t - b} & 0 & -\frac{t + b}{t - b} \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{pmatrix}
\end{aligned}
$$

So:

$$
\begin{aligned}
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & -\frac{r + l}{r - l} \\
0 & \frac{2}{t - b} & 0 & -\frac{t + b}{t - b} \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{pmatrix} \cdot
\begin{pmatrix}
x \\
y \\
z \\
1 \\
\end{pmatrix} =
\begin{pmatrix}
\frac{2x}{r - l} - \frac{r + l}{r - l} \\
\frac{2y}{t - b} - \frac{t + b}{t - b} \\
z \\
1 \\
\end{pmatrix}
\end{aligned}
$$

### Projection of $z$

And finally, to complete our orthographic projection matrix, we need to remap the z-coordinates from $-1$ to $1$. We start with the following condition:

$$
\begin{aligned}
n \leq -z \leq f
\end{aligned}
$$

Don't forget that the $z$-coordinates of all points visible to the camera are negative, which is why we use $-z$ instead of $z$.

$$
\begin{aligned}
0 \leq -z - n\leq f - n
\end{aligned}
$$

$$
\begin{aligned}
0 \leq \frac{-z - n}{f - n} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
0 \leq 2\frac{-z - n}{f - n} \leq 2
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq 2\frac{-z - n}{f - n} - 1 \leq 1
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq \frac{-2z - 2n -f + n}{f - n} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq \frac{-2z - n - f}{f - n} \leq 1
\end{aligned}
$$

$$
\begin{aligned}
-1 \leq \frac{-2z}{f - n} - \frac{n + f}{n - f}{f - n} \leq 1
\end{aligned}
$$

Now we add this to the matrix:

$$
\begin{aligned}
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & -\frac{r + l}{r - l} \\
0 & \frac{2}{t - b} & 0 & -\frac{t + b}{t - b} \\
0 & 0 & -\frac{2}{f - n} & -\frac{n + f}{n - f} \\
0 & 0 & 0 & 1 \\
\end{pmatrix}
\end{aligned}
$$

So:

$$
\begin{aligned}
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & -\frac{r + l}{r - l} \\
0 & \frac{2}{t - b} & 0 & -\frac{t + b}{t - b} \\
0 & 0 & -\frac{2}{f - n} & -\frac{n + f}{n - f} \\
0 & 0 & 0 & 1 \\
\end{pmatrix} \cdot
\begin{pmatrix}
x \\
y \\
z \\
1 \\
\end{pmatrix} =
\begin{pmatrix}
\frac{2x}{r - l} - \frac{r + l}{r - l} \\
\frac{2y}{t - b} - \frac{t + b}{t - b} \\
\frac{-2z}{f - n} - \frac{f + n}{f - n} \\
1 \\
\end{pmatrix}
\end{aligned}
$$

## Note

This section is kinda important, up until now we have define this projection matrix on what we call [row-major order](https://en.mdpedia.org/wiki/Row-_and_column-major_order). However, WebGL expects us to use matrices defined on [column-major order](https://en.mdpedia.org/wiki/Row-_and_column-major_order). See [Transposing Transformation or Projection Matrices](../../01_transformations#transposing-transformation-or-projection-matrices) on how to correctly defined these matrices.

## References

1. [Orthographic Matrix](https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/orthographic-projection-matrix.html)
