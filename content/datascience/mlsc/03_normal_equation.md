---
title: Ecuación Normal
weight: 3
type: docs
math: true
---

## Descripción de los datos

- $X = (x_{ij})$ una matriz $m \times (n + 1)$ donde cada $X_{i}$ es un vector fila $1 \times (n+1)$, que incluye los valores de todas las características para el ejemplo $i$.
  $$
  \begin{aligned}
  X =
  \begin{bmatrix}
  X_1 \\
  \vdots \\
  X_i \\
  \vdots \\
  X_m \\
  \end{bmatrix}
  \end{aligned}
  $$

Cabe destacar que $X_{i0} = 1$, es el término independiente.

- $\Theta = (\theta_i)$ es un vector columna $(n+1)\times 1$ donde cada $\theta_i$ es el peso de la característica $i$, tal que:

$$
\begin{aligned}
\Theta = \begin{bmatrix} \theta_0 \\ \vdots \\ \theta_n\end{bmatrix}
\end{aligned}
$$

- $Y = (y_j)$ es un vector columna $m\times 1$ donde cada $y_j$ es la salida real para el ejemplo $j$, tal que:

$$
\begin{aligned}
Y = \begin{bmatrix} y_1 \\ \cdots \\ y_m\end{bmatrix}
\end{aligned}
$$

## Hipótesis

- Dado un conjunto de $m$ datos, es decir matriz $X$, de dimensiones $m \times (n+1)$, la hipótesis se define como:

$$
\begin{aligned}
h_\Theta(x) = X \cdot \Theta =
\begin{bmatrix}
X_1 \cdot \Theta = \sum_{i=0}^{n+1} \theta_i x_{1i} \\
\vdots \\
X_j \cdot \Theta = \sum_{i=0}^{n+1} \theta_i x_{ji} \\
\vdots \\
X_m \cdot \Theta = \sum_{i=0}^{n+1} \theta_i x_{mi} \\
\end{bmatrix}
\end{aligned}
$$

Observa que ahora $X$ y $\Theta$ están colocados de forma inversa a como lo hacíamos en la [regresión lineal](../01_linear_regression) y la [regresión logística](../02_logistic_regression). Esto es debido a que hemos transpuesto las matrices $X$ y $\Theta$, con respecto a como las habíamos definido en las secciones anteriores. El cálculo es el mismo.

## Funcion de coste

Se define la función de coste, $J(\Theta)$ como:

$$
\begin{aligned}
J(\Theta) = \frac{1}{2m} (X\Theta - Y)^T(X\Theta - Y)
\end{aligned}
$$

La expresión $(X\Theta - Y)^T(X\Theta - Y)$ es equivalente a $(h_\Theta(x) - y)^2$, que se utilizaba en la función de coste de la [regresión lineal](../01_linear_regression).

#### Regularización

Con regularización, se define la función de coste, $J(\Theta)$ como:

$$
\begin{aligned}
J(\Theta) = \frac{1}{2m} (X\Theta - Y)^T(X\Theta - Y) + \frac{1}{2m} \lambda \Theta^T\Theta
\end{aligned}
$$

## Minimización del coste

Con la ecuación normal, en lugar de actualizar el vector de pesos $\Theta$ de forma iterativa, lo que hacemos es igualar la derivada del coste en base a los pesos a cero utilizando derivación matricial:

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =
\begin{bmatrix}
\frac{\delta J(\Theta)}{\delta \theta_0} \\
\vdots \\
\frac{\delta J(\Theta)}{\delta \theta_i} \\
\vdots \\
\frac{\delta J(\Theta)}{\delta \theta_n} \\
\end{bmatrix} = \begin{bmatrix}
0 \\
\vdots \\
0 \\
\vdots \\
0 \\
\end{bmatrix} = \overrightarrow{0}
\end{aligned}
$$

A continuación exponemos cómo se calcula la derivada:

Sustituímos la función de coste:

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \Delta_\Theta \frac{1}{2m}(X \Theta - Y)^T (X \Theta - Y)
\end{aligned}
$$

Aplicamos la propiedad $(A + B)^T = A^T + B^T$

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \Delta_\Theta \frac{1}{2m}((X\Theta)^T - Y^T) (X \Theta - Y)
\end{aligned}
$$

Sacamos el factor constante de la derivada y realizamos la multiplicación:

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \frac{1}{2m} \Delta_\Theta (X\Theta)^T(X\Theta) - (X\Theta)^TY -Y^TX\Theta + Y^TY
\end{aligned}
$$

Aplicamos la propiedad $AB = B^TA^T$, tal que $Y^T(X\Theta) = (X\Theta)^T((Y)^T)^T = (X\Theta)^TY$

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \frac{1}{2m} \Delta_\Theta (X\Theta)^T(X\Theta) - (X\Theta)^TY - (X\Theta)^TY + Y^TY
\end{aligned}
$$

Agrupamos términos compatibles:

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \frac{1}{2m} \Delta_\Theta (X\Theta)^T(X\Theta) - 2(X\Theta)^TY + Y^TY
\end{aligned}
$$

Como $\Delta_\Theta Y^TY=0$:

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \frac{1}{2m} \Delta_\Theta (X\Theta)^T(X\Theta) - 2(X\Theta)^TY
\end{aligned}
$$

Finalmente calculamos la derivada matricial:

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \frac{1}{2m} 2X^T(X\Theta) - 2X^TY = \frac{1}{m} X^T(X\Theta) - X^TY
\end{aligned}
$$

Ahora igualamos la expresión obtenida a cero:

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \frac{1}{m} [X^TX\Theta - X^TY] = 0
\end{aligned}
$$

Multiplicamos por $m$ en ambos lados de la ecuación:

$$
\begin{aligned}
X^TX\Theta - X^TY = 0
\end{aligned}
$$

Sumamos $X^TY$ en ambos lados de la ecuación:

$$
\begin{aligned}
X^TX\Theta - X^TY + X^TY= X^TY
\end{aligned}
$$

$$
\begin{aligned}
X^TX\Theta = X^TY
\end{aligned}
$$

Multiplicamos por $(X^TX)^{-1}$ por la izquierda en ambos lados de la ecuación:

$$
\begin{aligned}
(X^TX)^{-1}X^TX\Theta = (X^TX)^{-1}X^TY
\end{aligned}
$$

$$
\begin{aligned}
I\Theta = (X^TX)^{-1}X^TY
\end{aligned}
$$

$$
\begin{aligned}
\Theta = (X^TX)^{-1}X^TY
\end{aligned}
$$

De tal manera que ahora hemos calculado el vector de pesos óptimo que minimiza el coste.

#### Regularización

Con regularización debemos derivar la función que coste que incluye el parámetro de regularización:

$$
\begin{aligned}
J(\Theta) = \frac{1}{2m} (X\Theta - Y)^T(X\Theta - Y) + \frac{1}{2m} \lambda \Theta^T\Theta
\end{aligned}
$$

El primer término ya lo hemos derivado, por lo tanto procedemos a derivar el segundo término:

$$
\begin{aligned}
\Delta_\Theta \frac{1}{2m} \lambda \Theta^T\Theta
\end{aligned}
$$

Sacamos el factor constante $\frac{\lambda}{2m}$ fuera de la derivada

$$
\begin{aligned}
\frac{\lambda}{2m} \Delta_\Theta [\Theta^T\Theta]
\end{aligned}
$$

Llevamos a cabo la derivada matricial:

$$
\begin{aligned}
\frac{\lambda}{2m} 2 \Theta = \frac{\lambda}{m} \Theta
\end{aligned}
$$

Juntamos las derivadas de ambos términos:

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \frac{1}{m} [X^TX\Theta - X^TY] + \frac{\lambda}{m} \Theta
\end{aligned}
$$

Sacamos $\frac{1}{m}$ como factor común e igualamos a cero

$$
\begin{aligned}
\Delta_\Theta J(\Theta) =  \frac{1}{m} (X^TX\Theta - X^TY + \lambda\Theta) = 0
\end{aligned}
$$

Multiplicamos por $m$ en ambos lados de la ecuación:

$$
\begin{aligned}
X^TX\Theta - X^TY + \lambda\Theta = 0
\end{aligned}
$$

Sumamos $X^TY$ en ambos lados de la ecuación:

$$
\begin{aligned}
X^TX\Theta - X^TY + X^TY + \lambda\Theta = X^TY
\end{aligned}
$$

$$
\begin{aligned}
X^TX\Theta + \lambda\Theta = X^TY
\end{aligned}
$$

Sacamos $\Theta$ como factor común

$$
\begin{aligned}
(X^TX + \lambda I)\Theta = X^TY
\end{aligned}
$$

Donde $I$ es la matriz identidad e dimensiones $(n+1) \times (n+1)$. Multiplicamos $(X^TX + \lambda I)^{-1}$ por la izquierda en ambos lados de la ecuación:

$$
\begin{aligned}
(X^TX + \lambda I)^{-1}(X^TX + \lambda I)\Theta = (X^TX + \lambda I)^{-1}X^TY
\end{aligned}
$$

$$
\begin{aligned}
I\Theta = (X^TX + \lambda I)^{-1}X^TY
\end{aligned}
$$

$$
\begin{aligned}
\Theta = (X^TX + \lambda I)^{-1}X^TY
\end{aligned}
$$

De tal forma que hemos calculado el $\Theta$ óptimo que minimiza el coste, utilizando regularización.

## Anotaciones

- No se debe utilizar la ecuación normal cuando el número de ejemplos $m$ es muy grande, ya que es rendimiento del algoritmo es malo
- Hay que tener cuidado con si las matrices son inversibles
- Si $m \leq n$, entonces las matrices no son invertibles.
- Si $\lambda > 0$, entonces aseguramos la inversibilidad de las matrices.
