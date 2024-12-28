---
title: Camera
type: docs
weight: 4
math: true
---

Even though we have a camera within our 3D application, there is no camera object in the WebGL API—only matrices. That is because having matrices instead of a camera object gives WebGL the flexibility to represent complex projections and animations.

## WebGL Does Not Have Cameras

WebGL does not have a camera object that you can manipulate. However, we can assume that what we render in the `canvas` is what our camera captures.

Every time we move our camera around, we need to update the objects according to the new camera position. So, we need to transform each vertex. Similarly, we need to make sure that the object normals and light directions are still consistent after the camera has moved. In summary, we need to analyze two different types of transformations:

- vertex (points) and
- normal (vectors)

{{< cards >}}
{{< card link="01_transformations" title="Transformations" icon="variable" >}}
{{< card link="02_model_view" title="The Model, View and Projection matrices" icon="cube" >}}
{{< card link="03_normal_transform" title="Normal Transform" icon="arrow-up" >}}
{{< card link="04_camera" title="Camera Matrix" icon="video-camera" >}}
{{< /cards >}}
