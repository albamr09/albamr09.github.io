# Extended Kalman Filter

## Local Linearization

In order to perform local linearization what we do is approximate the non-linear functions $g$ and $h$ by the means of the Taylor Expansion. Thus we re-define our non-linear functions as follows:

The linearization for prediction step consists of linearizing around our previous state $x_{t-1} = (\mu_{t-1}, \Sigma_{t-1})$and is described as follows:

$$\begin{aligned}
g(u_t, x_{t-1}) \approx g(u_t, \mu_{t-1}) + \frac{\delta g(u_t, \mu_{t-1})}{\delta x_{t-1}}(x_{t-1} - \mu_{t-1})
\end{aligned}$$

* $g(u_t, \mu_{t-1})$ is the value of our non-linear model at the linearization point $\mu_{t-1}$, which corresponds to our previous belief.
* $G_t = \frac{\delta g(u_t, \mu_{t-1})}{\delta x_{t-1}}$ is the slope of the local linearization at $x_{t-1}$. This is a first partial derivative which constitutes a Jacobian.
* $(x_{t-1} - \mu_{t-1})$ tells us how far we are away from the linearization point $\mu_{t-1}$.

For the correction step we linearize around our predicted state $\overline{x}_t = (\overline{\mu}_t, \overline{\Sigma}_t)$:

$$\begin{aligned}
h(x_t) \approx h(\overline{\mu}_t) + \frac{\delta h(\overline{\mu}_t)}{\delta x_t} (x_t - \overline{\mu}_t)
\end{aligned}$$

* $h(\overline{\mu}_t)$ is the value of our non-linear observation model at the linearization point, which now is the predicted belief, that is the best estimate that I have.
* $H_t = \frac{\delta h(\overline{\mu}_t)}{\delta x_t}$ is the Jacobian that equals the slope at the linearization point.
* $(x_t - \overline{\mu}_t)$ signifies how far away is the variable $x_t$ to our linearization point $\overline{\mu}_t$.

### Jacobian

Given a function $f: \mathbb{R}^n \rightarrow \mathbb{R}^m$, such that given $x \in \mathbb{R}^n$, $x \mapsto f(x) \in \mathbb{R}^{m}$. Then the Jacobian has the following shape:

$$\begin{aligned}
J = \begin{bmatrix}
\frac{\delta f_1}{\delta x_1} & \frac{\delta f_1}{\delta x_2} & \cdots & \frac{\delta f_1}{\delta x_n}  \\
\vdots & \cdots & \cdots & \vdots \\
\frac{\delta f_m}{\delta x_1} & \frac{\delta f_m}{\delta x_2} & \cdots & \frac{\delta f_m}{\delta x_n} 
\end{bmatrix} \in \mathbb{R}^{m \times n}
\end{aligned}$$

And we can illustrate it graphically:

![Jacobian](assets/jacobian.png)

As you can see, for points close to the linearization point, it constitutes a good approximation, but the further we move away the bigger the error is.

So, let's revisit the transformation of our Gaussian belief. Remember we had, the following non-linear transformation:

![Gaussian under non linear transformation](assets/gaussian_under_non_linear_transformation.png)

What we do now, is take the mean of our belief $\mu_t$ and approximate it locally with a linear function by using the Taylor Expansion as we have explained before. And then we transform our Gaussian belief with this linear approximation (represented by the red line) which results in the following transformation:

![Gaussian under non linear transformation](assets/gaussian_under_approximated_linear_transformation.png)

### Error Under Local Linearization

When we perform local linearization the error depends on to factors:

* The difference between the non-linear function and its linear approximation
* The uncertainty of our original Gaussian distribution. Because the larger the uncertainty, more probability mass will fall farther from our linearization point (the mean of that same Gaussian distribution), and remember that the further we are from the linearization point the worse the approximation is, and thus the bigger the error is.

## Linearized Motion Model

We defined our linear motion model as follows:

$$\begin{aligned}
p(x_t|x_{t-1}, u_t) = \det(2\pi R_t)^{-\frac{1}{2}} \exp(-\frac{1}{2}(x_t - A_tx_{t-1} - B_tu_t)^TR^{-1}_t(x_t - A_tx_{t-1} - B_tu_t))
\end{aligned}$$

If our world is non-linear we substitute 

$$\begin{aligned}
x_t = A_tx_{t-1} + B_tu_t + \epsilon_t
\end{aligned}$$

for

$$\begin{aligned}
x_t = g(u_t, x_{t-1}) + \epsilon_t
\end{aligned}$$

Therefore the motion model is expressed as follows:

$$\begin{aligned}
p(x_t|x_{t-1}, u_t) = \det(2\pi R_t)^{-\frac{1}{2}} \exp(-\frac{1}{2}(x_t - g(u_t, x_{t-1}))^TR^{-1}_t(x_t - g(u_t, x_{t-1})))
\end{aligned}$$

Finally we find a linear approximation, such that:

$$\begin{aligned}
g(u_t, x_{t-1}) \approx g(u_t, \mu_{t-1}) + \frac{\delta g(u_t, \mu_{t-1})}{\delta x_{t-1}}(x_{t-1} - \mu_{t-1}) = g(u_t, \mu_{t-1}) + G_t(x_{t-1} - \mu_{t-1})
\end{aligned}$$

And the linearized motion model becomes:

$$\begin{aligned}
p(x_t|x_{t-1}, u_t) = \det(2\pi R_t) ^{-\frac{1}{2}} \cdot
\end{aligned}$$
$$\begin{aligned}
\cdot \exp(-\frac{1}{2}(x_t - g(u_t, \mu_{t-1}) - G_t(x_{t-1} - \mu_{t-1}))^TR^{-1}_t \cdot
\end{aligned}$$
$$\begin{aligned}
\cdot (x_t - g(u_t, \mu_{t-1}) - G_t(x_{t-1} - \mu_{t-1})))
\end{aligned}$$

Where $R^{-1}_t$ describes the motion noise.

## Linearized Observation Model

We defined our linear observation model as follows:

$$\begin{aligned}
p(z_t|x_t) = \det(2\pi Q_t)^{-\frac{1}{2}} \exp(-\frac{1}{2}(z_t - C_tx_t)^TQ^{-1}_t(z_t - C_tx_t))
\end{aligned}$$

If our world is non-linear we substitute 

$$\begin{aligned}
z_t = C_t x_t + \delta_t
\end{aligned}$$

for

$$\begin{aligned}
z_t = h(x_t) + \delta_t = h(\overline{\mu}_t) + \delta_t
\end{aligned}$$

Note that $x_t = \overline{\mu}_t$ here refers to our best estimation up until now, that comes from the prediction step. Therefore the observation model is expressed as follows:

$$\begin{aligned}
p(z_t|x_t) = \det(2\pi Q_t)^{-\frac{1}{2}} \exp(-\frac{1}{2}(z_t - h(\overline{\mu}_{t}))^TQ^{-1}_t(z_t - h(\overline{\mu}_{t})))
\end{aligned}$$

Finally we find a linear approximation, such that:

$$\begin{aligned}
h(x_t) \approx h(\overline{\mu}_t) + \frac{\delta h(\overline{\mu}_t)}{\delta x_t} (x_t - \overline{\mu}_t) = h(\overline{\mu}_t) + H_t (x_t - \overline{\mu}_t)
\end{aligned}$$

And the linearized observation model becomes:

$$\begin{aligned}
p(z_t|x_t) = \det(2\pi Q_t)^{-\frac{1}{2}} \cdot
\end{aligned}$$
$$\begin{aligned}
\cdot \exp(-\frac{1}{2}(z_t - h(\overline{\mu}_t) - H_t (x_t - \overline{\mu}_t))^TQ^{-1}_t \cdot
\end{aligned}$$
$$\begin{aligned}
\cdot (z_t - h(\overline{\mu}_t) - H_t (x_t - \overline{\mu}_t)))
\end{aligned}$$

Where $Q^{-1}_t$ describes the measurement noise.

## Algorithm

To take into account the linearized models, we have to make a few changes to the Kalman Filter Algorithm:

![Extended Kalman Filter Algorithm](assets/EKF_algorithm.png)

* The first thing that changes is that we use our linearized moition model $g(u_t, \mu_{t-1})$ to obtain our predicted estate $\overline{x}_t = (\overline{\mu}_t, \overline{\Sigma}_t)$
* We use the Jacobian $G_t$ to transform our previous uncertainty $\Sigma_{t-1}$, given the Jacobian is the linear transformation that approximates the non-linear transformation we defined originally for our motion model.
* Same thing goes for the correction step. We use the Jacobian $H_t$ to apply a linear transformation that allows us to map $\overline{\Sigma}_t$ from the state space to the observation space, and thus calculate the Kalman Gain taking into account the measurement noise. 
* Then we compute the corrected mean of the estimated state $x_t$ by obtaining the weighted sum of the mean of the predicted state $\overline{\mu}_t$ and the correction factor. This correction factor equals the difference between the actual measurement $z_t$ and the mapping of the predicted state to the observation space given by our linearized function $h(\overline{\mu}_t)$. This mapping equals the expected measurement given our state is $\overline{\mu}_t$.
* We do the same thing for the uncertainty $\Sigma_t$.

### Kalman Gain

Suppose you have a perfect sensor, that is we trust completely the values given by this sensor and thus we set the measurement noise to be equal to zero ($Q_t = 0$). Then, the Kalman Gain becomes:

$$\begin{aligned}
K_t = \overline{\Sigma}_t H_t^T \cdot (H_t \overline{\Sigma}_t H_t^T + Q_t)^{-1}
\end{aligned}$$

$$\begin{aligned}
K_t = \overline{\Sigma}_t H_t^T \cdot (H_t \overline{\Sigma}_t H_t^T + 0)^{-1}
\end{aligned}$$

$$\begin{aligned}
K_t = \overline{\Sigma}_t H_t^T \cdot (H_t^T)^{-1} \overline{\Sigma}_t^{-1} H_t^{-1}
\end{aligned}$$

$$\begin{aligned}
K_t = \overline{\Sigma}_t I \overline{\Sigma}_t^{-1} H_t^{-1}
\end{aligned}$$

$$\begin{aligned}
K_t = I H_t^{-1} = H_t^{-1}
\end{aligned}$$

So, when we perform the correction over the mean of our belief:

$$\begin{aligned}
\mu_t = \overline{\mu}_t + K_t (z_t - h(\overline{\mu}_t))
\end{aligned}$$

$$\begin{aligned}
\mu_t = \overline{\mu}_t + H_t^{-1} (z_t - h(\overline{\mu}_t))
\end{aligned}$$

$$\begin{aligned}
\mu_t = \overline{\mu}_t + H_t^{-1} z_t - H_t^{-1}h(\overline{\mu}_t)
\end{aligned}$$

With $H_t^{-1}h(\overline{\mu}_t)$ what we are doing is, first computing $h(\overline{\mu}_t)$ to map $\overline{\mu}_t$ to the observation space, and the undoing this mapping with $H_t^{-1}$, which means:

$$\begin{aligned}
\mu_t = \overline{\mu}_t + H_t^{-1} z_t - \overline{\mu}_t
\end{aligned}$$

$$\begin{aligned}
\mu_t = \overline{\mu}_t - \overline{\mu}_t + H_t^{-1} z_t 
\end{aligned}$$

$$\begin{aligned}
\mu_t = H_t^{-1} z_t 
\end{aligned}$$

Where $H_t^{-1}$ maps $z_t$ from the observation space to the state space, and this means in this update we trust our observation completely, and therefore our estate equals the observation.

On the contrary, suppose the sensor is very unreliable, and so the noise is set to be infinity. Then the correction step is executed as follows:

$$\begin{aligned}
K_t = \overline{\Sigma}_t H_t^T \cdot (H_t \overline{\Sigma}_t H_t^T + Q_t)^{-1}
\end{aligned}$$

$$\begin{aligned}
K_t = \overline{\Sigma}_t H_t^T \cdot (H_t \overline{\Sigma}_t H_t^T + \infty)^{-1}
\end{aligned}$$

Because we are dividing by infinity, $K_t = 0$. So the mean of our belief is computed as follows:

$$\begin{aligned}
\mu_t = \overline{\mu}_t + K_t (z_t - h(\overline{\mu}_t))
\end{aligned}$$

$$\begin{aligned}
\mu_t = \overline{\mu}_t + 0 (z_t - h(\overline{\mu}_t))
\end{aligned}$$

$$\begin{aligned}
\mu_t = \overline{\mu}_t
\end{aligned}$$

Hence, if the measurement is too noisy, we only take into account our predicted state.

## Localization Example

[Localization Example using Extended Kalman Filter (from 11')](https://www.youtube.com/watch?v=PiCC-SxWlH8&list=PLgnQpQtFTOGSeTU35ojkOdsscnenP2Cqx&index=11&t=767s)
