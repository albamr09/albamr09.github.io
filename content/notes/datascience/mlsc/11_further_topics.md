---
title: Further Topics
weight: 11
type: docs
math: true
---

## Sistemas de Recomendación

### Content Based Recommendations

1. Cada ítem está definido por $n$ características.
2. Para cada usuario $j$, debemos obtener $\theta^{(j)} \in \mathbb{R}^{n+1}$, de tal manera que para predecir la valoración de $x^{(i)} \rightarrow h_\theta(x^{(i)}) = (\theta^{(j)})^T x^{(i)}$

#### Función de coste

Sea $m^{(j)}$ el número de ítems valorados por el usuario $j$, entonces la función de coste se define como:

$$
\begin{aligned}
J(\Theta) = \frac{1}{2m^{(j)}}\sum_{j=1}^{n_\mu} \sum_{i; r(i, j) = 1} ((\theta^{(j)})^T x^{(i)} - y^{(i, j)})^2 + \frac{\lambda}{2m^{(j)}} \sum_{k=1}^{n_\mu} \theta^{(j)}_k
\end{aligned}
$$

donde $\Theta = \{\theta_1, \cdots, \theta_{n_\mu}\}$

Es decir queremos minimizar la "distancia" entre lo predicho $(\theta^{(j)})^T x^{(i)}$ para el ítem (que ha sido valorado, por lo tanto $r(i, j) = 1$) y el usuario $i$ y la valoración real $y^{(i, j)}$.

#### Descenso Gradiente

Lo que queremos es minimizar el coste, por lo tanto, calculamos $\frac{\delta J(\Theta)}{\delta \theta_j}$ para obtener el vector en dirección al mayor incremento en la función, seguidamente, utilizar su opuesto, obtenemos el vector que apunta a la dirección de menor incremento. Es decir, aplicamos descenso gradiente como sigue:

Para $k = 0$:

$$
\begin{aligned}
\theta_k^{(j)} = \theta_k^{(j)} - \alpha \left(\sum_{i; r(i,j)=1} (\theta^{(j)})^Tx^{(i)} - y^{(i,j)}x^{(i)}_k \right)
\end{aligned}
$$

Para $k \neq 0$:

$$
\begin{aligned}
\theta_k^{(j)} = \theta_k^{(j)} - \alpha \left(\sum_{i; r(i,j)=1} (\theta^{(j)})^Tx^{(i)} - y^{(i,j)}x^{(i)}_k + \lambda \theta_k^{(j)} \right)
\end{aligned}
$$

### Collaborative Filtering

Collaborative filtering consiste en calcular las características de cada usuario (ejemplo $x^{(i)}$) en función de los pesos $\theta^{(j)}$. Una vez hecho esto se calculan los pesos óptimos que que minimizan la función de coste y volvemos a obtener las características de cada usuario en función de estes nuevos pesos.

Este proceso se describe más formalmente a continuación:

#### Problema de Optimización

El problema de optimización se describe como sigue:

Dados $\theta^{(1)}, \cdots, \theta^{n_\mu}$:

Para un ejemplo $x^{(i)}$

$$
\begin{aligned}
\underset{x^{(i)}}{\min{}} \frac{1}{2} \sum_{j:r(i,j)=1} ((\theta^{(j)})^Tx^{(i)} - y^{(i,j)})^2 + \frac{\lambda}{2} \sum_{k=1}^n (x_k^{(i)})^2
\end{aligned}
$$

Para todos los ejemplos del conjunto $x^{0}, \cdots, x^{(n_m)}$:

$$
\begin{aligned}
\underset{x^{(1)}, \cdots, x^{(n_m)}}{\min{}} \frac{1}{2} \sum_{i=1}^{n_m} \sum_{j:r(i,j)=1} ((\theta^{(j)})^Tx^{(i)} - y^{(i,j)})^2 + \frac{\lambda}{2} \sum_{i=1}^{n_m}\sum_{k=1}^n (x_k^{(i)})^2
\end{aligned}
$$

Es decir queremos minimizar la "distancia" entre lo predicho $(\theta^{(j)})^T x^{(i)}$ para el ítem (que ha sido valorado, por lo tanto $r(i, j) = 1$) y el usuario $i$ y la valoración real $y^{(i, j)}$. Además como queremos obtener los valores de $x$ que minimizan el coste, los añadimos como coste a problema de optimización para evitar overfitting.

#### Algoritmo

El algoritmo consta de los siguientes pasos:

1. Inicializar $x^{(1)}, \cdots, x^{(m)}$ y $\theta^{(1)}, \cdots, \theta^{(n_\mu)}$ de forma aleatoria.
2. Calcular $X$ a partir de $\Theta$
3. Calcular $\Theta$ a partir de $X$
4. Volvemos al paso 2.

Es decir, queremos obtener $X$ y $\Theta$ que optimice el siguiente problema:

$$
\begin{aligned}
\underset{x^{(1)}, \cdots, x^{(n_m)}, \theta^{(1)}, \cdots, \theta^{(n_\mu)}}{\min{}} \frac{1}{2} \sum_{i=1}^{n_m} \sum_{j:r(i,j)=1} ((\theta^{(j)})^Tx^{(i)} - y^{(i,j)})^2 + \frac{\lambda}{2} \sum_{i=1}^{n_m}\sum_{k=1}^n (x_k^{(i)})^2 + \frac{\lambda}{2} \sum_{i=1}^{n_\mu}\sum_{k=1}^n (\theta_k^{(i)})^2
\end{aligned}
$$

Observa que, como estamos optimizando tanto $\theta$ como $x$, entonces los añadimos como coste a la función de optimización para evitar overfitting:

- $\frac{\lambda}{2} \sum_{i=1}^{n_m}\sum_{k=1}^n (x_k^{(i)})^2$
- $\frac{\lambda}{2} \sum_{i=1}^{n_\mu}\sum_{k=1}^n (\theta_k^{(i)})^2$

Para aplicar la optimización utilizamos descenso gradiente: primero en función de $x$ y después en función de $\theta$:

$$
\begin{aligned}
x^{(i)}_k = x^{(i)}_k - \alpha \left( \sum_{j:r(i, j)=1} ((\theta^{(j)})^T x^{(i)} - y^{(i, j)}) \theta_k^{(j)} + \lambda x^{(i)}_k\right)
\end{aligned}
$$

$$
\begin{aligned}
\theta^{(j)}_k = \theta^{(j)}_k - \alpha \left( \sum_{i:r(i, j)=1} ((\theta^{(j)})^T x^{(i)} - y^{(i, j)}) x_k^{(i)} + \lambda \theta^{(j)}_k\right)
\end{aligned}
$$

#### Buscar ítems Relacionados

Si $||x^{(i)} - x^{(j)}$|| es un valor pequeño entonces los ítems $i$ y $j$ son similares.

## Grandes Datasets

### Stochastic Gradient Descent

El algoritmo de Stochastic Gradient Descent es el siguiente:

1. Reordenar aleatoriamente el conjunto de datos
2. Para cada ejemplo $i$ y cada característica $j$:

- $\theta_j = \theta_j - \alpha (h_\theta(x^{(i)}) - y^{(i)})x^{(i)}_j$
- Es decir, se ajusta $\theta$ para cada ejemplo, en lugar de hacer el cálculo sobre todo el conjunto de datos
- Cada iteración es más rápida
- No converge como Batch Gradient Descent, llega a una aproximación.

### Mini Batch Gradient Descent

Esta técnica lo que hace el utilizar $b$ ejemplos para calcular el gradiente:

1. Para cada $b$ ejemplos y cada característica $j$:

- $\theta_j = \theta_j - \alpha \frac{1}{b}(h_\theta(x^{(i)}) - y^{(i)})x^{(i)}_j$
- Permite vectorización

## Aprendizaje Online

### Ejemplo

**Aprender a buscar**. Supongamos que lo queremos aprender es aquellos resultados que le interesen más al usuario. Si tenemos los siguientes datos:

- $X$: características del producto
- $y$: si el usuario hace click

Entonces, lo que queremos aprender es $P(y= 1|x;\theta)$, tal que por ejemplo enseñemos los 10 productos cuya probabilidad es mayor.

## Map Reduce

Map Reduce nos permite paralelizar los algoritmos. Por ejemplo, supongamos que:

- Tenemos $m = 400$ datos
- Utilizamos Batch Gradient Descent para resolver el problema de optimización
- Tenemos un número de PC equivalente a 4
- Sea $i$ el índice de un PC
  - Este entrena sobre $x^{(i)}, \cdots, x^{(i+100)}$
  - Calculamos el coste parcial para este conjunto de datos como:
    - $temp_j^{(k)} = \sum_{i}^{i+100} (h_\theta(x^{(i)}) - y^{(i)})x^{(i)}_j$
- Ahora, combinamos todos los pesos y aplicamos descenso gradiente:
  - $\theta_j = \theta_j - \alpha \frac{1}{400} \left( \sum_{i}^k temp_j^{(i)}\right)$

Este tipo de técnicas se utilizan si los algoritmos de entrenamiento pueden ser utilizamos como la suma de funciones, tanto el coste como el gradiente. También es aplicable a PCs con múltiples cores.

## Datos Artificiales

Cómo podemos generar datos?

- Manualmente
- Modificando los datos de entrada (añadir ruido en sonido, distorsionar imagen, etc)

No obstante, debemos evitar añadir ruido aleatorio, ya que esto no ayuda a extraer características significativas del conjunto de datos.

Estos métodos se suelen utilizar si el modelos tiene un sesgo bajo y se produce underfitting, (por lo que hace falta añadir características).

## Ceiling Analysis

Supongamos que tenemos un pipeline que conforma todo nuestro sistema de aprendizaje automático y está formado por:

- Obtención de la imagen
- Detección de texto
- Segmentación de caracteres
- Reconocimiento de caracteres

Lo que hacemos es determinar una o varias métricas de evaluación, por ejemplo nosotros utilizaremos la precisión. Entonces, ahora creamos una tabla indicando el valor de métrica para cada parte del sistema así como para el sitema completo:

| Componente                   | Precisión |
| ---------------------------- | --------- |
| Detección del texto          | 82%       |
| Segmentación de caracteres   | 90%       |
| Reconocimiento de caracteres | 100%      |
| Total                        | 72%       |

A partir de esta tabla podemos comprobar que mejorar la Detección en el texto y la Segmentación de caracteres mejora el rendimiento del modelo.
