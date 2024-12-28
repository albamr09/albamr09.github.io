# Information criteria and cross-validation

## Estimating out-of-sample predictive accuracy using available data

Several methods are available to estimate the expected predictive accuracy without waiting for out-of-sample data.

- **Within-sample predictive accuracy**: A naive estimate of the expected log predictive density for new data is the log predictive density for existing data using the computed lppd. This summary is in general an overestimate of elppd because it is evaluated on the data from which the model was fit.
- **Adjusted within-sample predictive accuracy**: Given that lppd is a biased estimate of elppd, the next logical step is to correct that bias. Formulas such as AIC, DIC, and WAIC (all discussed below) give approximately unbiased estimates of elppd.
- **Cross-validation**: One can attempt to capture out-of-sample prediction error by fitting the model to training data and then evaluating this predictive accuracy on a holdout set. Cross-validation can be computationally expensive.

## Akaike information criterion (AIC)

In much of the statistical literature on predictive accuracy, inference for $\theta$ is summarized not by a posterior distribution $p_{\text{post}}$ but by a point estimate $\hat{\theta}$, typically the maximum
likelihood estimate. Out-of-sample predictive accuracy is then defined not by the expected log posterior predictive density (elppd) but by $\text{elpd}_{\hat{\theta}} = \mathbb{E}_f[\log p(\tilde{y}|\tilde{\theta}(y))]$.

Let $k$ be the number of parameters estimated in the model. AIC is defined as follows:

$$\begin{aligned}
\hat{\text{elpd}}_{\text{AIC}} = -2 \log p(y|\hat{\theta}_{\text{mle}}) + 2k
\end{aligned}$$

Subtracting $k$ from the log predictive density given the maximum likelihood estimate $\theta_{\text{mle}}$ is a correction to account for how much the fitting of $k$ parameters will increase predictive accuracy, purely by chance.

When we move beyond linear models with simple priors, just adding the number of fitted parameters $k$ to adjust the deviance isn't accurate. Informative priors and hierarchical structures typically decrease overfitting compared to simple estimation methods like least squares or maximum likelihood. In models with informative priors or hierarchical setups, the actual number of parameters depends heavily on the variance of the group-level parameter.

## Deviance Information Criterion (DIC) and Effective Number of Parameters

DIC is a somewhat Bayesian version of AIC making two changes, replacing the maximum likelihood estimate with the posterior mean $\hat{\theta}_{\text{Bayes}} = \mathbb{E}[\theta|y]$ and replacing $k$ with a data-based bias correction. The new measure of predictive accuracy is:

$$\begin{aligned}
\hat{\text{elpd}}_{DIC} = \log p(y|\hat{\theta}_{\text{Bayes}}) - p_{\text{DIC}}
\end{aligned}$$

where $p_{\text{DIC}}$ is the effective number of parameters, defined as:

$$\begin{aligned}
p_{\text{DIC}} = 2 \left(\log p(y|\hat{\theta}_{\text{Bayes}}) - \mathbb{E}_{post}[\log p(y|\theta)]\right)
\end{aligned}$$

where $\mathbb{E}_{post}[\log p(y|\theta)]$ is an average of $\theta$ over its posterior distribution. This is computed using simulation $\theta^s, s= 1, \cdots, S$ as:

$$\begin{aligned}
\text{computed } p_{\text{DIC}} = 2 \left(\log p(y|\hat{\theta}_{\text{Bayes}}) - \frac{1}{S} \sum_{s=1}^S \log p(y|\theta^s)\right)
\end{aligned}$$

When the average value of $\theta$ in the posterior distribution matches the highest point (mode), it leads to the maximum log predictive density.  However, if the average value is significantly different from the mode, it can result in a negative value for $p_{\text{DIC}}$.

An alternative version of DIC uses a slightly different effective number of parameters:

$$\begin{aligned}
p_{\text{DIC}_{\text{alt}}} = 2 \mathbb{V}_{\text{post}}[\log p(y|\theta)]
\end{aligned}$$

Of these two measures, $p_{\text{DIC}}$ is more numerically stable but $p_{\text{DIC}_{\text{alt}}}$ has the advantage of always being positive. The actual quantity called DIC is defined in terms of the deviance rather than the log predictive density; thus:

$$\begin{aligned}
\text{DIC} = -2 \log p(y|\hat{\theta}_{\text{Bayes}}) + 2p_{DIC}
\end{aligned}$$

## Watanabe-Akaike or Widely Applicable Information Criterion (WAIC)

**WAIC** is a more fully Bayesian approach for estimating the out-of-sample expectation. Starting with the computed lppd and then adding a correction for effective number of parameters to adjust for overfitting. Two adjustments have been proposed:

$$\begin{aligned}
p_{\text{WAIC}1} = 2 \sum_{n=1}^n \left(\log(\mathbb{E}_{\text{post}}[p(y_i|\theta)]) - \mathbb{E}_{\text{post}}[\log p(y_i|\theta)] \right)
\end{aligned}$$

computed by replacing the expectations by averages over the $S$ posterior draws $\theta^s$:

$$\begin{aligned}
\text{computed } p_{\text{WAIC}1} = 2 \sum_{n=1}^n \left(\log\left(\frac{1}{S}\sum_{s=1}^S p(y_i|\theta^s)\right) - \frac{1}{S}\sum_{s=1}^S \log p(y_i|\theta^s) \right)
\end{aligned}$$

The other measure uses the variance of individual terms:

$$\begin{aligned}
p_{\text{WAIC}2} = \sum_{i=1}^n \mathbb{V}_{\text{post}}[\log p(y_i|\theta)]
\end{aligned}$$

To compute it we compute the posterior sample variance ($\mathbb{V}_{s=1}^S$) of the log predictive density for each data point $y_i$ and we sum over all the data points:

$$\begin{aligned}
\text{computed } p_{\text{WAIC}2} = \sum_{i=1}^n \mathbb{V}_{s=1}^S[\log p(y_i|\theta^s)]
\end{aligned}$$

We can then use either $p_{\text{WAIC}1}$ or $p_{\text{WAIC}2}$ as a bias correction:

$$\begin{aligned}
\hat{\text{elppd}}_{\text{WAIC}} = \text{lppd} - p_{\text{WAIC}}
\end{aligned}$$

As with $\text{AIC}$ and $\text{DIC}$, we define $\text{WAIC}$ so as to be on the deviance scale:

$$\begin{aligned}
\text{WAIC} = -2\text{lppd} + 2p_{\text{WAIC}2}
\end{aligned}$$

For a normal linear model with a large sample size, known variance, and a uniform prior distribution on the coefficients, $p_{\text{WAIC}1}$ and $p_{\text{WAIC}2}$ are roughly equal to the number of parameters in the model. In general, this adjustment approximates the number of "unconstrained" parameters in the model. A parameter is counted as $1$ if it's estimated without constraints or prior information, $0$ if it's fully constrained, or if all the information comes from the prior distribution, or a value in between if both the data and prior distributions provide information.

WAIC stands out because it averages over the whole posterior distribution rather than relying on a single point estimate, which is what AIC and DIC do. This makes WAIC more relevant when it comes to predicting new data in a Bayesian framework. 

However, using WAIC requires dividing the data into $n$ parts, which can be challenging in certain data setups like time series or spatial data. AIC and DIC don't require this explicit partition, but they assume that residuals are independent given a point estimate $\hat{\theta}$, which may not fully capture posterior uncertainty.

## Effective Number of Parameters as a Random Variable

The number of parameters estimated in a model, as measured by $p_{\text{DIC}}$ and $p_{\text{WAIC}}$, can vary depending on the observed data. 

Let's take a simple example: imagine a model where the data $y_1, \cdots, y_n$ follow a normal distribution with a mean parameter $\theta$ and a known standard deviation of $1$. The parameter $\theta$ is drawn from a uniform distribution between $0$ and infinity, meaning it's positive but otherwise not informative.

Now, consider two scenarios:

1. Imagine you have a bunch of data points, but they are all very close to zero. In this case, the model has to consider that the parameter $\theta$ could be anywhere from very small positive values up to infinity. However, since the data are all close to zero, they don't provide much information about where $\theta$ might lie. The only constraint is that $\theta$ has to be positive. Because the data don't give a strong indication of where $\theta$ might be, we say the effective number of parameters is roughly half. This is because half of the information about $\theta$ comes from the data, and the other half comes from the prior constraint that $\theta$ must be positive.
2. Now, imagine your data points are all large and positive. In this case, the constraint that $\theta$ must be positive doesn't really affect things much because the data already tell us that $\theta$ needs to be positive to explain those large positive values. Since the data provide most of the information about where $\theta$ might lie, we say the effective number of parameters is approximately $1$. This means that the data have a stronger influence on determining $\theta$ in this scenario.
 
This example shows that even with the same model and true parameters, the effective number of parameters can change depending on the observed data.

## Bayesian information criterion (BIC)

BIC is a way to decide between different models by considering both how well the model fits the data and how complex the model is. The formula for BIC is:

$$\begin{aligned}
-2 \log (p(y|\hat{\theta})) + k \log(n)
\end{aligned}$$

where $p(y|\hat{\theta})$ is the likelihood of the data given the estimated parameters, $k$ is the number of parameters in the model  and $n$ is the sample size.

BIC aims to approximate the marginal probability density of the data under the model, which can be used for comparing models and estimating relative posterior probabilities. BIC tends to favor simpler models for large datasets because it penalizes complexity more, so a complicated model may perform well in predicting data but still have a high BIC due to the penalty for complexity.

Unlike AIC, which doesn't take the sample size into account, BIC penalizes complex models more as the sample size increases. Unlike AIC, DIC, and WAIC, BIC doesn't focus on predicting future data but rather on estimating the probability of the observed data under the model.

## Leave-one-out cross-validation

In Bayesian cross-validation, we split the data into two parts: a training set ($y_{\text{ytrain}}$) and a holdout set ($y_{\text{holdout}}$). We repeat this process multiple times, such that for each split:

- We train the model using the training set ($\text{ytrain}$). This gives us a distribution of possible parameter values called $p_{\text{train}}(\theta) = p(\theta|y_{\text{train}})$.
- Then, we use this trained model to make predictions on the holdout set ($y_\text{holdout}$).
- We evaluate the performance of our predictions using the log predictive density:

$$\begin{aligned}
\log p_{\text{train}}(y_{\text{holdout}}) = \log \mathbb{E}_{\text{post}}[p_{\text{train}}(y_{\text{holdout}})] = \log \int p_{\text{pred}}(y_{\text{holdout}}|\theta)p_{\text{train}}(\theta)d\theta
\end{aligned}$$

Assuming the posterior distribution $p(\theta|y_{\text{train}})$ is summarized by $S$ simulation draws $\theta^s$, we calculate the log predictive density as:

$$\begin{aligned}
\log \left(\frac{1}{S} \sum_{s=1}^S p(y_{\text{holdout}}|\theta^s)\right)
\end{aligned}$$

In LOOCV, we split the data into $n$ partitions, where each partition represents a single data point. Performing the analysis for each of the $n$ data points yields n different inferences $p_{\text{post}(-i)}$, each summarized by $S$ posterior simulations, $\theta^{is}$.

The Bayesian LOO-CV estimate of out-of-sample predictive fit is:

$$\begin{aligned}
\text{lppd}_{\text{loo-cv}} = \sum_{i=1}^n \log (p_{\text{post}(-i)}(y_i))
\end{aligned}$$

computed as:

$$\begin{aligned}
\sum_{i=1}^n \log \left(\frac{1}{S} \sum_{s=1}^S p(y_i|\theta^{is})\right)
\end{aligned}$$

Where $\theta^s$ represents the $S$ simulations under the posterior distribution $p(\theta|y_{-1})$.

Each prediction is conditioned on $n − 1$ data points, which causes underestimation of the predictive fit. For large $n$ the difference is negligible, but for small $n$ (or when using $k$-fold cross-validation) we can use a first order bias correction b by estimating how much better predictions would be obtained if conditioning on $n$ data points:

$$\begin{aligned}
b = \text{lppd} - \overline{\text{lppd}}_{-i}
\end{aligned}$$

where:

$$\begin{aligned}
\overline{\text{lppd}}_{-i} = \frac{1}{n} \sum_{i=1}^n \sum_{j=1}^n \log p_{\text{post}(-i)}(y_j)
\end{aligned}$$

computed as:

$$\begin{aligned}
\frac{1}{n} \sum_{i=1}^n \sum_{j=1}^n \log \left(\frac{1}{S} \sum_{s=1}^S p(y_j|\theta^{is})\right)
\end{aligned}$$

The bias-corrected Bayesian LOO-CV is then:

$$\begin{aligned}
\text{lppd}_{\text{cloo-cv}} = \text{lppd}_{\text{loo-cv}} + b
\end{aligned}$$

The bias correction $b$ is rarely used as it is usually small, but we include it for completeness.

We compute an estimate of the effective number of parameters as:

$$\begin{aligned}
p_{\text{loo-cv}} = \text{lppd} - \text{lppd}_{\text{loo-cv}}
\end{aligned}$$

or, using bias-corrected LOO-CV:

$$\begin{aligned}
p_{\text{cloo-cv}} = \text{lppd} - \text{lppd}_{\text{cloo-cv}}
\end{aligned}$$

$$\begin{aligned}
= \overline{\text{lppd}}_{-i} - \text{lppd}_{\text{loo-cv}}
\end{aligned}$$

CV, like WAIC, requires the data to be split into distinct and ideally independent pieces. This can be challenging for structured models where the data isn't easily divided. Additionally, CV can be computationally expensive, especially if the model needs to be re-fit for each fold. However, there are some shortcuts available, such as Leave-One-Out Cross-Validation (LOO-CV), which can efficiently approximate predictions using the full posterior distribution.

Under certain conditions, different information criteria (like AIC, DIC, and WAIC) have been shown to be equivalent to LOO-CV as the size of the dataset becomes very large. AIC is equivalent to LOO-CV when using maximum likelihood estimates. DIC is a variation of regularized information criteria that approximates LOO-CV using plug-in predictive densities. WAIC has been shown to be equivalent to Bayesian LOO-CV.

LOO-CV predicts the outcome for one data point using all other data points except that one. WAIC predicts the outcome for a data point using all observed data points. This difference becomes noticeable when dealing with small datasets or complex models, like hierarchical models. In regression or hierarchical models, LOO-CV focuses on predicting specific data points, while WAIC predicts outcomes based on all observed data. This distinction can be important in models where predictions at one point are only weakly influenced by other data points.

## Summary

All the different measures discussed above are based on adjusting the log predictive density of the observed data by subtracting an approximate bias correction. The measures differ both in their baseline measures of fit and in their adjustments.

AIC starts with the log predictive density of the data conditional on the maximum likelihood estimate $\hat{\theta}$, DIC conditions on the posterior mean $\mathbb{E}[\theta|y]$, and WAIC starts with the log predictive density, averaging over $p_{\text{post}}(\theta) = p(\theta|y)$. Of these three approaches, only WAIC is fully Bayesian and so it is our preference when using a bias correction formula. Cross-validation can be applied to any measure of fit; we use the log pointwise posterior predictive density as with WAIC.
