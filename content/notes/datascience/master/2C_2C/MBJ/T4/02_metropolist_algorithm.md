# Metropolis and Metropolis-Hastings Algorithms

## The Metropolis algorithm

The Metropolis algorithm is an adaptation of a random walk with an acceptance/rejection rule to converge to the specified target distribution. The algorithm proceeds as follows.

1. Draw a starting point $\theta_0$, for which $p(\theta_0|y) > 0$, from a starting distribution $p_0(\theta)$. The starting distribution might be based on an approximation or we may simply choose starting values dispersed around a crude approximate estimate.
2. For $t = 1, 2, \cdots$:
  - Sample a proposal $\theta^**$ from a jumping distribution (or proposal distribution) at time $t$, $J_t(\theta^**|\theta^{t-1})$. For the Metropolis algorithm (but not the Metropolis-Hastings algorithm, as discussed later in this section), the jumping distribution must be symmetric.
  - Calculate the ratio of the densities:

$$\begin{aligned}
r = \frac{p(\theta^*|y)}{p(\theta^{t- 1}|y)}
\end{aligned}$$
  - Set:

$$\begin{aligned}
\theta^t = \begin{cases}
\theta^* & \text{ with probability } \min(r, 1) \\
\theta^{t-1} \text{ otherwise }
\end{cases}
\end{aligned}$$

The acceptance/rejection rule of the Metropolis algorithm can be stated as follows: 

- If the jump increases the posterior density, set $\theta^t = \theta^*$; 
- If the jump decreases the posterior density, set $\theta^t = \theta^*$ with probability equal to the density ratio, $r$, otherwise set $\theta_t = \theta^{t - 1}$ (with probability $1 - r$). 

The Metropolis algorithm can thus be viewed as a stochastic version of a stepwise mode-finding algorithm, always accepting steps that increase the density but only sometimes accepting downward steps.

To use the algorithm, we need to calculate the ratio $r$ for every pair of $(\theta, \theta^**)$, and we also need to choose $\theta$ from the jumping distribution $J_t(\theta^**|\theta)$ for all $\theta$ and $t$. Additionally, we need to generate a random number for step ($c$) in the process.

Even if the jump isn't accepted and $\theta_t$ equals $\theta_{t-1}$, it still counts as a step in the algorithm.

### Example: Bivariate Unit Normal Density with Normal Jumping Kernel

For simplicity, we illustrate the Metropolis algorithm with the simple example of the bivariate unit normal distribution. The target density is the bivariate unit normal, $p(\theta|y) = \text{N}(\theta|0, I)$. The jumping distribution is also bivariate normal, centered at the current iteration and scaled to $\frac{1}{5}$ the size: $J_t(\theta^**|\theta^{t−1}) = \text{N}(\theta^**|\theta^{t−1}, 0.22\cdot I)$. 

At each step, it is easy to calculate the density ratio:

$$\begin{aligned}
r = \frac{\text{N}(\theta^*|0, I)}{\text{N}(\theta^{t-1}|0, I)}
\end{aligned}$$

It is clear from the form of the normal distribution that the jumping rule is symmetric. [Figure 11.1](./01_gibbs_sampler.md#Introduction) displays five simulation runs starting from different points. We have purposely set the scale of this jumping algorithm to be too small, relative to the target distribution, so that the algorithm will run inefficiently and its random-walk aspect will be obvious in the figure.

## Why does the Metropolis Algorithm Work?

The proof that the sequence of iterations $\theta_1, \theta_2, \cdots$ converges to the target distribution has two steps:

1. It is shown that the simulated sequence is a Markov chain with a unique stationary distribution.
2. It is shown that the stationary distribution equals the target distribution.

Except for trivial exceptions, the latter two conditions hold for a random walk on any proper distribution, and irreducibility holds as long as the jumping distributions Jt is eventually be able to jump to all states with positive probability.

1. To show (1) consider starting the algorithm at time $t − 1$ with a draw $\theta^{t−1}$ from the target distribution $p(\theta|y)$. Now consider any two such points $\theta_a$ and $\theta_b$, drawn from $p(\theta|y)$ and labeled so that $p(\theta_b|y) \geq p(\theta_a|y)$. The unconditional probability density of a transition from $\theta_a$ to $\theta_b$ is:

$$\begin{aligned}
p(\theta^{t - 1} = \theta_a, \theta^t = \theta_b) = p(\theta_a|y)J_t(\theta_b|\theta_a)
\end{aligned}$$

where the acceptance probability is $1$ because of our labeling of $a$ and $b$, and the unconditional probability density of a transition from $\theta_b$ to $\theta_a$ is:

$$\begin{aligned}
p(\theta^t = \theta_a, \theta^{t-1} = \theta_b) = p(\theta_b|y)J_t(\theta_a|\theta_b) \left(\frac{p(\theta_a|y)}{p(\theta_b|y)}\right)
\end{aligned}$$

$$\begin{aligned}
= p(\theta_b|y)J_t(\theta_a|\theta_b)
\end{aligned}$$

which is the same as the probability of a transition from $\theta_a$ to $\theta_b$, since we have required that $J_t(\cdot|\cdot)$ be symmetric.

Since their joint distribution is symmetric, $\theta^t$ and $\theta^{t−1}$ have the same marginal distributions, and so $p(\theta|y)$ is the stationary distribution of the Markov chain of $\theta$.

## The Metropolis-Hastings Algorithm

The Metropolis-Hastings algorithm generalizes the basic Metropolis algorithm presented above in two ways. 

1. The jumping rules $J_t$ need no longer be symmetric.
2. To correct for the asymmetry in the jumping rule the ratio $r$ is replaced by a ratio of ratios:

$$\begin{aligned}
r = \frac{\frac{p(\theta^**|y)}{J_t(\theta^**|\theta^{t-1})}}{\frac{p(\theta^{t-1}|y)}{J_t(\theta^{t-1}|\theta^*)}}
\end{aligned}$$

Allowing asymmetric jumping rules can be useful in increasing the speed of the random walk.

## Relation Between the Jumping Rule and Efficiency of Simulations

The ideal Metropolis-Hastings jumping rule is simply to sample the proposal, $\theta^**$, from the target distribution; such that our jumping distribution is equal to the target distribution, $J(\theta^**|\theta) ≡ p(\theta^**|y)$. Then the ratio $r$ is always exactly $1$, so we always choose the new sampled $\theta^**$ to update $\theta^t$ instead of remaining with $\theta^{t-1}$.

A good jumping distribution has the following properties:

1. For any $\theta$, it is easy to sample from $J(\theta^*|\theta)$
2. It is easy to compute the ratio $r$
3. Each jump goes a reasonable distance in the parameter space (otherwise the random walk moves too slowly).
4. The jumps are not rejected too frequently (otherwise the random walk wastes too much time standing still).
