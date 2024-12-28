# Unscented Kalman Filter

## Numerical solution

* Generate $N$ samples from the original distribution

$$\begin{aligned}
x_i \sim \mathcal{N}(\overline{X}, \Sigma_X)
\end{aligned}$$

$$\begin{aligned}
i=1, \cdots, N
\end{aligned}$$

* For each sample $x_i$ apply the non-linear transformation to find the corresponding $y_i$

$$\begin{aligned}
y_i = f(x_i)
\end{aligned}$$

* Fit a gaussian to the transformed points

$$\begin{aligned}
\overline{Y} = \frac{1}{N}\sum^N y_i
\end{aligned}$$

$$\begin{aligned}
\Sigma_y = \frac{1}{N} \sum^N (y_i - \overline{Y}) (y_i - \overline{Y})^T
\end{aligned}$$

## Selecting less points to sample

Let $x$ be a $n \times 1$ random vector with mean $\overline{x}$ and covariance $P$, that is $x \sim \mathcal{N}(\overline{x}, P)$

We choose $2n$ sigma points as follows:

$$\begin{aligned}
x^{(i)} = \overline{x} + \Delta x^{(i)}
\end{aligned}$$

$$\begin{aligned}
i=1, \cdots, 2n
\end{aligned}$$

Where:

$$\begin{aligned}
\Delta x^{(i)} = (\sqrt{nP})_i
\end{aligned}$$

$$\begin{aligned}
i=1, \cdots, n
\end{aligned}$$

which means $\Delta x^{(i)}$ is the i-th column of the covariance matrix multiplied by $\sqrt{n}$. For a $2\times 1$ state vector, this gives us the two following points:

![Sigma Points](assets/sigma_points_1.png)

We do the same, but inversing, for the remaining $n$ points:

$$\begin{aligned}
\Delta x^{(n+i)} = -(\sqrt{nP})_i
\end{aligned}$$

$$\begin{aligned}
i=1, \cdots, n
\end{aligned}$$

Such that we obtain:

![Sigma Points](assets/sigma_points_2.png)

From the following image we can see the $4$ points we obtained seem to be a good approximation of the shape of the ellipse:

![Sigma Points](assets/sigma_points_3.png)

So we can use these points to obtain the new ellipse which resulted from applying the transformation.

### Mean approximation

* We apply the non-linear transformation to the sigma points:

$$\begin{aligned}
y^{(i)} = h(x^{(i)}), i = 1, \cdots, 2n
\end{aligned}$$

Such that we have the following situation:

![Transformed Sigma Points](assets/transformed_sigma_points.png)

We obtain the weighted mean of the transformed sigma points:

$$\begin{aligned}
\overline{y} = \sum_{i=1}^{2n} W^{(i)} y^{(i)}
\end{aligned}$$

Where $W^{(i)} = \frac{1}{2n}$. Such that:

$$\begin{aligned}
\overline{y} = \frac{1}{2n} \sum_{i=1}^{2n} y^{(i)}
\end{aligned}$$

And so, we obtain the following estimated mean:

![Mean of Transformed Sigma Points](assets/mean_transformed_sigma_points.png)
### Covariance approximation

We apply this same methodology for the covariance, given the transformed points $y^{(i)}$ we obtain the weighted covariance:

$$\begin{aligned}
P_y = \sum_{i=1}^{2n} W^{(i)} (y^{(i)} - \overline{y})(y^{(i)} - \overline{y})^T
\end{aligned}$$

$$\begin{aligned}
= \frac{1}{2n} \sum_{i=1}^{2n}(y^{(i)} - \overline{y})(y^{(i)} - \overline{y})^T
\end{aligned}$$

Which given us the following estimated covariance:

![Covariance of Transformed Sigma Points](assets/covariance_transformed_sigma_points.png)

## General Unscented Transformation

We now show a general definition which allows for more accuracy:

### Sigma points generation

We generate $2n+1$ instead of $2n$ and we define $x^{(0)}$ such that it equals the mean:

$$\begin{aligned}
x^{(i)} = \overline{x} + \Delta x^{(i)}, i=0, \cdots, 2n
\end{aligned}$$

$$\begin{aligned}
\Delta x^{(0)} = 0
\end{aligned}$$

$$\begin{aligned}
\Delta x^{(i)} = \left(\sqrt{(n+k)P}\right)_i, i=1, \cdots, n
\end{aligned}$$

$$\begin{aligned}
\Delta x^{(n+i)} = -\left(\sqrt{(n+k)P}\right)_i, i=1, \cdots, n
\end{aligned}$$

### Weight definition

The weights are now defined as follows:

$$\begin{aligned}
W^{(0)} = \frac{k}{n+k}
\end{aligned}$$

$$\begin{aligned}
W^{(i)} = \frac{1}{2(n+k)}
\end{aligned}$$

Where $k=3-n$ has shown to help improve accuracy. Note that $(n+k)\neq 0$

### Mean and covariance approximation

Finally we approximate the mean and the covariance of the transformed distribution the same way we did before:

* For the mean:

$$\begin{aligned}
\overline{y} = \sum_{i=1}^{2n} W^{(i)} y^{(i)}
\end{aligned}$$
 
* For the covariance:

$$\begin{aligned}
P_y = \sum_{i=1}^{2n} W^{(i)} (y^{(i)} - \overline{y})(y^{(i)} - \overline{y})^T
\end{aligned}$$
