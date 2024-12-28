# Proveedores

## Deep Cognition

Se trata de una plataforma que incorpora un IDE visual que permite definir una red neuronal. Se puede utilizar:

- En la nube
- En local
- En una máquina virtual
- En una máquina de azure

![Deep Cognition](assets/deep_congnition.png)

## H2O.AI

Su arquitecture se detalla en la siguiente imagen:

![H2O Architecture](assets/h2o_architecture.png)

En la parte superior vemos los lenguajes que soporta:

![H2O Architecture](assets/h2o_architecture_1.png)

Seguidamente tenemos un bloque de tradcutores (Rapids en C++ y Scala en Java):

![H2O Architecture](assets/h2o_architecture_2.png)

A continuación tenemos los algoritmos definidos así como la herramienta de predcción para H2O:

![H2O Architecture](assets/h2o_architecture_3.png)

En la siguiente imagen tenemos la parte de la gestión de la computación que se lleva a cabo encima de clusters Spark/Hadoop o sobre la distribución standalone de H2O:

![H2O Architecture](assets/h2o_architecture_4.png)

### Auto ML

Permite evaluar modelos dado un conjunto de datos en base a una serie de métricas:

![Auto ML](assets/auto_ml.png)

### Driverless AI

Permite desarrollar el pipeline completo de H2O de forma visual, tal que permite automatizar tareas.

## Big ML

Se trata de una empresa española. Define algoritmos de clasificación, regresión, análisis de clusters, detección de anomalías, descubrimiento de asociación y modelado. Destaca sobretodo en el preprocesamiento de datos, visualización y en la evaluación de modelo.

No soporta ni CNN (no soporta capas de convolución ni de pooling) ni RNN.

Los parámetros soportados son los siguientes:

![Big ML Limitations](assets/big_ml_deepnets_limitations.png)
