# Hierarchical Normal Modeling

## Example: ratings of animation movies

MovieLens is a website which provides personalized movie recommendations from users who create accounts and rate movies that they have seen. Based on such information, MovieLens works to build a custom preference profile for each user and provide movie recommendations.

## A hierarchical Normal model with random $\sigma$

In this situation it is reasonable to develop a model for the movie ratings where the grouping variable is the movie title. We index a rating by two subscripts, where $Y_{ij}$ denotes the $i$th rating for the $j$th movie title, with $j = 1, \cdots, 8$.

Since the ratings are continuous, it is reasonable to use the Normal data model. For simplicity and ease of illustration, a common and shared unknown standard deviation $\sigma$ is assumed for all Normal models (however it could also be modeled). Therefore we define the sampling distribution as:

$$\begin{aligned}
Y_{ij} | \mu_j, \sigma \sim \text{Normal}(\mu_j, \sigma)
\end{aligned}$$

Since these movies are all animations, it is reasonable to believe that the mean ratings are similar across movies. So one assigns each mean rating the same Normal prior distribution at the first stage:

$$\begin{aligned}
\mu_j | \mu, \tau \sim \text{Normal}(\mu, \tau)
\end{aligned}$$

The hyperparameters $\mu$ and  $\tau$ are treated as random since we are unsure about the degree of pooling of the eight sets of ratings. After observing data, inference is performed about $\mu$ and $\tau$ based on their posterior distributions.

Treating $\mu$ and $\tau$ as random, one arrives at the following hierarchical model:

- **Sampling** for $j = 1, \cdots, 8$ and $i = 1, \cdots, n_j$:
 
$$\begin{aligned}
Y_{ij} | \mu_j, \sigma \sim \text{Normal}(\mu_j, \sigma)
\end{aligned}$$
 
- **Prior** for $\mu_j$, Stage 1, $j = 1, \cdots, 8$:

$$\begin{aligned}
\mu_j | \mu, \tau \sim \text{Normal}(\mu, \tau)
\end{aligned}$$
 
- **Prior** for $\mu_j$, Stage 2, the hyperprior:

$$\begin{aligned}
\mu, \tau \sim \pi(\mu, \tau)
\end{aligned}$$

To complete the model, one needs to specify a prior distribution for the standard deviation parameter, $\sigma$:

$$\begin{aligned}
\frac{1}{\sigma^2} | a_{\sigma}, b_{\sigma} \sim \text{Gamma}(a_{\sigma}, b_{\sigma})
\end{aligned}$$

One assigns a known Gamma prior distribution for $\frac{1}{\sigma^2}$, with fixed hyperparameter values $a_{\sigma}$ and $b_{\sigma}$. In some situations, one may consider the situation where $a_{\sigma}$ and $b_{\sigma}$ are random and assign hyperprior distributions for these unknown hyperparameters.

It is helpful to contrast the two-stage prior distribution for $\{\mu_j\}$ and the one-stage prior distribution for $\sigma$.

For the means $\{\mu_j\}$, we have discussed that specifying a common prior distribution for different $j$ pools information across the movies. One is simultaneously estimating both a mean for each movie (the $\mu_j$'s) and the variation among the movies ($\mu$ and $\tau$). For the standard deviation, the hierarchical model also pools information across movies. However, all of the observations are combined in the estimation of $\sigma$. Since separate values of $\sigma_j$, one cannot learn about the differences and similarities among the $\sigma_j$'s.
 
### Graphical representation of the hierarchical model

An alternative way of expressing this hierarchical model uses the following graphical representation.

![Normal Hierarchical Model](assets/normal_hierarchical_model.png)

In the middle section of the graph, $Y_{ij}$ represents the collection of random variables for all ratings of movie $j$. The upper section of the graph focuses on the $\mu_j$'s. All means follow the same prior, a Normal distribution with mean $\mu$ and standard deviation $\sigma$.

Since $\mu$ and $\tau$ are random, these second-stage parameters are associated with the prior label $\pi(\mu, \tau)$.

### Second-stage prior

The hierarchical Normal model presented in Equations (10.6) through (10.9) has not specified the hyperprior distribution $\pi(\mu, \tau)$. How does one construct a prior on these second-stage hyperparameters?

A typical approach for Normal models is to assign two independent prior distributions — a Normal distribution for the mean $\mu$ and a Gamma distribution for the precision $\frac{1}{\tau^2}$. Such a specification facilitates the use of the Gibbs sampling. Using this approach, the density $\pi(\mu, \tau)$ is replaced by the two hyperprior distributions below:

$$\begin{aligned}
\mu | \mu_0, \gamma_0 \sim \text{Normal}(\mu_0, \gamma_0)
\end{aligned}$$

$$\begin{aligned}
\frac{1}{\tau^2} | a, b \sim \text{Gamma}(a_{\tau}, b_{\tau})
\end{aligned}$$

The task of choosing a prior for $(\mu, \tau)$ reduces to the problem of choosing values for the four hyperparameters $\mu_0, \gamma_0, a_{\tau}$ and $b_{\tau}$. If one believes that $mu$ is located around the value of $3$ and she is not very confident of this choice, the set of values $\mu_0 = 3$ and $\gamma_0 = 1$ could be chosen. As for $\tau$, one chooses a weakly informative prior with $a_{\tau} = b_{\tau} = 1$ as $\text{Gamma}(1, 1)$. Moreover, to choose a prior for $\sigma$, let $a_{\sigma} = b_{\sigma} = 1$ to have the weakly informative $\text{Gamma}(1, 1)$ prior.

## Inference through MCMC

With the specification of the prior, the complete hierarchical model is described as follows:
 
- **Sampling** for $j = 1, \cdots, 8$ and $i = 1, \cdots, n_j$:
 
$$\begin{aligned}
Y_{ij} | \mu_j, \sigma \sim \text{Normal}(\mu_j, \sigma)
\end{aligned}$$
 
- **Prior** for $\mu_j$, Stage 1, $j = 1, \cdots, 8$:

$$\begin{aligned}
\mu_j | \mu, \tau \sim \text{Normal}(\mu, \tau)
\end{aligned}$$
 
- **Prior** for $\mu_j$, Stage 2: the hyperpriors:

$$\begin{aligned}
\mu \sim \text{Normal}(3, 1)
\end{aligned}$$

$$\begin{aligned}
\frac{1}{\tau^2} \sim \text{Gamma}(1, 1)
\end{aligned}$$

- **Prior** for $\sigma$

$$\begin{aligned}
\frac{1}{\sigma^2} \sim \text{Gamma}(1, 1)
\end{aligned}$$

### Describe the model by a script

The first step in using the [JAGS](https://mcmc-jags.sourceforge.io/) software is to write the following script defining the hierarchical model. The model is saved in the character string modelString.

```R
modelString <-"
model {
## sampling
for (i in 1:N){
   y[i] ~ dnorm(mu_j[MovieIndex[i]], invsigma2)
}
## priors
for (j in 1:J){
   mu_j[j] ~ dnorm(mu, invtau2)
}
invsigma2 ~ dgamma(a_s, b_s)
sigma <- sqrt(pow(invsigma2, -1))
## hyperpriors
mu ~ dnorm(mu0, g0)
invtau2 ~ dgamma(a_t, b_t)
tau <- sqrt(pow(invtau2, -1))
}
"
```

In the sampling part of the script, note that the loop goes from `1` to `N`, where `N` is the number of observations with index `i`. However, because now `N` observations are grouped according to movies, indicated by `j`, one needs to create one vector, `mu_j` of length eight, and use `MovieIndex[i]` to grab the corresponding `mu_j` based on the movie index.

In the priors part of the script, the loop goes from `1` to `J`, and `J = 8` in the current example. Inside the loop, the first line corresponds to the prior distribution for `mu_j`. Due to a commonly shared `sigma`, `invsigma2` follows `dgamma(a_g, b_g)` outside of the loop. In addition, `sigma <- sqrt(pow(invsigma2, -1))` is added to help tracksigma directly.

Finally in the hyperpriors section of the script, one specifies the Normal hyperprior for `mu`, a Gamma hyperprior for `invtau2`. Keep in mind that the arguments in the `dnorm` in JAGS are the mean and the precision (std). If one is interested instead in the standard deviation parameter `tau`, one could return it in the script by using `tau <- sqrt(pow(invtau2, -1))`, enabling the tracking of its MCMC chain in the posterior inferences.

### Define the data and prior parameters

After one has defined the model script, the next step is to provide the data and values for parameters of the prior. 

In the R script below, a list `the_data` contains the vector of observations, the vector of movie indices, the number of observations, and the number of movies. It also contains the Normal hyperparameters `mu0` and `g0`, and two sets of Gamma hyperparameters (`a_t` and `b_t`) for `invtau2`, and (`a_s` and `b_s`) for `invsigma2`.

```R
y <- MovieRatings$rating      
MovieIndex <- MovieRatings$Group_Number      
N <- length(y)  
J <- length(unique(MovieIndex)) 
the_data <- list("y" = y, "MovieIndex" = MovieIndex, 
                 "N" = N, "J" = J,
                 "mu0" = 3, "g0" = 1,
                 "a_t" = 1, "b_t" = 1,
                 "a_s" = 1, "b_s" = 1)
```

One uses the `run.jags()` function in the runjags R package to generate posterior samples by using the MCMC algorithms in JAGS.

The script below runs one MCMC chain with $1000$ iterations in the adapt period (preparing for MCMC), $5000$ iterations of burn-in and an additional set of $5000$ iterations to be run and collected for inference. By using `monitor = c("mu", "tau", "mu_j", "sigma")`, one collects the values of all parameters in the model. In the end, the output variable `posterior` contains a matrix of simulated draws.

```R
posterior <- run.jags(modelString,
                      n.chains = 1,
                      data = the_data,
                      monitor = c("mu", "tau", "mu_j", "sigma"),
                      adapt = 1000,
                      burnin = 5000,
                      sample = 5000)
```

### MCMC diagnostics and summarization

To perform some MCMC diagnostics in our example, one uses the `plot()` function, specifying the variable to be checked by the vars argument. For example, the script below returns four diagnostic plots (trace plot, empirical PDF, histogram, and autocorrelation plot) for the hyperparameter $\tau$.

```R
plot(posterior, vars = "tau")
```

![Tau Posterior Diagnostics](assets/tau_posterior_diagnostics.png)

In practice MCMC diagnostics should be performed for all parameters to justify the overall MCMC convergence. In our example, the above diagnostics should be implemented for each of the eleven parameters in the model: $\mu, \tau, \mu_1, \cdots, \mu_8$ and $\sigma$.

Once diagnostics are done, one reports posterior summaries of the parameters using `print()`. Note that these summaries are based on the 5000 iterations from the sample period, excluding the adapt and burn-in iterations.

```R
print(posterior, digits = 3)                                                                                     
        Lower95 Median Upper95  Mean     SD Mode   MCerr 
mu         3.19   3.78    4.34  3.77  0.286   -- 0.00542     
tau       0.357  0.638    1.08 0.677    0.2   -- 0.00365  
mu_j[1]    2.96   3.47    3.99  3.47  0.262   -- 0.00376  
mu_j[2]    3.38   3.81    4.25  3.82  0.221   -- 0.00313    
mu_j[3]    3.07   3.91    4.75  3.91  0.425   -- 0.00677    
mu_j[4]    3.21   3.74    4.31  3.74  0.285   -- 0.00428 
mu_j[5]    3.09   4.15    5.43  4.18  0.588   --  0.0115   
mu_j[6]     2.7   3.84    4.99  3.85  0.576   -- 0.00915   
mu_j[7]    2.74   3.53    4.27  3.51  0.388   -- 0.00595  
mu_j[8]    3.58   4.12    4.66  4.12  0.276   -- 0.00423  
sigma     0.763   0.92    1.12  0.93 0.0923   -- 0.00142 
```

For example, the movies "How to Train Your Dragon" (corresponding to $\mu_1$) and "Megamind" (corresponding to $\mu_7$) have the lowest average ratings with short $90\%$ credible intervals, $(2.96, 3.99)$ and $(2.74, 4.27)$ respectively, whereas "Legend of the Guardians: The Owls of Ga’Hoole" (corresponding to $μ_6$) also has a low average rating but with a wider $90\%$ credible interval $(2.70, 4.99)$. The differences in the width of the credible intervals stem from the sample sizes: there are eleven ratings for "How to Train Your Dragon", four ratings for "Megamind", and only a single rating for "Legend of the Guardians: The Owls of Ga’Hoole". The smaller the sample size, the larger the variability in the inference, even if one pools information across groups.

### Shrinkage

Recall that the two-stage prior specifies a shared prior Normal $(\mu, \tau)$ for all $\mu_j$'s which facilitates simultaneous estimation of the movie mean ratings (the $\mu_j$'s), and estimation of the variation among the movie mean ratings through the parameters $\mu$ and $\tau$. The posterior mean of the rating for a particular movie $\mu_j$ shrinks the observed mean rating towards an average rating. The following figure displays a shrinkage plot which illustrates the movement of the observed sample mean ratings towards an average rating.

![Shrinkage](assets/mean_shrinkage.png)

The left side plots the sample movie rating means and lines connect the sample means to the corresponding posterior means (i.e. means of the posterior draws of $\mu_j$). The shrinkage effect is obvious for the movie "Batman: Under the Red Hood" which corresponds to the dot at the value $5.0$ on the left. This movie only received one rating of $5.0$ and its mean rating $\mu_5$ shrinks to the value $4.178$ on the right, which is still the highest posterior mean among the nine movie posterior means.

A large shrinkage is desirable for a movie with a small number of ratings such as "Batman: Under the Red Hood". For a movie with a small sample size, information about other ratings of similar movies helps to produce a more reasonable estimate at the true average movie rating. The amount of shrinkage is more modest for movies with larger sample sizes.

### Sources of variability

We know that the prior distribution $\text{Normal}(\mu, \tau)$ is shared among the means $\mu_j$'s of all groups in a hierarchical Normal model, and the hyperparameters $\mu$ and $\tau$ provide information about the population of $\mu_j$'s. Specifically, the standard deviation $\tau$ measures the variability among the $\mu_j$'s. When the hierarchical model is estimated through MCMC, summaries from the simulation draws from the posterior of $\tau$ provide information about this source of variation after analyzing the data.

There are actually two sources for the variability among the observed $Y_{ij}$'s:

- **Sampling level**: within-group variability:

$$\begin{aligned}
Y_{ij} \sim \text{Normal}(\mu_j, \sigma)
\end{aligned}$$
 
- **Group level** between-group variability:

$$\begin{aligned}
\mu_{j} | \mu, \tau \sim \text{Normal}(\mu, \tau)
\end{aligned}$$

When the hierarchical model is fit through MCMC, summaries from the marginal posterior distributions of $\sigma$ and $\tau$ provide information about the two sources of variability.

The Bayesian posterior inference in the hierarchical model is able to compare these two sources of variability, taking into account the prior belief and the information from the data. One initially provides prior beliefs about the values of the standard deviations $\sigma$ and $\tau$ through Gamma distributions. 

What can be said about these two sources of variability after the estimation of the hierarchical model? As seen in the output of `print(posterior, digits = 3)`, the $90\%$ credible interval for $\sigma$ is $(0.763, 1.12)$ and the $90\%$ credible interval for $\tau$ is $(0.357, 1.08)$. After observing the data, the within-group variability in the measurements is estimated to be larger than the between-group variability.

To compare both variability sources we compute:

$$\begin{aligned}
R = \frac{\tau^2}{\tau^2 + \sigma^2}
\end{aligned}$$

It represents the fraction of the total variability in the movie ratings due to the differences between groups. If the value of $R$ is close to $1$, most of the total variability is attributed to the between-group variability. On the other side, if $R$ is close to $0$, most of the variation is within groups and there is little significant differences between groups.

A $95\%$ credible interval for $R$ is $(0.149, 0.630)$. Since much of the posterior probability of $R$ is located below the value $0.5$, this confirms that the variation between the mean movie rating titles is smaller than the variation of the ratings within the movie titles in this example.

![Variability Comparison](assets/IC_variability_comparison.png)
