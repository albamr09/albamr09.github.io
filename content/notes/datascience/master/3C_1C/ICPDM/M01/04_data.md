# Inyección/Extracción y Serialización/Deserialización de los Datos

## Apache Flume

### Las Fuentes de datos

Las empresas buscan tener todos sus datos centralizados, sean de la naturaleza que sean. Tal que existirá una única fuente de verdad o Single Source of Truth que permite la consistencia de los datos. Bajo esta premisa nacen los conceptos de Data Lake y Data Warehouse.

En un **Data Warehouse** los datos deberán adaptarse a una estructura definida antes de poder ser guardados. Se utilizan los procesos **ETL** de Extracción, Transformación y Carga para adaptar los datos y su formato a la estructura definida antes de volcarlos.

En un **Data Lake** los datos se guardan tal cual se reciben, pero pueden ser transformados antes de su extracción. Este utiliza procesos **ELT** en los que primero se realiza la carga y cuando queramos extraer información útil de dichos datos, realizaremos una transformación en caso de ser necesario.

### Batch vs Streaming

El **Procesamiento Batch** se da cuando los datos a procesar se encuentran en un almacén de datos estático y estes son finitos, tal que se escogen y procesan por lotes.

El **Procesamiento Streaming** es el procesamiento sobre datos que fluyen a través de un sistema, conforme se van añadiendo al mismo. Estes datos no son finitos y la toma de decisiones sobre ellos se hace en tiempo real.

A continuación mostramos las diferencias entre los dos tipos de procesamiento:

|                          | Procesamiento Batch                                                               | Procesamiento Streaming                                                                                      |
|------------------------------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| Hardware                     | Los recursos deben ser capaces de procesar y almacenar grandes conjuntos de datos | Los datos tienen menor tamaño, por lo que los requisitos computacionales y el almacenamiento puede ser menor |
| Latencia                     | La latencia puede ser de minutos, horas o días.                                   | La latencia debe ser en segundos o milisegundos.                                                             |
| Tamaño del conjunto de datos | Grandes lotes de datos.                                                           | Un paquete de datos o varios de ellos, siempre de tamaño menor.                                              |
| Análisis                     | Cálculo complejo y análisis en un marco temporal más amplio.                      | Informes o cálculos simples sobre los datos.                                                                 |

### Herramientas para la Inyección y Extracción de Datos

A continuación comentaremos las herramientas que nos permiten la ingesta y extracción de los datos de forma masiva.

#### Apache Scoop

Está pensado para la transferencia de datos desde un almacén estructurado a otro y utiliza procesamiento por lotes. Sin embargo, desde junio de 2021 el proyecto Sqoop dejó de tener continuidad. 

#### Apache Flume

Flume es un software para la ingesta de datos masivos en streaming. Fue presentado por Cloudera en el año 2010 y posteriormente se incorporó bajo licencia Apache como Open Source a la Fundación Apache.

Flume está basado en el flujo de datos en streaming de eventos sencillos y permite la lectura y escritura de múltiples fuentes de datos. Además de ello, Flume tiene mecanismos que aseguran la fiabilidad y confiabilidad de los datos.

##### Ventajas

- Puede manejar **grandes volúmenes de datos** eficientemente distribuyendo la carga entre múltiples agentes.
- Presenta una **gran flexibilidad**, ya que nos permite recoger datos de diversas fuentes sin atender a su formato.
- Se **integra perfectamente** con el Ecosistema Hadoop.
- Presenta **tolerancia a fallos**.

##### Desventajas

- Puede resultar difícil configurar los parámetros adecuados para los agentes. Esto puede derivar en un fenómeno conocido como Backpressure que ocurre cuando el volumen de datos entrantes supera a la cantidad de datos que pueden ser consumidos por Flume dando lugar a pérdida de eventos y por lo tanto de información, para evitar esto hay que configurar adecuadamente a los agentes.
- Está estrechamente ligado a la ingesta de datos en Hadoop, para la ingesta en otro tipo de sistemas podemos utilizar herramientas como Kafka. 
- No ofrece herramientas para el monitoreo y diagnóstico de errores de forma clara para el usuario.

### Arquitectura de Apache Flume

#### Agentes

Se trata de un conjunto de componentes independientes que dirigen los eventos desde la entrada a la salida. Además los agentes pueder recibir y enviarse datos entre sí. Un agente está compuesto de tres componentes fundamentales:

- **Source**: es el punto de entrada de datos de un agente. Cada source es configurada para leer datos desde un lugar o ubicación específica y enviarlos al channel del agente.
- **Channels**: es el lugar temporal donde los datos llegan desde el source y se procesan o no, dependiendo del caso de uso, para transmitirlos al destino final (sink).
- **Sinks**: Son los encargados de leer los datos de los canales y enviarlos al siguiente componente del sistema, que será u otro agente, o el destino final. Si los datos son consumidos por los sinks se eliminan de los canales.

![Apache Flume Architecture](../assets/apache_flume_arch.png)

#### Eventos

Se trata de una unidad de "dato". El dato es extraído por la fuente, enviado y procesado por el canal y consumido por el sink o sumidero.

Un evento se compone de dos partes:

- **Cabecera**: registra información de metadata mediante pares clave-valor
- **Datos**: son almacenados en forma de array en el cuerpo de un evento.

#### Flujo de Datos

El flujo de datos describe el recorrido de los eventos desde el comienzo hasta el destino final.

## Apache Avro

### Serialización/Deserialización

La **serialización** de un objeto consiste en la conversión de dicho objeto a un formato que puede ser transmitido y almacenado de forma eficiente (p.ej. binario o JSON). La conversión inversa se denomina **deserialización**.

Este proceso se lleva a cabo por los siguientes motivos:

- **Almacenamiento**: generalmente queremos almacenar los datos de una forma eficiente (minimizando su tamaño).
- **Transmisión**: en sistemas distribuidos es necesario el paso de datos entre sistemas, por lo tanto necesitamos que los datos esten en un formato que optmice su envío y asegure la reconstrucción de los datos.
- **Intercambio de datos**: La serialización y deserialización permite intercambiar información manteniendo la integridad de los datos, independientemente del lenguaje de programación.

### La Evolución de los Formatos

Apache Avro pertenece a la Fundación Apache y se integra perfectamente con el ecosistema Hadoop. Avro es un formato que contiene tanto los datos como el **esquema** que deben de seguir los datos.

En comparación con JSON, este no fuerza al uso de un esquema de los datos y su tamaño aumenta cuando existen claves repetidas.

Avro specifica dos formas de llevar a cabo la serialización: 

- **Binaria**: resulta en ficheros más pequeños.
- **JSON**: mejor para depurar y para comunicación en entornos web.

Avro specifica un orden de datos estándar.

### Estructura

Un fichero está conformado por dos componentes:

- Cabecera: contiene metadatos acerca del esquema de los datos entre otras cosas.
- Uno o más bloques que pueden contener metadatos o datos. En todo fichero hay al menos un bloque de metadatos (ver Block 1 en la siguiente imagen).

![File Structure](../assets/avro_file_structure.png)

Avro sigue un formato basado en filas, tal que se agupan los datos en grupos de filas.

### La Evolución de los Esquemas

Avro se puede adaptar a la evolución de los esquemas. En concreto tenemos dos tipos de esquema:

- Esquema de **escritura**: se utiliza en la serialización.
- Esquema de **lectura**: se utiliza en la deserialización.

Existen los siguientes tipos de compatibilidad:

- **Compatibilidad hacia delante**: un nuevo esquema puede leer datos escritos con un esquema anterior.
- **Compatibilidad hacia atrás**: un esquema antiguo puede leer datos escritos con un nuevo esquema.
- **Compatibilidad completa**: combina la compatibilidad hacia delante y hacia atrás.

Para asegurar la compatibilidad de los esquema tenemos diversas reglas:

- Al añadir campos estes siempre deben de tener un valor por defecto.
- Sólo se pueden eliminar campo si estes no son necesarios para las aplicaciones que leen/escriben el esquema.

### Ventajas

- La compresión de los datos es automática
- Está totalmente tipado
- Los ficheros contienen tanto los datos como la definición del esquema
- Los datos pueden ser procesado por casi cualquier lenguaje
- Permite la evolución sencilla de la definición del esquema de los datos
- Permite el paso de datos entre sistemas escritos en distintos lenguajes

### Ejemplo de Esquema

Vamos a ver cómo definir un esquema para los siguientes datos, uno está almacenado como un archivo CSV, mientras que el otro está definido como un fichero JSON.

```csv
name, email, age
Ana,ana@avro.com,34
Juan,juan@avro.com,28
Alvaro,alvaro@avro.com,35
Maria,maria@avro.com,25
Luis,luis@avro.com,30
```

```JSON
[
     {"name": "David", "email": "david@avro.com", "age": 28},
     {"name": "Pablo", "email": "pablo@avro.com", "age": 31},
     {"name": "Ines", "email": "ines@avro.com", "age": 34}
]
```

Definimos un esquema que define un objeto, en concreto un usuario. Por lo tanto, el esquema será de tipo record. Los esquemas se escriben en formato JSON, y hay que indicar por cada campo el nombre de éste y el tipo de datos asociado.

```JSON
{
     "type": "record",
     "name": "User",
     "fields": [
         {"name": "name", "type": "string"},
         {"name": "email", "type": "string"},
         {"name": "age", "type": "int"},
     ]
}
```

## Apache Parquet

### Formato Columnar

Los formatos que habíamos estado tratando guardan los datos en filas (CSV, Avro, JSON), los formatos de archivos columnares guardan los datos en columnas. Lo formatos más populares son Apace Parquet y Apache OCR.

Por ejemplo, dada la siguiente tabla:

![Example Table](../assets/apache_parquet_table.png)

La siguiente imagen nos ilustra las diferencia entre guardarla en formato fila y en formato columna:

![Row vs Column Format](../assets/apache_parquet_row_vs_col.png)

#### Ventajas

El formato columnar presenta ventajas a la hora de llevar a cabo agrupaciones en grandes conjuntos de datos. Si utilizamos el formato basado en filas deberemos de recorrer toda la tabla, sin embargo con el formato columnar sólo es necesario leer el campo por el cual se lleva a cabo la agrupación.

Por el mismo motivo este tipo de formato puede suponer menos costes (p.ej. si están alojados en el cloud). Generalmente no sólo se cobra por el almacenamiento si no también por la consulta y el uso de los datos. Tal que si sólo queremos consultar una columna, con un formato basado en filas de nuevo deberemos de consultar la fila completa, mientras que el formato columnar nos permite sólo obtener el campo consultado.

### Apache Parquet

Parquet es un tipo de fichero en formato columnar diseñado para realizar consultas eficientes sobre las columnas. Además permite estructuras complejas de datos anidados y ofrece esquemas de compresión muy eficientes. Por ello es popular en campos como el Big Data, ya que a parte de su eficiencia reduce costes.

Parquet está sostenido y mantenido en la Fundación Apache y, por tanto, está disponible para cualquier proyecto bajo licencia Apache.

#### Estructura de un Fichero Parquet

Los ficheros Parquet tienen una **estructura jerarquizada**: encabezado, metadatos y grupos de filas.

- **Encabezado**: contiene información necesaria para la lectura del fichero. **Magic number** se trata de un número al final y al principio del fichero que asegura que está completo y no corrupto.
- **Metadatos**: contienen información sobre los datos; el esquema de las columnas, tipos de datos, algunas estadísticas y otros datos relevantes.
- **Grupos de filas**: contienen los datos organizados por columnas. Cada grupo de filas tiene un subconjunto de la tabla, donde las columnas de cada grupo de filas se dividen en páginas, que son las unidades más pequeñas de almacenamiento. La subdivisión en páginas tiene como fin mejorar la eficiencia ya que admiten la compresión individual. Podemos encontrar páginas de datos, índices o de diccionario.
- **Esquema**: define la estructura de los datos y los tipos de datos de cada columna. En caso de que los datos estén anidados también define la jerarquía de estos.

![Apache Parquet File Structure](../assets/apache_parquet_file_structure.png)
