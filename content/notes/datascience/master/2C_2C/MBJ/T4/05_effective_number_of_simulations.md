# Effective Number of Simulation Draws

## Bounded or Long-Tailed Distributions

The above convergence diagnostics are based on means and variances, and they will not work so well for parameters or scalar summaries for which the posterior distribution, $p(\phi|y)$, is far from Gaussian.

For summaries $\phi$ whose distributions are constrained or otherwise far from normal, we can preprocess simulations using transformations before computing the potential scale reduction factor $\hat{R}$ and the effective sample size $\hat{n}_{eff}$.

## Stopping the Simulations

We monitor convergence for the entire multivariate distribution, $p(\theta|y)$, by computing the potential scale reduction factor $\hat{R}$ and the effective sample size $\hat{n}_{eff}$ for each scalar summary of interest.

We recommend computing the potential scale reduction for all scalar estimands of interest; if $\hat{R}$ is not near $1$ for all of them, continue the simulation runs. We can use effective sample size $\hat{n}_{eff}$ to give us a sense of the precision obtained from our simulations. As a default rule, we suggest running the simulation until $\hat{n}_{eff}$ is at least $5m$, that is, until there are the equivalent of at least $10$ independent draws per sequence. For some purposes, more precision will be desired, and then a higher effective sample size threshold can be used.

Once $\hat{R}$ is near $1$ and $\hat{n}_{eff}$ is more than $10$ per chain for all scalar estimands of interest, just collect the $mn$ simulations (with warm-up iterations already excluded) and treat them as a sample from the target distribution.

Even if an iterative simulation appears to converge and has passed all tests of convergence, it still may actually be far from convergence if important areas of the target distribution were not captured by the starting distribution and are not easily reachable by the simulation algorithm. When we declare approximate convergence, we are actually concluding that each individual sequence appears stationary and that the observed sequences have mixed well with each other. These checks are not hypothesis tests. There is no p-value and no statistical significance.
