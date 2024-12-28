# Model Comparison Using Bayes Factors

## Example: A discrete example in which Bayes factors are helpful

In the genetics example we talked about earlier, we can use Bayes factors to help us make sense of things. Imagine we have two possible scenarios: $H_1$, where the woman is affected, and $H_2$, where she's not affected. We can represent these scenarios using some numbers. For example, let's say $\theta = 1$ means she's affected, and $\theta = 0$ means she's not.

Now, let's say before we look at any data, we're equally likely to believe either scenario. So, the odds of H2 compared to H1 are 1 to 1, that is $\frac{p(H_2)}{p(H_1)} = 1$.

Then, when we look at the data and find out the woman has two unaffected sons, the data is $4$ times more likely under $H_2$ than under $H_1$. That is $\frac{p(y|H_2)}{p(y|H_1)} = \frac{1.0}{0.25}$. The posterior odds are thus $\frac{p(H_2|y)}{p(H_1|y)} = 4$

This example is helpful for Bayes factors because the scenarios we're comparing make sense scientifically, and there are no other possible scenarios in between. Also, the way the data fits with each scenario makes sense and gives us clear results.

Bayes factors don't work as well for models that are continuous. For instance, if we're looking at something like the effectiveness of a treatment, which can vary along a scale, it doesn't make sense to assign a probability to it being exactly zero.

Similarly, if we're comparing different models in regression, like deciding which variables to include, it's better to have all the possible variables in our consideration. We can then use a prior distribution to decide how much to trust each variable, even if we think some might not have much impact. To show why Bayes factors struggle with continuous models, let's consider the example of the 8 schools problem, comparing the no-pooling and complete-pooling models.

== Example. A continuous example where Bayes factors are a distraction == 

Suppose we had analyzed the data from the 8 schools using Bayes factors for the discrete collection of previously proposed standard models, no pooling ($H_1$) and complete pooling ($H_2$):

$$\begin{aligned}
H_1: p(y|\theta_1, \cdots, \theta_J) = \prod_{j=1}^J text{N}(y_j|\theta_j, \sigma_j^2), p(\theta_1, \cdots, \theta_J) \propto 1
\end{aligned}$$

$$\begin{aligned}
H_2: p(y|\theta_1, \cdots, \theta_J) = \prod_{j=1}^J text{N}(y_j|\theta_j, \sigma_j^2), \theta_1 = \cdots = \theta_J = \theta \propto 1 
\end{aligned}$$

If we try to use Bayes factors to pick or combine these models, we run into a problem. The Bayes factor, which is the ratio of how likely the data is under one model compared to another, isn't defined here. That's because the prior distributions we're using are improper, which means they don't behave properly in the calculations. Specifically, when we try to divide one function by another, we end up with $\frac{0}{0}$, which doesn't give us a clear answer.

So, if we want to stick with the idea of assigning probabilities to these two specific models, we have two options: either use proper prior distributions or carefully construct improper ones in a way that makes sense. However, no matter which route we take, the results won't be very satisfying.

More explicitly, suppose we replace the flat prior distributions in $H_1$ and $H_2$ by independent normal prior distributions, $\text{N}(0, A^2)$, for some large $A$. The resulting posterior distribution for the effect in school $j$ is:

$$\begin{aligned}
p(\theta_j|y) = (1 - \lambda)p(\theta_j|y, H_1) + \lambda p(\theta_j|y, H_2)
\end{aligned}$$

The Bayes factor, which compares how likely the data is under different models, is very sensitive to the prior variance, which is represented by $A^2$. As we increase $A$ (while keeping the data and prior odds fixed), the results tend to favor one model over the other more strongly. This means that Bayes factors can't be reliably used with non-informative prior densities, even if we carefully define them in certain ways.

Another problem with Bayes factors in this example is that they behave differently as we change the number of schools in the model. The results can vary significantly depending on how many schools are included, which doesn't make much sense from a scientific perspective.

So, if we were to use Bayes factors here, we'd likely run into issues during the model-checking stage, where we compare the model's predictions to what we know from real-world knowledge. Instead, it might be better to use a smoother, continuous family of models that bridges the gap between the extreme models. This continuous model doesn't assign discrete probabilities to extreme values that don't make scientific sense.
