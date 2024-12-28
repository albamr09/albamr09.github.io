# Recurrent Neural Nets

## SimpleRNN cells

RNN cells incorporate this dependence by having a **hidden state**, or memory. The value of the hidden state is a function of the value of the hidden state at the previous time step and the value of the input at the current time step.

$$\begin{aligned}
h_t = \phi(h_{t-1}, x_t)
\end{aligned}$$

where $h_t$ and $h_{t-1}$ are the values of the hidden states at the time steps $t$ and $t-1$ and $x_t$ is the values of the input at time $t$. **Note that the equation is recursive**

![Unrolled RNN](assets/rnn_unrolled.png)

At time $t$ the cell has an input $x_t$ and an output $y_t$. Part of the output $y_t$ (the hidden state $h_t$) is fed back into the cell for use at a later time step $t+1$. On the previous image we show the behaviour of a single cell unrolled.

Notice that the weight matrices $U$, $V$, and $W$ are shared across the steps. We can also describe the computations within an RNN in terms of equations:

$$\begin{aligned}
h_t = tanh(Wh_{t-1} + Ux_t)
\end{aligned}$$

$$\begin{aligned}
y_t = sofmax(Vh_t)
\end{aligned}$$

## RNN topologies

RNNs can be arranged in many ways to solve specific problems.

![RNN Topologies](assets/rnn_topologies.png)

In the basic topology, all input sequences are of the same length and an output is produced at each time step. 

Another example of a many to many RNN could be a machine translation network shown on the **many-to-many** topology. These take in a sequence and produces another sequence. For example, the input could be a sequence in English and the output could be the translation in Spanish.

Other variants are the **one-to-many network**, an example of which could be an image captioning network, where the input is an image and the output a sequence of words.

Similarly, an example of a **many-to-one network** could be a network that does sentiment analysis of sentences, where the input is a sequence of words and the output is a positive or negative sentiment.

## Vanishing and exploding gradients

Training the RNN involves backpropagation, where the gradient at each output depends not only on the current time step, but also on the previous ones, this process is called **backpropagation through time** (BPTT).

![Backpropagation through time](assets/backpropagation_through_time.png)

During backpropagation (shown by dotted lines), the gradients of the loss with respect to the parameters $U$, $V$, and $W$ are computed at each time step and the parameters are updated with the sum of the gradients.

The following equation shows the gradient of the loss with respect to $W$:

$$\begin{aligned}
\frac{\delta L}{\delta W} = \sum_t \frac{\delta L_t}{\delta W}
\end{aligned}$$

Let us now look at what happens to the gradient of the loss at the last time step ($t=3$)

$$\begin{aligned}
\frac{\delta L_3}{\delta W} = \frac{\delta L_3}{\delta y_3} \frac{\delta y_3}{\delta h_2} \frac{\delta h_2}{\delta_W}
\end{aligned}$$

The previous equation is simply deriving by applying the chain rule, where:

1. The loss function $L_3$ is defined as a function of $y_3$, 
2. Then $y_3 = softmax(Vh_2)$ 
3. And finally $h_2 = tanh(Wh_1 + Ux_1)$

The gradient of the hidden state $h_2$ with respect to $W$ can be further decomposed as the sum of the gradient of each hidden state with respect to the previous one.

$$\begin{aligned}
\frac{\delta L_3}{\delta W} = \sum_{t=0}^2 \frac{\delta L_3}{\delta y_3} \frac{\delta y_3}{\delta h_2} \frac{\delta h_2}{\delta h_t}\frac{\delta h_t}{\delta_W}
\end{aligned}$$

Finally, each gradient of the hidden state with respect to the previous one can be further decomposed as the product of gradients of the current hidden state against the previous one.

$$\begin{aligned}
\frac{\delta L_3}{\delta W} = \sum_{t=0}^2 \frac{\delta L_3}{\delta y_3} \frac{\delta y_3}{\delta h_2} \left(\prod_{j=t+1}^2 \frac{\delta h_j}{\delta h_{j-1}}\right)\frac{\delta h_t}{\delta_W}
\end{aligned}$$

For example for $t = 3$:

$$\begin{aligned}
\frac{\delta L_4}{\delta W} = \frac{\delta L_4}{\delta y_4} \frac{\delta y_4}{\delta h_3} \left(\prod_{j=4}^2 \frac{\delta h_j}{\delta h_{j-1}}\right)\frac{\delta h_4}{\delta_W}
\end{aligned}$$

$$\begin{aligned}
\frac{\delta L_4}{\delta W} = \frac{\delta L_4}{\delta y_4} \frac{\delta y_4}{\delta h_3} \left(\frac{\delta h_4}{\delta h_3}\frac{\delta h_3}{\delta h_2}\frac{\delta h_2}{\delta h_1}\right)\frac{\delta h_4}{\delta_W}
\end{aligned}$$

On general:

$$\begin{aligned}
\frac{\delta L_i}{\delta W} = \sum_{t=0}^i \frac{\delta L_i}{\delta y_i} \frac{\delta y_i}{\delta h_{i-1}} \left(\prod_{j=t+1}^i \frac{\delta h_j}{\delta h_{j-1}}\right)\frac{\delta h_i}{\delta_W}
\end{aligned}$$

Consider the case where the individual gradients of a hidden state with respect to the previous one is less than one. As we backpropagate across multiple time steps, the product of gradients get smaller and smaller, leading to the problem of **vanishing gradients**.

Similarly, if the gradients are larger than one, the products get larger and larger, leading to
the problem of **exploding gradients**.

The effect of vanishing gradients is that the gradients from steps that are far away do not contribute anything to the learning process, so the RNN ends up not learning long range dependencies.

While there are a few approaches to minimize the problem of vanishing gradients, such as:

1. Proper initialization of the $W$ matrix
2. Using a ReLU instead of tanh layers
3. Pre-training the layers using unsupervised methods

**The most popular solution is to use the LSTM or GRU architectures.**

## Long short term memory — LSTM

The LSTM is a variant of RNN that is capable of learning long term dependencies.

![Long Short Term Memory](assets/ltsm.png)

The line across the top of the diagram is the cell state c, and represents the internal memory of the unit. 

The line across the bottom is the hidden state.

Also, $i$, $f$, and $o$ are the input, forget, and output gates.

The forget gate defines how much of the previous state $h_{t-1}$ you want to allow to pass through.

The input gate defines how much of the newly computed state for the current input $x_t$ you want to let through.

The output gate defines how much of the internal state you want to expose to the next layer.

The internal hidden state $g$ is computed based on the current input $x_t$ and the previous hidden state $h_{t-1}$.

Such that:

$$\begin{aligned}
i = \sigma(W_ih_{t-1} + U_ix_t)
\end{aligned}$$
$$\begin{aligned}
f = \sigma(W_fh_{t-1} + U_fx_t)
\end{aligned}$$
$$\begin{aligned}
o = \sigma(W_oh_{t-1} + U_ox_t)
\end{aligned}$$
$$\begin{aligned}
g = \tanh(W_gh_{t-1} + U_gx_t)
\end{aligned}$$
$$\begin{aligned}
c_t = (c_{t-1} \otimes f) \oplus (g \otimes i)
\end{aligned}$$
$$\begin{aligned}
h_t = tanh(c_t) \otimes o
\end{aligned}$$

One thing to realize is that an LSTM is a drop-in replacement for a SimpleRNN on the recurrent neural network.

## Gated recurrent unit — GRU

This type of cell has two gates, an **update gate** $z$, and a **reset gate** $r$. 

![GRU RNN](assets/gru_rnn.png)

The update gate defines how much previous memory to keep around.

The reset gate defines how to combine the new input with the previous memory.

The following equations define the gating mechanism in a GRU:

$$\begin{aligned}
z = \sigma(W_zh_{t-1} + U_z x_t)
\end{aligned}$$

$$\begin{aligned}
r = \sigma(W_rh_{t-1} + U_r x_t)
\end{aligned}$$

$$\begin{aligned}
c_t = tanh(W_c(h_{t-1} \otimes r) + U_cx_t)
\end{aligned}$$

$$\begin{aligned}
h_t = (z \otimes c) \oplus ((1 - z) \otimes h_{t-1})
\end{aligned}$$

GRU and LSTM have comparable performance, while GRUs are faster to train and need less data to generalize  in situations where there is enough data, an LSTM's greater expressive power may lead to better results.
