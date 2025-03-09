---
title: Bibliografía
weight: 1
type: docs
math: true
---

## Deep Learning on Small Tabular Dataset: Using Transfer Learning and Image Classification

**Date:** 2021

### Abstract

Deep learning methods are generally avoided for small datasets because they tend to overfit.
In the case of tabular datasets, their heterogeneous nature makes transfer learning algorithms inapplicable. This paper aims to discuss a few approaches using a literature review to convert tabular data into images to overcome such limitations.

We provide a detailed study of different techniques available to convert tabular data into images for image classification such as SuperTML, IGTD, and REFINED approach

### Introduction

In **transfer learning**, information is transferred from a pre-trained model of a related domain and then by fine-tuning that knowledge on a relatively small dataset of the current task.

However, for tabular datasets, the transfer learning and deep learning methods become inapplicable. Hence, researchers tried to develop methods to create image representations of tabular datasets: IGTD, REFINED or SuperTML.

### Deep Learning on Tabular Datasets

#### IGTD

Image Generator for Tabular Data (IGTD), transforms tabular data into images by assigning features to pixel positions so that similar features are closer in the image. Their algorithm minimizes the difference between the ranking of distances between features and the ranking of distances between their assigned pixels in the image

1. The distance between each two features is calculated.
2. All the distances are ranked in ascending order.
3. A $N \times N$ matrix is formed. Here, $N$ represents the number of features, in which at the $i$th row and $j$th column of the matrix represents rank of the distance between $i$th and $j$th features. The larger the rank is, the darker the point in the plot.
4. Similarly, a $N \times N$ matrix for pixel pairwise distances is formed
5. The error function given below is used to calculate the difference between these matrices

$$
err(R, Q) = \sum_{i = 2}^N \sum_{j=1}^{i - 1} \text{diff}(r_{ij}, q_{ij})
$$

6. The algorithm reorders the features to reduce $err(R, Q)$, keeping similar features closer in the image. For this, it selects two features using an iterative process and swaps the position of these two features.

#### REFINED

The authors have proposed to create image datasets by minimizing the pairwise distance values using a Bayesian Metric Multidimensional Scaling Approach for each datapoint.

1. First, it calculates how similar or different each feature (column) in the dataset is from the others using the Euclidean Distance. This creates a distance matrix.
2. It uses a technique called Multidimensional Scaling (MDS) to convert the distance matrix into a 2D layout. The goal is to place features that are more similar closer together in a 2D image. However, in regular MDS, some points might overlap.
3. To fix overlaps, it uses Bayesian MDS (BMDS), which adjusts the placement so that each feature gets a unique pixel in the final image. Then, it fine-tunes the layout by slightly moving features around to minimize a cost function, ensuring an optimal representation.

#### SuperTML

This method is inspired by Super Characters, a technique used in Natural Language Processing (NLP), which converts text into images of characters.

1. Instead of treating the dataset as a table with numbers, SuperTML maps each feature (column) into a specific location in an image. This means that each sample (row of the dataset) is transformed into an image representation.

> For example, SuperTML might create an 8×8 pixel image, where:
>
> - Pixel (0,0) stores Age
> - Pixel (0,1) stores Height
> - Pixel (1,0) stores Weight
> - Pixel (1,1) stores Blood Pressure
>
> And so on...

2. The generated images are then fed into a Convolutional Neural Network (CNN), a deep learning model commonly used for image recognition. Pretrained CNN models, such as ResNet or EfficientNet, are used to extract patterns and features from these images.

## Best of Both Worlds: Multimodal Contrastive Learning with Tabular and Imaging Data

**Date:** 2023

### Abstract

We propose the first selfsupervised contrastive learning framework that takes advantage of images and tabular data to train unimodal encoders. Our solution combines SimCLR and SCARF, two leading contrastive learning strategies.

We also introduce a novel form of supervised contrastive learning, label as a feature (LaaF), by appending the ground truth label as a tabular feature during multimodal pretraining.

### Related Work

#### Contrastive learning

Contrastive learning trains encoders by generating augmented views of a sample and maximizing their projected embedding similarity while minimizing the similarity between the projected embeddings of other samples.

#### Multimodal Learning

Multimodal learning is a type of machine learning that combines multiple types of data (modalities) to improve learning and prediction. Instead of relying on just one type of input (like only images or only text), multimodal learning can process and learn from two or more different data types simultaneously.

A modality is just a type of data. Some common examples of modalities include:

- Text (articles, reviews, chat messages)
- Images (photos, medical scans)
- Audio (speech recordings, music)
- Videos (a combination of images and audio)
- Tabular Data (structured numerical data, like spreadsheets)
- Sensor Data (signals from IoT devices, temperature, motion)

### Methods

Each batch contains pairs of imaging $x_{j_i}$ and tabular $x_{j_t}$ samples which are augmented.

Each augmented imaging sample $x_{j_i}$ is passed through an imaging encoder $f_{\theta_I}$ to generate the embedding $\hat{x_{j_i}}$.

Each augmented tabular sample $x_{j_t}$ is passed through a tabular encoder $f_{\theta_T}$ to generate the embedding $\hat{x_{j_t}}$.

The embeddings are propagated through separate projection heads $f_{\phi_I}$ and $f_{\phi_T}$ and brought into a shared latent space as projections $z_{j_i}$ and $z_{j_t}$ which are then L2 normalized onto a unit hypersphere.

$$
z_{j_i} = f_{\phi_I}(f_{\theta_I}(x_{j_i}))
$$

The projections are pulled and pushed in the shared latent space according to the “CLIP” loss, which maximizes the cosine similarity of projections from the same sample and minimizes the similarity of projections from different samples.

$$
l_{i, t} = - \sum_{j \in \mathcal{N}} \log \frac{\exp(\cos(z_{j_i}, z_{j_t})/\tau)}{\sum_{k \in \mathcal{N}, k \neq j} \exp(\cos(z_{k_i}, z_{k_t})/\tau)}
$$

Then $l_{t, i}$ is calculated analagously and the total loss is

$$
\mathcal{L} = \lambda l_{i, y} + (1 - \lambda) l_{t, i}
$$

See Figure 1 for an illustration of this framework

![Multimodal Contrastive Learning](./assets/multimodal_contrastive_learning.png)

## Contrastive clustering of tabular data

**Date:** 2023

### Introduction

In this paper, we investigate the adaptation of the recent contrastive clustering approach in the case of tabular data.

The efficacy of contrastive self-supervised models relies heavily on data augmentation, i.e., applying transformations that do not alter the class labels in the target task.

Applying contrastive methods to domain-agnostic tabular data presents unique challenges due to the lack of a regular internal structure and pre-defined relationships such as spatial dependencies.

Drawing on new ideas of contrastive learning in computer vision, we present the application of contrastive clustering methods for tabular data. Specifically, we examine three types of augmentation techniques.

### Method

#### Contrastive Clustering Base

The fundamental structure of our model is built on the Contrastive Clustering technique, utilizing all of its three main components:

- The backbone network
- The instance-level contrastive head
- The clusterlevel contrastive head

A feature extractor $f: \mathbb{R}^D \leftarrow \mathbb{R}^N$, represented by backbone component, returns the representation $h = f(x)$ for a given input $x$. Think of this as transforming raw data into a more useful representation for clustering.

Once we have the feature vector $h$, it goes through two separate heads:

- **Instance-Level Contrastive Head** ($g_I$): This head learns to make each data point unique, so that the model can recognize individual examples even if they are slightly changed (data augmentations). It uses NTXent loss (a contrastive loss function) to ensure that the feature representations stay consistent even when data is transformed.
- **Cluster-Level Contrastive Head** ($g_C$) This head groups similar feature vectors together into clusters. Instead of looking at individual points, it focuses on ensuring that entire clusters of data points are well separated. Uses softmax activation to assign each point to a cluster.

The model uses NTXent loss (Normalized Temperature-scaled Cross-Entropy Loss) at both levels. This pushes apart different clusters and pulls together similar points, improving clustering quality.

#### Data Augmentation for Tabular Data

We propose to use the following augmentations:

- **Gaussian noise**, generated from a standard normal distribution, is incorporated into the original data. This method involves the addition of randomly selected values derived from this distribution.
- **Swap** introduces permutations within the dataset’s features. Specifically, values from one data instance are interchanged with values from another instance.
- **Zero** is introduced by applying a dropout operation to the initial layer of the backbone network. This technique involves zeroing out a fraction of the input features.

## HyperTab: Hypernetwork Approach for Deep Learning on Small Tabular Datasets

### Abstract

HyperTab, a hypernetwork-based approach to solving small sample problems on tabular datasets. By combining the advantages of Random Forests and neural networks, HyperTab generates an ensemble of neural networks, where each target model is specialized to process a specific lower-dimensional view of the data. Since each view plays the role of data augmentation, we virtually increase the number of training samples while keeping the number of trainable parameters unchanged.

### Introduction

To meet the requirement that the augmentation is a classinvariant transformation (the class label does not change after applying the augmentation), we use the feature subsetting as the admissible augmentations. HyperTab follows the hypernetwork approach, in which a single hypernetwork builds an ensemble of target networks. Given the augmentation identifier (subset of features), the hypernetwork generates the parameters of the target network.

Each target network operates on a lower-dimensional view, where data are represented by the subset of features. Moreover, since the parameters of target networks are not optimized but returned by the hypernetwork (the hypernetwork is trained to generate the weights for each target netwrok) we significantly reduce the number of trainable parameters compared to the size of the ensemble. The only trainable parameters are the weights of the hypernetwork.

### Model

HyperTab consists of two main components: hypernetwork $H$ and an ensemble of target networks $T_j$, for $j = 1, \cdots k$. The hypernetwork takes the type of augmentation as input and returns the parameters of the target network, which is designed to use such an augmented view of data.

Let $X = \\{x_1, x_2, \cdots, x_n\\} \subset \mathbb{R}^d$ be a tabular dataset. By $c \subset \\{1, \cdots, d\\}$, where $|c| = l$, we denote the subset of $l$ selected indices. Applying the augmentation defined by $c$ to a sample $x \in \mathbb{R}^d$ produces a vector $x[c] \in \mathbb{R}^l$, which represents a lower-dimensional view of the data point $x$.

#### Construction of the ensemble

Every target network is designed to process a specific augmented view of the data. More precisely, the target network $T_c: \mathbb{R}^l \leftarrow Z$ takes a lower-dimensional representation $x[c]$ and returns a vector $z \in Z$, e.g. logits in the case of classification. The vector $z$ can be converted to the final target value, e.g. a class label $y \in Y$. The augmentation $c$ determines the form of the target network $T_c$.

We construct a central mechanism to generate the whole ensemble. That is, a hypernetwork $H$, which returns the parameters of the target network for a given type of augmentation. The augmentation $c \subset \\{1, \cdots, d\\}$ can be encoded as a binary mask $m \in \\{0, 1\\}^d$, where

$$
m_j = \begin{cases}
1, & \text{ for } j \in c \\
0, & \text{ otherwise }
\end{cases}
$$

The hypernetwork is thus a neural network $H_{\psi}: \\{0, 1\\}^d$, which transforms a binary mask $m$ representing the augmentation $c$ to the weights $\theta_c$ of the target network $T_{\theta_c}$

$$
\theta_c = H_{\psi}(m)
$$

Every target network returns:

$$
z_c = T_{\theta_c}(x[c])
$$

#### Training

To train HyperTab, we optimize the weights $\psi$ of the hypernetwork $H_\psi$.

- We take a minibatch of augmentations $B_c = \\{c_1, \cdots, c_a\\}$ and define the corresponding masks $m_j \in \\{0, 1\\}^d$.
- Using the hypernetwork, we generate the weights of the target networks $\theta_j = H_\psi(m_j)$.
- Every target network is then applied to the minibatch of data points $B_x = \\{x_1, \cdots, x_b\\}$ producing partial predictions $z_{ij} = T_{\theta_j}(x_i[c_j])$, for example $i = 1, \cdots, b$ and augmentation $j = 1, \cdots, a$.
- Vectors $z_{ij}$ are compared to true targets $y_i$ via a given loss function $L(y_i, z_{ij})$. The loss is minimized by changing the parameters $\psi$ of the hypernetwork $H_\psi$ using gradient descent.

As can be seen, a training sample is a pair of augmentation and data point. As a consequence, we have as many training samples as the number of data points times the number of augmentations.

#### Inference

Once trained, the hypernetwork $H$ can produce the ensemble of weak learners $\theta_j = H_\psi(m_j)$, where $m_j$ is a mask corresponding to the augmentation $c_j$, for $j = 1, \cdots, a$. The final prediction for a given sample $x \in \mathbb{R}^d$ is calculated as the average of the predictions of the target networks taken over all augmentations:

$$
z = \frac{1}{a} \sum_{j = 1}^a T_{\theta_j}(x[c_j])
$$

We emphasize that $z_c = T(x[c])$ is the result of the last layer of the target network, for example, logits in the case of classification.

## ReConTab: Regularized Contrastive Representation Learning for Tabular Data

**Date:** 2023

### Abstract

ReConTab is a deep automatic representation learning framework with regularized contrastive learning. It constructs an asymmetric autoencoder based on the same raw features from model inputs, producing low-dimensional representative embeddings.

Our framework consists of an asymmetric autoencoder (AE) architecture, which is able to extract the most critical information from raw features. Moreover, ReConTab can be effectively trained in both self- and semi-supervised modes.

### Related Work

The first category of deep representation learning methods is rooted in generative models, particularly autoencoders The second category predominantly revolves around the contrastive learning paradigm and strategically employs data augmentation techniques.

### Method

#### Regularization

The input weights $W$ are applied to the input features before they enter the encoder. Their purpose is to prevent similar features from weighing too much in the loss objective. They help learn more robust representations, especially when highly correlated features are present.

We apply regularization on the input layer by introducing a penalty term $\lambda ||W||_p$ into the loss function, where $W$ represents the input weights, $\lambda$ is the regularization parameter and $p$ is the specific norm for the penalty.

#### Feature Corruption

Considering the original dataset $X \subseteq \mathbb{R}^M$, given any tabular data point $x_i$, we have its $j$-th feature as $x_{ij}$. In our approach, for each sample, we stochastically select $t$ features from the pool of $M$ features and replace them with corrupted features denoted as $c$. We generate $c$ from the distribution $\hat{\mathcal{X}i_j}$, where $\hat{\mathcal{X}i_j}$ represents the uniform distribution over \(\mathcal{X}_{i_j} = \{x_{i_j} : x_i \in \mathcal{X}\}\). That is we select "randomly" any value under the $j$th column.

#### Self-supervised Learning

For each of the two data samples, $x_1$ and $x_2$, we apply input weights and add feature corruption to obtain corrupted data. Then we encode the corrupted data using an encoder, $f$, resulting
in two features, $z_1$ and $z_2$. The decoder $d$ will decode the learned embeddings to reconstruct $\hat{x}_1$ and $\hat{x}_2$ respectively, from where we can define the reconstruction loss

$$
\mathcal{L}_{\text{reconstruction}} = \frac{1}{M} \sum_{j = 1}^M (x_{1_j} - \hat{x}_{1_j})^2 + \frac{1}{M} \sum_{j = 1}^M (x_{2_j} - \hat{x}_{2_j})^2
$$

Therefore, the loss function for self-supervised learning can be defined as:

$$
\mathcal{L}_{\text{self}} = \mathcal{L}_{\text{reconstruction}} + \lambda ||W||_p
$$

**The encoder and decoder are NOT pretrained models but rather trained during the ReConTab training process itself.**

#### Semi-supervised Learning

With labels introduced, we can pose additional constraints to the encoded embeddings $z_1$ and $z_2$. We can to compute the prediction loss: $z_1$ and $z_2$ are fed to the a multi-layer perceptron (MLP) that maps from the embedding space to the label space. We define the cross-entropy loss for classification task as:

$$
\mathcal{L}_{\text{classification}} = -(y_1 \log(\hat{y}_1) + y_2 \log(\hat{y}_2))
$$

where

$$
\hat{y}_1 = MLP(z_1)\\
\hat{y}_2 = MLP(z_2)
$$

#### Contrastive Loss

We further introduce the contrastive loss Lcontrastive in the loss function by forming contrastive pairs $(z_1, z_2)$ of embeddings with respect to the classification labels $(y_1, y_2)$. With this loss function, the model is optimized to maximize the similarity between embeddings with the same label and minimize the similarity between embeddings with different labels.

During the optimization stage, we combine the two additional losses with the self-supervised learning as follows:

$$
\mathcal{L}_{\text{semi}} = \mathcal{L}_{\text{self}} + \alpha \mathcal{L}_{\text{classification}} + \beta \mathcal{L}_{\text{contrastive}}
$$

The parameters being optimized in ReConTab include:

- Input weights ($W$): Applied to the input features and regularized with a penalty term
- Encoder ($f$) parameters: Updated to minimize various loss components
- Decoder ($d$) parameters: Updated alongside the encoder
- MLP parameters (in semi-supervised learning): Used to map embeddings to labels

See Figure 1 for an illustration of the models architecture.

![ReConTab](./assets/recontab.png)

## TabContrast: A Local-Global Level Method for Tabular Contrastive Learning

**Date:**: 2023

### Introduction

With the challenges of obtaining labeled data, self-supervised learning, particularly contrastive learning, has gained traction. The essence of contrastive learning lies in crafting a discriminative embedding space. This is predominantly achieved by amplifying the similarity of positive pairs and emphasizing the dissimilarity of negative pairs. Positive pairs are usually different augmented views of the same sample, while negative pairs consist of distinct samples.

We introduce "TabContrast". This method adopts a local-global contrast approach, segmenting features into subsets and subsequently performing tailored clustering to unveil inherent data patterns. By aligning samples with cluster centroids and emphasizing clear semantic distinctions.

### Local-Global Method for Positive and Negative Pair Construction

Given a tabular dataset represented as $D = {x_i, y_i}^N_{i=1}$, each $x_i$ stands as a $d$-dimensional feature vector with $y_i$ as its associated label, and $N$ as the total sample count. The feature set is expressed as $F = {f_1, \cdots, f_d}$.

For each batch of samples, we first randomly partition the feature set $F$ into $k$ non-overlapped subsets $F_1, \cdots, F_k$.

Then, we perform clustering according to each feature subset $F_j$, and will obtain clustering groups $G = {G_1, \cdots, G_k}$, where $G_j$ is the set clustering results from $j$-th feature subset. We denote the $i$-th group in $G_j$ as $g_j^i$, and denote the clustering center of $g_j^i$ as $c^i_j = MEAN(x), \forall x \in g_j^i$.

For a given sample $x_i$, suppose the groups it belongs to are denoted as ${g_j^p}^k_{j=1}$. Formulating positive pairs for a given sample $x_i$ is achieved by local-global matching.

$$
P = \{(x_i, c_j^p) | j \in (1, k), x_i \in g_j^p\}
$$

That is, the $p$ positive pairs for $x_i$ are defined as the centroids of groups $g_j^p$.

To construct negative pairs, in order to avoid including false negatives, we propose to exclude the samples that are highly correlated with the sample $x_i$. Given the possible variation in clustering outcomes across feature subsets, samples cohabitating in at least $\lfloor \frac{k}{2} \rfloor$ groups with $x_i$ are considered highly correlated. Denote the set of these highly correlated samples as $X_p$ and the entire samples in the current batch as $X_b$, the negative pairs are represented as:

$$
N = \{(x_i, x_n) | x_n \in X_b \setminus X_P\}
$$

That is the negative pairs for $x_i$ are defined as any sample that is not assignated to the same cluster as $x_i$ more than $\lfloor \frac{k}{2} \rfloor$ times, where $k$ is the number of feature subsets we clustered.
