# Kalman Filter

## Introduction

Suppose your position on a 2D plane is given by the black dot:

![Example](assets/intro_example_1.png)

Let's say you get your estimate as to where you are, inferred from a certain control command. For example if you are trying to move forward in the same direction you estimate your new position will be the cross:

![Example](assets/intro_example_2.png)

This is will be the prediction step. Now suppose you get an observation about the distance to the nearest lighthouse:

![Example](assets/intro_example_3.png)

So now we can perform our new state estimate by combining by the means of a weighted sum our prediction along with the measurement:

![Example](assets/intro_example_4.png)
![Example](assets/intro_example_5.png)

This weighted sum is performed trading off how certain you are about your prediction and how certain you are about your observation.

## Properties of Gaussian Distributions

In order to derive and prove some parts of the Kalman Filter we exploit the following properties:

* The product of two Gaussian is a Gaussian.
* A Gaussian stays Gaussian under linear transformations
* The marginal and conditional distribution of a Gaussian is a Gaussian

## Linear Model

What does it mean when we say the Kalman Filter uses linear models? This means that both the motion model and the observation model can be expressed through a linear function, that is:

$$\begin{aligned}
f(x) = Ax + b
\end{aligned}$$

One important property is that if a Gaussian distribution is transformed through a linear function it stays Gaussian.

Also, we introduce noise by using a zero mean Gaussian distribution.

### Models

The motion model is defined as follows:

$$\begin{aligned}
\overline{x}_t = A_t x_{t-1} + B_tu_t + \epsilon_t
\end{aligned}$$

Where $x_{t-1}$ is the previous state estimate, $u_t$ is the control command at time $t$ and $\epsilon_t$ is Gaussian noise. Let's dive a little deeper:

* $A_t$ is a matrix $n \times n$ (a mapping between the state space and the state space) which tells us how the state evolves from $t-1$ to $t$ without control commands or noise. We can use this matrix to encode information about velocity, acceleration, etc.
* $B_t$ is a matrix $n \times l$ (a mapping between the control space and the state space) that describes how the control command $u_t$ changes the state from $t_1$ to $t$.
* $\epsilon_t$ is a random variable that represents the motion noise with covariance $R_t$.

The observation model is defined as follows:

$$\begin{aligned}
z_t = C_t \overline{x}_t + \delta_t
\end{aligned}$$

Where $\overline{x}_t$ is the estimated state and $\delta_t$ is Gaussian noise.

* $C_t$ is a matrix $k \times n$ which describes a mapping between the state $\overline{x}_t$ to an observation $z_t$.
* $\delta_t$ is a random variable that represents the observation noise with covariance $Q_t$.

### Linear Motion Model

Now that we have defined our linear models, we are going to show how to express the motion under a Gaussian:

$$\begin{aligned}
p(x_t|x_{t-1}, u_t) = \det(2\pi R_t)^{-\frac{1}{2}} \exp(-\frac{1}{2}(x_t - A_tx_{t-1} - B_tu_t)^TR^{-1}_t(x_t - A_tx_{t-1} - B_tu_t))
\end{aligned}$$

Which means we are obtaining the value of a probability distribution that incorporates our linear model for the prediction:

$$\begin{aligned}
p(x_t|x_{t-1}, u_t) \sim \mathcal{N}(A_tx_{t-1} + B_tu_t, R_t)
\end{aligned}$$

### Linear Observation Model

We will apply the same reasoning to obtain the observation model under a Gaussian:

$$\begin{aligned}
p(z_t|x_t) = \det(2\pi Q_t)^{-\frac{1}{2}} \exp(-\frac{1}{2}(z_t - C_t\overline{x}_t)^TQ^{-1}_t(z_t - C_t\overline{x}_t))
\end{aligned}$$

Which means we are obtaining the difference between the observation $z_t$ and what I expect to observe $\overline{x}_{t}$ ($z_t - C\overline{x}_t$) while also taking the uncertainty into account $Q_t^{-1}$. We compute this incorporating our linear model for the correction step:

$$\begin{aligned}
p(z_t|x_t) \sim \mathcal{N}(C_t\overline{x}_t, Q_t)
\end{aligned}$$

## Gaussian World

As we have said, we are assuming everything is Gaussian. Up until now we have described our models by using Gaussian distributions, however we still have to make sure these are maintained when we are performing the prediction and the update. So, given the belief at time $t$:

![Gaussian World](assets/everythin_gaussian_1.png)

If we suppose $\overline{bel}(x_t)$ is Gaussian, then $bel(x_t)$ is Gaussian because the product of Gaussian distribution is a Gaussian distribution. Therefore we need to show that $\overline{bel}(x_t)$ is also Gaussian. That is:

$$\begin{aligned}
\overline{bel}(x_t) = \int p(x_t|u_t,x_{t-1})bel(x_{t-1})dx_{t-1}
\end{aligned}$$

We know, by its definition, that $p(x_t|u_t,x_{t-1})$ is Gaussian, and also we can prove by mathematical induction that $bel(xx_{t-1})$ is Gaussian. Because if we start from a Gaussian distributed belief and everything stays Gaussian then the belief at time $t-1$ will also be Gaussian.

Noting that the convolution of two Gaussian stays Gaussian we conclude that $\overline{bel}(x_t)$ is Gaussian and thus $bel(t)$ is also Gaussian. Let's show however that the integral preserves the Gaussian. Note that we can express the predicted belief by using our linear models as follows:

$$\begin{aligned}
\overline{bel}(x_t) = \int p(x_t|u_t,x_{t-1}) bel(x_{t-1})dx_{t-1} 
\end{aligned}$$

$$\begin{aligned}
= \int \det(2\pi R_t)^{-\frac{1}{2}} \exp(-\frac{1}{2}(x_t - A_tx_{t-1} - B_tu_t)^TR^{-1}_t(x_t - A_tx_{t-1} - B_tu_t))bel(x_{t-1})dx_{t-1}
\end{aligned}$$

$$\begin{aligned}
= \eta \int \exp(-\frac{1}{2}(x_t - A_tx_{t-1} - B_tu_t)^TR^{-1}_t(x_t - A_tx_{t-1} - B_tu_t))bel(x_{t-1})dx_{t-1}
\end{aligned}$$

$$\begin{aligned}
= \eta \int \exp(-\frac{1}{2}(x_t - A_tx_{t-1} - B_tu_t)^TR^{-1}_t(x_t - A_tx_{t-1} - B_tu_t)) exp(-\frac{1}{2}(x_{t-1} - \mu_{t-1})^T\Sigma_{t-1}^{-1}(x_{t-1} - \mu_{t-1}))
\end{aligned}$$

Where $exp(-\frac{1}{2}(x_{t-1} - \mu_{t-1})^T\Sigma_{t-1}^{-1}(x_{t-1} - \mu_{t-1}))$ is the expected value of the Gaussian that describes our previous belief $bel(x_{t-1})$.

Now, we combine both exponentials, given $exp(x) \cdot exp(y) = exp(x + y)$:

$$\begin{aligned}
\overline{bel}(x_t) = \eta \int \exp(-L_t)dx_{t-1}
\end{aligned}$$

Given:

$$\begin{aligned}
L_{t} = \frac{1}{2}(x_t - A_tx_{t-1} - B_tu_t)^TR^{-1}_t(x_t - A_tx_{t-1} - B_tu_t) 
\end{aligned}$$

$$\begin{aligned}
+ \frac{1}{2}(x_{t-1} - \mu_{t-1})^T\Sigma_{t-1}^{-1}(x_{t-1} - \mu_{t-1})
\end{aligned}$$

We can split $L_t$ up in a part that only depends on $x_t$ and another part that depends on $x_t, x_{t-1}$. Such that:

$$\begin{aligned}
L_t = L_t(x_{t-1}, x_t) + L_t(x_t)
\end{aligned}$$

Thus:

$$\begin{aligned}
\overline{bel}(x_t) = \eta \int \exp(-L_t(x_{t-1}, x_t) -L_t(x_t))dx_{t-1}
\end{aligned}$$

$$\begin{aligned}
\overline{bel}(x_t) = \eta \exp(-L_t(x_t)) \int \exp(-L_t(x_{t-1}, x_t) )dx_{t-1}
\end{aligned}$$

This way we have:

* $\exp(-L_t(x_t))$: Gaussian distribution
* $\int \exp(-L_t(x_{t-1}, x_t) )dx_{t-1}$: this is the marginalization of a Gaussian of the variable $x_{t-1}$, which happens to also be a Gaussian.

Therefore we have shown that everything stays Gaussian:

![Everything Stays Gaussian](assets/all_gaussian.png)

## Representing the Belief

We have said that everything is Gaussian, which includes our belief. This belief will be represented, like any other Gaussian is, by its mean $\mu$ and variance $\Sigma$. So our belief at time $t$ would be represented by $(\mu_t, \Sigma_t)$.

## Algorithm

The Kalman Filter algorithm is defined as follows:

* Inputs:
  * $\mu_{t-1}$: previous mean that describes our belief at time $t-1$
  * $\Sigma_{t-1}$: previous covariance that describes our uncertainty at time $t-1$
  * $z_t$: the observation at time $t$.
  * $u_t$: the control command at time $t$.

![Kalman Filter Algorithm](assets/kalman_filter_algorithm.png)

The algorithm is, as usual, divided into a prediction step and a correction step:

In the prediction step we estimate our next belief, described by a Gaussian $\overline{bel}(x_t) \sim \mathcal{N}(\overline{\mu_t}, \overline{\Sigma_t})$. 

* First we compute our new estimated mean $\overline{\mu}_t$ by multiplying our transformation function $A_t$ by the previous mean $\mu_{t-1}$ which tells us how the state evolves generally without any motion added to it (i.e. velocity, acceleration, etc). To add the motion we add $B_tu_{t}$.
* Then we update our uncertainty. The estimate of the new covariance is derived from how a Gaussian changes through a linear transformation, thus we compute $A_t \Sigma_{t-1} A_t^T$. We also add additional noise that the motion adds to the new belief by adding $R_t$.

The we apply the correction step: what we mainly do is computing the weighted sum between two distributions

* First we obtain the weighting factor $K_t$, also known as the Kalman Gain. This equals a ratio between the prediction and the observation.
  * Here we use $C_t^T$ to map our uncertainty from the state space to the observation space.
  * On the denominator we map our uncertainty onto the observation space and we also add the measurement noise $Q_t$
  * Then we divide the two terms to obtain a factor that tells us if we trust more the prediction or the correction.
* Then we modify our estimated mean $\overline{\mu}_{t}$ with a weighted correction:
  * We compute the error between what we observed and what we predicted $z_t - C_t \overline{\mu}_t$ (again $C$ to map to the observation space).
  * Then we change the estimated state by this error pondered by $K$.
* We also update our uncertainty

## Assumptions

We can apply the Kalman Filter as long as the two following assumptions hold:

* Everything is Gaussian
* The motion and observation model are linear

However, what if this is not the case?

[Extended Kalman Filter](./Extended&#32;Kalman&#32;Filter.md)
