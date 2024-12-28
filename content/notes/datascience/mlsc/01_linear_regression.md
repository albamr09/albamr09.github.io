---
title: Regresión Lineal
weight: 1
type: docs
math: true
---

## Descripción de los datos

- $X = (x_{ij})$ una matriz $n \times m$ donde cada $x_{ij}$ es la característica $i$ del ejemplo $j$, tal que
  $$
  \begin{aligned}
  X =
  \begin{bmatrix}
  x_{11} & \cdots & x_{1m} \\
  \cdots & \ddots & \cdots \\
  x_{n1} & \cdots & x_{nm} \\
  \end{bmatrix}
  \end{aligned}
  $$

Cada columna es un ejemplo

En cada fila están los valores de una característica

- $\Theta = (\theta_i)$ es un vector fila $1\times n$ donde cada $\theta_i$ es el peso de la característica $i$, tal que:

$$
\begin{aligned}
\Theta = \begin{bmatrix} \theta_1 & \cdots & \theta_n\end{bmatrix}
\end{aligned}
$$

- $Y = (y_j)$ es un vector fila $1\times m$ donde cada $y_j$ es la salida real para el ejemplo $j$, tal que:

$$
\begin{aligned}
Y = \begin{bmatrix} y_1 & \cdots & y_m\end{bmatrix}
\end{aligned}
$$

## Hipótesis

- Dado un ejemplo, es decir un vector columna $x$, de dimensiones $n \times 1$, la hipótesis se define como:

$$
\begin{aligned}
h_\Theta(x) = \sum_{i=1}^n \theta_i \cdot x_i
\end{aligned}
$$

- Dado un conjunto de $m$ datos, es decir matriz $X$, de dimensiones $n \times m$, la hipótesis se define como:

$$
\begin{aligned}
h_\Theta(x) = \Theta\cdot X = \begin{bmatrix}\sum_{i=1}^n \theta_i \cdot x_{i1} & \cdots & \sum_{i=1}^n \theta_i \cdot x_{im}\end{bmatrix}
\end{aligned}
$$

El resultado es un vector fila $1 \times m$, es decir como el vector de salidas $Y$

## Funcion de coste

Se define la función de coste, $J(\Theta)$ como:

$$
\begin{aligned}
J(\Theta) = \frac{1}{2m}\sum_{j=1}^m (h_\Theta(x_j) - y_j)^2
\end{aligned}
$$

Esta función de coste se denomina **Mínimos cuadrados**.

#### Regularización

Con regularización, se define la función de coste, $J(\Theta)$ como:

$$
\begin{aligned}
J(\Theta) = \frac{1}{2m}\sum_{j=1}^m (h_\Theta(x_j) - y_j)^2 + \frac{1}{2m} \lambda \sum_{i=1}^n \theta_i^2
\end{aligned}
$$

## Descenso gradiente

Para actualizar el vector de pesos $\Theta$ aplicamos el descenso gradiente. Para cada peso $\theta_i$:

$$
\begin{aligned}
\theta_i = \theta_i - \alpha \left( \frac{\delta J(\Theta)}{\delta \theta_i}\right)
\end{aligned}
$$

La derivada del coste en función del peso $\theta_i$ se calcula como sigue:

_Sustituimos la función de coste_

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = \frac{\delta}{\delta \theta_i} \left(\frac{1}{2m}\sum_{j=1}^m (h_\Theta(x_j) - y_j)^2\right) =
\end{aligned}
$$

_Sacamos el factor constante de la derivada_

$$
\begin{aligned}
 = \frac{1}{2m} \frac{\delta}{\delta \theta_i} \left(\sum_{j=1}^m (h_\Theta(x_j) - y_j)^2\right)
\end{aligned}
$$

_Aplicamos la propiedad que dice que la derivada de una suma equivale a la suma de las derivadas_

$$
\begin{aligned}
 = \frac{1}{2m} \left(\sum_{j=1}^m \frac{\delta}{\delta \theta_i}(h_\Theta(x_j) - y_j)^2\right)
\end{aligned}
$$

_Aplicamos la regla de la cadena_

$$
\begin{aligned}
 = \frac{1}{2m} \left(\sum_{j=1}^m \frac{\delta(h_\Theta(x_j) - y_j)^2}{\delta (h_\Theta(x_j) - y_j)} \frac{\delta (h_\Theta(x_j) - y_j)}{\delta \theta_i}\right)
\end{aligned}
$$

_Aplicamos aritmética_

$$
\begin{aligned}
 = \frac{1}{2m} \left(\sum_{j=1}^m 2(h_\Theta(x_j) - y_j) \left[\frac{\delta (h_\Theta(x_j))}{\delta \theta_i} - \frac{\delta (y_j)}{\delta \theta_i}\right]\right)
\end{aligned}
$$

Como la derivada de $y_i$ es función de $\theta_i$ es cero, procedemos a calcular la derivada de $h_\Theta(x_j)$:

$$
\begin{aligned}
\frac{\delta h_\Theta(x_j)}{\delta \theta_i} = \frac{\delta}{\delta \theta_i} \sum_{k=1}^n \theta_k x_{kj} = \sum_{k=1}^n \frac{\delta}{\delta \theta_i} \theta_k x_{kj}
\end{aligned}
$$

_Donde_

$$
\begin{aligned}
\frac{\delta}{\delta \theta_i} \theta_k x_{kj} =
\begin{cases}
x_{kj}, & k = i \\
0, & k \neq i \\
\end{cases}
\end{aligned}
$$

Como para todo $k$, con $1 \leq k \leq n$ sólo hay un $k$, tal que $k = i$, entonces:

$$
\begin{aligned}
\frac{\delta h_\Theta(x_j)}{\delta \theta_i} = x_{kj}
\end{aligned}
$$

Volemos a la derivada del peso, con $\frac{\delta h_\Theta(x_j)}{\delta \theta_i} = x_{kj}$ y $\frac{\delta y_j}{\delta \theta_i} = 0$:

$$
\begin{aligned}
 = \frac{1}{2m} \left(\sum_{j=1}^m 2(h_\Theta(x_j) - y_j) \left[x_{ij} - 0\right]\right)
\end{aligned}
$$

$$
\begin{aligned}
 = \frac{1}{2m} \left(\sum_{j=1}^m 2(h_\Theta(x_j) - y_j) \cdot x_{ij}\right)
\end{aligned}
$$

_Sacamos el factor constante 2 como factor común que se elimina con 1/2_

$$
\begin{aligned}
 = \frac{1}{m} \left(\sum_{j=1}^m (h_\Theta(x_j) - y_j) \cdot x_{ij}\right)
\end{aligned}
$$

Finalmente, sustituimos todo en la función del gradiente:

$$
\begin{aligned}
\theta_i = \theta_i - \alpha \left( \frac{\delta J(\Theta)}{\delta \theta_i}\right) = \theta_i - \alpha \left[\frac{1}{m} \left(\sum_{j=1}^m (h_\Theta(x_j) - y_j) \cdot x_{ij}\right)\right]
\end{aligned}
$$

#### Regularización

Con regularización debemos derivar la función que coste que incluye el parámetro de regularización:

$$
\begin{aligned}
\theta_i = \theta_i - \alpha \left( \frac{\delta J(\Theta)}{\delta \theta_i}\right) + \frac{\lambda}{2m} \sum_{k=1}^n \theta_k^2
\end{aligned}
$$

El primer término ya lo hemos derivado, por lo tanto procedemos a derivar el segundo término:

$$
\begin{aligned}
\frac{\delta}{\delta \theta_i} \left(\frac{\lambda}{2m} \sum_{k=1}^n \theta_k^2\right) = \frac{\lambda}{2m} \left(\sum_{k=1}^n \frac{\delta}{\delta \theta_i} \theta_k^2\right)
\end{aligned}
$$

Donde

$$
\begin{aligned}
\frac{\delta}{\delta \theta_i} \theta_k^2 =
\begin{cases}
2 \theta_k, & k = i \\
0, & k \neq i
\end{cases}
\end{aligned}
$$

Como para todo $k$, con $1 \leq k \leq n$ sólo hay un $k$, tal que $k = i$, entonces:

$$
\begin{aligned}
\frac{\delta}{\delta \theta_i} \left(\frac{\lambda}{2m} \sum_{k=1}^n \theta_k^2\right) = \frac{\lambda}{2m} 2\theta_i = \frac{\lambda}{m} \theta_i
\end{aligned}
$$

Por lo tanto la función del descenso gradiente equivale a:

$$
\begin{aligned}
\theta_i = \theta_i - \alpha \left( \frac{\delta J(\Theta)}{\delta \theta_i}\right) = \theta_i - \alpha \left[\frac{1}{m} \left(\sum_{j=1}^m (h_\Theta(x_j) - y_j) \cdot x_{ij}\right) + \frac{\lambda}{m}\theta_i\right]
\end{aligned}
$$
