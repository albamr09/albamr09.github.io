# Model Comparison Based on Predictive Performance

## Example

On the [eight schools example](../T2/05_example_normal.md) we defined three separate models:

1. **No pooling**: Separate estimates for each of the eight schools, reflecting that the experiments were performed independently. This model has eight parameters: an estimate for each school.
2. **Complete pooling**: A combined estimate averaging the data from all schools into a single number, reflecting that the eight schools come from the same population. This model has only one, shared, parameter.
3. **Hierarchical model**: A Bayesian meta-analysis, partially pooling the eight estimates toward a common mean. This model has eight parameters but they are constrained through their hierarchical distribution and are not estimated independently; thus the effective number of parameters should be some number less than 8.

In the following table we show the performance metrics for each of the models using predivtive log densities and information criteria. 

![Evaluation Metrics](./assets/example_evaluation_metrics.png)

### AIC

The log predictive density is higher—that is, a better fit—for the **no pooling model**. This makes sense: with no pooling, the maximum likelihood estimate is right at the data, whereas with complete pooling there is only one number to fit all $8$ schools. However, the ranking of the models changes after adjusting for the fitted parameters ($8$ for no pooling, $1$ for complete pooling), and the expected log predictive density is estimated to be the best (that is, AIC is lowest) for **complete pooling**. The last column of the table is blank for AIC, as this procedure is defined based on maximum likelihood estimation which is meaningless for the hierarchical model.

### DIC

For both the **no-pooling** and **complete-pooling** models with their flat priors, DIC provides results similar to AIC. However, for the **hierarchical model**, DIC falls in between the two extremes: it fits the data better than complete pooling but not as well as no pooling, and it suggests an effective number of parameters closer to $1$ than to $8$. This indicates that the estimated school effects are mostly pooled back to their common mean. When considering the correction for fitting, complete pooling emerges as the winner, which aligns with the idea that the data support very little variation between groups.

### WAIC

This Bayesian measure, similar to DIC, indicates slightly worse fit to observed data for each model. This is because the posterior predictive density has a wider distribution, resulting in lower density values at the mode compared to the predictive density conditional on the point estimate. However, the correction for the effective number of parameters is lower with WAIC compared to DIC. For models with **no pooling** and **hierarchical models**, the effective number of parameters ($p_{\text{WAIC}}$) is about half of what's estimated by DIC, suggesting that WAIC behaves as expected when there's only one data point per parameter. Conversely, for **complete pooling**, $p_{\text{WAIC}}$ is only slightly less than $1$, which aligns with expectations given the sample size of $8$. Overall, $p_{\text{WAIC}}$ is much less than pDIC for all three models, mainly because the WAIC already considers much of the uncertainty stemming from parameter estimation.

### Cross Validation

For this example, it's impossible to cross-validate the **no-pooling** model because it would mean predicting the performance of one school using data from the other seven, which isn't feasible. This highlights a key difference from information criteria, which assume predictions for the same schools and can work even in the absence of pooling.

However, for the **complete pooling** and **hierarchical models**, we can directly perform leave-one-out cross-validation. In this setup, cross-validation predicts based only on information from other schools, while WAIC considers both the local observation and information from other schools. Although both methods predict unknown future data, they differ in the amount of information used. As the hierarchical prior becomes less informative (or more vague), the predictive performance estimates diverge further, with the difference approaching infinity when the hierarchical prior becomes uninformative, effectively yielding the no-pooling model.

### Comparing the Three Models

In this dataset, the complete pooling model performs best in predicting new data. Surprisingly, setting the hierarchical variance $\tau$ to zero results in a better fit to the data compared to both no pooling and complete pooling models. However, despite this result, we still prefer the hierarchical model because we don't believe $\tau$ is truly zero.

For instance, the estimated effects in schools A and C show some differences, although they are not statistically significant. The data suggest that there might be no variation in effects between schools, but we are not entirely confident in this conclusion. Therefore, while the model with $\tau = 0$ performs well, we might consider using a more informative prior distribution for $\tau$ to better capture the uncertainty and avoid implausible scenarios.

In general, predictive accuracy measures are useful in parallel with posterior predictive checks to see if there are important patterns in the data that are not captured by each model.

## Evaluating Predictive Error Comparisons

When comparing models for their predictive accuracy, we face two main challenges: **statistical significance** and **practical significance**.

Statistical significance arises from the uncertainty in estimating how well a model predicts new data. This uncertainty is due to variation in individual prediction errors, which can affect the averages we calculate from any finite dataset. A practical estimate of related sampling uncertainty can be obtained by analyzing the variation in the expected log predictive densities $\hat{\text{elppd}}$ using parametric or nonparametric approaches.

In some cases, we can use scoring functions that are familiar to experts in a particular field to understand the significance of differences in predictive accuracy. However, in situations where there are no established measures like AUC, it can be challenging to interpret the significance of differences in log predictive probability between two models. One way to gauge the importance of such differences is by comparing them to simpler models.

Consider a scenario where we have two models for a survey of voters in an election: one model predicts a $50$/$50$ chance for each voter to support either party, while the other model correctly assigns probabilities of $0.4$ and $0.6$ to the voters. In this case, the improvement in log predictive probability from using the better model can be calculated. For instance, if we have $1000$ voters, the improvement would be $20$, but for only $10$ voters, the improvement would be just $2$. This aligns with our intuition: a clear improvement in prediction is more noticeable in a larger dataset than in a smaller one where noise might overshadow the improvement.

## Bias Induced by Model Selection

Cross-validation and information criteria are methods that adjust for using the data twice—once for building the model and again for evaluating its performance. They aim to provide unbiased estimates of how well a model predicts new data. However, when these methods are used to select a model from multiple options, the estimate of predictive performance for the chosen model can be biased because of the selection process.

When there are only a few models to compare, any bias introduced by the selection process is usually small. However, if there are many models to choose from, especially as the number of observations or predictors increases, the selection process can lead to significant overfitting. While it's possible to estimate and correct for this bias using additional cross-validation, it doesn't guarantee that the selected model will have the best predictive performance. Therefore, cross-validation and information criteria are better suited for understanding models rather than selecting the best one among many options.

## Challenges

The methods we have for measuring how well predictive models fit still have their flaws. AIC, DIC, and WAIC don't always work perfectly: AIC struggles with strong prior information, DIC gives odd results when the average of the posterior distribution isn't reliable, and WAIC can be tricky to use with structured data like spatial or network data. Cross-validation seems like a good alternative, but it can be slow to compute and doesn't always work well with dependent data.

Bayesian statisticians often don't rely solely on predictive error comparisons in their work because of various limitations. However, there are situations where comparing very different models is necessary, and in those cases, predictive comparisons can be valuable. Additionally, measures of effective numbers of parameters are useful for understanding statistical methods.

Currently, we prefer cross-validation because it's similar to WAIC in large samples. However, in finite cases with weak priors or strong outliers, Pareto-smoothed importance sampling LOO-CV is both computationally efficient and robust.
