# Autoencoders

## Autoencoders

An autoencoder is a type of artificial neural network used to learn efficient codings of unlabeled data (unsupervised learning).

An autoencoder learns two functions: 

- An **encoding function** that transforms the input data
- A **decoding function** that recreates the input data from the encoded representation.

The autoencoder learns dense representations (encoding) for a set of data.

![Autoencoder](assets/autoencoder.png)

We can force the network to learn useful features adding different types of constraints, for example:

- Defining the dense representation such that is has a lower dimensionality than the input data.
- Adding noise to the input data ([Denoising Autoencoders](#Autoencoders-Autoencoders-Denoising&#32;Autoencoders)).

_The number of neurons in the output layer must be equal to the number of inputs._

The outputs are often called the **reconstructions** because 
The cost function contains a **reconstruction loss** that penalizes the model when the reconstructions are different from the inputs.

- **Undercomplete autoencoder**: the internal representation has a lower dimensionality than the input data.
- **Overcomplete autoencoder**: the internal representation has a higher dimensionality than the input data.

### Stacked Autoencoders

**Stacked autoencoders** are said to be autoencoders that have multiple hidden layers.

![Stacked Autoencoder](assets/stacked_autoencoder.png)

### Tying weights

An autoencoder with **tied weights** has decoder weights that are the transpose of the encoder weights

This reduces the number of parameters of the model, thus speeds up training and limits the risk of overfitting.

### Convolutional Autoencoders

Used with image data.

- The encoder is a regular CNN composed of convolutional layers and pooling layers. It reduces the spatial dimensionality of the inputs (i.e., height and width) while increasing the depth (i.e., the number of feature maps). 
- The decoder must do the reverse (upscale the image and reduce its depth back to the original dimensions).

### Recurrent Autoencoders

Used with sequential data.

- The **encoder** is typically a sequence-to-vector RNN, which compresses the input sequence down to a single vector. 
- The **decoder** is a vector-to-sequence RNN that does the reverse

### Denoising Autoencoders

We want to add noise to the input data, and then train the network to be able to recover the original noise-free inputs.

The noise can be pure Gaussian noise added to the inputs, or it can be randomly switched-off inputs, just like in dropout.

![Denoising Autoencoders](assets/denoising_autoencoders.png)

### Sparse Autoencoders

A sparse autoencoder is an autoencoder whose training criterion involves a sparsity penalty.

In most cases, we would construct our loss function by penalizing activations of hidden layers so that only a few nodes are encouraged to activate when a single sample is fed into the network.

### Variational Autoencoders

They are probabilistic autoencoders as well as generative models.

1. Instead of directly producing a coding for a given input, the encoder produces a mean coding $\mu$ and a standard deviation $\sigma$. 
2. The actual coding is then sampled randomly from a Gaussian distribution with mean $\mu$ and standard deviation $\sigma$. 
3. After that the decoder decodes the sampled coding normally.
 
![Variational Autoencoder](assets/variational_autoencoder.png)

## Generative Adversarial Networks

GANs are composed of two neural networks: 

- A **generator** that tries to generate data that looks similar to the training data
- A **discriminator** that tries to tell real data from fake data. Takes either a fake image from the generator or a real image from the training set as input, and **must guess whether the input image is fake or real**.

Each training iteration is divided into two phases:

1. We train the discriminator. A batch of data where half are real real images and the other half are fake images produced by the generator. The labels are set to $0$ for fake images and $1$ for real images, and the discriminator is trained on this labeled batch for one step. Backpropagation only optimizes the weights of the discriminator.
2. We train the generator: we only add fake images to the data, and all the labels are set to $1$ (real). We want the generator to produce images that the discriminator will believe to be real. Backpropagation only affects the weights of the generator.

The generator and the discriminator compete against each other during training.

### The Difficulties of Traning GANs

It has been demonstrated that a GAN can only reach a single [Nash equilibrium](https://en.mdpedia.org/wiki/Nash_equilibrium) (we assume the training process to be finished): that’s when the generator produces perfectly realistic images, and the discriminator is forced to guess ($50\%$ real, $50\%$ fake). Nothing guarantees that the equilibrium will ever be reached.

The biggest difficulty is called **mode collapse**: this is when the generator’s outputs gradually become less diverse. Such that the generator gets very good at generating data of a concrete kind, good enough to fool the discriminator, however it progressively start representing data of another kind and then forgets about the previous class of data.

Moreover, because the generator and the discriminator are constantly pushing against each other, their parameters may end up **oscillating** and becoming unstable. And since many factors affect these complex dynamics, GANs are very **sensitive to the hyperparameters**.

There are some techniques that aim to avoid this behaviour like: experience replay and mini-batch discrimination.

- **Experience replay**: stores images on a buffer and the discriminator uses the images on this buffer as input for fake images. Old images are then progressively replaces by newer images.
- **Mini-batch discrimination**: it measures how similar are images on the batch, the discriminator uses this statistic to decide whether to reject the whole batch or not.

### Deep Convolutional GANs

These are GANs **based on deeper convolutional** nets for larger images.

### Progressive Growing of GANs

- It begins by generating images at low resolution, such as $4 \times 4$ pixels.
- The model is first trained on low-resolution images. Once training stabilizes at this resolution, additional layers are added to the generator and discriminator to allow for the generation of higher-resolution images.
- After adding new layers, there is usually a transition phase where the model is trained on a mixture of images at the old and new resolutions. This gradual transition allows the model to adapt to the increased resolution without destabilizing the training process.
- Once the training stabilizes at the new resolution, the transition phase ends, and the model continues to train exclusively on images at the higher resolution.

![Progressive Growing of GANs](assets/progressive_growing_gans.png)

![Transition on Progressive Growing of GANs](assets/progressive_growing_gans_transition.png)

Increasing the resolution progressively allows the model to learn to capture both global and local features of the images more effectively.

### Style GANs

What sets StyleGANs apart is the introduction of "style" into the generation process. In traditional GANs, the generator takes random noise as input and directly generates images. In StyleGANs, the generator learns to separate the "content" of the image (e.g., facial features) from the "style" (e.g., lighting, color, texture). This allows for more fine-grained control over the generated images.

The StyleGAN generator and discriminator models are trained using the progressive growing GAN training method.

StyleGANs consist of two main components: a mapping network and a synthesis network. 

- The **mapping network** takes as input a latent vector (random noise) and maps it to an intermediate latent space, which controls the style of the generated image. 
- The **synthesis network** then takes the intermediate latent representation and generates the final image.

![Style GANs](assets/style_gans.png)
