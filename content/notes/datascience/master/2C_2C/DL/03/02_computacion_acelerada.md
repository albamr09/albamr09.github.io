# Computación Acelerada

## Diferencias CPU/GPU

- Una CPU tiene un número limitado de cores, mientras que una GPU tiene un número muy elevado de cores.
- Una GPU tiene procesadores menos potentes (menos operaciones por ciclo), sin embargo tiene muchas más unidades lógicas-aritméticas (ALU), por lo que tiene más capacidad de cálculo a coste de tener menos capacidad de manejo de almacenamiento.

## Proveedores

- Nvidia: se basa en la arquitecture Compute Unified Device Architecture (CUDA).
- AMD: se basa en una arquitectura más abierta, Heterogeneous System Architecture (HSA), que es multiplataforma. Su arquitectura se puede utilizar con distintos proveedores, p.ej. Nvidia.

### Flujo de Procesamiento en CUDA

![CUDA Processing Flow](assets/CUDA_processing_flow.png)

### Plataformas

![CUDA Platfroms](assets/CUDA_platforms.png)

## TPU

Diseñado por Google especialmente diseñado para operaciones matriciales y tensores. Su uso fundamental es en el entrenamiento de redes neuronales y la inferencia.

### Por qué utilizar TPUs?

Según Google:

- Son 30x más rápidos que GPUs y CPUs.
- Presentan una gran eficiencia energética.
- Las NN desarrolladas con Tensorflow requieren muy pocas líneas de código.
- Requieren menos tiempo -> menos dinero.

### Cuándo deberíamos utilizar una TPU?

![TPU Usage Recommendation](assets/TPU_usage_recommendation.png)

### Versiones

Hay dos versiones:

- V2: HBM de 8 GB/TPU core. 1MXU (128x128) por core. TPU pod, hasta 512 cores (4TB de memoria)
- V3: HBM de 16 GB/TPU core. 2 MXU (128x128) por core. TPU pod, hasta 2048 cores (32 TB de memoria)

### Flujo de Ejecución de TPUs

![TPU Execution Flow](assets/TPU_execution_flow.png)
