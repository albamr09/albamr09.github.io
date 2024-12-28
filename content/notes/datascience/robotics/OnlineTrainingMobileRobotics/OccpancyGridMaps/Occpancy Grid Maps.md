# Occupancy Grid Maps

## Introduction

Occupancy Grid Maps store information about the environment regarding which parts of the map are occupied and which are free.

### Features vs Volumetric Maps

* Feature Map representations store where on the environment certain points or landmarks lay that the systems uses in order to estimate where it is.

![Feature Map](assets/feature_map.png)

* Volumetric maps are most typically used to store free space.

![Volumetric Map](assets/volumetric_map.png)

## Description of the Mapping Task

The goal to obtain a map of a given environment is to compute the most likely map given the sensor data:

$$\begin{aligned}
m^* = \arg \max_m P(m|u_1,z_1, \cdots, u_t,z_t)
\end{aligned}$$

However, we will simplify this problem by assuming we already know the poses for certain, thus we swap the control commands $u_t$ for poses $x_t$:

$$\begin{aligned}
m^* = \arg \max_m P(m|x_1,z_1, \cdots, x_t,z_t)
\end{aligned}$$

## Grid Maps

Grid Maps discretize the environment by dividing it into a finite number of cells, which encode information about its occupation. That is, a cell is either free or occupied. 

Grids are rigid structures, where cells are distributed uniformly along the grid and represent a definite space. 

Generally we describe cells as pixels.

### Assumptions

* For each cell, the area corresponding to the cell are completely free or occupied.
* Every cell can be described with a binary random variable that models the occupancy:

![Binary Random Variable](assets/binary_random_variable_occupancy.png)

* The world is static.
* The cells are independent of each other. Which means: if I know the occupancy state of a given cell, it does not help me estimate the occupancy state of another.

### Occupancy Probability

As we have said, each cell is a binary random variable that models the occupancy, that is:

* If we are certain a cell $m_i$ is occupied: $p(m_i) = 1$
* If we are certain a cell $m_i$ is free: $p(m_i) = 0$
* If we have no knowledge about the cell $m_i$: $p(m_i) = 0.5$

#### Notation

The probability of a cell $m_i$ being occupied is expressed as follows:

$$\begin{aligned}
P(M_i = occ) = P_{occ}(M_i) = p(m_i)
\end{aligned}$$

The probability of it being free is given by:

$$\begin{aligned}
P(M_i = free) = P_{free}(M_i) = 1- P_{occ}(M_i) = p(\neg m_i)
\end{aligned}$$

Also, the shading in the map tells us how certain we are about $p(m_i)$, that is the more intense the shade the higher the probability.

### Joint Distribution

The map is described by a probability distribution defined as the joint belief of each cell in the map:

$$\begin{aligned}
p(m) = p(m_1, m_2, \cdots, m_N)
\end{aligned}$$

To simplify this distribution we exploit one of the assumptions made before, that said cells were independent of each other, thus:

$$\begin{aligned}
p(m) = \prod_i p(m_i)
\end{aligned}$$

### Estimating a Map from Data

Our goal is to estimate the map given the sensor data $z_{1:t}$ and the poses $x_{1:t}$, that is:

$$\begin{aligned}
p(m | z_{1:t}, x_{1:t}) = \prod_i p(m_i|z_{1:t}, x_{1:t})
\end{aligned}$$

In order to do this we use a variant of the Bayes Filter called Binary Bayes Filter that is optimized for binary random variables ($m_i$).

## Static State Binary Bayes Filter

So, for each cell in the environment $m_i$ we compute:

$$\begin{aligned}
p(m_i|z_{1:t}, x_{1:t})
\end{aligned}$$

We apply the Bayes rule to swap $m_i$ for $z_t$, therefore:

$$\begin{aligned}
p(m_i|z_{1:t}, x_{1:t}) = \frac{p(z_t|m_i, z_{1:t-1}, x_{1:t})p(m_i, z_{1:t-1}, x_{1:t})}{p(z_t | z_{1:t-1}, x_{1:t})}
\end{aligned}$$

We apply Markov's assumption and assume independence between $z_t$ and the previous observations $z_{1:t-1}$ and poses $x_{1:t-1}$, therefore:

$$\begin{aligned}
p(m_i|z_{1:t}, x_{1:t}) = \frac{p(z_t|m_i, x_t)p(m_i, z_{1:t-1}, x_{1:t})}{p(z_t | z_{1:t-1}, x_{1:t})}
\end{aligned}$$

We also make use of the Markov's assumption to discard future poses when we the most up to date observation is of $t-1$:

$$\begin{aligned}
p(m_i|z_{1:t}, x_{1:t}) = \frac{p(z_t|m_i, x_t)p(m_i, z_{1:t-1}, x_{1:t-1})}{p(z_t | z_{1:t-1}, x_{1:t})}
\end{aligned}$$

We apply Bayes rule again over $p(z_t|m_i, x_t)$ to swap $z_t$ and $m_i$ again:

$$\begin{aligned}
p(z_t|m_i, x_t) = \frac{p(m_i|z_t, x_t) p(z_t|x_t)}{p(m_i|x_t)}
\end{aligned}$$

We plug this into the previous expression:

$$\begin{aligned}
p(m_i|z_{1:t}, x_{1:t}) = \frac{p(m_i|z_t, x_t) p(z_t|x_t) p(m_i, z_{1:t-1}, x_{1:t-1})}{p(m_i|x_t) p(z_t | z_{1:t-1}, x_{1:t})}
\end{aligned}$$

We assume that $p(mi|x_t) \approx p(mi)$, because knowing for certain the current pose tells us nothing about the state of the cell:

$$\begin{aligned}
p(m_i|z_{1:t}, x_{1:t}) = \frac{p(m_i|z_t, x_t) p(z_t|x_t) p(m_i, z_{1:t-1}, x_{1:t-1})}{p(m_i) p(z_t | z_{1:t-1}, x_{1:t})}
\end{aligned}$$

We compute this same derivation for the complement of $m_i$:

$$\begin{aligned}
p(\neg m_i|z_{1:t}, x_{1:t}) = \frac{p(\neg m_i|z_t, x_t) p(z_t|x_t) p(\neg m_i, z_{1:t-1}, x_{1:t-1})}{p(\neg m_i) p(z_t | z_{1:t-1}, x_{1:t})}
\end{aligned}$$

What we are going to do is compute the ratio between these two expressions:

$$\begin{aligned}
\frac{p(m_i|z_{1:t}, x_{1:t})}{p(\neg m_i|z_{1:t}, x_{1:t})} = \frac{\frac{p(m_i|z_t, x_t) p(z_t|x_t) p(m_i, z_{1:t-1}, x_{1:t-1})}{p(m_i) p(z_t | z_{1:t-1}, x_{1:t})}}{\frac{p(\neg m_i|z_t, x_t) p(z_t|x_t) p(\neg m_i, z_{1:t-1}, x_{1:t-1})}{p(\neg m_i) p(z_t | z_{1:t-1}, x_{1:t})}}
\end{aligned}$$

Now, all of the terms that do not depend on $m_i$ can be discarded: $p(z_t|x_t)$ and $p(z_t | z_{1:t-1}, x_{1:t})$, then

$$\begin{aligned}
\frac{p(m_i|z_{1:t}, x_{1:t})}{p(\neg m_i|z_{1:t}, x_{1:t})} = \frac{\frac{p(m_i|z_t, x_t)p(m_i, z_{1:t-1}, x_{1:t-1})}{p(m_i)}}{\frac{p(\neg m_i|z_t, x_t) p(\neg m_i, z_{1:t-1}, x_{1:t-1})}{p(\neg m_i)}}
\end{aligned}$$

We reorganize the expression:

$$\begin{aligned}
\frac{p(m_i|z_{1:t}, x_{1:t})}{p(\neg m_i|z_{1:t}, x_{1:t})} = \frac{p(m_i|z_t, x_t)p(m_i, z_{1:t-1}, x_{1:t-1})p(\neg m_i)}{p(\neg m_i|z_t, x_t) p(\neg m_i, z_{1:t-1}, x_{1:t-1})p(m_i)}
\end{aligned}$$

$$\begin{aligned}
\frac{p(m_i|z_{1:t}, x_{1:t})}{p(\neg m_i|z_{1:t}, x_{1:t})} = \frac{p(m_i|z_t, x_t)}{p(\neg m_i|z_t, x_t)} \frac{p(m_i, z_{1:t-1}, x_{1:t-1})}{p(\neg m_i, z_{1:t-1}, x_{1:t-1})} \frac{p(\neg m_i)}{ p(m_i)}
\end{aligned}$$

We express $\neg m_i$ in terms of $m_i$:

$$\begin{aligned}
\frac{p(m_i|z_{1:t}, x_{1:t})}{1-p(m_i|z_{1:t}, x_{1:t})} = \frac{p(m_i|z_t, x_t)}{ 1- p(m_i|z_t, x_t)} \frac{p(m_i, z_{1:t-1}, x_{1:t-1})}{1-p(m_i, z_{1:t-1}, x_{1:t-1})} \frac{1-p(m_i)}{ p(m_i)}
\end{aligned}$$

Note that now we have three expressions:

1. The first one uses the observation $z_t$
2. The second one is a recursive term
3. The third one describes our prior knowledge about the state of the cell without any other information about the environment.

### Odds Ratio

What we do now is turn this ratio called odds ratio into the probability as follows:

$$\begin{aligned}
Odds(x) = \frac{p(x)}{1-p(x)}
\end{aligned}$$

We multiply by $1-p(x)$ in both sides.

$$\begin{aligned}
Odds(x)(1-p(x)) = p(x)
\end{aligned}$$

We expand the left hand side expression:

$$\begin{aligned}
Odds(x)-Odds(x)p(x) = p(x)
\end{aligned}$$

We add $Odds(x)p(x)$ to both sides:

$$\begin{aligned}
Odds(x) = p(x) + Odds(x)p(x)
\end{aligned}$$

We extract $p(x)$ as a common factor on the right hand side:

$$\begin{aligned}
Odds(x) = p(x) (1 + Odds(x))
\end{aligned}$$

We divide by $(1 + Odds(x))$ on both sides:

$$\begin{aligned}
\frac{Odds(x)}{(1 + Odds(x))} = p(x) 
\end{aligned}$$

And finally:

$$\begin{aligned}
p(x) = \frac{1}{\left(1 + \frac{1}{Odds(x)} \right)}
\end{aligned}$$

So by using:

$$\begin{aligned}
p(x) = [1 + Odds(x)^{-1}]^{-1}
\end{aligned}$$

in our update rule:

$$\begin{aligned}
p(m_i | z_{1:t}, x_{1:t}) = \left[1 + (\frac{p(m_i|z_{1:t}, x_{1:t})}{1-p(m_i|z_{1:t}, x_{1:t})})^{-1}\right]^{-1}
\end{aligned}$$

$$\begin{aligned}
p(m_i | z_{1:t}, x_{1:t}) = \left[1 + \frac{1-p(m_i|z_{1:t}, x_{1:t})}{p(m_i|z_{1:t}, x_{1:t})}\right]^{-1}
\end{aligned}$$

Because:

$$\begin{aligned}
\frac{p(m_i|z_{1:t}, x_{1:t})}{1-p(m_i|z_{1:t}, x_{1:t})} = \frac{p(m_i|z_t, x_t)}{ 1- p(m_i|z_t, x_t)} \frac{p(m_i, z_{1:t-1}, x_{1:t-1})}{1-p(m_i, z_{1:t-1}, x_{1:t-1})} \frac{1-p(m_i)}{ p(m_i)}
\end{aligned}$$

The inverse equals:

$$\begin{aligned}
\frac{1-p(m_i|z_{1:t}, x_{1:t})}{p(m_i|z_{1:t}, x_{1:t})} = \frac{ 1- p(m_i|z_t, x_t)}{p(m_i|z_t, x_t)} \frac{1-p(m_i, z_{1:t-1}, x_{1:t-1})}{p(m_i, z_{1:t-1}, x_{1:t-1})} \frac{ p(m_i)}{1-p(m_i)}
\end{aligned}$$

Therefore:

$$\begin{aligned}
p(m_i | z_{1:t}, x_{1:t}) = \left[1 + \frac{ 1- p(m_i|z_t, x_t)}{p(m_i|z_t, x_t)} \frac{1-p(m_i, z_{1:t-1}, x_{1:t-1})}{p(m_i, z_{1:t-1}, x_{1:t-1})} \frac{ p(m_i)}{1-p(m_i)}\right]^{-1}
\end{aligned}$$

Which means, we can obtain information about the state of the $m_i$ grid cell given the observation and the positions.  

#### Log Odds Notation

To make the computation more efficient we are going to take the log of this expression. The notation will be the following:

$$\begin{aligned}
l(m_i | z_{1:t}, x_{1:t}) = \log \left(\frac{1-p(m_i|z_{1:t}, x_{1:t})}{p(m_i|z_{1:t}, x_{1:t})}\right)
\end{aligned}$$

Note that we can map from the log space to the probability space and vice versa as follows:

$$\begin{aligned}
l(x) = \log \frac{p(x)}{1-p(x)}
\end{aligned}$$

$$\begin{aligned}
p(x) = 1- \frac{1}{1 + \exp(l(x))}
\end{aligned}$$

Given this facts, we can turn the aforementioned product into a sum, because the log of the product of two terms equal the sum of the log of each term.

$$\begin{aligned}
l(m_i|z_{1:t}, x_{1:t}) = l(m_i|z_t,x_t) + l(m_i|z_{1:t-1}, x_{1:t-1}) - l(m_i)
\end{aligned}$$

Where:

1. $l(m_i|z_t,x_t)$ is the inverse sensor model, which contains information about what we sensed.
2. $l(m_i|z_{1:t-1}, x_{1:t-1})$ is the recursive term, that is the state of cell on the previous iteration.
3. $l(m_i)$ is the prior.

In short:

$$\begin{aligned}
l_{t,i} = inv\_sensor\_model(m_i, x_t, z_t) + l_{t-1, i} - l_0
\end{aligned}$$

## Algorithm

As we can see in the algorithm what we do is, given an observation $z_t$ we go through each cell, and if the cell is close to the area where the observation took place then we update the state of the cell taking into account the sensor information. Else we just propagate the previous state into the current state:

![Occupancy Grid Cells Algorithm](assets/occupancy_grid_cells_algorithm.png)

## Inverse Sensor Model for Laser Range Finders

On the following graph we show the way we update the occupancy probability of the cells. Here, the x axis represent several cells and the y axis represents the occupancy probability.

![Sendor Information using a Laser Sensor](assets/laser_sensor.png)

At cell $n$ our scanner detects an obstacle at time $t$, this corresponds to the observation $z_{t,n}$. Therefore:

* The probability of cells prior to cell $n$ of being occupied is low, because we were able to shot a laser through them without encountering no obstacle
* The probability of the n-th cell of being occupied is high, because it is the place where we found the obstacle.
* The probability of cells after $n$ of bain occupied is unknown because we cannot see after the laser.

A similar idea could be applied to Sonar Range Sensor, which measure an area instead of a line:

![Sonar Sensor](assets/sonar_sensor.png)

However the graph is a bit different, we now take into account that the sensor might not be completely reliable, therefore when the sonar detects an obstacle at a given distance we spread the probability of being occupied over adjacent cells/distances.

![Sonar Sensor Probability](assets/sonar_sensor_probability.png)

## Example

The idea is to add sensor information to a current "map" to increase the certainty of the state of each cell:

![Map Example](assets/map_exmaple.png)
