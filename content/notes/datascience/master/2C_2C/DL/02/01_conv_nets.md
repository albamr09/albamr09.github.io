# Convolutional Nets

## Deep convolutional neural network

A deep convolutional neural network (DCNN) consists of many neural network layers. 

Two different types of layers, **convolutional** and **pooling**, are typically alternated

## Local receptive fields

If we want to preserve spatial information, we  represent each image with a matrix of pixels. 

**Convolution operation**: To **encode the local structure** is to connect a **submatrix of adjacent input neurons** (pixels) into one single hidden neuron belonging to the next layer. That single hidden neuron represents one **local receptive field**.

We can encode more information by having **overlapping submatrices**.

![Convolution example](assets/convolution.png)

A **feature map** is the result of applying the convolution on the input data, on the previous example the matrix on the right would be one feature map.

The **kernel size** is the size of each the submatrices, in the previous example $3 \times 3$. 

The **stride** is the number of elements between each submatrix. With a stide of $1$ we obtain the following result:

![Convolution example](assets/convolution_1.png)

This convolutional layer is usually followed by a non-linear activation function (e.g. ReLU).

## Shared weights and bias

To detect the same feature independently from its location on the input we define the same weights for all the neurons on a layer. This way we force the neural net to search for relevant features everywhere on the input data, instead of searching for features on specific places on the input image. 

== Pooling Layer == 

It consists on using the spatial contiguity of the output from a single feature map and **aggregate the values into a single output**. On the following image **max pooling** is being performed. 

![Max pooling example](assets/max_pooling.png)

Other common pooling operation is **average pooling**.

## An example of DCNN — LeNet

It is a family of ConvNets trained for recognizing MNIST handwritten characters with robustness to simple geometric transformations and to distortion.

It is defined as follows:

- On the **low-layers** we alternate **convolution operations** with **max-pooling operations**. (using carefully chosen local receptive fields and and shared weights).
- On higher levels are fully connected layers based on a traditional **MLP with hidden layers** and **softmax** as the output layer.

## Understanding the power of deep learning

Deep networks always outperform the simple network and the gap is bigger when the number of examples provided for training is progressively reduced.
