# Hierarchical Beta-Binomial Modeling

## Example: Deaths after heart attack

The New York State (NYS) Department of Health collects and releases data on mortality after a heart attack. We focus on 13 hospitals in Manhattan, New York City, with the goal of learning about the percentages of resulted deaths from heart attack for hospitals in this sample.

![Data](assets/heart_attack_data.png)

## A Hierarchical Beta-Binomial Model

Treating “cases” as trials and “deaths” as successes, the Binomial sampling model is a natural choice for this data, and the objective is to learn about the death probability $p$ of the hospitals.

If one creates thirteen separate Binomial sampling models, one for each hospital, and conducts separate inferences, one loses the ability to use potential information about the death rate from hospital $i$ when making inference about that of a different hospital $j$. Since these are all hospitals in Manhattan, New York City, they may share attributes in common related to death rates from heart attack.

Therefore, one builds a hierarchical model based on a common Beta distribution that generalizes the Beta-Binomial conjugate model described in [Chapter 7](https://bayesball.github.io/BOOK/proportion.html).

Let $Y_i$ denote the number of resulted deaths from heart attack, $n_i$ the number of heart attack cases, and $p_i$ the death rate for hospital $i$. So the sampling and first stage of the prior of our model is written as follows:

- Sampling for $i = 1, \cdots, 13$:

$$\begin{aligned}
Y_i \sim \text{Binomial}(n_i, p_i)
\end{aligned}$$
 
- Prior for $p_i$, $i = 1, \cdots, 13$:

$$\begin{aligned}
p_i \sim \text{Beta}(a, b)
\end{aligned}$$

Note that the hyperparameters $a$ and $b$ are shared among all hospitals. If $a$ and $b$ are known values, then the posterior inference for $p_i$ of hospital $i$ is simply another Beta distribution by conjugacy (refer to [Beta-binomial conjugate prior (page 7)](https://compcogsci-3016.djnavarro.net/technote_betabinomial.pdf)):

$$\begin{aligned}
p_i | y_i \sim \text{Beta}(a + y_i, b + n_i - y_i)
\end{aligned}$$

In the general situation where the hyperparameters $a$ and $b$ are unknown, a second stage of the prior $\pi(a, b)$ needs to specified for these hyperparameters, such that the model is now defined as:

- Sampling for $i = 1, \cdots, 13$:

$$\begin{aligned}
Y_i \sim \text{Binomial}(n_i, p_i)
\end{aligned}$$
 
- Prior for $p_i$, Stage 1: $i = 1, \cdots, 13$:

$$\begin{aligned}
p_i \sim \text{Beta}(a, b)
\end{aligned}$$
 
- Prior for $p_i$, Stage 2: the hyperprior:

$$\begin{aligned}
a, b \sim \pi(a, b)
\end{aligned}$$

When we start analyzing the New York State heart attack death rate dataset, the specification of this hyperprior distribution $\pi(a, b)$ will be described.

### Graphical Representation

One sees that the upper section of the graph represents the sampling density, with the arrow directing from $p_i$ to $Y_i$. Here the start of the arrow is the parameter and the end of the arrow is the random variable. The lower section of the graph represents the prior, with arrows directing from $a$ and $b$ to $p_i$. 

![Graphical Representation of the Beta-Binomial Hierarchical Model](assets/beta_binomial_hierarchical_model.png)

## Inference through MCMC

### Second-stage prior

For a $\text{Beta}(a, b)$ prior distribution for a proportion $p$, one considers the parameter $a$ as the prior count of “successes”, the parameter $b$ as the prior count of "failures", and the sum $a + b$ represents the prior sample size. Also the expectation is given by $\frac{a}{a + b}$. From these facts a more natural parametrization of the hyperprior distribution $\pi(a, b)$ is $\pi(\mu, \eta)$ where $\mu = \frac{a}{a + b}$ is the hyperprior mean and $\eta = a + b$ is the hyperprior sample size. Therefore:

$$\begin{aligned}
\mu, \eta \sim \pi(\mu, \eta)
\end{aligned}$$

where $a = \mu\eta$ and $b = (1 - \mu)\eta$.

Assume $\mu$ and $\eta$ are independent which means that one's beliefs about the prior mean are independent of the beliefs about the prior sample size. The hyperprior expectation $\mu$ is the mean measure for $p_i$, the average death rate across $13$ hospitals. If one has little prior knowledge about the expectation $\mu$, one assigns this parameter a Uniform prior which is equivalent to a $\text{Beta}(1, 1)$ prior.

To motivate the prior choice for the hyperparameter sample size $\eta$, consider the case where the hyperparameter values are known. If $y^**$ and $n^**$ are respectively the number of deaths and number of cases for one hospital, then the posterior mean of death rate parameter $p^*$ is given by (refer to the Beta-binomial conjugate definition):

$$\begin{aligned}
\mathbb{E}[p^**|y^**] = \frac{y^** + \mu\eta}{n^** + \eta}
\end{aligned}$$

With a little algebra, the posterior mean is rewritten as

$$\begin{aligned}
\mathbb{E}[p^**|y^**] = (1 - \lambda)\frac{y^**}{n^**} + \lambda\mu
\end{aligned}$$

where $\lambda$ is the shrinkage fraction:

$$\begin{aligned}
\lambda = \frac{\eta}{n^* + \eta}
\end{aligned}$$

The parameter $\lambda$ falls in the interval $(0, 1)$ and represents the degree of shrinkage of the posterior mean away from the sample proportion $\frac{y^**}{n^**}$ towards the prior mean $\mu$.

Suppose one believes a priori that, for a representative sample size $n^*$, the shrinkage $\lambda$ is Uniformly distributed on $(0, 1)$. By performing a transformation, this implies that the prior density for the prior sample size $\eta$ has the form:

$$\begin{aligned}
\pi(\eta) = \frac{n^**}{(n^** + \eta)^2}, \eta > 0
\end{aligned}$$

Equivalently, the logarithm of $\eta$, $\theta = \log(\eta)$, has a Logistic distribution with location $\log(n^**)$ and scale $1$. We represent this distribution as $Logistic(\log(n^**), 1)$, with pdf:

$$\begin{aligned}
\pi(\theta) = \frac{e^{-(\theta - \log(n^**))}}{(1 + e^{-(\theta - \log(n^**))})^2}
\end{aligned}$$

With this specification of the hyperparameter distribution, one writes down the complete hierarchical model as follows:
 
- Sampling for $i = 1, \cdots, 13$:

$$\begin{aligned}
Y_i \sim \text{Binomial}(n_i, p_i)
\end{aligned}$$
 
- Prior for $p_i$, Stage 1: $i = 1, \cdots, 13$:

$$\begin{aligned}
p_i \sim \text{Beta}(a, b)
\end{aligned}$$
 
- Prior for $p_i$, Stage 2: the hyperpriors:

$$\begin{aligned}
\mu, \eta \sim \pi(\mu, \eta)
\end{aligned}$$

$$\begin{aligned}
\log \eta \sim \text{Logistic}(\log n^*, 1)
\end{aligned}$$

where $a = \mu\eta$ and $b = (1 - \mu)\eta$

### MCMC diagnostics and summarization

After the diagnostics are performed, one reports posterior summaries of the parameters:

![MCMC Summary](./assets/beta_binomial_MCMC_summary.png)

From the posterior output, one evaluates the effect of information pooling in the hierarchical model. See Figure 10.6 displays a shrinkage plot showing how the sample proportions are shrunk towards the overall death rate. 

![MCMC Shrinkage](./assets/beta_binomial_shrinkage.png)

To compare the posterior densities of the different $p_i$, one displays the density estimates in a single graph as in the following figure:

![Posterior Density Comparison](./assets/beta_binomial_posterior_densities.png)
