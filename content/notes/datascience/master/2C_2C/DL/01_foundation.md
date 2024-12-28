# T1. Fundamentos de las Redes Neuronales Profundas

## Deep networks

We could define deep learning as a class of **machine learning techniques**, where **information is processed** in hierarchical layers to understand representations and features from data in increasing levels of complexity. 

In practice, all deep learning algorithms are neural networks.

With that in mind, let's look at the main classes of neural networks. The following list is not exhaustive, but it represents the vast majority of algorithms in use today:

- Multi-layer perceptrons (MLPs)
- Convolutional neural networks (CNNs)
- Recurrent networks 
- Autoencoders

## Training deep networks

We can use different algorithms to train a neural network. But in practice, we almost always use **Stochastic Gradient Descent (SGD) and backpropagation**.

In the following section, we'll introduce **momentum**, the weight update rule is defined as follows:

$$\begin{aligned}
w \rightarrow w - \lambda \nabla (J(w))
\end{aligned}$$

where $\lambda$ is the learning rate. First we calculate the weight update value

$$\begin{aligned}
\Delta w \rightarrow \mu\Delta w - \lambda (\nabla J(w))
\end{aligned}$$

We see that the first component, $\mu\Delta w$, is the momentum. The $\Delta w$ represents the previous value of the weight update and $\mu$ is the coefficient, which wil  determine how much the new value depends on the previous ones. 

Then we update the weight:

$$\begin{aligned}
w \rightarrow w + \Delta w
\end{aligned}$$

You may encounter other gradient descent optimizations, such as:

1. Nesterov momentum
2. ADADELTA
3. RMSProps
4. Adam

## The reasons for deep learning's popularity

The first reason is, today, we have a **lot more data** than in the past.

The second reason is the **increased computing power**. This is most visible in the drastically increased processing capacity of **Graphical Processing Units** (GPUs). Neural networks are organized in such a way as to take advantage of the GPU's parallel architecture.

## Introducing popular open source libraries

The basic unit for data storage is the **tensor**. A tensor is a generalization of a matrix to higher dimensions.

Neural networks are represented as a **computational graph of operations**. The **nodes** of the graph represent the **operations** (weighted sum, activation function, and so on). The **edges represent the flow of data**.

Some common libraries:

- **Tensorflow**
- **Keras**: is a high-level neural net Python library that runs on top of TensorFlow, CNTK or Theano. 
- **Pytorch**: is a deep learning library based on Torch.
