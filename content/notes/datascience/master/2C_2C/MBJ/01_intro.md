# T1. Introduccion a la Inferencia Bayesiana

## The three steps of Bayesian data analysis

The process of Bayesian data analysis can be idealized by dividing it into the following three steps:

1. Setting up a **full probability model**: a joint probability distribution for all observable and unobservable quantities in a problem.
2. **Conditioning on observed data**: calculating and interpreting the appropriate posterior distribution.
3. **Evaluating the fit of the model** and the implications of the resulting posterior distribution

We distinguish between two kinds of estimands

- Quantities that are **not directly observable**: for example, parameters that govern the hypothetical process leading to the observed data, for which statistical inferences are made.
- Potentially **observable quantities** (such as future observations of a process, or the outcome under the treatment not received)

## Notation

- $\theta$: Unobservable vector quantities or population parameters.
- $y$: Observed data
- $\tilde{y}$: Unknown, but potentially observable, quantities.

### Exchangeability

We assume assume that the $n$ values $y_i$ may be regarded as **exchangeable**.

We express uncertainty as a joint probability density $p(y_1, \cdots, y_n)$ that is invariant to permutations of the indexes.

We commonly model data from an exchangeable distribution as **independently and identically distributed (iid)**.

### Explanatory variables

Observations on each unit that we do not model as random.

### Hierarchical modeling

Hierarchical models (also called **multilevel models**), which are used when information is available on several different levels of observational units. 

## Bayesian inference

We define a **prior distribution** $p(\theta)$, and a **sampling distribution** (or **data distribution**) is given by $p(y|\theta)$, such that the joint probability distribution for $\theta$ and $y$ is obtained as follows:

$$\begin{aligned}
p(\theta,y) = p(\theta|y)p(y)
\end{aligned}$$

By Baye's rule:

$$\begin{aligned}
p(\theta|y) = \frac{p(\theta, y)}{p(y)} = \frac{p(y|\theta)p(\theta)}{p(y)}
\end{aligned}$$

where $p(y) = \sum_y p(y, \theta) = \sum_y p(y|\theta) p(y) = \int_y p(y|\theta) p(y) dy$

An equivalent form is omitting the factor $p(y)$, yielding the **unnormalized posterior density**:

$$\begin{aligned}
p(\theta|y) \propto p(y|\theta)p(\theta)
\end{aligned}$$

### Prediction

The **marginal distribution** of $y$ or **prior predictive distribution** is given by:

$$\begin{aligned}
p(y) = \int p(y, \theta) dy = \int p(y|\theta) p(\theta) d\theta
\end{aligned}$$

The distribution of $\tilde{y}$ is called the **posterior predictive distribution**, posterior because it is conditional on the observed $y$ and predictive because it is a prediction for an observable $\tilde{y}$. It is defined as the marginalization of $\tilde{y}$ over $y$.

$$\begin{aligned}
p(\tilde{y}|y) = \int p(\tilde{y}, \theta|y)d\theta
\end{aligned}$$

We note that the statistical process is also conditioned on the unobservable data $\theta$. Por la propiedad $P(X, Y|Z) = P(X|Y, Z)P(Z)$:

$$\begin{aligned}
= \int p(\tilde{y}|y, \theta)p(\theta|y) d\theta
\end{aligned}$$

Asumimos independencia condicional entre $y$ y $\tilde{y}$:

$$\begin{aligned}
= \int p(\tilde{y}|\theta)p(\theta|y) d\theta
\end{aligned}$$

### Likelikhood

When regarded as a function of $\theta$, for fixed y $p(y|\theta)$ is the **likelihood function**.

### Likelihood and odds ratios

Odds a posteriori:

$$\begin{aligned}
\frac{p(\theta_1|y)}{p(\theta_2|y)} = \frac{\frac{p(y|\theta_1)p(\theta_1)}{p(y)}}{\frac{p(y|\theta_2)p(\theta_2)}{p(y)}} = \frac{p(y|\theta_1)p(\theta_1)}{p(y|\theta_2)p(\theta_2)}
\end{aligned}$$

Odds a priori:

$$\begin{aligned}
\frac{p(\theta_1)}{p(\theta_2)}
\end{aligned}$$

Likelihood ratio:

$$\begin{aligned}
\frac{p(\theta_1|y)}{p(\theta_2|y)}
\end{aligned}$$

## Probability theory

The expected value of a continuous random variable $u$ is given by:

$$\begin{aligned}
\mathbb{E}[u] = \int u p(u)du
\end{aligned}$$

The variance for a continuous random variable $u$ is given by:

$$\begin{aligned}
\mathbb{E}[u] = \int (u - \mathbb{E}[u])^2 p(u)du
\end{aligned}$$

The expected value of a discrete random variable $u$ is given by:

$$\begin{aligned}
\mathbb{E}[u] = \sum u p(u)
\end{aligned}$$

The variance for a discrete random variable $u$ is given by:

$$\begin{aligned}
\mathbb{E}[u] = \sum (u - \mathbb{E}[u])^2 p(u)
\end{aligned}$$

### Means and variances of conditional distributions

Given two continuous random variables $u$ and $y$, the mean of $u$ can be obtained by **averaging the conditional mean over the marginal distribution of** $v$:

$$\begin{aligned}
\mathbb{E}(u) = \int u p(u) du = \int u \left(\int p(u, v)\right) dv du
\end{aligned}$$

$$\begin{aligned}
= \int \left(\int u p(u|v) du \right) p(v) dv = \int \mathbb{E}_u[u|v] p(v) dv = \mathbb{E}_v[\mathbb{E}_u[u|v]]
\end{aligned}$$

The corresponding result for the variance:

$$\begin{aligned}
\mathbb{V}[u] = \mathbb{E}[\mathbb{V}[u|v]] - \mathbb{V}[\mathbb{E}[u|v]]
\end{aligned}$$

### Transformation of variables

Suppose $p_u(u)$ is the density of the vector $u$, and we transform to $v = f(u)$, where $v$ has the same number of components as $u$. If $p_u$ is a discrete distribution, and $f$ is a one-to-one function, then the density of $v$ is given by:

$$\begin{aligned}
p_v(v) = p_u(f^{-1}(v))
\end{aligned}$$

If $p_u$ is a continuous distribution, and $v = f(u)$ is a one-to-one transformation, then the joint density of the transformed vector is:

$$\begin{aligned}
p_v(v) = |J| p_u(f^{-1}(v))
\end{aligned}$$

where $|J|$ is the absolute value of the determinant of the Jacobian of the transformation $u = f^{−1}(v)$ as a function of $v$.
