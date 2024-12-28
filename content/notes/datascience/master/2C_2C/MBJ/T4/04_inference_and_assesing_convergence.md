# Inference and Assessing Convergence

## Difficulties of Inference from Iterative Simulation

Iterative simulation adds two challenges to simulation inference:

1. If the iterations have not proceeded long enough the simulations may be unrepresentative of the target distribution ([Figure 11.1a](./01_gibbs_sampler#Introduction))
2. The iterative simulation draws present within-sequence correlation.

Serial correlation in the simulations is not necessarily a problem because, at convergence, the draws are identically distributed as $p(\theta|y)$. But such correlation can cause inefficiencies in simulations.

We handle these problems as follows:

1. We design the simulation runs to allow effective monitoring of convergence by simulating multiple sequences with starting points dispersed throughout parameter space.
2. We monitor the convergence of all quantities of interest by comparing variation between and within simulated sequences until "within" variation roughly equals "between" variation. Only when the distribution of each simulated sequence is close to the distribution of all the sequences mixed together can they all be approximating the target distribution.
3. If the simulation efficiency is low, the algorithm may be altered.

## Discarding Early iterations of the Simulation Runs

To diminish the influence of the starting values, we discard the first half of each sequence and focus attention on the second half. So our inferences will be based on the assumption that the distributions of the simulated values $\theta_t$, for large enough $t$, are close to the target distribution, $p(\theta|y)$.

We refer to the practice of discarding early iterations in Markov chain simulation as warm-up. Depending on the context, different warm-up fractions (number of elements on the sequence to discard) can be appropriate.

## Dependence of the Iterations in each Sequence

Once approximate convergence has been reached, is whether to thin the sequences by keeping every $k$th simulation draw from each sequence and discarding the rest. Whether or not the sequences are thinned, if the sequences have reached approximate convergence, they can be directly used for inferences about the parameters $\theta$ and any other quantities of interest.

## Multiple Sequences with Overdispersed Starting Points

Our recommended approach to assessing convergence of iterative simulation is based on comparing different simulated sequences, as illustrated in [Figure 11.1](./01_gibbs_sampler#Introduction).

In Figure 11.1a, the multiple sequences clearly have not converged; the variance within each sequence is much less than the variance between sequences. Later, in Figure 11.1b, the sequences have mixed, and the two variance components are essentially equal.

## Monitoring Scalar Estimands

We monitor each scalar estimand or other scalar quantities of interest separately. Estimands include all the parameters of interest in the model and any other quantities of interest (for example, the ratio of two parameters or the value of a predicted future observation). It is often useful also to monitor the value of the logarithm of the posterior density, which has probably already been computed if we are using a version of the Metropolis algorithm.

## Challenges of Monitoring Convergence: Mixing and Stationarity

Figure 11.3a illustrates that, to achieve convergence, the sequences must together have mixed. The second graph in Figure 11.3 shows two chains that have mixed, in the sense that they have traced out a common distribution, but they do not appear to have converged. Figure 11.3b illustrates that, to achieve convergence, each individual sequence must reach stationarity.

![Convergence Monitorization](assets/convergence_monitorization.png)

So to check convergence we have to simultaneously tests mixing (if all the chains have mixed well, the separate parts of the different chains should also mix) and stationarity (at stationarity, the first and second half of each sequence should be traversing the same distribution).

## Splitting each Saved Sequence into Two Parts

We diagnose convergence (as noted above, separately for each scalar quantity of interest) by checking mixing and stationarity. Our approach consists on splitting each chain in half and check that all the resulting halfsequences have mixed. 

1. We start with some number of simulated sequences in which the warm-up period has already been discarded. 
2. We then take each of these chains and split into the first and second half.
3. Let $m$ be the number of chains (after splitting) and $n$ be the length of each chain.

For example, suppose we simulate $5$ chains, each of length $1000$, and then discard the first half of each as warm-up. We are then left with $5$ chains, each of length $500$, and we split each into two parts: iterations $1–250$ (originally iterations $501–750$) and iterations $251–500$ (originally iterations $751–1000$). We now have $m = 10$ chains, each of length $n = 250$.

## Assessing Mixing using Between- and Within-Sequence Variances

For each scalar estimand $\psi$, we label the simulations as $\psi_{ij}, (i = 1, \cdots, n; j = 1, \cdots, m)$, and we compute $B$ and $W$, the between- and within-sequence variances:

$$\begin{aligned}
B = \frac{n}{m - 1} \sum_{j=1}^m (\overline{\psi}_{.j} - \overline{\psi}_{..})^2
\end{aligned}$$

where:

$$\begin{aligned}
\overline{\psi}_{.j} = \frac{1}{n} \sum_{i=1}^n \psi_{ij}
\end{aligned}$$

$$\begin{aligned}
\overline{\psi}_{..} = \frac{1}{m} \sum_{j=1}^m \overline{\psi}_{.j}
\end{aligned}$$

and

$$\begin{aligned}
W = \frac{1}{m} \sum_{j=1}^m s_{j}^2
\end{aligned}$$

where

$$\begin{aligned}
s^2_j = \frac{1}{n - 1} \sum_{i = 1}^n (\psi_{ij} - \overline{\psi}_{.j})^2
\end{aligned}$$

We can estimate $\mathbb{V}[\psi|y]$, the marginal posterior variance of the estimand, by a weighted average of $W$ and $B$, namely:

$$\begin{aligned}
\hat{\mathbb{V}}^+[\psi|y] = \frac{n - 1}{n}W + \frac{1}{n} B
\end{aligned}$$

This quantity overestimates the marginal posterior variance assuming the starting distribution is appropriately overdispersed, but is unbiased under stationarity.

Meanwhile, for any finite $n$, the "within" variance $W$ should be an underestimate of $\mathbb{V}[\psi|y]$ because the individual sequences have not had time to range over all of the target distribution and, as a result, will have less variability; in the limit as $n \rightarrow \infty$, the expectation of $W$ approaches $\mathbb{V}[\psi|y]$.

We monitor convergence of the iterative simulation by estimating the factor by which the scale of the current distribution for $\psi$ might be reduced if the simulations were continued in the limit $n \rightarrow \infty$. This potential scale reduction is estimated by:

$$\begin{aligned}
\hat{R} = \sqrt{\frac{\hat{\mathbb{V}}[\psi|y]}{W}}
\end{aligned}$$

which declines to $1$ as $n \rightarrow 1$. If the potential scale reduction is high, then we have reason to believe that proceeding with further simulations may improve our inference about the target distribution of the associated scalar estimand.

### Example. Bivariate Unit Normal Density with Bivariate Normal Jumping Kernel (continued)

Table 11.1 displays posterior inference for the two parameters of the distribution as well as the log posterior density.

![Simulation Convergence Evaluation](assets/simulation_convergence_evaluation.png)

After $50$ iterations, the variance between the five sequences is much greater than the variance within, for all three univariate summaries considered. However, the five simulated sequences have converged adequately after $2000$ or certainly $5000$ iterations for the quantities of interest.

The comparison with the true target distribution shows how some variability remains in the posterior inferences even after the Markov chains have converged.

The method of monitoring convergence presented here has the key advantage of not requiring the user to examine time series graphs of simulated sequences. Inspection of such plots is a notoriously unreliable method.
