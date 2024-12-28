# Boltzmann Based Networks

## Boltzmann Machines

They are fully connected artificial neural networks, but they are based on **stochastic neurons**. The working of Boltzmann Machine is mainly inspired by the **Boltzmann Distribution** which says that the current state of the system depends on the energy of the system and the temperature at which it is currently operating. These neurons output $1$ with some probability, given by the following equation:

$$\begin{aligned}
p(s_i^{\text{next step}} = 1) \sigma\left(\frac{\sum_{j=1}^N w_{i,j}s_j + b_i}{T}\right)
\end{aligned}$$

Where:

- $s_j$ is the $j$th neuron's state ($0$ or $1$).
- $w_{i,j}$ is the connection weight between the $i$th and $j$th neurons. Note that $w_{i,i}$ = 0.
- $b_i$  is the ith neuron’s bias term.
- $N$ is the number of neurons in the network.
- $T$ is a number called the network’s temperature; the higher the temperature, the more random the output.
- $\sigma$ is the logistic function. 

Hence to implement these as Neural Networks, we use the **Energy Models**. The energy term was equivalent to the deviation from the actual answer. The higher the energy, the more the deviation. It has been thus important to train the model until it reaches a low-energy point.

The nodes in Boltzmann Machines are simply categorized as visible and hidden nodes. The visible nodes take in the input. The same nodes which take in the input will return back the reconstructed input as the output.

![Boltzmann Machine](assets/boltzmann_machine.png)

The energy function of the Boltzmann machine is defined as follows:

{{$%aligned%
E(v, h) = - \sum_{i} v_ib_i - \sum_k h_kb_k - \sum_{i, j}v_iv_jw_{i,j} \sum_{i,k}v_ih_kw_{i, k} - \sum_{k,l}h_kh_kw_{k,l}
}}$

Where $v$ are the visible units, $h$ as the hidden units $b$ is the bias and $w_{i, j}$ are the weights between units $i$ and $j$.

The probability of a joint configuration over both the visible unit and the hidden unit is as follows:

{{$%aligned%
p(v,h) = \frac{e^{-E(v,h)}}{\sum_{m, n} e^{-E(m, n)}}
}}$

And, for example, the probability distribution of visible units is obtained by marginalizing out hidden units:

{{$%aligned%
p(v) = \frac{\sum_h e^{-E(v,h)}}{\sum_{m, n} e^{-E(m, n)}}
}}$

This can now be utilized to sample visible units.

Training a Boltzmann machine means finding the parameters that will make the network approximate the training set’s probability distribution. So we have to obtain the parameters tha maximize the likelihood of the observed data. The traning algorithm runs as described:

- Obtain the log likelihood function of visible units, by marginalizing the hidden units:

$$\begin{aligned}
l(v|w) = \log p(v|w) = \log \sum_h e^{-E_{v, h}} - \log \sum_{m, n} e^{-E_{m, n}}
\end{aligned}$$

- Take the derivative of the log likelihood function as a function of $w$:

$$\begin{aligned}
\frac{\delta l(v|w)}{\delta w} = \frac{\delta \log \sum_h e^{-E_{v, h}}}{\delta \sum_h e^{-E_{v, h}}} \cdot \frac{\delta \sum_h e^{-E_{v, h}}}{\delta w} - \frac{\delta \log \sum_h e^{-E_{v, h}}}{\delta \sum_{m,n} e^{-E_{m, n}}} \cdot \frac{\delta \sum_̣{m,n} e^{-E_{m, n}}}{\delta w}
\end{aligned}$$

$$\begin{aligned}
= \frac{1}{\sum_h e^{-E_{v, h}}} \cdot \sum_h \frac{\delta e^{-E_{v,h}}}{\delta w} - \frac{1}{\sum_{m,n} e^{-E_{m, n}}} \cdot \sum_{m,n} \frac{\delta e^{-E_{m,m}}}{\delta w}
\end{aligned}$$

$$\begin{aligned}
= \frac{1}{\sum_h e^{-E_{v, h}}} \cdot \sum_h -e^{-E_{v,h}} \frac{\delta E_{v,h}}{\delta w} - \frac{1}{\sum_{m,n} e^{-E_{m, n}}} \cdot \sum_{m,n} -e^{E_{m,m}} \frac{\delta E_{m,m}}{\delta w}
\end{aligned}$$

$$\begin{aligned}
= -\sum_h \frac{e^{-E_{v,h}}}{\sum_h e^{-E_{v, h}}} \frac{\delta E_{v,h}}{\delta w} + \sum_{m,n} \frac{e^{E_{m,m}}}{\sum_{m,n} e^{-E_{m, n}}} \frac{\delta E_{m,m}}{\delta w}
\end{aligned}$$

We know that:

$$\begin{aligned}
p(h|v) = \frac{p(v, h)}{p(v)} = \frac{\frac{e^{-E_{v, h}}}{\sum_{m,n} e^{-E_{m, n}}}}{\frac{\sum_h e^{-E_{v, h}}}{\sum_{m,n} e^{-E_{m, n}}}}
\end{aligned}$$

By removing both $\sum_{m,n} e^{-E_{m, n}}$, we obtain:

$$\begin{aligned}
 = \frac{e^{-E_{v, h}}}{\sum_h e^{-E_{v, h}}}
\end{aligned}$$

Such that:

$$\begin{aligned}
= -\sum_h p(h|v) \frac{\delta E_{v,h}}{\delta w} + \sum_{m,n} p(m,n) \frac{\delta E_{m,m}}{\delta w}
\end{aligned}$$

And by de definition of the expected value $\mathbb{E}(x) = \sum_x x p(x)$:

$$\begin{aligned}
= - \mathbb{E}_{p(h|v)}[\frac{\delta E_{v,h}}{\delta w}] + \mathbb{E}_̣{p(m,n)}[\frac{\delta E_{m,m}}{\delta w}] 
\end{aligned}$$

Computing these expectations is in general an **intractable problem**. he general approach for solving this problem is to use [Markov chain Monte Carlo](https://towardsdatascience.com/monte-carlo-methods-and-simulations-explained-in-real-life-modeling-insomnia-f49685b321d0) (MCMC) to approximate these quantities:

$$\begin{aligned}
\frac{\delta l(v|w)}{\delta w} = - <s_i, s_j>_{p(h_{data}|v_{data})} + <s_i, s_j>_{p(h_{model}|v_{model})}
\end{aligned}$$

Here $<\cdot, \cdot>$ denotes the expectation.

## Restricted Boltzmann Machines

An RBM is a Boltzmann machine that only has connections between visible and hidden units.

![Restricted Boltzmann Machine](assets/rbm_structure.png)

The energy function of the RBM is defined as follows:

$$\begin{aligned}
E(v, h) = - \sum_i v_ib_i - \sum_k h_kb_k - \sum_{i,k} v_i h_k w_{i,k}
\end{aligned}$$

### Contrastive Divergence

This is a very efficient training algorithm for Boltzmann machines. Here is how it works:

1. For each training instance $x$, the algorithm starts by feeding it to the network by setting the state of the visible units to $x_1, \cdots, x_n$.
2. Compute the state of the hidden units by applying the output formula for a hidden neuron (see ), which gives us the vector $h$, where $h_i$ is the output of the ith neuron.
3. Next you compute the state of the visible units, by applying the same stochastic equation, which gives you vector $x'$.
4. Once again you compute the state of the hidden units, which gives you a vector $h'$.

Now you can update each connection weight by applying:

$$\begin{aligned}
w_{i, j} = w_{i, j} + \eta (xh^T - x'h'^T)
\end{aligned}$$

The great benefit of this algorithm is that it does not require waiting for the network to reach thermal equilibrium.

## Deep Belief Nets

A Deep Belief Net is an RBM where several layers of RBMs can be stacked. Such that the hidden units of the first-level RBM serve as the visible units for the second-layer RBM. 

You can train DBNs one layer at a time using Contrastive Divergence, starting with the lower layers.

Their lower layers learn low-level features in the input data, while higher layers learn high-level features. Thus it learns information in a hierarchical way.

![Deep Belief Network](assets/deep_belief_nets.png)

Just like RBMs, DBNs are fundamentally unsupervised, but you can also train them in a semi-supervised manner by adding some visible units to represent the labels.

The following describes the training process:

1. RBM 1 is trained without supervision.
2. RBM 2 is trained with RBM 1’s hidden units as inputs without supervision
3. RBM 3 is trained using RBM 2’s hidden units as inputs, as well as extra visible units used to represent the target labels

One advantage of this semisupervised approach is that you don't need much labeled training data.

DBNs can also work in reverse. If you activate one of the label units, the signal will propagate up to the hidden units of RBM 3, then down to RBM 2, and then RBM 1, and a new instance will be output by the visible units of RBM 1.

This **generative capability** of DBNs is quite powerful. For example, it has been used to automatically generate captions for images, and vice versa: first a DBN is trained (without supervision) to learn features in images, and another DBN is trained (again without supervision) to learn features in sets of captions (e.g., "car" often comes with "automobile"). Then an RBM is stacked on top of both DBNs and trained with a set of images along with their captions; it learns to associate high-level features in images with high-level features in captions. Next, if you feed the image DBN an image of a car, the signal will propagate through the network, up to the top-level RBM, and back down to the bottom of the caption DBN, producing a caption. Due to the stochastic nature of RBMs and DBNs, the caption will keep changing randomly

A DBN, however, suffers from the following problems:

- Inference in DBNs is a problem because of the "explaining away" effect
- A DBN can only use greedy retraining and no joint optimization over all layers

### Deep Boltzmann Machines

The distinction between DBM and DBN from the previous section is that DBM information flows on bidirectional connections in the bottom layers.

![Deep Boltzmann Machine](assets/deep_boltzmann_machines.png)

You can also train a DBM using contrastive divergence.
