# Gibbs Sampler

## Introduction

Many smart techniques have been developed to create and sample from different types of posterior distributions. One common method is called Markov chain simulation, also known as **Markov chain Monte Carlo** (MCMC). It works by first drawing values of a parameter (usually denoted as $\theta$) from rough estimates of the distribution, and then adjusting those draws to better match the actual distribution we're interested in, called the posterior distribution, denoted as $p(\theta|y)$. The drawing process is done step by step, with each draw depending on the previous one, forming what's called a Markov chain.

![Markov Chain Exmaple](assets/markov_chain_example.png)

Figure 11.1 shows a simple example of Markov chain simulation, using what's called a Metropolis algorithm. Imagine we have a parameter called $\theta$ that is a vector with two components, such that $\theta \sim \text{N}(0, I)$. Now, let's look at Figure 11.1a, which shows the early steps of this simulation. The picture represents all the possible values that $\theta$ can take, and each of the five squiggly lines shows the path taken by a random walk. These random walks start either near the center or at the edges of the distribution and move around based on a series of random steps.

In Figure 11.1b, we see the later stages of the same simulation. Each of the random walks has now traced a path throughout the entire space of possible $\theta$ values. They've settled into a common pattern, which matches the target distribution we're interested in.

Finally, in Figure 11.1c, we can use the information gathered from the second halves of these simulated random walks to make inferences about $\theta$.

In our use of Markov chain simulation, we create multiple separate sequences. Each sequence starts from a particular point, like $\theta_0$, and then we move step by step, drawing a new value $\theta_t$ from a transition distribution $T_t(\theta_t|\theta_{t−1})$, which depends on the previous draw. Markov chain simulation is used when it is not possible to sample $\theta$ directly from $p(\theta|y)$ instead we sample iteratively in such a way that at each step of the process we expect to draw from a distribution that becomes closer to $p(\theta|y)$.

Once the simulation algorithm has been implemented and the simulations drawn, it is absolutely necessary to check the convergence of the simulated sequences; for example, the simulations of Figure 11.1a are far from convergence and are not close to the target distribution.

## Gibbs Sampler

Imagine you have a $d$-dimensional parameter vector $\theta$ that's been split into smaller parts, such that $\theta = (\theta_1, \cdots, \theta_d)$. Each time the Gibbs sampler runs, it goes through each of the dimensions, one at a time, while keeping the rest fixed. So, if there are $d$ dimensions, there are $d$ steps in each iteration $t$.

At each iteration, we pick an order for the $d$ parts of $\theta$. Then, we go through each part one by one and we sample a new value for each part based on the current values of all the other parts. This continues for each part until we've updated all of them once, and then we start the process over again for the next iteration.

$$\begin{aligned}
p(\theta_j|\theta_{-j}^{t-1}, y)
\end{aligned}$$

where $\theta_{-j}^{t-1}$ represents all the components of $\theta$ except for $\theta_j$ at their current values:

$$\begin{aligned}
\theta_{-j}^{t - 1} = (\theta_1^t, \cdots, \theta^t_{j - 1}, \theta_{j + 1}^{t - 1}, \theta_{d}^{t - 1})
\end{aligned}$$

Thus, each subvector $\theta_j$ is updated conditional on the latest values of the other components of $\theta$, which are the iteration $t$ values for the components already updated and the iteration $t − 1$ values for the others.

Here, we illustrate the workings of the Gibbs sampler with a simple example.

### Example: Bivariate Normal Distribution

Consider a single observation $(y_1, y_2)$ from a bivariate normally distributed population with unknown mean $\theta = (\theta_1, \theta_2)$ and known covariance matrix $\begin{bmatrix}1 & \rho \\ \rho & 1\end{bmatrix}$. With a uniform prior distribution on $\theta$, the posterior distribution is:

$$\begin{aligned}
\begin{bmatrix}
\theta_1 \\
\theta_2 \\
\end{bmatrix} | y \sim \text{N}(\begin{bmatrix}
y_1 \\
y_2 \\
\end{bmatrix}, \begin{bmatrix}
1 & \rho \\
\rho & 1 \\
\end{bmatrix})
\end{aligned}$$

We need the conditional posterior distributions, which, from the properties of the multivariate normal distribution, are:

$$\begin{aligned}
\theta_1 |\theta_2, y \sim \text{N}(y_1 + \rho(\theta_2 - y_2), 1 - \rho^2)
\end{aligned}$$

$$\begin{aligned}
\theta_2 |\theta_1, y \sim \text{N}(y_2 + \rho(\theta_1 - y_1), 1 - \rho^2)
\end{aligned}$$

The Gibbs sampler proceeds by alternately sampling from these two normal distributions. Figure 11.2 illustrates for the case $\rho = 0.8$, data $(y_1, y_2) = (0, 0)$, and four independent sequences started at $(\pm 2.5, \pm 2.5)$.

![Gibb Sampler Exampler](assets/gibb_sampler_example.png)
