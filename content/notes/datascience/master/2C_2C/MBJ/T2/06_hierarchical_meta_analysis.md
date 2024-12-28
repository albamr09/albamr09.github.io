# Hierarchical modeling applied to a meta-analysis

## A normal approximation to the likelihood

If clinical trial $j$ (in the series to be considered for meta-analysis) involves the use of $n_{0j}$ subjects in the control group and $n_{1j}$ in the treatment group, giving rise to $y_{0j}$ and $y_{1j}$ deaths in control and treatment groups, respectively, then the usual sampling model involves two independent binomial distributions with probabilities of death $p_{0j}$ and $p_{1j}$, respectively.

For each study $j$, one can estimate $\theta_j$ by:

$$\begin{aligned}
y_j = \log\left(\frac{y_{1j}}{n_{1j} - y_{1j}}\right) - \log\left(\frac{y_{0j}}{n_{0j} - y_{0j}}\right)
\end{aligned}$$

with approximate sampling variance

$$\begin{aligned}
\sigma_j^2 = \frac{1}{y_{1j}} + \frac{1}{n_{1j} - y_{1j}} + \frac{1}{y_{0j}} + \frac{1}{n_{0j} - y_{0j}}
\end{aligned}$$

based on empirical logits. The estimated log-odds ratios $y_j$ and their estimated standard errors $\sigma_j^2$ are displayed as the fourth and fifth columns of Table 5.4.

## Goals of inference in meta-analysis

Our focus is on estimating meaningful parameters, and for this objective there appear to be three possibilities. 

1. Complete pooling: we view the studies as identical replications of each other, in the sense we regard the individuals in all the studies as independent samples from a common population, with the same outcome measures and so on.
2. Separate estimates: the studies are so different that the results of any one study provide no information about the results of any of the others.
3. Bayesian analysis: we regard the studies as exchangeable but not necessarily either identical or completely unrelated.

The first potential estimand of a meta-analysis, or a hierarchically structured problem in general, is the mean of the distribution of effect sizes, since this represents the overall ‘average’ effect across all studies that could be regarded as exchangeable with the observed studies. Other possible estimands are the effect size in any of the observed studies and the effect size in another, comparable (exchangeable) unobserved study.

## What if exchangeability is inappropriate?

What if other information (in addition to the data $(n, y)$) is available to distinguish among the $J$ studies in a meta-analysis, so that an exchangeable model is inappropriate? In this situation, we can expand the framework of the model to be exchangeable in the observed data and covariates.

## A hierarchical model

Let $y_j$ represent generically the point estimate of the effect $\theta_j$ in the $j$th study, the sampling distribution is defined as:

$$\begin{aligned}
y_j|\theta_j, \sigma_j \sim \text{N}(\theta_j, \sigma_j^2)
\end{aligned}$$

where $\sigma_j$ represents the corresponding estimated standard error, which is assumed known without error.

At the second stage of the hierarchy, we again use an exchangeable normal **prior distribution**, with mean $\mu$ and standard deviation $\tau$, which are unknown hyperparameters.

$$\begin{aligned}
\theta|\mu, \tau \sim \text{N}(\mu, \tau)
\end{aligned}$$

Finally, a **hyperprior distribution** is required for $\mu$ and $\tau$. For this problem, it is reasonable to assume a noninformative or locally uniform prior density for $\mu$. We also assume a locally uniform prior density for $\tau$.
