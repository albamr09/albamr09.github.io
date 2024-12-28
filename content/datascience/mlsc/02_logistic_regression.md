---
title: Regresión Logística
weight: 2
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

_Cada columna es un ejemplo_

_En cada fila están los valores de una característica_

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

Donde cada salida $y_j$, para un clasificador de dos clases sólo puede tener los valores $0$ o $1$.

## Hipótesis

- Para un valor $z$, la función sigmoide $g$ se define como:

$$
\begin{aligned}
g(z) = \frac{e^z}{(1+e^z)} = \frac{1}{(1 + e^{-z})}
\end{aligned}
$$

- Sea $g$ la función sigmoide. Dado un ejemplo, es decir un vector columna $x$, de dimensiones $n \times 1$, la hipótesis se define como:

$$
\begin{aligned}
h_\Theta(x) = g\left(\sum_{i=1}^n \theta_i \cdot x_i\right) =
\begin{cases}
0, & h_\Theta(x) < 0.5 \\
1, & h_\Theta(x) \geq 0.5 \\
\end{cases}
\end{aligned}
$$

- Dado un conjunto de $m$ datos, es decir matrix $X$, de dimensiones $n \times m$, la hipótesis se define como:

$$
\begin{aligned}
h_\Theta(x) = \Theta\cdot X = \begin{bmatrix}g(\sum_{i=1}^n \theta_i \cdot x_{i1}) & \cdots & g(\sum_{i=1}^n \theta_i \cdot x_{im})\end{bmatrix}
\end{aligned}
$$

El resultado es un vector fila $1 \times m$, es decir como el vector de salidas $Y$

## Funcion de coste

Se define la función de coste, $J(\Theta)$ como:

$$
\begin{aligned}
J(\Theta) = \frac{1}{m}\sum_{j=1}^m \text{coste}(h_\Theta(x_j))
\end{aligned}
$$

Donde $\text{coste}$ es una función definida como sigue:

$$
\begin{aligned}
\text{coste}(h_\Theta(x_j)) = [-y_j \log(h_\Theta(x_j))] - [(1-y_j)\log(1-h_\Theta(x_j))]
\end{aligned}
$$

#### Regularización

Con regularización, se define la función de coste, $J(\Theta)$ como:

$$
\begin{aligned}
J(\Theta) = -\frac{1}{m}\sum_{j=1}^m [y_j \log(h_\Theta(x_j))] + [(1-y_j)\log(1-h_\Theta(x_j))] + \frac{1}{2m} \lambda \sum_{i=1}^n \theta_i^2
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
\frac{\delta J(\Theta)}{\delta \theta_i} = \frac{\delta}{\delta \theta_i} \left(-\frac{1}{m}\sum_{j=1}^m [y_j \log(h_\Theta(x_j))] + [(1-y_j)\log(1-h_\Theta(x_j))]\right) =
\end{aligned}
$$

Sacamos el factor constante $\frac{1}{m}$ y aplicamos la propiedad "La derivada de una suma equivale a la suma de las derivadas", tal que:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m \frac{\delta}{\delta \theta_i} \left([y_j \log(h_\Theta(x_j))] + [(1-y_j)\log(1-h_\Theta(x_j))]\right) =
\end{aligned}
$$

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m  \left(\frac{\delta}{\delta \theta_i} [y_j \log(h_\Theta(x_j))]\right) + \left(\frac{\delta}{\delta \theta_i}[(1-y_j)\log(1-h_\Theta(x_j))]\right) =
\end{aligned}
$$

Sacamos los factores constantes $y_j$ y $1-y_j$ y aplicamos la regla de la cadena:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m  \left(y_j\frac{\delta\log(h_\Theta(x_j))}{\delta h_\Theta(x_j)} \frac{\delta h_\Theta(x_j)}{\delta \theta_i}\right) + \left((1-y_j)\frac{\delta\log(1-h_\Theta(x_j))}{\delta (1- h_\Theta(x_j))}\frac{\delta (1- h_\Theta(x_j))}{\delta \theta_i}\right) =
\end{aligned}
$$

Tenemos que, para el último término:

$$
\begin{aligned}
\frac{\delta (1- h_\Theta(x_j))}{\delta \theta_i} = \frac{\delta(1)}{\delta \theta_i} - \frac{\delta h_\Theta(x_j)}{\delta \theta_i} = - \frac{\delta h_\Theta(x_j)}{\delta \theta_i}
\end{aligned}
$$

Por lo tanto, si sustituimos:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m  \left(y_j\frac{\delta\log(h_\Theta(x_j))}{\delta h_\Theta(x_j)} \frac{\delta h_\Theta(x_j)}{\delta \theta_i}\right) + \left((1-y_j)\frac{\delta\log(1-h_\Theta(x_j))}{\delta (1- h_\Theta(x_j))}(-1)\frac{\delta h_\Theta(x_j)}{\delta \theta_i}\right) =
\end{aligned}
$$

Aplicamos la regla $\frac{\delta \log(x)}{\delta x} = \frac{1}{x}$, sacamos la expresión $\frac{\delta h_\Theta(x_j)}{\delta \theta_i}$ como factor común y hacemos negativo el segundo término:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m  \left(\frac{y_j}{h_\Theta(x_j)} \right) - \left(\frac{(1 - y_j)}{1-h_\Theta(x_j)}\right) \frac{\delta h_\Theta(x_j)}{\delta \theta_i} =
\end{aligned}
$$

Aplicamos operationes aritméticas:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m  \left(\frac{(y_j)(1-h_\Theta(x_j)) - (1-y_j)(h_\Theta(x_j))}{h_\Theta(x_j)(1-h_\Theta(x_j))} \right)\frac{\delta h_\Theta(x_j)}{\delta \theta_i} =
\end{aligned}
$$

Centrémonos ahora en $\frac{\delta h_\Theta(x_j)}{\delta \theta_i}$. Para calcular esta derivada, primero expresamos la hipótesis utilizando la función sigmoide:

$$
\begin{aligned}
\frac{\delta h_\Theta(x_j)}{\delta \theta_i} = \frac{\delta}{\delta \theta_i} g(\Theta x_j)
\end{aligned}
$$

Aplicamos la regla de la cadena

$$
\begin{aligned}
\frac{\delta h_\Theta(x_j)}{\delta \theta_i} = \frac{\delta g(\Theta x_j)}{\delta \Theta x_j} \frac{\delta \Theta x_j}{\delta \theta_i}
\end{aligned}
$$

Sabemos que la derivada del segundo término $\frac{\delta \Theta x_j}{\delta \theta_i}$ equivale a $x_{ij}$, por lo tanto, calcularemos sólo $\frac{\delta g(\Theta x_j)}{\delta \Theta x_j}$

Sea:

$$
\begin{aligned}
g(\Theta x_j) = \frac{1}{1 + e^{-\Theta x_j}} = (1 + e^{-\Theta x_j})^{-1}
\end{aligned}
$$

Aplicamos la regla de la cadena

$$
\begin{aligned}
\frac{\delta g(\Theta x_j)}{\delta \Theta x_j} = \frac{\delta(1 + e^{-\Theta x_j})^{-1}}{\delta(1+e^{-\Theta x_j})}\frac{\delta(1+e^{-\Theta x_j})}{\delta \Theta x_j}
\end{aligned}
$$

Resolvemos la primera derivada aplicando las propiedades de las derivadas sobre los polinomios y volvemos a aplicar la propiedad de que la derivada de una suma equivale a la suma de las derivadas en el segundo término:

$$
\begin{aligned}
\frac{\delta g(\Theta x_j)}{\delta \Theta x_j} = (-1)(1 + e^{-\Theta x_j})^{-2}\left[\frac{\delta (1)}{\delta \Theta x_j} + \frac{\delta e^{-\Theta x_j}}{\delta \Theta x_j} \right]
\end{aligned}
$$

Como $\frac{\delta (1)}{\delta \Theta x_j}$ equivale a cero:

$$
\begin{aligned}
\frac{\delta g(\Theta x_j)}{\delta \Theta x_j} = (-1)(1 + e^{-\Theta x_j})^{-2} \frac{\delta e^{-\Theta x_j}}{\delta \Theta x_j}
\end{aligned}
$$

Resolvemos la última derivada, sabiendo que $\frac{\delta e^x}{\delta x} = e^x$

$$
\begin{aligned}
\frac{\delta g(\Theta x_j)}{\delta \Theta x_j} = (-1)(1 + e^{-\Theta x_j})^{-2} (-1) e^{-\Theta x_j} = (1 + e^{-\Theta x_j})^{-2} e^{-\Theta x_j} = \frac{e^{-\Theta x_j}}{(1 + e^{-\Theta x_j})^2}
\end{aligned}
$$

Como $\frac{e^{-\Theta x_j}}{(1 + e^{-\Theta x_j})^2} = \left(\frac{1}{1+e^{-\Theta x_j}}\right)\left(1 - \frac{1}{1 + e^{-\Theta x_j}}\right)$, entonces:

$$
\begin{aligned}
\frac{\delta g(\Theta x_j)}{\delta \Theta x_j} = \frac{e^{-\Theta x_j}}{(1 + e^{-\Theta x_j})^2} = \left(\frac{1}{1+e^{-\Theta x_j}}\right)\left(1 - \frac{1}{1 + e^{-\Theta x_j}}\right) = h_\Theta(x_j) (1- h_\Theta(x_j))
\end{aligned}
$$

Ya que según la definición de la hipótesis $h_\Theta(x_j) = \frac{1}{1 + e^{-\Theta x_j}}$

Por lo tanto, juntado los resultados, tenemos que:

$$
\begin{aligned}
\frac{\delta h_\Theta(x_j)}{\delta \theta_i} = \frac{\delta g(\Theta x_j)}{\delta \Theta x_j} \frac{\delta \Theta x_j}{\delta \theta_i} = h_\Theta(x_j) (1- h_\Theta(x_j)) x_{ij}
\end{aligned}
$$

Volvemos, entonces, a la derivada de la función de coste y sustituimos $\frac{\delta h_\Theta(x_j)}{\delta \theta_i}$

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m  \left(\frac{(y_j)(1-h_\Theta(x_j)) - (1-y_j)(h_\Theta(x_j))}{h_\Theta(x_j)(1-h_\Theta(x_j))} \right) h_\Theta(x_j) (1- h_\Theta(x_j)) x_{ij} =
\end{aligned}
$$

Los términos $h_\Theta(x_j) (1- h_\Theta(x_j))$ se cancelan tal que:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m  \left((y_j)(1-h_\Theta(x_j)) - (1-y_j)(h_\Theta(x_j)) \right) x_{ij} =
\end{aligned}
$$

Aplicamos operaciones aritméticas:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m (y_j - y_jh_\Theta(x_j) - h_\Theta(x_j) + y_jh_\Theta(x_j)) x_{ij}
\end{aligned}
$$

El término $y_jh_\Theta(x_j)$ se cancela, tal que:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = -\frac{1}{m}\sum_{j=1}^m (y_j - h_\Theta(x_j)) x_{ij}
\end{aligned}
$$

Finalmente movemos el $(-1)$ dentro del sumatorio:

$$
\begin{aligned}
\frac{\delta J(\Theta)}{\delta \theta_i} = \frac{1}{m}\sum_{j=1}^m (h_\Theta(x_j)-y_j) x_{ij}
\end{aligned}
$$

Por lo tanto la función del descenso gradiente equivale a:

$$
\begin{aligned}
\theta_i = \theta_i - \alpha \left( \frac{\delta J(\Theta)}{\delta \theta_i}\right) = \theta_i - \alpha \left[\frac{1}{m} \left(\sum_{j=1}^m (h_\Theta(x_j) - y_j) \cdot x_{ij}\right) \right]
\end{aligned}
$$

**Observa que tiene la misma forma que para la regresión lineal, pero la hipótesis para la regresión logística está definida en términos de la función sigmoide**

#### Regularización

Con regularización debemos derivar la función de coste que incluye el parámetro de regularización:

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

**Al igual que antes, observa que tiene la misma forma que para la regresión lineal, pero la hipótesis para la regresión logística está definida en términos de la función sigmoide**
