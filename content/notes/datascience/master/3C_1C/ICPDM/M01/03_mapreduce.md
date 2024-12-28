# Programación MapReduce

## El paradigma de programación MapReduce: Hadoop Streaming

### ¿Qué es MapReduce?

El flujo de procesamiento de MapReduce se divide en dos etapas: **Map** y **Reduce** las cuales se ejecutan de manera distribuida en distintos nodos de procesamiento mientras que un proceso central denominado **Job Tracker** controla su ejecución.

### Fases de Map Reduce

1. **Map**: Los datos de entrada se subdividen en bloques independientes que son procesados de forma paralela por los mappers. Normalmente Hadoop intenta ejecutar los mappers en los nodos donde se encuentran los datos sobre los que va a trabajar (**data locality**). Esto reduce los tiempos de acceso a los datos y la necesidad de transferencia de datos entre nodos.
2. **Shuffle & sort**: los datos intermedios de los mappers se ordenan. Este proceso comienza mientras las tareas map están en progreso, a medida que van terminando. No es necesario esperar a que todas terminen.
3. **Reduce**: comienza cuando todos los datos han sido ordenados en **Shuffle & sort**. Recibe como entrada estes datos ordenados estructurados como pares clave valor agrupados por clave. Cada reducer toma los valores asociados a una clave y los agrega/procesa y devuelve el resultado como salida que se puede almacenar en HDFS o en otro sistema.
4. Generalmente se concatenan varias fases de mapper-reducer para completar una tarea.

![Map Reduce](../assets/map_reduce.png)

### Hadoop Streaming

Hadoop Streaming se trata de una utilidad que permite ejecutar aplicaciones en Hadoop escritas en cualquier lenguaje, a pesar de que Hadoop este escrito en Java. Este proporciona un interfaz de entrada y de salida (stdin/stdout) que es consumida por las aplicaciones, tal que existe una pasarela de datos que actúa como comunicación entre Hadoop y la aplicación.

{{file:../assets/hadoop_streaming.png}}

En la imagen anterior se muestra el flujo de un trabajo MapReduce.

1. Se leen los datos de entrada y se produce una lista de pares clave-valor.
2. Se proporcionan los datos en este formato a un mapper externo a través del canal estándar de entrada.
3. Se devuelve el resultado de los mapper en el mismo formato a través del canal estándar de salida.
4. Se proporcionan los datos procesados por los mapper al reducer externo a través de la entrada estándar.
5. Se devuelve el resultado del reducer a través de stdout.
6. Finalmente se almacena el resultado del reducer, bien en HDFS o en otro sistema externo.

Como podemos ver en todas las fases del proceso de mantiene siempre la estructura de pares clave-valor.

### Ejemplo Práctico de MapReduce

Para ejemplificar MapReduce planteamos el siguiente problema: queremos obtener la frecuencia de cada palabra en un documento.

![MapReduce Example](../assets/map_reduce_example_1.png)

- **Map**: dividimos el proceso en dos mappers (idealmente cada proceso mapper se debería de ejecutar en el nodo en el cual se encuentra el bloque de datos). Estes se encargan de obtener la frecuencia de las palabras en la "porción de texto" sobre el que trabajan.

![MapReduce Example](../assets/map_reduce_example_2.png)

- **Shuffle & Sort**: se ordenan y se agrupan los valores por la clave, donde la clave en nuestro caso es la palabra y el valor su frecuencia.

![MapReduce Example](../assets/map_reduce_example_3.png)

- **Reduce**: se ejecuta un reducer por cada clave presente en el resultado, que agrupa (en nuestro caso suma) los valores bajo cada clave, es decir las frecuencias asociadas a la palabra.

![MapReduce Example](../assets/map_reduce_example_4.png)

### Optimización: Combiners y Partitioner

MapReduce cuenta con dos componentes para optimizar el procesamiento denominados **combiners** y **partitioners**.

1. **Combiners**: agrupan los resultados de cada mapper antes de llegar a la frase de shuffle and sort con el objetivo de reducir el tamaño de los datos que se le proporcionan al reducer.
2. **Partitioners**: se utilizan para determinar cómo se distribuyen los datos a cada reducer. Por defecto Hadoop distribuye la carga de trabajo de manera uniforme entre los reducers, pero se puede personalizar utilizando los **partitioners**.

## Programación MapReduce con lenguajes de alto nivel: Hive

### Introducción a Apache Hive

**Hive** fue creado por Facebook en el año 2007. Se trata de una abstracción sobre Hadoop, que permite utilizar su lenguaje de consulta, **HiveQL**, para generar de manera automática programas MapReduce.

### Arquitectura de Apache Hive

#### Cliente

Existen varias maneras de interactuar con Hive:

- Interfaz Web
- Su interfaz de línea de comandos (CLI), Beeline
- **HiveServer**: un servidor Thrift de Hive que permite acceder a través de JDBC, ODBC o Thrift API.

#### Catálogo Centralizado: Metastore

Hive almacena los metadatos (esquemas de las tablas, tipos de datos, etc) en un catálogo centralizado denominado **Metastore**, que se trata de una base de datos relacional. Existen tres tipos de configuraciones:

- **Embedded Metastore**: se integra el código en el mismo proceso que el programa Hive y la base de datos. Generalmente utilizado en entornos de prueba.
- **Local Metastore**: se ejecuta de manera local pero en un proceso distinto.
- **Remote Metastore**: se configura en remote, tal que se desliga el metastore del resto de procesos. Generalmente se utiliza en entornos de producción.

#### Driver de Gestión

Es el encargado de gestionar una consulta HiveQL durante todo su ciclo de vida.

#### HiveQL Parser

Se encarga de transformar las consultas en HiveQL a programas MapReduce.

#### Optimizador y Planificador de Consultas

- **Optimizador de Consultas**: reorganiza la consulta para poder optimizarla mediante técnicas como el filtrado anticipado.
- **Planificador de Consultas**: decide cómo y cuándo se ejecutan las consultas.

#### Motor de Ejecución

Se encarga de ejecutar la tarea de consulta de forma distribuida y paralela en los nodos del cluster de Hadoop.

#### Almacenamiento de Datos

Los datos deben estar almacenados en HDFS y generalmente se almacenan en un formato aceptado por bases de datos relacionalales (p.ej. csv) o formatos que se integran con Hive como Parquet o Avro.

![Hive Architecture](../assets/hive_architecture.png)

### Estructura Interna

Hive impone sobre HDFS una estructura propia que llamaremos esquema o Schema, la cual es almacenada en su propia base de datos (metastore).

#### Tipos de Datos

Hive soporta tipos de datos primitivos: **STRING**, **INT**, **BOOLEAN** y otros tipos de datos como **DATE**, así como tipos de datos compuestos: 

- **ARRAY**: son grupos de elementos del mismo tipo.
- **MAP**: define elementos clave-valor: `{1: "flor, 2: "hoja", 3: "perro", 4: "gato}`
- **STRUCT**: permite crear objetos: `{"animal": "perro", "tipo": "mamífero", "numero_patas": 4}`

#### Estructura de Datos

##### Tablas

Las tablas están compuestas por filas y columnas y tienen esquemas bien definidos, pero tienen una estructura lógica que se corresponde con una carpeta en HDFS. Existen dos tipos de tablas:

- **Tabla Interna (o gestionada)**: son tablas gestionadas por Hive. Cuando se crea una tabla interna automáticamente se crea un carpeta en HDFS y Hive controla tanto la tabla como sus datos. Si esta tabla se borra también se borra la carpeta en HDFS.

```
 -- creación tabla interna
CREATE TABLE libros (
     id INT,
     titulo STRING,
     autor STRING,
     categoria STRING);
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE;
```

- **Tabla externa**: se trata de una tabla populada con datos ya existentes en HDFS. Su estructura se define en la Metastore y si borramos la tabla no se borra su contenido en HDFS. Esta opción es útil cuando compartimos datos entre distintas herramientas.

```
-- creación tabla externa
CREATE EXTERNAL TABLE libros_externa (
     id INT,
     titulo STRING,
     autor STRING,
     categoria STRING);
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/curso-bigdata/externa/libros';
```

En la tabla anterior se indica la ubicación de los datos utilizando `LOCATION`. El término `STORED AS` indica el formato del fichero en el que residen los datos.

#### Particiones

Las **particiones** son subdivisiones en una tabla Hive que permite la optimización de las consultas eliminando valores irrelevantes. Las subdivisiones se realizan en base a los valores de las columnas, por ejemplo si tenemos una variable nominal se podría particionar la tabla según las distintas categorías. Existen dos tipos de particiones:

- **Particiones estáticas**: son definidas por parte del usuario pero no cambian en el tiempo.
- **Particiones dinámicas**: Hive se ocupa de crear automáticamente las particiones basándose en los valores de la columna especificada.

![Hive Partitions](../assets/hive_partitions.png)

```
-- creación tabla con particiones
CREATE TABLE libros_particion (
     id INT,
     titulo STRING,
     autor STRING,
)
PARTITIONED BY (categoria STRING);

-- insertar datos
INSERT INTO TABLE libros_particion PARTITION (categoria=Fantástico) VALUES
 (1, 'Harry Potter y la Piedra Filosofal', 'J.K. Rowling');
 (2, 'Harry Potter y la Cámara Secreta', 'J.K. Rowling');
-- etc
```

#### Buckets

Los buckets son otra técnica de división de datos, estes están identificados mediante un par 'clave, valor' que distribuye los datos según una función hash. El objetivo principal para utilizar buckets es optimizar las consultas, sobre todo cuando estas son de tipo JOIN o unión.

Podemos realizar los buckets bien de forma dinámica o estática. La diferencia radica en la elección de la columna que especifiquemos en la cláusula `CLUSTERED BY`.

```
-- creación tabla con buckets
CREATE TABLE prestamos (
     id INT,
     libro_id INT,
     fecha_prestamo STRING,
     socio_id INT,
)
CLUSTERED BY (libro_id) INTO 5 BUCKETS;   
```
