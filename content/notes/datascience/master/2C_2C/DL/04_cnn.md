# Redes Neuronales Convolucionales en Visión Artificial

## Clasificación de Imágenes

Una CNN para clasificación de imágenes está conformada por dos bloques:

1. Conjunto de capas que llevan a cabo la extracción de caracterísitcas
2. Clasificador que toma como entrada las características extraídas por la red neuronal

![Structure of CNN](assets/cnn_structure.png)

Este tipo de redes necesita una gran cantidad de datos. En caso de no poseer un volumen elevado de datos se puede hacer uso de técnicas como el aumento de muestras y el uso de redes pre-entrenadas.

### Aumento de Muestras

Consiste en crear nuevas muestras a partir de muestras existentes utilizando transformaciones aleatorias:

- Rotaciones y translaciones.
- Recorte o zoom.
- Voltear horizontalmente (si no hay suposiciones de simetría horizontal).
- Añadir pequeñas cantidades de ruido.

En Keras esto se puede llevar a cabo utilizando `ImageDataGenerator`.

### Redes Pre-entrenadas

Si la red ha sido entrenada sobre un conjunto de datos lo suficientemente grande y general entonces, entonces podemos utilizarlo sobre clases no utilizadas en el entrenamiento original. Existen dos técnicas:

- **Extracción de de características**: utiliza la red pre-entrenada para extraer características de los nuevos datos. Con las nuevas características se entrena un clasificador desde cero.
- **Ajuste fino**: utiliza unas cuantas capas de la red pre-entrenada y las entrena conjuntamente con el nuevo clasificador.

#### Extracción de Características

Se puede hacer de dos maneras:

- Aplicar la base convolutiva sobre el conjunto de datos y utlizarla para entrenar el clasificador. **No permite el aumento de datos**
- Extender la base convolutiva con un nuevo clasificador y entrenar todo el conjunto. Es mucho más lenta per **permite el aumento de datos**

#### Ajuste Fino

Se lleva a cabo como sigue:

1. Se añade la nueva red sobre la CNN pre-entrenada
2. Se bloquea la red pre-entrenada, de manera que sus pesos no cambian
3. Se entrena la nueva red
4. Se desbloquean algunas capas superior (que extraer las características de más alto nivel), tal que sus pesos sí se pueden entrenar
5. Entrenar estas capas y la nueva red

## Detección de Objetos

Un sistema de detección de objetos debe producir el nombre de la clase asignada a la imagen, una caja de abarque (bounding box) y generalmente la probabilidad de que el objeto pertenezca a la clase.

Se presentan los siguientes retos a la hora de llevar a cabo la detección: oclusiones, cambios de puntos de vista y tamaños, objetos no rígidos y desenfoque por movimiento

### Métodos

Antes del desarrollo de las redes neuronales se empleaban las **Cascadas de Haar**, que extraer características por convolución con kernels suma de píxeles en negro menos en blanco que seguidamente se pasan a un clasificador entrenado.

Por otra parte, tenemos la detección basada en CNN que consiste en modificar nuestras redes CNN para no sólo clasificar, si no también obtener la caja de abarque y la forma del objeto. Dentro de estes distinguimos dos tipos:

- Detectores de dos etapas, como por ejemeplo Region CNN. Son letos y no permiten su aplicación en tiempo real.
- Detectore de una etapa, como por ejemplo Single Shot Multibox Detector. Sí que permiten su aplicación en tiempo real.

#### RegionCNN

1. Se generan una serie de propuestas de caja de abarque a distintas escalas.
2. Se procesan las cajas utilizando una CNN pre-entrenada
3. Se clasifican utilizando un clasificador como SVM
4. Se procesan las cajas utilizando regresión lineal para ajustar las coordenadas

![Region CNN](assets/region_cnn.png)

## Segmentación Semántica

En la segmentación clásica el objetivo consiste en agrupar píxeles contiguos de una categoría similar.

![Example of Classic Segmentation](assets/classic_segmentation.png)

La segmentación semántica se distingue de la segmentación clásica en que intenta particionar la imagen en partes con significado y clasificarlas.

### Métodos

Se utiliza una especie de GAN, ya que tienen una red codificadora pre-entrenada seguida de una red decodificadora:

- La red codificadora aprende características distintivas a baja resolución
- La red decodificadora proyecta semánticamente las características en el espacio de píxeles (alta resolución)

![Semantic Segmentation](assets/cnn_semantic_segmentation.png)

## Aplicaciones

- Aprendizaje de similaridad.
- Subtitulado de imágenes.
- Generación de imágenes.
- Seguimiento en secuencias de imágenes.
- Todo lo comentado aplicado a vídeo y a imagen 3D.
- Robots: odometría y localización y creación de mapas (SLAM) usando cámaras.
