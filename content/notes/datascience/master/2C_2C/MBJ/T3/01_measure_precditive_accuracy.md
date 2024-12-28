# Measures of Predictive Accuracy

### Point Prediction

In **point prediction** (predictive point estimation or point forecasting) a single value is reported as a prediction of the unknown future observation. Measures of predictive accuracy for point prediction are called **scoring functions**. 

For example, the **mean squared error**:

$$\begin{aligned}
\frac{1}{n} \sum_{i=1}^n (y_i - \mathbb{E}[y_i|\theta])^2
\end{aligned}$$

or its weighted version:

$$\begin{aligned}
\frac{1}{n} \sum_{i=1}^n \frac{(y_i - \mathbb{E}[y_i|\theta])^2}{\mathbb{V}[y_i|\theta]} 
\end{aligned}$$

These are easy to compute but they are less appropiated for models that are far from the normal distribution.

### Probabilistic Prediction

In **probabilistic prediction** (probabilistic forecasting) the aim is to report inferences about
$\hat{y}$ in such a way that the full uncertainty over $\hat{y}$ is taken into account. These are called **scoring rules**. Examples include the quadratic, logarithmic, and zero-one scores

Good scoring rules for prediction are:

- Proper: the scoring rule encourages the decision maker to be honest when reporting their beliefs.
- Local: the scoring rule takes into account the fact that some predictions may be worse than others, and it adjusts accordingly.

For example the **log predictive density** or **log-likelihood**, $p(y|\theta)$, which is proportional to the mean squared error if the model is normal with constant variance.

Why not use the log posterior? The answer is that we are interested here in summarizing the fit of model to data, and for this purpose the prior is relevant in estimating the parameters but not inassessing a model's accuracy. We are not saying that the prior cannot be used in assessing a model's fit to data; rather we say that the prior density is not relevant in computing predictive accuracy.

## Predictive accuracy for a single data point

The best way to measure how well a model fits is by seeing how accurately it predicts outcomes in new data that it hasn't seen before (out-of-sample predictive performance), but that comes from the same process as the original data.

We label $f$ as the true model, $y$ as the observed data and $\tilde{y}$ as future data. The out-of-sample predictive fit for a new data point $\tilde{y}_i$ using logarithmic score is:

$$\begin{aligned}
\log p_{\text{post}}(\tilde{y}_i) = \log \mathbb{E}_{\text{post}}[p(\tilde{y}_i|\theta)] = 
\end{aligned}$$

By the definition of the expected value for a random variable:

$$\begin{aligned}
= \log \int p(\tilde{y}_i|\theta) p_{\text{post}}(\theta)d\theta
\end{aligned}$$

where $p_{\text{post}}(\tilde{y}_i)$ is the predictive density for $\tilde{y}_i$ induced by the posterior distribution $p_{\text{post}}(\theta)$.

Note that we use $p_{\text{post}}$ and $\mathbb{E}_{\text{post}}$ to denote any probability or expectation that averages over the posterior distribution of $\theta$.

## Averaging over the distribution of future data

The future data $\tilde{y}_i$ are themselves unknown and thus we define the expected out-of-sample log predictive density. By the definition of expected value of the function $\log (x)$ over $\tilde{y}$ with respect to a function $f$ that describes the distribution of the data, we compute the **expected log predictive density** or elpd for a new data point as follows:

$$\begin{aligned}
\mathbb{E}_f[\log p_{\text{post}}(\tilde{y}_i)] = \int \log (p_{\text{post}}(\tilde{y}_i)) f(\tilde{y}_i) d\tilde{y}
\end{aligned}$$

In general we do not know the data distribution $f$. A natural way to estimate the expected out-of-sample log predictive density would be to plug in an estimate for $f$, but this will tend to imply too good a fit. For now we consider the estimation of predictive accuracy in a Bayesian context. One can define a measure of predictive accuracy for the $n$ data points taken one at a time:

$$\begin{aligned}
\sum_{i=1}^n \mathbb{E}_f[\log(p_{\text{post}}(\tilde{y}_i))]
\end{aligned}$$

This gives us the **expected log pointwise predictive density** for a new dataset.

Using a single-point measure instead of dealing with the entire set of predictions (the joint distribution $p_{\text{post}}(\tilde{y})$) allows us to connect it to cross-validation, which helps us approximate how well our model performs on new data based on the data we already have.

It is sometimes useful to consider predictive accuracy given a point estimate $\theta(\tilde{y})$ (sampled data point given the parameter $\theta$?). This gives us the **expected log predictive density** given $\hat{\theta}$:

$$\begin{aligned}
\mathbb{E}_f[\log(p(\tilde{y}|\theta))]
\end{aligned}$$

## Evaluating predictive accuracy for a fitted model

In practice the parameter $\theta$ is not known, so we cannot know the log predictive density $\log p(y|\theta)$, which tells us how well our model predicts new data based on $\theta$. So, instead of using $\theta$ directly, we use something called the posterior distribution, denoted as $p_{\text{post}}(\theta) = p(\theta|y)$. This distribution gives us a range of possible values for $\theta$ based on the data we have. From this distribution, we can summarize how accurately our model predicts new data. So we define the **log pointwise predictive density** or lppd as:

$$\begin{aligned}
\log \prod_{i=1}^n p_{\text{post}}(y_i) = \sum_{i=1}^n \log \int p(y_i|\theta)p_{\text{post}}(\theta)d\theta
\end{aligned}$$

To calculate this predictive density, we can use samples drawn from the posterior distribution $p_{\text{post}}(\theta)$ using simulation. These samples are labeled as $\theta_s$, where $s$ ranges from $1$ to $S$. So we define the **computed log pointwise predictive density** or computed lppd as:

$$\begin{aligned}
\sum_{i=1}^n \log \left(\frac{1}{S}\sum_{s=1}^S p(y_i|\theta^s)\right)
\end{aligned}$$

We basically compute the sample mean of the likelihood $p(y_i|\theta)$ for over all the $\{\theta^s\}_{s=1}^S$ We typically assume that the number of simulation draws $S$ is large enough to fully capture the posterior distribution.

The lppd of observed data y is an overestimate of the elppd for future data. Hence the plan is to start with lppd and then apply some sort of bias correction to get a reasonable estimate of elppd.
