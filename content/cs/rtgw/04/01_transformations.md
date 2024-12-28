---
title: Transformations
type: docs
weight: 1
math: true
prev: notes/cs/rtgw/03
next: notes/cs/rtgw/04/02_model_view
---

## Vertex Transformations

Each transformation is encoded by a $4$x$4$ matrix. We multiply vertices that have three components, $(x, y, z)$, by this $4$x$4$ matrix by adding a fourth component to each vertex called the Homogeneous coordinate.

[This](https://jsantell.com/model-view-projection) article has a great visualization for each space:

- World Space
- Camera Space
- Clip Space

### Homogeneous Coordinates

Until now, we only considered 3D vertices as a $(x,y,z)$ triplet. Let’s introduce $w$. Homogeneous coordinates make it possible to represent **affine transformations** (such as rotation, scaling, shear, and translation) and projective transformations as $4$x$4$ matrices.

In Homogeneous coordinates, vertices have four components: $x, y, z$, and $w$. The first three components are the **vertex coordinates** in **Euclidian Space**. The fourth is the **perspective component**. So $(x, y, z, w)$ take us to a new space: the **Projective Space**.

This will be more clear soon, but for now, just remember this:

If $w == 1$, then the vector $(x,y,z,1)$ is a position in space.
If $w == 0$, then the vector $(x,y,z,0)$ is a direction.

What difference does this make? Well, for a rotation, it doesn’t change anything. When you rotate a point or a direction, you get the same result. However, for a translation (when you move the point in a certain direction), things are different. What could mean “translate a direction”? Not much. Homogeneous coordinates allow us to use a single mathematical formula to deal with these two cases.

Homogeneous coordinates make it possible to solve a system of linear equations where each equation represents a line that is parallel with all the others in the system. Remember that in Euclidian Space, a system like that does not have solutions, because there are no intersections. However, in Projective Space, this system has a solution—the lines will intersect at infinity. This fact is represented by the perspective component having a value of $0$.

![Projective Space](../../assets/projection_space.png)

It's easy to convert from Homogeneous coordinates to non-Homogeneous, old-fashioned, Euclidean coordinates by dividing each coordinate by $w$:

$$
\begin{aligned}
h(x, y, z, w) = v(\frac{x}{w}, \frac{y}{w}, \frac{z}{w})
\end{aligned}
$$

Consequently, if you want to go from Euclidean to Projective space, you add the fourth component, $w$, and make it $1$:

$$
\begin{aligned}
v(x, y, z) = h(x, y, z, 1)
\end{aligned}
$$

In fact, this is what we've been doing throughout the first three chapters:

```javascript
#version 300 es

precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

in vec3 aVertexPosition;

void main(void) {
  gl_Position = uProjectionMatrix ** uModelViewMatrix ** vec4(aVertexPosition, 1.0);
}
```

There is one more thing to note about Homogeneous coordinates: while vertices have a Homogeneous coordinate, $w = 1$, vectors have a Homogeneous coordinate, $w = 0$. This is because in the Phong vertex shader, the line that processes the normals looks like this:

```javascript
vVertexNormal = vec3(uNormalMatrix * vec4(aVertexNormal, 0.0));
```

### Transformations

#### Translation Matrices

These are the most simple tranformation matrices to understand. A translation matrix look like this:

$$
\begin{aligned}
\begin{bmatrix}
1 & 0 & 0 & X \\
0 & 1 & 0 & Y \\
0 & 0 & 1 & Z \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
\end{aligned}
$$

where $X,Y,Z$ are the values that you want to add to your position.

So if we want to translate the vector $(10,10,10,1)$ of $10$ units in the X direction, we get:

$$
\begin{aligned}
\begin{bmatrix}
1 & 0 & 0 & 10 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
*
\begin{bmatrix}
10 \\
10 \\
10 \\
1 \\
\end{bmatrix} =
\begin{bmatrix}
1 ** 10 + 0 ** 10 + 0 ** 10 + 10 ** 1 \\
0 ** 10 + 1 ** 10 + 0 ** 10 + 0 ** 1 \\
0 ** 10 + 0 ** 10 + 1 ** 10 + 0 ** 1 \\
0 ** 10 + 0 ** 10 + 0 ** 10 + 1 ** 1 \\
\end{bmatrix} =
\begin{bmatrix}
20 \\
10 \\
10 \\
1 \\
\end{bmatrix}
\end{aligned}
$$

and we get a $(20,10,10,1)$ homogeneous vector! Remember, the $1$ means that it is a position, not a direction. So our transformation didn’t change the fact that we were dealing with a position, which is good.

#### Scaling matrices

Scaling matrices are quite easy too:

$$
\begin{aligned}
\begin{bmatrix}
x & 0 & 0 & 0 \\
0 & y & 0 & 0 \\
0 & 0 & z & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
\end{aligned}
$$

So if you want to scale a vector (position or direction, it doesn’t matter) by $2.0$ in all directions:

$$
\begin{aligned}
\begin{bmatrix}
2 & 0 & 0 & 0 \\
0 & 2 & 0 & 0 \\
0 & 0 & 2 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
*
\begin{bmatrix}
x \\
y \\
z \\
w \\
\end{bmatrix} =
\begin{bmatrix}
2 ** x + 0 ** y + 0 ** z + 0 ** w \\
0 ** x + 2 ** y + 0 ** z + 0 ** w \\
0 ** x + 0 ** y + 2 ** z + 0 ** w \\
0 ** x + 0 ** y + 0 ** z + 1 ** w \\
\end{bmatrix} =
\begin{bmatrix}
2x \\
2y \\
2z \\
w \\
\end{bmatrix}
\end{aligned}
$$

#### Rotation Matrices

[TBC](https://www.opengl-tutorial.org/intermediate-tutorials/tutorial-17-quaternions/)

#### Cumulating transformations

So now we know how to rotate, translate, and scale our vectors. It would be great to combine these transformations. This is done by multiplying the matrices together:

```javascript
TransformedVector =
  TranslationMatrix * (RotationMatrix * ScaleMatrix) * OriginalVector;
```

This actually performs the scaling FIRST, and THEN the rotation, and THEN the translation. This is how matrix multiplication works.

## Transposing Transformation or Projection Matrices

It can be confusing to determine whether you should transpose your matrix before passing it to the graphics pipeline. According to the WebGL specifications, matrices are conventionally written in column-major order. Row-major order is what is conventionally used on mathematics to define matrices, and throughout all this chapter we define the matrices on row-major order, therefore to avoid this before passing them to WebGL we need to transpose them, either we do it manually, or we can use:

```javascript
gl.uniformMatrix4fv(uModelViewMatrix, true, modelViewMatrix.toFloatArray());
```

Where the second argument determines whether we want to transpose the matrix or not.
