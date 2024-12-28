---
title: Histogram Localization
weight: 1
type: docs
math: true
---

## Probability given by Belief

Suppose every place in the world is modeled after an uniform probability distribution, then every cell the robot has the same probability.

## Probability after Sense

Now suppose the robot is able to sense a color, and each cell has a different color assigned.

Let's assume the robot senses the color red, then the cells with this color assigned should have a higher probability. Therefore we define two values, a hit value and a miss value.

If the cell is red, then we multiply its probability by the hit value.
If the cell is not red, then we multiply its probability by the miss value.

Note that the hit value is a big value, and the miss value is lower. Thus the probability for miss cells is lower than the probability for hit cells.
Also, observe that a measurement refers to what the robot senses, that is, a green cell or a red cell.

### Normalize the distribution

Now that we have altered the values of the probability distribution, it is likely that they do not sum up to one, which is a requirement to every probability function. Therefore we need to normalize it.

So what we would do is:

1. Compute the probabilities after the robot "senses" a measurement
2. Normalize these probabilities by dividing each probability by the total sum of all probabilities

## Exact Motion

Suppose we have a world made up of a grid with 5 cells with the following probabilities:

[$\frac{1}{3}$][$\frac{1}{3}$][$\frac{1}{9}$][$\frac{1}{9}$][$\frac{1}{3}$]

We also know that with 100% probability the world moves to the right.

### Theorem of Total Probability

To compute the probability of each cell after the movement, we use the law of total probability that states:

Given events A and $B = \{B_1, \cdots, B_n\}$ events in a sample space where $B$ is pairwise disjoint, then:

$$
\begin{aligned}
P(A) = \sum_n P(A \cap B_n)
\end{aligned}
$$

Then, by the conditional probability formula:

$$
\begin{aligned}
P(A) = \sum_n P(A|B_n)P(B_n)
\end{aligned}
$$

So to apply this theorem what we do is sum the probabilities of ending up in cell $j$ when we come from cell $i$, which is expressed symbolically:

$$
\begin{aligned}
P(X_{j}) = \sum_{i=1}^5 P(X_{j}|X_{i}) \cdot P(X_{i}) = 1 \cdot P({X_j}_{\{j=(i+1)\}})
\end{aligned}
$$

Because we know:

$$
\begin{aligned}
P(X_j|X_i) =
\begin{cases}
1, & j = i + 1 \\
0, & \text{ in any other case}
\end{cases}
\end{aligned}
$$

## Inexact Motion

However what if $P(X_j|X_i) < 1$? Suppose:

- $P(X_{i+2}|X_i) = 0.8$: the robot moved 2 positions/units with $0.8$ probability
- $P(X_{i+1}|X_i) = 0.1$: the robot moved 1 positions/units with $0.1$ probability
- $P(X_{i+3}|X_i) = 0.1$: the robot moved 3 positions/units with $0.1$ probability

Then for each $i$:

$$
\begin{aligned}
P(X_{j}) = \sum_{i=1}^5 P(X_{j}|X_{i}) \cdot P(X_{i})
\end{aligned}
$$

Where:

$$
\begin{aligned}
P(X_{j}|X_{i}) =
\begin{cases}
0.8, & j = i + 2 \\
0.1, & j = i + 1 \\
0.1, & j = i + 3 \\
0, & \text{ otherwhise }
\end{cases}
\end{aligned}
$$

### Entropy

The entropy will decrease after the measurement update (sense) step, and the entropy will increase after the movement step (move).

In general, entropy represents the amount of uncertainty in a system. Since the measurement update step decreases uncertainty, entropy will decrease. The movement step increases uncertainty, so entropy will increase after this step.

The entropy formula for our case is the following:

$$
\begin{aligned}
Entropy = \sum_{i=1}^5(-p(x_i) \cdot \log(p(x_i)))
\end{aligned}
$$

## Bayes Rule

Suppose:

1. $X$ represents the grid cell
2. $Z$ represents the measurements

Then the Bayes rule states:

$$
\begin{aligned}
P(X_i|Z) = \frac{P(Z|X_i)P(X_i)}{P(Z)}
\end{aligned}
$$

Where:

- $P(X_i|Z)$ is called the posterior
- $P(Z|X_i)$ is called the likelihood
- $P(Z)$ is known as the evidence or marginal likelihood (that is, it marginalizes $Z$). To compute $P(Z)$ we use the theorem of total probability:

$$
\begin{aligned}
P(Z) = \sum_{i=1}^n P(Z|X_i)P(X_i)
\end{aligned}
$$

So, to compute $P(X_i|Z)$ we follow the steps:

1. For each $X_i$ compute the non-normalized posterior: $\hat{P}(X_i|Z) = P(Z|X_i)P(X_i)$
2. Sum all non-normalized posteriors to obtain the evidence: $P(Z) = \sum_{i=1}^n \hat{P}(X_i|Z)$
3. For each $X_i$ normalize the posterior with the evidence: $P(X_i|Z) = \frac{\hat{P}(X_i|Z)}{P(Z)}$

## Motion using Total Probability

Let's say we are at time $t$, and $i$ determines the cell, then the motion is expressed probabilistically as follows:

$$
\begin{aligned}
P(X_i^t) = \sum_{j} P(X_i|X_j)P(X_j^{t-1})
\end{aligned}
$$

If we break down this formula:

- $P(X_i|X_j)$ is the probability that we end up in the cell $X_i$ given we come from the cell $X_j$
- $P(X_j^{t-1})$ is the probability of being in cell $X_j$ at the previous time
- $P(X_i^t)$ is the probability of being in cell $X_i$ at time $t$

## Summary

### Belief

Represents where are possible places the robot might be, that is each cell has an associated probability value

### Sense

Also known as the measurement update function.

For each cell we compute the probability that the robot is in that cell, given a measurement sensed by the robot in the moment $t$ ($P(X_k|Z)$, where $X_k$ is the cell and $Z$ is the measurement).

Therefore, for each cell in the world we multiply the previous probability value (given by belief) and the probability that the robot moved to the given cell. For example,
To satisfy the probability function properties, we need to normalize it, so it sums up to one.

### Move

It is a convolution, for each possible location, after the motion, we reverse engineered the situation and guessed where the world might have come from.

So what we do is we compute the probability of each cell using the Total Probability Theorem, so given a cell $X_k$, we compute:

$$
\begin{aligned}
P(X_k) = \sum_{l}P(X_k|X_l)P(X_l)
\end{aligned}
$$

Where $P(X_k|X_l)$ is the probabily that the robot moved to cell $X_k$ from cell $X_l$.

Usually what we do is stablish a motion using a vector (i.e. $(0,1) \in \mathbb{R}^2$ to indicate the robot moved one unit up in the two dimensional vector space).

For example, this probability may refer to how likely it is that the robot moved to the exact cell, how likely it is that the robot moved to a cell "beyond" the goal or how likely it is that the robot moved to a cell that lies "before" the goal.

So if we have these three probabilities, for each cell we sum the probabilities of the robot being in that cell taking into account the three scenarions:

- If the robot moved to cell $X_k$ from cell $X_l$, and that cell was the goal, then it moved to that cell with probability $P_{exact}$
- And maybe the robot moved to cell $X_k$ from cell $X_i$, however the goal was $X_{k+1}$, then it moved to that cell with probability probability $P_{undershoot}$
- Maybe the robot moved to cell $X_k$ from cell $X_j$, however the goal was $X_{k-1}$, then it moved to that cell with probability probability $P_{overshoot}$

Suppose now that then only cells in the world are mentioned: $X_k, X_l, X_i, X_j$. Then for $X_k$ we update the belief as follows:

$$
\begin{aligned}
P(X_k) = P(X_l) ** P_{exact} + P(X_i) ** P_{undershoot} + P(X_j) * P_{overshoot}
\end{aligned}
$$

## Localization Algorithm

Next we lay out an example of the localization algorithm implemented in $\mathbb{R}^2$:

```python
# The function localize takes the following arguments:
#
# colors:
#        2D list, each entry either 'R' (for red cell) or 'G' (for green cell)
#
# measurements:
#        list of measurements taken by the robot, each entry either 'R' or 'G'
#
# motions:
#        list of actions taken by the robot, each entry of the form [dy,dx],
#        where dx refers to the change in the x-direction (positive meaning
#        movement to the right) and dy refers to the change in the y-direction
#        (positive meaning movement downward)
#        NOTE: the **first** coordinate is change in y; the **second** coordinate is
#              change in x
#
# sensor_right:
#        float between 0 and 1, giving the probability that any given
#        measurement is correct; the probability that the measurement is
#        incorrect is 1-sensor_right
#
# p_move:
#        float between 0 and 1, giving the probability that any given movement
#        command takes place; the probability that the movement command fails
#        (and the robot remains still) is 1-p_move; the robot will NOT overshoot
#        its destination in this exercise
#
# The function should RETURN (not just show or print) a 2D list (of the same
# dimensions as colors) that gives the probabilities that the robot occupies
# each cell in the world.
#
# Compute the probabilities by assuming the robot initially has a uniform
# probability of being in any cell.
#
# Also assume that at each step, the robot:
# 1) first makes a movement,
# 2) then takes a measurement.
#
# Motion:
#  [0,0] - stay
#  [0,1] - right
#  [0,-1] - left
#  [1,0] - down
#  [-1,0] - up

# Compute the probability of "hit" cell and the probability of a "miss" cell
#
#   :param float Z value sensed by the robot (i.e. 'R' or 'G')
#   :param float cell_measurement value in the cell (i.e. 'R' or 'G')
#   :param float sensor_right probability that what the robot sensed is correct
#
#   if the value sensed and the value in the cell are equal hit = 1 and miss = 0
#   :return [sensor_right, 0]
#   otherwhise
#   :return [0, (1-sensor_right)]

def probability_hit_miss(Z, cell_measurement, sensor_right):
    hit = (Z == cell_measurement)
    return [hit ** sensor_right, (1-hit) ** (1-sensor_right)]

# Compute the probability of a cell after the measurement of the robot
#
#   :param cell_prior probability stored in the cell before measurement
#   :param float Z value sensed by the robot (i.e. 'R' or 'G')
#   :param float cell_measurement value in the cell (i.e. 'R' or 'G')
#   :param float sensor_right probability that what the robot sensed is correct
#
#   if the value sensed and the value in the cell are equal hit = sensor_right, else miss = (1-sensor_right)
#   :return the probability before measurement multiplied by the probability that the measurement is correct for the
#   given cell

def probability_cell_given_measurement(cell_prior, Z, cell_measurement, sensor_right):
    [hit, miss] = probability_hit_miss(Z, cell_measurement, sensor_right)
    return cell_prior * (hit + miss)

# For each cell X_k compute the probability that the robot is in the cell X_k given a measurement Z
#
#   :param list world measurements in the world
#   :param list p current world probabilities
#   :param list Z current measurement of the robot
#   :param float sensor_right probability that the robot's measurement is correct
#
#   For each cell X_k, where k is the cell [i][j]:
#       Compute unnormalized P(X_k|Z) = P(Z|X_k) * P(X_k)
#       Where P(X_k) = p[i][k] and
#       P(Z|X_k) is computed in probability_cell_given_measurement and equals:
#           - sensor_right, if measurement in X_k = Z
#           - (1-sensor_right), if measurement in X_k != Z
#   Compute the sum over all P(X_k|Z), this sum equals P(Z).
#   Obtain normalized P(X_k|Z) by dividing each P(X_k|Z) by P(Z)
#   :return list q of cell probabilies after measurement update

def sense(world, p, Z, sensor_right):
    q=[]
    # Obtain probabilities
    q = [[ probability_cell_given_measurement(p[i][j], Z, world[i][j], sensor_right) for j in range(len(p[0]))] for i in range(len(p))]
    # Sum all probabilities
    s = sum([sum(row) for row in q])
    ## Normalize
    q = [[q[i][j]/s for j in range(len(p[0]))] for i in range(len(p))]
    return q

# Obtain probabilities of each cell in the grid after the robot moves
#
#   :param list p current world probabilities
#   :param list U description of the motion (i.e. [0,1] to move to the right)
#   :param float p_move probability of moving from one cell to another
#
#   For each cell X_k:
#   P(X_k) = sum over l=1...m of P(X_k|X_l) * P(X_l)
#   Where
#    - P(X_k|X_l) = p_move and P(X_l) = p[(i-y) % len(p)][(j-x) % len(p[0])] if the robot moves from cell l = [(i-y)][(j-x)] to cell k = [i][j]
#    - P(X_k|X_l) = (1- p_move) and P(X_l) = p[i][j] if the robot does not move from cell k = [i][j]
#   :return list q of cell probabilies after the robot moves

def move(p, U, p_move):
    q = []
    [y, x] = U
    q = [[p_move ** p[(i-y) % len(p)][(j-x) % len(p[0])] + (1-p_move) ** p[i][j] for j in range(len(p[0]))] for i in range(len(p))]
    return q

# For each pair of motion-measurement, update the grid probabilities of probabilities that represents where the robot is in any given moment
#
#   :param matrix colors grid of measurements
#   :param list measurements measurements sensed by the robot
#   :param list motions directions in which the robot moved at each moment (i.e. For [0,1] it moves to the right)
#   :param float sensor_right probability that the robot's measurement is correct
#   :param float p_move probability of moving from one cell to another
#
#   :return list q of cell probabilies after finishing updating for every measurement-motion

def localize(colors,measurements,motions,sensor_right,p_move):
    # initializes p to a uniform distribution over a grid of the same dimensions as colors
    pinit = 1.0 / float(len(colors)) / float(len(colors[0]))
    p = [[pinit for row in range(len(colors[0]))] for col in range(len(colors))]
    # Update probabilities iteratively
    for k in range((len(measurements))):
        p=move(p, motions[k], p_move)
        p=sense(colors, p, measurements[k], sensor_right)

    return p
```

So for example, for the following data:

```python
colors = [['R','G','G','R','R'],
          ['R','R','G','R','R'],
          ['R','R','G','G','R'],
          ['R','R','R','R','R']]
measurements = ['G','G','G','G','G']
motions = [0,0],[0,1],[1,0],[1,0],[0,1](0,0],[0,1],[1,0],[1,0],[0,1)
```

Where:

1. The robot does not move ($[0,0]$) and senses a green cell `'G'`.
2. The robot moves down ($[0,1]$) and senses a green cell `'G'`.
3. The robot moves right ($[1,0]$) and senses a green cell `'G'`.
4. The robot moves right ($[1,0]$) and senses a green cell `'G'`.
5. The robot moves down ($[0,1]$) and senses a green cell `'G'`.

And the `colors` is the representation of the world. Then, we apply the localization algorithm to obtain the probability distribution that the robot is in each cell:

```python
p = localize(colors,measurements,motions,sensor_right = 0.7, p_move = 0.8)
show(p)
```

Note that the probabily that the robot sensed the measurement correctly ($P(Z|X_i)$) is $0.7$ and the probability that the robot moved to the cell given by the motion vector ($P(X_i|X_j)$) is $0.8$. This outputs:

```
[[0.01106,0.02464,0.06800,0.04472,0.02465],
 [0.00715,0.01017,0.08697,0.07988,0.00935],
 [0.00740,0.00894,0.11273,0.35351,0.04066],
 [0.00911,0.00715,0.01435,0.04313,0.03643]]
```

Where each element in the matrix is the probabily of a cell.
