# El Núcleo de Hadoop

## Fundamentos y Herramientas del Ecosistema de Hadoop

La naturaleza de los datos masivos hace que la utilización de sistemas de almacenamiento y procesamiento tradicionales, como las bases de datos relaciones, sea inviable.

El ecosistema de Hadoop es un entorno software que permite alamcenar, procesar y analizar este tipo de datos de forma eficiente.

### La Evolución de Hadoop

A principio de los 2000 e inspirado por las innovaciones en sistemas distribuidos de Google (Google File System y el modelo de programación MapReduce), Doug Cutting desarrolla una alternativa en código abierto a estas tecnologías.

Inicialmente se crearon dos partes: 

- **Hadoop Distributed File System** (HDFS): una manera de almacenar grandes cantidades de datos.
- **MapReduce**: un sistema para procesar estes datos distribuidos.

Tras el éxito de Hadoop surgieron otros proyectos como Hive, Pig y Sparkk que ampliaron lo que se podía hacer con Hadoop. En la actualidad Hadoop es un estándar en el Big Data y es utilizado en muchas industrias diferentes.

### Características de Hadoop

#### Código Abierto

El código fuente de Hadoop se encuentra disposible públicamente, lo cual fomenta innovación ya que distintos desarrolladores pueden trabajar en mejorar el software.

#### Distribuido

Se trata de una plataforma de computación distribuida que ha sido diseñada para poder manejar grandes volúmenes de datos en múltiples nodos de un clúster de servidores. De tal manera que Hadoop puede distribuir la carga de trabajo y los datos entre varios nodos. Esto permite procesamiento en paralelo y escalable.

#### Escalable

La escalabilidad de Hadoop se puede entender en dos dimensiones:

- **Escalabilidad Horizontal**: se añaden más nodos al clúster para aumentar la capacidad de almacenamiento y de procesamiento cuando la demanda así lo requiere.
- **Escalabilidad Vertical**: se puede aumentar la capacidad de CPU, memoria y almacenamiento de nodos individuales para majera tareas más grandes o complejas.

#### Tolerante a Fallos

Se ha diseñado Hadoop de tal manera que se mantiene la disponibilidad del servicio y la integridad de los datos incluso cuando ocurren fallos en el hardware o en el software del sistema. Esta tolerancia se obtiene mediante:

- La replicación de datos.
- La autorecuperación.
- La monitorización constante del estado del clúster.

### Estructura de Hadoop

En 2006 se ceden los dos componentes que formaban Hadoop a Apache Software Foundation. En 2012 se publica la versión 1.0 y seguidamente en 2013 se publica la versión 2.0 en la cual se introduce `Yarn` como gestor de recursos y se desacoplan los módulos `HDF` y `MapReduce`. Finalmente en 2017 se publica la versión 3.0.

Actualmente Hadoop se conforma de los siguientes componentes principales:

- **Hadoop Distributed System** (HDF): sistema distribuido de almacenamiento primario de datos. Este divide los datos en bloques y los distribuye en varios nodos del clúster para garantizar la tolerancia a fallos y la escalabilidad.
- **MapReduce**: proporciona un modelo de programación y procesamiento distribuido para realizar operaciones en conjuntos de datos distribuidos almacenados en HDF. Este divide las tareas en dos fases: 
  - Map: Los datos se procesan y se filtran en tareas más pequeñas que se ejecutan de forma paralela en diferentes nodos del clúster.
  - Reduce: los resultados intermedios de las tareas de combinan y se procesan para producir el resultado final.
- **Yet Another Resource Negotiator** (YARN): es el administrados e recursos del clúster. Se encarga de gestionar recursos de procesamiento (CPU, memoria). También permite la programación dinámica de tareas y la adminitración eficiente de recursos.

## Sistema de Ficheros Distribuidos

### ¿Qué es Hadoop Distributed File System (HDFS)?

Hadoop crea una capa de abstracción en forma de sistema de ficheros único. Tal que se encarga de almacenar los datos en varios nodos manteniendo sus metadatos. 

#### Sistema Distribuido

En este sistema de ficheros los ficheros de dividen en bloques de un mismo tamaño (normalmente 128MB, pero es configurable) y se distribuyen en los nodos del clúster. Cada uno de los bloques se replicará en varios nodos para que el sistema sea tolerante a fallos. Para este tipo de sistemas no es óptimo que los ficheros tengan un tamaño pequeño. 

Por ejemplo, si tenemos un fichero de 800MB, lo dividiríamos en siete bloques. Seis serán de 128MB y el último será de 32MB

#### Escalabilidad Horizontal

La escalabilidad horizontal se implementa aumentando el espacio por medio de discos duros o añadiendo más nodos al sistema. Este tipo de escalabilidad es más sencilla que la escalabilidad vertical ya que consiste en añadir hardware básico.

#### Estructura Jerárquica

Decimos que HDFS es jerárquico, ya que existe una jerarquía de directorios y ficheros.

#### Arquitectura y componentes

Sigue una arquitectura maestro-esclavo con dos componentes principales: NameNodes y DataNodes.

##### NameNode

Almacena los metadatos de HDFS, incluyendo información acerca de la estructura de directorios, los permisos en los archivos y la ubicación física de los bloques de datos.

En un clúster HDFS sólo hay un NameNode, y su disponibilidad es crucial, si este no es accesible este supone un error crítico en el sistema. Por ello, a partir de Hadoop 2 es posible configurar un NameNode secundario en espera, o más de uno a partir de Hadoop 3. Estes nodos toman el control si se detecta algún fallo en el nodo primario. Es importante que los nodos esten sincronizados y que tengan los mismos metadatos que el nodo primario.

##### DataNode

Este tipo de nodos son los encargados de almadenar los datos y de recuperar los bloques de datos que conforman los archivos así como de gestionar el almacenamiento del nodo. Además deben informar periódicamente del estado de los bloques al NameNode.

La pérdida de un DataNode no afecta significativamente a la integridad del sistema, pero la pérdida de muchos podría afectar a la disposibilidad y a la redundancia de los datos. 

### Escritura en HDFS

1. Cliente solicita la escritura al NameNode
2. NameNode asigna bloques consultando su tabla de metadatos para determinar qué DataNodes deben contener los bloques del archivo. Devuelve esta lista de DataNodes al cliente.
3. Escritura de datos en DataNodes por parte del cliente.
4. Confirmación al NameNode por parte de los DataNodes.
5. El NameNode actualiza su tabla de metadatos con la nueva información acerta de la ubicación de los bloques de datos del archivo.

### Lectura en HDFS

1. Cliente solicita la lectura de un archivo al NameNode.
2. El NameNode consulta su tabla de metadatos y devuelve la ubicación del archivo al cliente.
3. El cliente solicita los bloques de datos a los DataNodes donde están almacenados y estes devuelven los bloques.
4. El cliente reconstruye el archivo a partir de los bloques.
5. El NameNode actualiza su tabla de metadatos con nueva información acerca de la ubicación de los bloques de datos del archivo.

### Comandos de HDFS

#### Listar Ficheros

| Comando                       | Descripción                                                                        |
|-------------------------------|------------------------------------------------------------------------------------|
| `hdfs dfs -ls /`              | Lista todos los ficheros y directorios para el path /                              |
| `hdfs dfs -ls -h /`           | Lista los ficheros con su tamaño en formato legible                                |
| `hdfs dfs -ls -R /`           | Lista todos los ficheros y directorios recursivamente (con subdirectorios)         |
| `hdfs dfs -ls /file*`         | Lista todos los ficheros que cumplen el patrón (ficheros que comienzan con 'file') |
| `hadoop fs -stat «type:%F» /` | Imprime estadísticas del fichero o directorio en el formato indicado               |

#### Leer y Escribir Ficheros

| Comando                                     | Descripción                                                             |
|---------------------------------------------|-------------------------------------------------------------------------|
| `hdfs dfs -text /app.log`                   | Imprime el fichero en modo texto por la terminal                        |
| `hdfs dfs -cat /app.log`                    | Muestra el contenido del fichero en la salida estándar                  |
| `hdfs dfs -appendToFile /home/file1 /file2` | Añade el contenido del fichero local 'file1' al fichero en HDFS ‘file2’ |

#### Cargar y Descargar Ficheros

| Comando                                       | Descripción                                                                                                                                      |
|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `hdfs dfs -put /home/file1 /hadoop`           | Copia el fichero 'file1' del sistema de ficheros local a HDFS en la carpeta "hadoop"                                                             |
| `hdfs dfs -put -f /home/file1 /hadoop`        | Copia el fichero 'file1' del sistema de ficheros local a HDFS y lo sobreescribe en el caso de que ya exista                                      |
| `hdfs dfs -put -l /home/file1 /hadoop`        | Copia el fichero 'file1' del sistema de ficheros local a HDFS. Fuerza replicación 1 y permite al DataNode persistir los datos de forma perezosa. |
| `hdfs dfs -put -p /home/file1 /hadoop`        | Copia el fichero 'file1' del sistema de ficheros local a HDFS. Mantiene los tiempos de acceso, de modificación y propietario original            |
| `hdfs dfs -get /file1 /home/`                 | Copia el fichero 'file1' de HDFS al sistema de ficheros local                                                                                    |
| `hdfs dfs -copyToLocal /file1 /home/`         | Copia el fichero 'file1' de HDFS al sistema de ficheros local (igual que el anterior)                                                            |
| `hdfs dfs -moveFromLocal /home/file1 /hadoop` | Copia el fichero 'file1' del sistema de ficheros local a HDFS y luego lo borra del sist. ficheros local                                          |

#### Gestión de Ficheros

| Comando                                         | Descripción                                                                                                        |
|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| `hdfs dfs -cp /hadoop/file1 /hadoop1`           | Copia el fichero al directorio destino en HDFS                                                                     |
| `hdfs dfs -cp -p /hadoop/file1 /hadoop1`        | Copia el fichero al directorio destino en HDFS conservando tiempos de acceso y de modificación, propietario y modo |
| `hdfs dfs -rm /hadoop/file1`                    | Elimina el fichero 'file1' de HDFS y lo envía a la papelera                                                        |
| `hdfs dfs -rm -r /hadoop`                       | Elimina el directorio y su contenido en HDFS                                                                       |
| `hdfs dfs -rm -R /hadoop`                       | Elimina el directorio y su contenido en HDFS                                                                       |
| `hdfs dfs -rmr /hadoop`                         | Elimina el directorio y su contenido en HDFS                                                                       |
| `hdfs dfs -rm -skipTrash /file1`                | Elimina el fichero sin dejarlo en la papelera                                                                      |
| `hdfs dfs -mkdir /hadoop2`                      | Crea un directorio en HDFS                                                                                         |
| `hdfs dfs -touchz /hadoop3`                     | Crea un fichero en HDFS con tamaño 0                                                                               |
| `hadoop fs -getmerge -nl /file1 /file2 /output` | Concatena los ficheros file1 y file2 en el fichero destino /output                                                 |

#### Gestión de Permisos

| Comando                                   | Descripción                                        |
|-------------------------------------------|----------------------------------------------------|
| `hdfs dfs -checksum /hadoop/file1`        | Muestra la información checksum del fichero        |
| `hdfs dfs -chmod 775 /hadoop/file1`       | Cambia los permisos del fichero en HDFS            |
| `hdfs dfs -chmod -R 755 /hadoop`          | Cambia los permisos de los ficheros recursivamente |
| `hdfs dfs -chown hadoop:hadoop /file1`    | Cambia el propietario y el grupo del fichero       |
| `hdfs dfs -chown -R hadoop:hadoop /file1` | Cambia el propietario y el grupo recursivamente    |
| `hdfs dfs -chgrp hadoop /file1`           | Cambia el grupo del fichero                        |

#### Gestión de Administración

| Comando                         | Descripción                                                                                                                                       |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `hdfs dfs -df /hadoop`          | Muestra la capacidad y el espacio libre y usado del sistema de ficheros                                                                           |
| `hdfs dfs -df -h /hadoop`       | Muestra la capacidad y el espacio libre y usado del sistema de ficheros en formato legible                                                        |
| `hadoop version`                | Muestra la versión de Hadoop                                                                                                                      |
| `hdfs fsck /`                   | Comprueba el estado de salud del sistema de ficheros                                                                                              |
| `hdfs dfsadmin -safemode leave` | Deshabilita el modo seguro del NameNode                                                                                                           |
| `hdfs namenode -format`         | Formatea el NameNode                                                                                                                              |
| `hadoop fs -test -e filename`   | Si el path existe en HDFS, devuelve 0                                                                                                             |
| `hadoop fs -setrep -w 3 /file1` | Cambia el factor de replicación de un fichero a 3. Si se indica un directorio, cambia el factor de replicación de todos los ficheros que contiene |

## Yarn: Gestión de Recursos

### Por Qué Surge YARN?

YARN se encarga de administrar y asignar recursos a las diversas aplicaciones que se ejecutan en el clúster de Hadooop. Algunos de los objetivos principales de YARN son la escalabilidad, la eficiencia y la capacidad de ejecutar múltiples frameworks de procesamiento de datos no sólo MapReduce.

En la verisón 1, MapReduce contaba con un administrador de recursos y un planificador interno. YARN permite separar la gestión de recursos de la lógica de programación. Anteriormente se presentaban muchas limitaciones al no admitir apliaciones que siguiesen el modelo MapReduce (como el análisis de grafos) y era necesario transladar los datos a otras plataformas. A partir de Hadoop 2 la utilización de otros frameworks (Giraph para análisis de datos, Storm para análisis de datos en tiempo real, etc) es transparente.

Esto permite una mejor utilización de los recursos del clúster y una mayor flexibilidad en la ejecución de aplicaciones.

### Arquitectura y Componentes

YARN consta de tres componentes principales: **Resource Manager**, **Node Manager** y **Application Master**.

![Yarn Architecture](../assets/yarn_architecture.png)

#### Resource Manager

Se trata del maestro del clúster y se encarga de aceptar las solicitudes de recursos de las aplicaciones, negociar los recursos con los nodos y asignar recursos a la aplicaciones mediante un planificador. Cabe destacar que este planificador no ofrece garantías de ejecución de la aplicaciones ni las monitoriza.

Existe un segundo componente denominado **gestor de aplicaciones** que se encarga de aceptar las peticiones de trabajos, negocial el contenedor para la ejecutación de la aplicación y proporcionar, en caso de error, el reinicio de los trabajos.

#### Node Manager

Se ejecutan en cada nodo y son los encargados de administrar los recursos locales (CPU, almacenamiento, memoria) y reportar su disponibilidad al Resource Manager. También gestiona el lanzamiento y la supervisión de los contenedores que ejecutan las tareas de las aplicaciones y mapean las variables de entorno necesarias, descargan las dependencias y los servicios necesarios para crar los procesos.

#### Application Master

Se crea y ejecuta para cada aplicación dentro de un contenedor. Es el responsable de negociar los recursos con el Resouce Manager y de supervisar el progreso de la aplicación.

### Secuencia de trabajo en Hadoop YARN

1. El cliente envía una aplicación YARN al Resource Manager
2. El Resource Manager reserva recursos en contenedores para la ejecución de la aplicación
3. El Application Manager se registra con el Resource Manager y solicita los recursos necesarios para la aplicación
4. El Application Manager notifica al Node Manager la ejecución de los contenedores asignados
5. La aplicación YARN se ejecuta en le contenedor correspondiente
6. El Application Master supervisa la ejecución y reporta el estado al Resource Manager y al Application Manager
7. Al finalizar la ejecución el Application Manager notifica al Resource Manager

### Federación en Hadoop YARN

La federación en Hadoop YARN pemite la conexión de múltiples clústeres YARN para formar un clúster lógico único. De esta manera podemos lograr una gestión centralizada de recursos lo cual simplifica su administración.

Una de las ventajas clave es el escalamiento horizontal sin límites dados por el tamaño del clúster. Por lo tanto, se facilita la ejecución de trabajos de gran embergadura y distribuidos.
