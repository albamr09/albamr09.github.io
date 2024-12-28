# Frameworks para Deep Learning

## Tensorflow

### Arquitectura Tensorflow

Presenta un núcleo de bajo nivel (C++/CUDA). Además se define un API Python sencillo para definir el gráfico computacional, así como APIs de alto nivel (TF-Learn, Keras, etc)

![Tensorflow Architecture](assets/tensorflow_architecture.png)

### Tensorflow vs Numpy

- Numpy no dispone de funciones/métodos para la creación de funciones de tensores y no computa automáticamente sus derivadas.
- NumPy no tiene soporte para GPU.

### Modelo Computacional de Tensorflow

Tensorflow construye grafos donde cada nodo es un tensor y cada arista es una operación entre los tensores. De tal manera que, como vemos en la figura inferior, se pueden repartir las computaciones entre distintas GPUs.

![Tensorflow Computational Graph](assets/tensorflow_computational_graph.png)

#### Lazy Evaluation

Este grafo sólo encompasa la definición de las operaciones, de tal manera que no requiere de su ejecución. Si no que la ejecución sólo se produce durante el entrenamiento.

### Tensorflow Hub

Se trata de un repositorio de modelo pre-entrenados.

### Operaciones

A continuación mostramos una serie de operaciones soportadas por Tensorflow:

![Tensorflow Operations](assets/tensorflow_operations.png)

## Theano

Se trata de otro framework, pionero en el uso de grafos computacionales. Es una herramienta generalista, tal que podemos implementar cualquier tipo de algoirtmo sobre el framework. Además se puede especificar como backend a utilizar en Keras, en lugar de Tensorflow.

Sin embargo, finalizó su desarrollo a partir de la versión 1.0.

Librerías que usan Theano
- Keras
- blocks
- lasagne
- sklearn-theano
- PyMC 3
- theano-rnn
- Morb

Además presenta las siguientes características:

- Permite la evaluación lazy del grafo (precursor de esta ténica).
- Da soporte para GPU's.
- Permite la diferenciación simbólica.

## Keras

Keras puede ser utilizado con tensorflow o también como una librería adicional. Además presenta las siguientes ventajas:

- Sencilla para comenzar, y sencilla para avanzar
- Se ejecuta sobre Theano y TensorFlow
- Disponibilidad de herramientas de visualización (Tensorboard)
- Escrita de forma modular: fácil de expandir
- Suficientemente potente para escribir modelos serios

Pero también presenta las siguiente desventajas:

- Menos flexible
- Menos tipos: no hay modelos RBM, por ejemplo.
- Menos proyectos disponibles online que Caffe
- Soporte Multi-GPU no del 100%

La idea general para la creación de modelos/algoritmos sigue el siguiente esquema:

- Preparar los tensores de entrada y salida
- Crear la primera capa (layer) para manejar el tensor de entrada
- Crear la última capa (layer) para manejar el tensor de salida (targets)
- Construir virtualmente cualquier modelo entre estas dos capas (hidden layers)

Las definiciones de los modelos pueden ser guardados y recuperados en formato `json` y en formato `yaml`. Los parámetros también pueden ser guardados y recuperados en formato `h5`.

### Tipos de Modelos

Keras soporta dos tipos de modelos:

- Modelo Secuencial
- API funcional: Se usa para definir modelos complejos: modelos multi-output, grafos acíclicos dirigidos (graph) o modelos con capa compartidas
- Grafo (deprecado)

## Caffe

- Construido sobre C++, CUDA.
- Presenta una gran cantidad de modelos pre-entrenados

La definición de modelos de hace de forma declarativa:

![Caffe Declarative Models](assets/caffe_declarative_models.png)

Cuáles son sus aplicaciones?

- Object Detection
- Pixelwise Prediction

## Torch

- Su backend está basado en C y en CUDA.
- Su frontend está escrito sobre Lua.

## PyTorch

Torch en python.

## Fast.AI

Es muy similar a Keras, Fast.AI permite generar herramientas y modelos pre-entranados de manera muy sencilla.

## Aplicaciones de DL

- Visión
- Speech Recognition
- NLP
