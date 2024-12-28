# Particle Filter

## Intro

With particle filters we are not restricting ourselves with parametric probability distributions like we do for example with Kalman Filters where we use Gaussian distributions.

As usual, we suppose we are given a map, and instead of using one parametric from we use non-parametric samples as a hypothesis of where the system might be.

So, we are going to leave behind Gaussian distributions to describe the estimate:

![Gaussian Filters](assets/gaussian_filters.png)

And we are going to model our estimate using an arbitrary distribution:

![Flexible Distribution](assets/flexible_distribution.png)

It turns out that we can describe this kind of distribution using samples:

![Describe Distribution with Samples](assets/flexible_distribution_with_samples.png)

As you can see, the amount of samples in the areas where the density of the probability distribution is higher is also higher and vice versa.

Basically we have samples distributed over a state space, so imagine each sample signifies a little bit of probability mass, so we only need to count how many samples fall into a certain region to asses the probability that the system is in that region.

Also, we can weight our samples, so the larger the weight the larger the probability mass associated with that sample (taking into account that the sum of the weight have to amount to one). The weighting of the samples allows us to use less samples to represent the same probability distribution:

![Weigting the samples](assets/weighted_samples.png)

Note that by using samples we are computing an approximation of the probability function. And we use this weighted samples to estimate our belief. Some examples are:

![Examples of particle approximation](assets/particle_approximation.png)

We use the particles to approximate the probability function, where the more particles fall into a region, the higher the probability of the region.

## Particle Set

We represent the sample set or particle set as follows:

$$\begin{aligned}
\mathcal{X} = \{\langle x^{[j]}, w^{[j]}\rangle\}_{j=1\cdots J}
\end{aligned}$$

Where:

* There are $J$ samples
* $x^{[j]}$ represents the hypothesis (i.e. the state of the system)
* $w^{[j]}$ represents the normalized weight assigned to jth particle

The sum or integration over the particles represent the posterior (i.e. the probability function):

$$\begin{aligned}
p(x) = \sum_{j=1}^J w^{[j]} \delta_{x^{[j]}} (x)
\end{aligned}$$

Where $\delta$ is the Dirac function. Note that $\int \delta(x) dx = 1$

## Particle Generation

### Gaussian Sampling

Note that closed form sampling is only possible for a few distributions, for example:

![Gaussian Closed Form Samping](assets/sample_gaussian.png)

For a Gaussian distribution to obtain an approximation from sampling, we would sample by summing $12$ times a random (uniformly drawn) number $x \in [-\sigma, \sigma]$, where $\sigma$ represents the standard deviation, and divide the sum by $\frac{1}{2}$. Then you would draw samples that are approximately close to a Gaussian distribution.

### Importance Sampling Principle

But, how can we approximate for another probability distribution functions? It turns out we can do this by sampling from a different probability function that the actual probability function and then compensating for the mistakes that we have done by drawing from this "mistaken" probability function. To do this we apply the Importance Sampling Principle which tells us:

* We can use a different distribution (proposal distribution) $\pi$ to generate samples from the target (real) distribution $f$.
* We need to account for the differences between $\pi$ and $f$ using a weight, given by $\omega = \frac{f(x)}{\pi{x}}$
* We need to assert the following pre-condition: $f(x) > 0 \rightarrow \pi(x) > 0$

![Importance Sampling Principle](assets/importance_sampling_principle.png)

You can see that the weights are larger where the difference between the proposal and the target function is bigger. Observe on the right side of the graph that we have drawn a low number of samples because our proposal probability function tells us the us the density on that region is low. However the target function shows a high probability in that same region, so by computing the difference between the proposal and the target function we assign bigger weights to those few particles. 

## Characteristics

* It is a recursive Bayes Filter
* Uses a non-parametric approach
* Models the distribution using samples and so the model need not be linear.
* The prediction step consists of drawing samples from the proposal function (takes the motion into account)
* The correction step consists of weighting the samples by the ration between the target function and the proposal function (takes the observation into account)
* The more particles we use to approximate the probability function the better the estimate is.

## Algorithm

The algorithm is composed of the following three steps:

* (Prediction Step) Sample the particles using the proposal distribution (this signifies: where could my system be?). Because we can choose the proposal function, what we do in this step is sampling from the motion model:

$$\begin{aligned}
x_t^{[j]} \sim proposal(x_t|\cdots)
\end{aligned}$$

* (Correction Step) Compute the importance weights to compensate from the mistakes made by sampling from the proposal distribution. If we derive the following expression, we obtain that the weights are given by the observation model:

$$\begin{aligned}
w_t^{[j]} = \frac{target(x_t^{j})}{proposal(x_t^{j})}
\end{aligned}$$

* Resampling: draw with replacement $J$ samples $i$ with probability $w_t^{[i]}$. 

So now we have a resampled set of samples where we update the weights by dividing the by $1/J$ so they are normalized. What we do is generate a new set of samples where we replace the weight by the frequency. 

We do this because we work with a finite number of samples, so it could be the case that some particles have a very low probability and thus contribute very little to approximating the probability function. So it is better to eliminate those samples and replace them with a sample that is located in an area with high probability.

![Particle Filter Algorithm](assets/particle_filter_algorithm.png)

* We start with a empty sample set for the prediction step $\hat{\mathcal{X}}_t$ and for the correction step $\mathcal{X}_t$.
* (Prediction step) For $j=1\cdots J$: 
  * Sample particle $x^{[j]}_t$ from the proposal distribution $\pi(x_t)$, this distribution can be defined by the user, and corresponds to the belief at time $t-1$ and constrained to the control command at time $t$, $u_t$.
  * Compute the weight by obtaining the difference between the proposal distribution and the target distribution. This results in using the observation model
  * Save the pair $x_t^{[j]}$, $w_t^{[j]}$ to the prediction sample set $\hat{\mathcal{X}}_t$.
* (Correction step) For $j=1\cdots J$: 
  * Draw a particle $X_t^{[j]}$ with replacement from the prediction sample set with probability proportional to the weight of the sample $w_t^{[j]}$.
  * Add the particle to the correction sample set $\mathcal{X}_t$
* Return the resampled sample set $\mathcal{X}_t$

## Summary

What the particle filter does is:

* It takes each particle as a pose hypothesis that says "This is where the system is at time $t$".
* Then it adds weight to each particle signifying how much that pose hypothesis conforms to the given observation, and tells us how likely the hypothesis is.
* If we do this with $N$ particles what we obtain is a belief, that is, a set of possibilities of where we are which describe my probability distribution.

## Monte Carlo Localization

Monte Carlo Localization refers to the estimation the location and orientation of the system using a particle filter.

For example:

![Example of Monte Carlo Localization](assets/localization_with_particle_filter.png)

With a particle filter, our belief shows where the robot is located by having a bigger density of particles right under where the robot is.

Another example is the following, where we start with all the particles scattered over the map that means the particles are sampled from a uniform distribution so every point in space is equally likely to be the location of the robot. 

Once the robot drives around and obtains new measurements the probability mass concentrates on places where the robot is more likely to be in given the motion commands and the observations. 

Eventually the system converges and you end up with a unimodal distribution that is similar to a Gaussian distribution.

![Another Monte Carlo Localization Example](assets/example_monte_carlo_map.png)

### Structure

* Each particle represents a pose hypothesis
* We represent the proposal probability function by drawing from the motion model. Because we are sampling from the motion distribution what we do is increasing the uncertainty about the motion at time $t$ and thus account for the noise present in each motion.

$$\begin{aligned}
x_t^{[j]} \sim p(x_t|x_{t-1}, u_t)
\end{aligned}$$

* We apply the correction via the observation model. So the weight of each particle is proportional to the likelihood of an observation $z_t$ given i know where I am $x_t$ and the map of the environment $m$. This result is dependent of the choice made previously of sampling from the motion model.

$$\begin{aligned}
w_t^{[j]} = \frac{target}{proposal} \propto p(z_t|x_t,m)
\end{aligned}$$

### Particle Filter Algorithm for Localization

We modify slightly our particle filter algorithm to use it for localization:

![Particle Filter Algorithm for Localization](assets/particle_filter_algorithm_localization.png)

* We sample from the motion model $p(x_t|u_t, x^{[j]}_{t-1})$ instead from the generic proposal function $\pi(x_t)$
* We compute the weights with $w_t^{[j]} = \frac{target}{proposal} \propto p(z_t|x_t,m)$.

### Example

First we start with a uniform distribution, and we sample from that distribution, obtaining $J$ particles distributed over the space with the same probability. 

![Prediction step](assets/monte_carlo_localization_prediction.png)

Then we obtain an observation, and in the weighting step we increase the weight of the samples with are more likely given the observation. In this case the samples in front of doors, while the rest of the particles get a lower weight.

![Correction step](assets/monte_carlo_localization_correction.png)

Then we apply resampling to replace weight by frequencies (the probability mass of a particle is bigger if this particle has been resampled several times, which means it weight was bigger than the rest of the samples). In the following picture the resampling step is executed along with the motion step (so the probability function is offsetted):

![Resampling step](assets/monte_carlo_resampling.png)

Because the prediction/motion was already performed before, now we obtain another observation:

![Second Correction Step](assets/monte_carlo_second_correction.png)

When we obtain the weights, two things happen. First, and as before, the particles (pose hypothesis) more likely to be correct given the observation obtain a larger weight. Second, because the is a bigger number of particles in front of the second door the density in this area is bigger than in the areas in front of the other doors. Another resampling and prediction step:

![Second Resampling Step](assets/monte_carlo_second_resampling.png)

## Resampling Techniques

### Roulette wheel

First we create a roulette wheel where each field represents a particle, and the bigger the weight associated with that particle the bigger the field is:

![Wheel Roulette](assets/wheel_roulette.png)

The idea is that, we normalize the weights, and each time we draw a number between zero and one, which will "point" to a weight.

![Wheel Resampling](assets/wheen_resampling.png)
![Wheel Resampling](assets/wheel_resampling_1.png)

However this method can lead to suboptimal solutions. Suppose that for some reason each time we end up with uniform weight, so that no particle is more likely than any other. Then, with the wheel roulette we will duplicate some particles and remove some others. However this does not make sense, because every particle had the same weight.

Thus we introduce the lower variance resampling.

### Low Variance Resampling

Here, the idea is using $J$ arrows instead of only one, where the arrows are at the same angular distance from each other. So in order to sample what we do is, we simply turn the arrows, and where all the arrows end up, that is the samples we choose.

![Low Variance Resampling](assets/low_variance_resampling.png)

This solution is faster, with time complexity equal to $O(J)$ compared to the wheel roulette's $O(J \log J)$, and resolves the suboptimal solution problem presented earlier.

#### Algorithm

* First we draw a random number between $0$ and $\frac{1}{J}$
* Then we pick $J-1$ particles by advancing in the array in steps of $\frac{1}{J}$

![Low Variance Resampling](assets/low_variance_resampling_array.png)

To efficiently implement this what we do is, in each element of the array we store the cummulative weight up until that point:

![Low Variance Resampling](assets/low_variance_resampling_cummulative.png)

So, we draw a random number between $0$ and $\frac{1}{J}$, if that number is bigger than the weight accumulated up until weight $i$, then we move to the next one, else if it is less we sample the particle $i$. And then we advance $\frac{1}{J}$.

![Low Variance Resampling Algorithm](assets/low_variance_resampling_algorithm.png)
