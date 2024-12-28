# Normal model with exchangeable parameters

## Model definition

We now present a full treatment of a simple hierarchical model based on the normal distribution, with different means for each "group" but with known observation variance and a normal population distribution for the group means.

- Consider $J$ independent experiments. The **likelihood (sampling distribution)** is defined as:

$$\begin{aligned}
y_{ij} | \theta_j \sim \text{N}(\theta_j, \sigma^2), \text{ for } i = 1, \cdots, n_j; j = 1, \cdots, J.
\end{aligned}$$

where we label the sample mean of each group $j$ as:

$$\begin{aligned}
\overline{y}_j = \frac{1}{n_j} \sum_{i = 1}^{n_j} y_{ij}
\end{aligned}$$

and the sampling variance as:

$$\begin{aligned}
\sigma^2_j = \frac{\sigma^2}{n_j}
\end{aligned}$$

Here we assume that $\sigma$ is a know value.

We can then write the likelihood for each $\theta_j$ using the sufficient statistics, $\overline{y}_j$:

$$\begin{aligned}
\overline{y}_j | \theta_j \sim \text{N}(\theta_j, \sigma_j^2)
\end{aligned}$$

Sufficient statistics are summary statistics of the data that capture all the information about the parameter of interest. In this case, the sufficient statistic $\overline{y}_j$ represents the data summary for experiment $j$ that is used to estimate the parameter $\theta_j$. By using the sufficient statistic $\overline{y}_j$, the likelihood function for each $\theta_j$ is constructed based on the observed data in experiment $j$.

- The **prior distribution** over $\theta_j$, assuming the prior to be normal for the sake of conjugacy is defined as:

$$\begin{aligned}
\theta_j|\mu, \tau \sim \text{N}(\theta_j|\mu, \tau^2)
\end{aligned}$$

Assuming each $\theta_j$ to be independent we obtain the following joint distribution:

$$\begin{aligned}
p(\theta_1, \cdots, \theta_J|\mu, \tau) = \prod_{j=1}^J \text{N}(\theta_j|\mu, \tau^2)
\end{aligned}$$

and by process of marginalization:

$$\begin{aligned}
p(\theta_1, \cdots, \theta_J) = \int \left[\prod_{j=1}^J \text{N}(\theta_j|\mu, \tau^2)\right]p(\mu, \tau) d(\mu, \tau)
\end{aligned}$$

- The **hyperprior over the parameters** $\mu$ and $\tau$ is defined as a non-informative distribution (i.e. uniform density), such that:

$$\begin{aligned}
p(\mu, \tau) = p(\mu|\tau)p(\tau) \propto p(\tau)
\end{aligned}$$

We define a prior distribution over $\tau$. For our illustrative analysis, we use the uniform prior distribution $p(\tau) \propto 1$. Once an initial analysis is performed using the noninformative
'uniform' prior density, a sensitivity analysis with a more realistic prior distribution is often desirable.

## Inference

### Joint posterior distribution

This distribution combines prior information (hyperprior distribution $p(\mu, \tau)$)  the population distribution $p(\theta_j|\mu, \tau)$ and the likelihood function $p(y_{ij}|\theta_j)$. We define it as follows:

$$\begin{aligned}
p(\theta, \mu, \tau|y)
\end{aligned}$$

By Bayes Theorem (ignoring the normalization term):

$$\begin{aligned}
\propto p(y|\theta) p(\theta|\mu, \tau) p(\mu, \tau)
\end{aligned}$$

Here $p(y|\theta)$ is the likelihood function previously defined in terms of the sufficient statistics $\overline{y}_j$

$$\begin{aligned}
\propto \left[\prod_{j=1}^J \text{N}(\overline{y}_j|\theta_j, \sigma_j^2)\right] p(\theta|\mu, \tau) p(\mu, \tau)
\end{aligned}$$

and $p(\theta|\mu, \tau)$ is the prior, also previouly defined, such that:

$$\begin{aligned}
\propto \left[\prod_{j=1}^J \text{N}(\overline{y}_j|\theta_j, \sigma_j^2)\right] \left[\prod_{j=1}^J \text{N}(\theta_j|\mu, \tau^2) p(y|\theta)\right] p(\mu, \tau)
\end{aligned}$$

where we can ignore factors that depend only on $y$ and the parameters $\sigma_j$, which are assumed known for this analysis.

### The conditional posterior distribution

The conditional posterior distribution calculates the posterior distribution of $\theta_j$ given the hyperparameters $\mu, \tau$. It allows us to understand how parameters intereact and influence each other. We define them for each $\theta_j$ as follows:

$$\begin{aligned}
\theta_j | \mu, \tau, y \sim \text{N}(\hat{\theta}_j, V_j)
\end{aligned}$$

where:

$$\begin{aligned}
\hat{\theta}_j = \frac{\frac{1}{\sigma_j^2}\overline{y}_j + \frac{1}{\tau^2}\mu}{\frac{1}{\sigma_j^2} + \frac{1}{\tau^2}}
\end{aligned}$$

and:

$$\begin{aligned}
V_j = \frac{1}{\frac{1}{\sigma_j^2} + \frac{1}{\tau^2}}
\end{aligned}$$

### The marginal posterior distribution

This distribution allows us to estimate the hyperparameters $\mu$ and $\tau$ through the Bayesian paradigm. By the conditional rule we obtain:

$$\begin{aligned}
p(\mu, \tau|y) \propto p(\mu, \tau)p(y|\mu, \tau)
\end{aligned}$$

where:

$$\begin{aligned}
\overline{y}_j | \mu, \tau \sim \text{N}(\mu, \sigma_j^2 + \tau^2)
\end{aligned}$$

such that:

$$\begin{aligned}
p(\mu, \tau|y) \propto p(\mu, \tau) \prod_{j=1}^J \text{N}(\overline{y}_j|\mu, \sigma^2_j + \tau^2)
\end{aligned}$$

##### Posterior distribution of $\mu$ given $\tau$

We can further simplify by integrating over $\mu$, leaving a simple univariate numerical computation of $p(\tau|y)$, by the conditional rule:

$$\begin{aligned}
p(\mu, \tau|y) = p(\mu | \tau, y) p(\tau|y)
\end{aligned}$$

where:

$$\begin{aligned}
\mu | \tau, y \sim \text{N}(\hat{\mu}, V_\mu)
\end{aligned}$$

with:

$$\begin{aligned}
\hat{\mu} = \frac{\sum_{j=1}^J \frac{1}{\sigma_j^2 + \tau^2}\overline{y}_j}{\sum_{j=1}^J \frac{1}{\sigma_j^2 + \tau^2}}
\end{aligned}$$

and

$$\begin{aligned}
V_{\mu}^{-1} = \sum_{j=1}^J \frac{1}{\sigma_j^2 + \tau^2}
\end{aligned}$$

##### Posterior distribution $\tau$

We know from the previous section that:

$$\begin{aligned}
p(\mu, \tau|y) = p(\mu | \tau, y) p(\tau|y)
\end{aligned}$$

such that:

$$\begin{aligned}
p(\tau|y) = \frac{p(\mu, \tau|y)}{p(\mu | \tau, y)}
\end{aligned}$$

We previously defined $\mu | \tau, y \sim \text{N}(\hat{\mu}, V_\mu)$, therefore:

$$\begin{aligned}
p(\tau|y) = \frac{p(\mu, \tau|y)}{\text{N}(\hat{\mu}, V_\mu)}
\end{aligned}$$

We also defined $p(\mu, \tau|y) \propto p(\mu, \tau) \prod_{j=1}^J \text{N}(\overline{y}_j|\mu, \sigma^2_j + \tau^2)$:

$$\begin{aligned}
\propto \frac{p(\tau) \prod_{j=1}^J \text{N}(\overline{y}_j|\mu, \sigma^2_j + \tau^2)}{\text{N}(\hat{\mu}, V_\mu)}
\end{aligned}$$

## Simulation

For this model, computation of the posterior distribution of θ is most conveniently performed via simulation, following the factorization:

$$\begin{aligned}
p(\theta, \mu, \tau|y) = p(\theta|\mu, \tau, y) p(\mu|\tau, y) p(\tau, y)
\end{aligned}$$

## Posterior predictive distributions

To obtain a draw from the posterior predictive distribution of new data $\tilde{y}$ from the current batch of parameters, $\theta$, first obtain a draw from $p(\theta, \mu, \tau|y)$ and then draw the predictive data $\tilde{y}$ from the sampling distribution:

$$\begin{aligned}
y_{ij} | \theta_j \sim \text{N}(\theta_j, \sigma^2), \text{ for } i = 1, \cdots, n_j; j = 1, \cdots, J.
\end{aligned}$$

To obtain posterior predictive simulations of new data $\tilde{y}$ for $\tilde{J}$ new groups, perform the following three steps:

- Draw $(\mu, \tau)$ from their posterior distribution $p(\mu, \tau|y)$
- Draw $\tilde{J}$ new parameters $\tilde{\theta} = \tilde{\theta}_1, \cdots, \tilde{\theta}_{\tilde{J}}$ from the population distribution $p(\tilde{\theta}|\mu, \tau)$.
- Draw $\tilde{y}$ given $\tilde{\theta}$ from the sampling distribution.
