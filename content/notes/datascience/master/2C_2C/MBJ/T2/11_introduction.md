# Introduction

## Separate estimates?

One approach for handling this group estimation problem is find separate estimates for each school. One focuses on the observations in school $j$, $\{Y_{1j}, \cdots, Y_{n_jj}\}$, choose a prior distribution $\pi(\mu_j, \sigma_j)$ for the mean and the standard deviation parameters.

This "separate estimates" approach may be reasonable, especially if the researcher thinks the means and the standard deviations from the five Normal models are completely unrelated to each other. That is, one’s prior beliefs about the parameters of the SAT score distribution in one school are unrelated to the prior beliefs about the distribution parameters in another school.

## Combined estimates?

Another way to handle this group estimation problem is to ignore the fact that there is a grouping variable and estimate the parameters in the combined sample. In our school example, one ignores the school variable and simply assumes that the SAT scores $Y_i$'s are distributed from a single Normal population with mean $\mu$ and standard deviation $\sigma$ where $i = 1, \cdots, n$ is the total number of students from all five schools. Using this approach, one is effectively ignoring any differences between the five schools.

## A two-stage prior

Is there an alternative approach that compromises between the separate and combined estimate methods?

For simplicity of discussion it is assumed the standard deviation $\sigma_j$ of the $j$th school is known. Consider the collection of five mean parameters, $\{\mu_1, \mu_2, \mu_3, \mu_4, \mu_5\}$ representing the means of the five schools' SAT scores. One believes that the $\mu_j$'s are distinct, because each $\mu_j$ depends on the characteristics of school $j$. One wishes to construct a prior distribution for the five mean parameters that reflects the belief that $\{\mu_1, \mu_2, \mu_3, \mu_4, \mu_5\}$ are related or similar in size.

The prior belief in similarity of the means is constructed in two stages:

1. [Stage 1] The prior distribution for the $j$th mean $\mu_j$ is Normal, where the mean and standard deviation parameters are shared among all $\mu_j$:

$$\begin{aligned}
\mu_j | \mu, \tau \sim \text{Normal}(\mu, \tau), j = 1, \cdots, 5
\end{aligned}$$

2. [Stage 2] In Stage 1, the parameters $\mu$ and $\tau$ are unknown. So this stage assigns the parameters a prior density $\pi$ (hyperprior):

$$\begin{aligned}
\mu, \tau \sim \pi(\mu, \tau)
\end{aligned}$$

Stage 1 indicates that the $\mu_j$'s a priori are related and thus come from the same distribution.

If one considers the limit of the Stage 1 prior as the standard deviation $\tau$ approaches zero, the group means $\mu_j$ will be identical. Then one is in the combined groups' situation where one is pooling the SAT data to learn about a single population. 

At the other extreme, if one allows the standard deviation $\tau$ of the Stage 1 prior to approach infinity, then one is saying that the group means are unrelated and that leads to the separate estimates situation.

Since $\mu$ and $\tau$ are parameters in the prior distribution, they are called hyperparameters. Learning about $\mu$ and $\tau$ provides information about the population of $\mu_j$. In Bayesian inference, one learns about $\mu_j$ and $\tau$ by specifying a hyperprior distribution and performing inference based on the posterior distribution.

 It will be seen that the hierarchical model posterior estimates for one school borrows information from other schools. This process is often called partial pooling information among groups.
 
 From the structural point of view, due to the two stages of the model, this approach is called hierarchical or multilevel modeling. In essence, hierarchical modeling takes into account information from multiple levels, acknowledging differences and similarities among groups. In the posterior analysis, one learns simultaneously about each group and learns about the population of groups by pooling information across groups.
