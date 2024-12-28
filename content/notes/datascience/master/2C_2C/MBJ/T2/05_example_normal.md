# Example: parallel experiments in eight schools

## Inferences based on nonhierarchical models and their problems

Before fitting the hierarchical Bayesian model, we first consider two simpler nonhierarchical methods—estimating the effects from the eight experiments independently (separate estimates), and complete pooling—and discuss why neither of these approaches is adequate for this example.

![Model Comparison](./assets/normal_hierarchical_modeling_comparison.png)

Consider $\theta_1$, the effect in school $A$. The effect in school $A$ is estimated as $28.4$ with a standard error of $14.9$ under the separate analysis, versus a pooled estimate of $7.7$ with a standard error of $4.1$ under
the common-effect model.

**Note**: given a Normal distribution (symmetrical with respect to it mean) the probability that an estimate takes a value under the mean is $\frac{1}{2}$ (cumulative density function), as the $\mu$ serves as the midpoint of a Normal distribution such that half the area for the normal curve is contained under $[0, \mu]$.

The separate analyses of the eight schools imply the following posterior statement: 'the probability is $\frac{1}{2}$ that the true effect in $A$ is more than $28.4$' a doubtful statement, considering the results for the other seven schools. On the other hand, the pooled model implies the following statement: 'the probability is $\frac{1}{2}$ that the true effect in A is less than $7.7$,' which seems an inaccurate summary of our knowledge. As in the theoretical discussion of the previous section, neither estimate is fully satisfactory, and we would like a compromise that combines information from all eight experiments without assuming all the $\theta_j$'s to be equal. The Bayesian analysis under the hierarchical model provides exactly that.

## Posterior simulation under the hierarchical model

Consequently, we compute the posterior distribution of $\theta_1, \cdots, \theta_8$, based on the normal model presented in [Section 4](./04_normal_model.md). We draw from the posterior distribution for the Bayesian model by simulating the random variables $\tau$, $\mu$, and $\theta$, in that order, from their posterior distribution, as discussed at the end of the previous section. The sampling standard deviations, $\sigma_j$, are assumed known and equal to the values in Table 5.2, and we assume independent uniform prior densities on $\mu$ and $\tau$.

The marginal posterior density function, $p(\tau|y)$ from, is plotted in the next figure:

![Normal Posterior Density](./assets/normal_example_margina_posterior_density.png)

Values of $\tau$ near zero are mos plausible. In the normal hierarchical model, however, we learn a great deal by considering the conditional posterior distributions given $\tau$ (and averaged over $\mu$), that is $\mathbb{E}[\theta_j|\tau, y]$, averaging over $\mu$. This is displayed on the following image:

![Conditional Posterior Density](./assets/normal_example_conditional_posterior.png)

Comparing with the previous figure, which has the same scale on the horizontal axis, we see that for most of the likely values of $\tau$, that is for $\tau \approx 0$ the estimated effects for all the groups are relatively close together (when $\tau = 0$ you would guess they are clustered on the same point). However, as $\tau$ becomes larger, corresponding to more variability among schools, the estimates become more like the raw values shown on the first figure of this section.

The lines in the following figure show the conditional standard deviations, $sd(\theta_j|\tau, y)$, as a function of $\tau$. As $\tau$ increases, the population distribution allows the eight effects to be more different from each other, and hence the posterior uncertainty in each individual $\tau_j$ increases, approaching the standard deviations shown in the raw data in the limit of $\tau \rightarrow \infty$. 

![Conditional Parameters' Standard Deviations](./assets/normal_example_conditional_parameter_std.png)

Contrary to what we saw with separate estimates and pooled estimates, for the likely values of $\tau$ (see figure for $p(\tau|y)$), the estimates in all schools are substantially less than $28$ points. For example, even at $\tau = 0$, the probability that the effect in school A is less than $28$ points is $\Phi[(28 − 14.5)/9.1] = 93\%$, where $\Phi$ is the standard normal cumulative distribution function.

Of substantial importance, we do not obtain an accurate summary of the data if we condition on the posterior mode of $\tau$ as it ignores the uncertainty associated with $\tau$ as conveyed by the full posterior distribution. In Bayesian statistics, the posterior distribution encapsulates both the most likely values of parameters as well as the uncertainty or variability in those estimates.

By only considering the mode (the peak or maximum) of the posterior distribution and neglecting its shape and spread, we may miss out on valuable information about the range of plausible values for τ and the associated uncertainty.

## Discussion

Table 5.3 summarizes the $200$ simulated effect estimates for all eight schools.

![Simlated Effects (theta parameter)](./assets/normal_example_simulation.png)

The Bayesian probability that the effect in school A is as large as $28$ points is less than $10\%$, which is substantially less than the $50\%$ probability based on the separate estimate for school A.

As an illustration of the simulation-based posterior results, $200$ simulations of school A's effect are shown in Figure 5.8a.

![Simlated Effects](./assets/normal_example_effects_simulation.png)

Having simulated the parameter $\theta$, it is easy to ask more complicated questions of this model. For example, what is the posterior distribution of $\max(\theta_j)$, the effect of the most successful of the eight coaching programs? Figure 5.8b displays a histogram of $200$ values from this posterior distribution and shows that only $22$ draws are larger than $28.4$. For another example, we can estimate $Pr(\theta_1 > \theta_3|y)$, the posterior probability that the coaching program is more effective in school A than in school C, by the proportion of simulated draws of $\theta$ for which $\theta_1 > \theta_3$; the result is $\frac{141}{200} = 0.705$.

To sum up, the Bayesian analysis of this example not only allows straightforward inferences about many parameters that may be of interest, but the hierarchical model is flexible enough to adapt to the data, thereby providing posterior inferences that account for the partial pooling as well as the uncertainty in the hyperparameters.
