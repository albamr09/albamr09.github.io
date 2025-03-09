---
title: Proposal
weight: 2
type: docs
math: true
---

## Problem

Classification on with tabular using deep neural networks

## Possible solutions

Given a tabular dataset use multimodal learning where the two modalities are as follows:

- Image data: generated from tabular data.
- Tabular data: raw dataset.

### First Approach

- For the tabular data use contrastive learning, but how?
  - Hypernetwork? Idk if the output of this type of network would merge good with output of CNN
  - ReConTab: seems a good approximation as it obtains a lower dimensional represetation of the data that could be used (this could be combined with TabContrast for obtaining positive/negative pairs)
- For the image data: use pretrained CNNs to extract useful information
- Merge both approximations for classification. How are these datasets merged though?
  - **Cross-modal transformers**: Allow interactions between modalities during fusion
  - **Multimodal Transformer with Contrastive Objectives**:
    - After encoding, you can feed the modality-specific embeddings into a multimodal transformer. You can use attention mechanisms within the transformer to allow the model to attend to the most important features from both modalities.
    - You can then apply a contrastive loss at multiple stages of the transformer (either at the embedding level or after the attention mechanism), ensuring that the attention process is aligned with your goal of minimizing distances for similar instances and maximizing distances for dissimilar ones.
- Classification: downstream the fused data into a classification model
  - This could be a simple MLP, a more complex neural network, or even a traditional classifier

### Second Approach

Use directly the approach presented on (../01_bibliography#best-of-both-worlds-multimodal-contrastive-learning-with-tabular-and-imaging-data)[Best of Both Worlds: Multimodal Contrastive Learning with Tabular and Imaging Data]
