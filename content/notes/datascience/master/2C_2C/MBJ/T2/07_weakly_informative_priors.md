# Weakly Informative Priors

## Concepts relating to the choice of prior distribution

### Improper limit of a prior distribution

Improper prior densities can, but do not necessarily, lead to proper posterior distributions. 

### Calibration

Posterior inferences can be evaluated using the concept of calibration of the posterior mean. For any parameter $\theta$, if we label the posterior mean as $\hat{\theta} = \mathbb{E}[\theta|y]$, we can define the miscalibration of the posterior mean as $\mathbb{E}[\theta|\hat{\theta}] - \hat{\theta}$. 

We can judge the accuracy of our conclusions from Bayesian analysis by checking how close the average value we predict (the posterior mean) is to the true value.

Here's how it works:

- If we call our predicted average value $\hat{\theta}$, and we calculate how far off it is from the true value $\theta$, that's what we call the miscalibration of the prediction.
- If our initial guesses (prior distribution) are accurate and our data matches those guesses, then our predictions will be right on target, meaning the miscalibration will be zero.

These are models where the probabilities don't add up to $1$, which makes it impossible to draw a parameter $\theta$ from them. So, we need to expand our theory to deal with this. To see if our predictions are accurate in these cases, we need to imagine a "true" prior distribution where $\theta$ comes from, and compare it to the "inferential" prior distribution we actually use for our Bayesian analysis.

Let's take the example of the 8 schools model. Here, we consider an improper uniform distribution on $\tau$ (a parameter in the model) as a limit of uniform distributions on a range (from $0$ to a really large number $A$, which is getting bigger and bigger).

When we use this improper uniform distribution, our inferences tend to overestimate $\tau$. Let's see why:

- If both the "true" and "inferential" prior distributions are uniform on $(0, A)$, our miscalibration is zero. This means our predictions are accurate.
- Now, if we keep the "true" prior distribution as $U(0, A)$ but let the "inferential" prior distribution go to $U(0, \infty)$, our predictions tend to increase (because now we're including more and more extreme values of $\theta$), which leads to a positive miscalibration.

## Classes of noninformative and weakly informative prior distributions for hierarchical variance parameters

### General considerations

We view any noninformative or weakly informative prior distribution as inherently provisional—after the model has been fit, one should look at the posterior distribution and see if it makes sense. If the posterior distribution does not make sense, this implies that additional prior knowledge is available that has not been included in the model, and that contradicts the assumptions of the prior distribution that has been used

### Uniform prior distributions

When we're setting up our model, we often start with uniform priors. But we have to be careful about how we define the scale of this uniform distribution. One common situation is when we're dealing with parameters that must be positive, like variance parameters. Using a uniform prior on the logarithm of these parameters ($\log \tau$) might seem like a good idea, but it can lead to problems because the resulting posterior distribution becomes improper (doesn't add up to 1).

An alternative is trying to set up a range for our prior distribution, like $[-A, A]$ where $A$ is a really large number. This seems like a good idea to keep things in check, but there's a catch: the posterior distribution (our updated belief after looking at the data) can end up heavily influenced by the lower bound, $-A$, of our range. When we calculate the marginal likelihood $p(y|\tau)$ of our data given a certain parameter ($\tau$), it ends up approaching a fixed, non-zero value as $\tau$ gets really close to $0$. Because when we calculate the likelihood of our data given a parameter ($\tau$), it's like asking, "How likely is it that we'd see this data if our parameter τ were true?"

Now, imagine $\tau$ is getting really close to $0$. In many situations, this means we're saying there's almost no variability in our data. But even if $\tau$ is very close to $0$, the likelihood of observing our data isn't exactly $0$. There's still some chance, even if it's tiny, that we'd see our data just by random chance, even with very little variability. So, as $\tau$ approaches $0$, the likelihood doesn't drop to $0$ as well. Instead, it approaches a fixed, non-zero value.

Another option we can consider is using a uniform prior distribution directly on the parameter $\tau$ itself. This helps avoid some of the problems we discussed earlier because it keeps the total probability finite, especially near $\tau = 0$. However, there's a drawback to this approach. It tends to lean slightly towards positive values, because it allows for the possibility of very large values of $\tau$ as well.

When we're dealing with just one or two groups ($J = 1$ or $2$), using this uniform prior actually results in an improper posterior density. This means that our analysis essentially concludes that $\tau$ is infinite, and it doesn't do any pooling of data from different groups. In a way, this makes sense because it's hard to decide from just a few groups how much we should pool their data together. But from a Bayesian perspective, it's a bit awkward because we're making this decision before even looking at the data.

When we're dealing with these improper uniform prior distributions, we can think of them as being like the limit of certain types of weakly informative priors. For example, the uniform prior distribution on the logarithm of $\tau$ is basically like saying that $\tau$ follows a distribution where the probability decreases as $\tau$ gets bigger. 

Sometimes, in Bayesian statistics, people suggest using a uniform prior distribution directly on $\tau^2$. This means that every possible value for $\tau^2$ is considered equally likely. However, we don't recommend this approach. It tends to have a bigger issue with miscalibration towards higher values compared to the other approaches we discussed earlier. Plus, using this uniform prior on τ squared requires us to have at least 4 groups for the analysis to work properly and give us a reasonable posterior distribution.

### Inverse-gamma$(\epsilon, \epsilon)$ prior distributions

In the schools model, the parameter $\tau$ doesn't have any simple family of prior distributions that work well because its likelihood depends on all the data from all the groups in a complex way. However, there's a kind of distribution called the inverse-gamma family that works well in this situation. This means that if we use an inverse-gamma distribution as a prior for $\tau^2$, then after we collect our data and update our beliefs, the conditional distribution for $\tau^2$, $p(\tau^2|\mu, \theta, y)$ that we get is still an inverse-gamma distribution.

The inverse-gamma prior distribution is a way to set up our beliefs in a noninformative (or weakly informative) manner when we're dealing with certain types of data. We choose a parameter called alpha ($\alpha$) to control how informative the prior is. Now, here's the thing: If we set alpha to a very low value, like $1$ or $0.01$ or $0.001$, it's supposed to mean we're not putting much prior information into our model. But there's a problem: When we make alpha too small, the posterior distribution (our updated beliefs after looking at the data) can end up being improper, which means it doesn't add up to $1$. To avoid this, we need to set alpha to a reasonable value, not too small.

### Half-Cauchy prior distributions

We're going to look at another type of distribution called the $t$ family, specifically the $\text{half}-t$ because our scale parameter ($\tau$) has to be positive. Now, we're interested in the $t$ family for this problem because it's pretty flexible and can cover a wide range of situations. Plus, we can use a neat trick called reparameterization to express it as a prior distribution for our scale parameter ($\tau$) in a way that works well with our model.

Here's why it's helpful: The half-Cauchy distribution has a wide peak around zero and just one parameter that we can adjust, which we'll call $A$. We can set $A$ to be a large value, and as it gets bigger and bigger (approaching infinity), the half-Cauchy distribution starts to look more like a uniform distribution on our parameter $\tau$.

When we set $A$ to a large but finite value, it means we're using a slightly informative prior distribution. Even though it's not completely flat, it's still pretty gentle, especially in the tails. This means that even if we have some prior beliefs, the data we collect can still have a big influence on our final results, especially if the data is strong.

So, we're going to use the half-Cauchy distribution for situations where we're estimating variance parameters from just a few groups. In these cases, our choices about our prior beliefs can really affect our results, so we want to use a prior distribution that's flexible and doesn't have a strong influence unless the data really supports it.

## Application to the 8-schools example

We demonstrate the properties of some proposed noninformative prior densities on the eight-schools example of [Section 5](./05_example_normal.md). Figure 5.9 displays the posterior distributions for the 8-schools model resulting from three different choices of prior distributions that are intended to be noninformative.

![Inverse Gamma](assets/inverse_gamma.png)

The first histogram (on the left) shows what we think about the parameter $\tau$ when we use a uniform prior distribution. The data suggest that $\tau$ could be anywhere below $20$, but there's a small chance it could be even larger. This makes sense because we only have data from $8$ groups, and it's hard to be sure about large values of $\tau$ with that little data.

Now, look at the second histogram (in the middle). Here, we've changed our prior to something called an $\text{inverse-gamma}(1, 1)$ distribution. This changes our conclusions. Now, our estimate for $\tau$ is lower, and we're more confident in our estimates for the individual group parameters ($\theta_j$'s). To understand why this happens, let's think about the shape of our prior distribution. With the inverse-gamma prior, it's concentrated in a narrow range, from $0.5$ to $5$. This means it's not giving much weight to really large or really small values of $\tau$. In comparison, the uniform prior seemed less informative, meaning it didn't strongly influence our conclusions.

The last histogram (on the right) in Figure 5.9 shows what happens when we use a different kind of prior distribution called $\text{inverse-gamma}(0.001, 0.001)$ for $\tau$ squared. This prior is very sharply peaked near zero, meaning it puts a lot of emphasis on very small values of $\tau$. Because of this, our conclusions from the data get distorted. Even though the data might suggest that $\tau$ could be larger, the prior is pulling our estimates towards smaller values. The reason this happens is because the likelihood for $\tau$, stays high near zero. So even though our data might suggest that larger values of $\tau$ are possible, the strong influence of the prior near zero pulls our estimates towards smaller values.

In this example, we're not considering two other options:

- Using a uniform prior distribution on the logarithm of $\tau$, which would result in an improper posterior density with a spike at $\tau = 0$, similar to the last histogram but even more pronounced.
- Using a uniform prior distribution directly on $\tau^2$, which would result in a posterior distribution similar to the first histogram, but with a slightly higher tail on the right side.

## Application for the 3-schools problem

The uniform prior distribution seems fine for the 8-school analysis, but problems arise if the number of groups $J$ is much smaller, in which case the data supply little information about the group-level variance, and a noninformative prior distribution can lead to a posterior distribution that is improper or is proper but unrealistically broad.

![Posterior Distribution over the hyperparameters](assets/3_school_prior_distribution.png)

Figure 5.10 displays the inferences for $\tau$ based on two different priors. We start with a default uniform distribution, which means we're not favoring any particular values for our parameter $\tau$. This worked well when we had data from $8$ groups (as seen in Figure 5.9). But now, we're looking at a new dataset with only $3$ groups. Unfortunately, the resulting histogram (the left one in Figure 5.10) shows that the posterior distribution for $\tau$ has a really long tail on the right side. This means it's suggesting values of $\tau$ that are way too high to be reasonable.

This long tail is expected because we have such a small number of groups (if we had even fewer groups, the tail would be even longer, going on forever). Using this kind of posterior distribution can be a problem because it means we're not pooling the estimates of the school effects ($\theta_j$) as much as we should be.

The last histogram (on the right) in Figure 5.10 shows what happens when we use a different kind of prior distribution called a half-Cauchy. We set the scale parameter ($A$) of this prior to $25$. We chose this value to be a bit higher than what we expect for the standard deviation of the underlying $\theta_j$'s in our educational testing example. This way, our model only weakly constrains the parameter $\tau$. On the graph, you'll see a line that represents this prior distribution. It's highest for values of $\tau$ less than $50$ and gradually falls off beyond that. This means the prior puts more weight on smaller values of $\tau$ but still allows for larger values.

This half-Cauchy prior distribution would also perform well in the 8-schools problem; however it was unnecessary because the default uniform prior gave reasonable results. With only 3 schools, we went to the trouble of using a weakly informative prior, a distribution that was not intended to represent our actual prior state of knowledge about $\tau$ but rather to constrain the posterior distribution, to an extent allowed by the data.
