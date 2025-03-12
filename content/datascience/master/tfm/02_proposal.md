---
title: Proposal
weight: 2
type: docs
math: true
---

## Problem

Classification on with tabular using deep neural networks

## Possible solutions

### First Approach

#### Contrastive Learning for Tabular Data Pretraining

Using a **TabContrast** approach:

- Generate positive pairs by applying augmentations to your tabular data:
- Implement an encoder architecture
- Use NT-Xent loss:
  - Maximize similarity between positive pairs
  - Minimize similarity between negative pairs (other samples in batch)

I mean I could use something else, but I think this method allows for more artifically generated training data that could be beneficial.

_Maybe ReConTab + TabContrast but that may be too complex_

#### Transforming Table Rows into Images

- Use: REFINED, etc to convert to image data
- Use pre-trained CNN to extract features.

_Crazy to use contrast learning on this phase?_

#### Merging the Two Information Sources

Using an attention-based fusion approach:

- For tabular data: Extract the lower-dimensional embeddings form our encoder.
- For images: use our CNN to extract the lower-dimensional representation of the image.
- Fusion:
  - Project embeddings on the same dimension (this might require another head?)
  - Implement cross-attention (... I don't know how this works)
- Pass through a final MLP for classification

### Second Approach

Given a tabular dataset use multimodal learning where the two modalities are as follows:

- Generate image data same as before, using REFINED, etc.
- Tabular data: raw dataset.

Use directly the approach presented on [Best of Both Worlds: Multimodal Contrastive Learning with Tabular and Imaging Data](../01_bibliography#best-of-both-worlds-multimodal-contrastive-learning-with-tabular-and-imaging-data)
