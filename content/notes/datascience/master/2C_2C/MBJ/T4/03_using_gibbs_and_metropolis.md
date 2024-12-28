# Using Gibbs and Metropolis as Building Blocks

## Interpretation of the Gibbs Sampler as a Special Case of the Metropolis-Hastings Algorithm

We first define iteration $t$ to consist of a series of $d$ steps, with step $j$ of iteration $t$ corresponding to an update of the subvector $\theta_j$ conditional on all the other elements of $\theta$. Then the jumping distribution, $J_{j,t}(\cdot|\cdot)$ is defined as follows:

$$\begin{aligned}
J_{j, t}^{\text{Gibbs}}(\theta^*|\theta^{t-1}) = \begin{cases}
p(\theta_j^**|\theta_{-j}^{t-1}, y) & \text{ if } \theta_{-j}^** = \theta_{-j}^{t-1} \\
0 & \text{ otherwise}
\end{cases}
\end{aligned}$$

Such that at step $j$ of iteration $t$ it only jumps along the $j$th subvector, and does so with the conditional posterior density of $\theta_j$ given $\theta_{-j}^{t - 1}$.

The only possible jumps are to parameter vectors $\theta^*$ that match $\theta^{t-1}$ on all components other than the $j$th. Under this jumping distribution, the ratio at the $j$th step of iteration t is:

$$\begin{aligned}
r = \frac{\frac{p(\theta^**|y)}{J_{j, t}^{\text{Gibbs}}(\theta^**|\theta^{t-1})}}{\frac{p(\theta^{t-1}|y)}{J_{j,t}^{\text{Gibbs}}(\theta^{t-1}|\theta^*)}}
\end{aligned}$$

$$\begin{aligned}
= \frac{\frac{p(\theta^**|y)}{p(\theta_j^**|\theta^{t-1}_{-j}, y)}}{\frac{p(\theta^{t-1}|y)}{p(\theta^{t-1}_j|\theta^{t-1}_{-j}, y)}}
\end{aligned}$$

$$\begin{aligned}
= \frac{p(\theta^{t-1}_{-j}, y)}{p(\theta^{t-1}_{-j}, y)}
\end{aligned}$$

$$\begin{aligned}
= 1
\end{aligned}$$

and thus every jump is accepted. The second line above follows from the first because, under this jumping rule, $\theta^**$ differs from $\theta^{t−1}$ only in the $j$th component. The third line follows from the second by applying the rules of conditional probability to $\theta = (\theta_j, \theta_{−j})$ and noting that $\theta^**_{-j} = \theta^{t-1}_{-j}$.

It is possible to define Gibbs sampling without the restriction that each component be updated in each iteration, as long as each component is updated periodically.

## Gibbs Sampler with Approximations

For some problems, sampling from some, or all, of the conditional distributions $p(\theta_j|\theta_{−j}, y)$ is impossible, but one can construct approximations, which we label $g(\theta_j|\theta_{−j})$, from which sampling is possible. The jumping function at the jth Metropolis step at iteration $t$ is then:

$$\begin{aligned}
J_{j, t}(\theta^*|\theta^{t-1}) = \begin{cases}
g(\theta^**_j|\theta_{-j}^{t-1}) & \text{ if } \theta^**_{-j} = \theta^{t-1}_{-j} \\
0 & \text{ otherwise }
\end{cases}
\end{aligned}$$

and the ratio $r$ must be computed and the acceptance or rejection of $\theta^*$ decided.
